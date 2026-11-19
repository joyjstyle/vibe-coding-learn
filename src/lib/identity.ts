/** Who is signed in, and how they want things shown. Server-side only. */
import { redirect } from "next/navigation";
import { auth, initials, isLoginEnabled, type Intern } from "./platform/auth";
import { isDatabaseMode } from "./platform/db";
import { defaultSettings, type Settings } from "./platform/settings";
import { settingsStore } from "./platform/stores";

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
