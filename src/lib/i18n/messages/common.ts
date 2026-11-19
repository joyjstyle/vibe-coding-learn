/**
 * Interface text shared across the app. Each area has its own file in this folder exporting
 * { en, vi }, with vi typed as typeof en so both languages always have the same keys.
 * Values are plain strings, or functions for text with numbers or names in it, such as
 * (n: number) => `Day ${n}`.
 */
const en = {
  "lang.toggleLabel": "Language",
  "lang.en": "English",
  "lang.vi": "Tiếng Việt",
};

const vi: typeof en = {
  "lang.toggleLabel": "Ngôn ngữ",
  "lang.en": "English",
  "lang.vi": "Tiếng Việt",
};

export const common = { en, vi };
