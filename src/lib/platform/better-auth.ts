/**
 * Student accounts: Better Auth with email and password, stored in Neon. There is no
 * public sign-up; supervisors create accounts with scripts/create-intern.ts.
 *
 * Self-contained (no "@/" imports) so the migration and account scripts can load it with Node.
 */
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import type { Pool } from "pg";

export function createAuth(db: Pool) {
  return betterAuth({
    appName: "VibeCode Academy",
    database: db,
    secret: process.env.BETTER_AUTH_SECRET,
    // Production sets BETTER_AUTH_URL. Vercel previews each have their own address, so
    // there the deployment's own URL is used and its branch URL is trusted too.
    baseURL: process.env.BETTER_AUTH_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),
    trustedOrigins: [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]
      .filter((h): h is string => Boolean(h))
      .map((h) => `https://${h}`),
    emailAndPassword: {
      enabled: true,
      // Supervisors create accounts; nobody can sign themselves up.
      disableSignUp: true,
      minPasswordLength: 10,
      maxPasswordLength: 128,
    },
    // Sign-in attempts are limited per address and stored in the database, so the limit
    // holds across every server instance.
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 100,
      customRules: { "/sign-in/email": { window: 60, max: 5 } },
    },
    session: {
      // Signed in for 30 days, refreshed daily while in use.
      expiresIn: 60 * 60 * 24 * 30,
      updateAge: 60 * 60 * 24,
    },
    // Must be last: lets server actions set the session cookie.
    plugins: [nextCookies()],
  });
}

export type Auth = ReturnType<typeof createAuth>;
