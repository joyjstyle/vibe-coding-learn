/** Who is signed in, and how they want things shown. Server-side only. */
import { notFound, redirect } from "next/navigation";
import { auth, initials, isLoginEnabled, type Intern } from "./platform/auth";
import { isDatabaseMode } from "./platform/db";
import { defaultSettings, type Settings } from "./platform/settings";
import { settingsStore } from "./platform/stores";
import { isSupervisor } from "./platform/supervisors";

export type Identity = { intern: Intern | null; settings: Settings; name: string | null; initials: string | null };

export async function getIdentity(): Promise<Identity> {
  const intern = await auth.getCurrentIntern();
  const settings = intern ? await settingsStore.get(intern.id) : defaultSettings();
  // A name set in Settings wins; otherwise whatever sign-in provides; otherwise none.
  const name = settings.name ?? intern?.name ?? null;
  return { intern, settings, name, initials: initials(name) };
}

/** In database mode every intern page needs a signed-in student. */
export async function requireIntern(): Promise<void> {
  if (!isDatabaseMode() || !isLoginEnabled()) return;
  if (await auth.getCurrentIntern()) return;
  const { headers } = await import("next/headers");
  const path = (await headers()).get("x-genie-path") ?? "/";
  redirect(`/sign-in?next=${encodeURIComponent(path)}`);
}

/**
 * Supervisor pages: sends visitors who are not signed in to sign-in, and shows "not found"
 * to everyone who is signed in but is not a supervisor.
 */
export async function requireSupervisor(): Promise<Intern> {
  if (!isDatabaseMode() || !isLoginEnabled()) notFound();
  const me = await auth.getCurrentIntern();
  if (!me) {
    const { headers } = await import("next/headers");
    const path = (await headers()).get("x-genie-path") ?? "/supervisor";
    redirect(`/sign-in?next=${encodeURIComponent(path)}`);
  }
  if (!(await isSupervisor(me.id))) notFound();
  return me;
}
