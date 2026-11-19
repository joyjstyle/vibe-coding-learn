"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getT } from "@/lib/i18n/server";
import { auth } from "@/lib/platform/auth";
import { TEXT_SIZES } from "@/lib/platform/settings";
import { settingsStore } from "@/lib/platform/stores";

const Input = z.object({ name: z.string().max(80), textSize: z.enum(TEXT_SIZES), reducedMotion: z.boolean() });

export type SettingsResult = { ok: true } | { ok: false; error: string; field?: "name" };

export async function saveSettings(input: z.input<typeof Input>): Promise<SettingsResult> {
  const t = await getT();
  const intern = await auth.getCurrentIntern();
  if (!intern) return { ok: false, error: t["lib.settings.notSignedIn"] };
  const parsed = Input.safeParse(input);
  if (!parsed.success) return { ok: false, error: t["lib.settings.nameTooLong"], field: "name" };
  try {
    const name = parsed.data.name.trim();
    await settingsStore.update(intern.id, (s) => ({ ...s, name: name || null, textSize: parsed.data.textSize, reducedMotion: parsed.data.reducedMotion }));
    revalidatePath("/", "layout");
    return { ok: true };
  } catch {
    return { ok: false, error: t["lib.error.saveFailed"] };
  }
}

/** Finishing or skipping the Welcome tour. Kept apart from lesson progress. */
export async function completeWelcome(): Promise<{ ok: boolean }> {
  const intern = await auth.getCurrentIntern();
  if (!intern) return { ok: false };
  try {
    await settingsStore.update(intern.id, (s) => ({ ...s, welcomeCompletedAt: s.welcomeCompletedAt ?? new Date().toISOString() }));
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
