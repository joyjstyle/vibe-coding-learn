/**
 * Who is signed in. With DATABASE_URL set, student accounts come from Better Auth (email and
 * password, stored in Neon). Without it, local development signs in a single development
 * intern when GENIE_LAB_DEV=1.
 */
import { isDatabaseMode, pool } from "./db";
import type { Auth } from "./better-auth";

export type Intern = {
  id: string;
  /** The intern's name, or null when it has not been set. Never invented. */
  name: string | null;
};

export interface AuthProvider {
  /** The signed-in intern, or null when nobody is signed in. */
  getCurrentIntern(): Promise<Intern | null>;
}

/** Local development only. Active when GENIE_LAB_DEV=1 and no database is configured. */
export class DevAuthProvider implements AuthProvider {
  async getCurrentIntern(): Promise<Intern | null> {
    if (process.env.GENIE_LAB_DEV !== "1") return null;
    const name = process.env.GENIE_LAB_DEV_NAME?.trim();
    return { id: "dev-intern", name: name ? name : null };
  }
}

const g = globalThis as unknown as { __genieBetterAuth?: Promise<Auth> };

/** The Better Auth instance, created once per server process. Database mode only. */
export function betterAuthInstance(): Promise<Auth> {
  g.__genieBetterAuth ??= import("./better-auth").then((m) => m.createAuth(pool()));
  return g.__genieBetterAuth;
}

/** Student accounts in Neon: reads the session cookie on the current request. */
export class BetterAuthProvider implements AuthProvider {
  async getCurrentIntern(): Promise<Intern | null> {
    const { headers } = await import("next/headers");
    const session = await (await betterAuthInstance()).api.getSession({ headers: await headers() });
    if (!session) return null;
    return { id: session.user.id, name: session.user.name?.trim() || null };
  }
}

/**
 * Sign-in is on unless GENIE_LAB_LOGIN=0. Each account's data is kept separately. With
 * sign-in off, everyone uses one shared account, so all data belongs to a single user.
 */
export function isLoginEnabled(): boolean {
  return process.env.GENIE_LAB_LOGIN !== "0";
}

const SOLO_ID = "solo-intern";
const gs = globalThis as unknown as { __genieSoloIntern?: Promise<Intern> };

/**
 * No sign-in: the one user is the oldest account in Neon (so data already saved is kept),
 * or a new "solo-intern" account when there is none. The data tables reference "user", so
 * the account must exist.
 */
export class SingleUserAuthProvider implements AuthProvider {
  getCurrentIntern(): Promise<Intern | null> {
    gs.__genieSoloIntern ??= (async () => {
      const db = pool();
      const found = await db.query<{ id: string; name: string | null }>(
        `select id, name from "user" order by "createdAt" asc limit 1`,
      );
      let row = found.rows[0];
      if (!row) {
        await db.query(
          `insert into "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
           values ($1, '', 'solo@genie-lab.local', false, now(), now()) on conflict (id) do nothing`,
          [SOLO_ID],
        );
        row = { id: SOLO_ID, name: null };
      }
      return { id: row.id, name: row.name?.trim() || null };
    })().catch((e) => {
      gs.__genieSoloIntern = undefined;
      throw e;
    });
    return gs.__genieSoloIntern;
  }
}

export const auth: AuthProvider = !isDatabaseMode()
  ? new DevAuthProvider()
  : isLoginEnabled()
    ? new BetterAuthProvider()
    : new SingleUserAuthProvider();

/** "Ada Lovelace" becomes "AL"; one word gives one letter; no name gives null. */
export function initials(name: string | null): string | null {
  if (!name) return null;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  const first = parts[0]!.charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1]!.charAt(0) : "";
  return (first + last).toLocaleUpperCase("en-GB");
}
