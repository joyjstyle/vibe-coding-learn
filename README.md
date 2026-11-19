# VibeCode Academy

Clinic Genie Vibe Coding Intern Platform: a learning platform where design and vibe coding interns follow a fixed 10-day curriculum of 40 lessons, reading on the platform and doing the work in their own terminal with Claude Code.

## Where things are

| Path | What it is | Who changes it |
|---|---|---|
| `content/` | The locked lesson package: `curriculum.json`, `lessons/*.md` and its own `README.md` | Curriculum owner only. The platform renders it and never edits it |
| `design-system/` | Read-only snapshot of the design system (`README.md`, `tokens.json`, `bundle.css`) | Change the source artifact, then take a new snapshot |
| `docs/IA_AND_USER_FLOWS.md` | What the platform does: pages, flows, statuses, data | |
| `docs/DECISIONS.md` | Decisions that settle conflicts between the sources | |
| `config/` | Cohort calendar and other platform settings | |
| `src/` | The Next.js app | |
| `scripts/build-design-system.ts` | Turns `design-system/` into `src/styles/generated/` (runs before `dev` and `build`) | |

## Student accounts and Neon

With `DATABASE_URL` set, students sign in with an email and password (Better Auth) and everything they do is saved in Neon against their account: lesson progress and completion, ticked steps, submissions with every version, recorded review decisions, share links, knowledge check answers, settings and evidence files. Signing in again on any computer brings it all back. There is no public sign-up; supervisors create accounts.

1. Create a Neon project and copy its connection string.
2. Set `DATABASE_URL`, `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` (see `.env.example`) where the app runs.
3. Create the tables. Each build runs this automatically when `DATABASE_URL` is set (on Vercel, every deployment), so by hand it is only needed elsewhere:

```bash
DATABASE_URL='postgresql://…neon.tech/neondb?sslmode=require' npm run db:migrate
```

4. Create each student's account. The password is typed at a hidden prompt, or use `--generate` to create one that is shown once:

```bash
DATABASE_URL='…' npm run create-intern -- --email ada@example.com --name "Ada Lovelace"
```

5. Reset a forgotten password (this also signs the student out everywhere):

```bash
DATABASE_URL='…' npm run create-intern -- --email ada@example.com --reset-password
```

Sign-in attempts are limited to 5 a minute per address. Better Auth reads the address from `X-Forwarded-For`, so host the app behind a platform that sets that header itself (Vercel does). Without `DATABASE_URL` the app runs in local development mode: JSON files in `.data/`, and with `GENIE_LAB_DEV=1` a single development intern signed in automatically.

## Running it

Needs Node 22.18 or later.

```bash
npm install
```

```bash
npm run dev
```

Local development identity: set `GENIE_LAB_DEV=1`, and optionally `GENIE_LAB_DEV_NAME`, to sign in as a single development intern. Without a name, the platform shows that no name is set; it never invents one.

## Checks

```bash
npm run typecheck
```

```bash
npm test
```

The Postgres store tests run when `TEST_DATABASE_URL` points at a migrated throwaway database; otherwise they are skipped and say so. The account browser tests run when `E2E_DATABASE_URL` points at a local throwaway database, which they wipe; they refuse any database that is not on this machine.

Browser tests run against a production build:

```bash
npm run build && npm run e2e -- --trace off
```

`.npmrc` sets `legacy-peer-deps`: npm 10's resolver crashes on Vitest's optional `@vitest/browser-playwright` peer. Every peer the app needs is declared directly in `package.json`.
