/**
 * Creates a student account, or resets a password. Supervisors run this; there is no
 * public sign-up. The password is never passed on the command line: it is read from a
 * hidden prompt, from standard input with --password-stdin, or generated and shown once.
 *
 *   DATABASE_URL=… npm run create-intern -- --email ada@example.com --name "Ada Lovelace"
 *   DATABASE_URL=… npm run create-intern -- --email ada@example.com --reset-password
 *
 * Add --supervisor to create a supervisor account instead, or to make an existing account
 * a supervisor (no password needed then). Supervisors see every student's progress and work.
 */
import { randomBytes } from "node:crypto";
import { parseArgs } from "node:util";
import { createInterface } from "node:readline";
import { connect } from "./db.ts";

const { values } = parseArgs({
  options: {
    email: { type: "string" },
    name: { type: "string" },
    "reset-password": { type: "boolean", default: false },
    "password-stdin": { type: "boolean", default: false },
    generate: { type: "boolean", default: false },
    supervisor: { type: "boolean", default: false },
  },
});

function usage(msg: string): never {
  console.error(`${msg}\nUsage: npm run create-intern -- --email <email> --name "<name>" [--supervisor] [--generate | --password-stdin]\n       npm run create-intern -- --email <email> --supervisor   (makes an existing account a supervisor)\n       npm run create-intern -- --email <email> --reset-password [--generate | --password-stdin]`);
  process.exit(1);
}

async function readPassword(): Promise<{ password: string; generated: boolean }> {
  if (values.generate) return { password: randomBytes(12).toString("base64url"), generated: true };
  if (values["password-stdin"]) {
    const chunks: Buffer[] = [];
    for await (const c of process.stdin) chunks.push(c as Buffer);
    return { password: Buffer.concat(chunks).toString("utf8").replace(/\r?\n$/, ""), generated: false };
  }
  if (!process.stdin.isTTY) usage("No terminal for a hidden prompt. Use --generate or --password-stdin.");
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  const ask = (q: string) =>
    new Promise<string>((resolve) => {
      process.stdout.write(q);
      const write = (rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput;
      (rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput = () => {};
      rl.question("", (a) => {
        (rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput = write;
        process.stdout.write("\n");
        resolve(a);
      });
    });
  const a = await ask("Password (at least 10 characters): ");
  const b = await ask("Repeat the password: ");
  rl.close();
  if (a !== b) usage("The passwords do not match.");
  return { password: a, generated: false };
}

async function main() {
  const email = values.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) usage("Give a valid --email.");
  const { pool, auth } = connect();
  try {
    const ctx = await auth.$context;
    const existing = await ctx.internalAdapter.findUserByEmail(email, { includeAccounts: true });
    const makeSupervisor = async (userId: string) => {
      try {
        await pool.query("insert into genie_supervisors (user_id) values ($1) on conflict do nothing", [userId]);
      } catch (e) {
        if ((e as { code?: string }).code === "42P01") usage("The supervisors table does not exist yet. Run: npm run db:migrate");
        throw e;
      }
    };
    if (values.supervisor && existing && !values["reset-password"]) {
      await makeSupervisor(existing.user.id);
      console.log(`${email} is now a supervisor.`);
      return;
    }
    const { password, generated } = await readPassword();
    if (password.length < 10 || password.length > 128) usage("The password must be 10 to 128 characters.");
    const hash = await ctx.password.hash(password);

    if (values["reset-password"]) {
      if (!existing) usage(`No account for ${email}.`);
      await ctx.internalAdapter.updatePassword(existing.user.id, hash);
      await ctx.internalAdapter.deleteUserSessions(existing.user.id);
      console.log(`Password reset for ${email}. They have been signed out everywhere.`);
    } else {
      const name = values.name?.trim();
      if (!name) usage("Give the person's --name.");
      if (existing) usage(`An account for ${email} already exists. Use --reset-password to change its password.`);
      const user = await ctx.internalAdapter.createUser({ email, name, emailVerified: true }, { method: "admin" });
      await ctx.internalAdapter.linkAccount({ userId: user.id, providerId: "credential", accountId: user.id, password: hash });
      if (values.supervisor) await makeSupervisor(user.id);
      console.log(`Created ${values.supervisor ? "a supervisor" : "a student"} account for ${name} <${email}>.`);
    }
    if (generated) console.log(`Temporary password (shown once, send it privately): ${password}`);
  } finally {
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
