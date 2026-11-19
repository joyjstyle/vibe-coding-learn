/**
 * The interface language. English is the default; Vietnamese is chosen with the EN/VN
 * toggle and remembered in a cookie, so it works with or without sign-in.
 * Safe to import from client and server code.
 */
export const LANGS = ["en", "vi"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "genie-lang";

/** The value for <html lang>. */
export const HTML_LANG: Record<Lang, string> = { en: "en-GB", vi: "vi" };
/** The locale for dates and numbers. */
export const LOCALE: Record<Lang, string> = { en: "en-GB", vi: "vi-VN" };

export function parseLang(value: string | undefined | null): Lang {
  return value === "vi" ? "vi" : "en";
}
