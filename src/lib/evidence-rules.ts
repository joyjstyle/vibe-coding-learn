/**
 * Upload limits and evidence validation, shared by the form's helper text and the server,
 * so what the page says always matches what is enforced.
 */
import type { Lang } from "./i18n/lang";
import { messages } from "./i18n/messages";

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_FILE_LABEL = "10 MB";

/** Allowed file types by extension. The stored media type comes from here, never from the browser. */
export const FILE_TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  pdf: "application/pdf",
  txt: "text/plain; charset=utf-8",
  md: "text/plain; charset=utf-8",
  csv: "text/plain; charset=utf-8",
  json: "text/plain; charset=utf-8",
};

export const FILE_TYPES_LABEL = "PNG, JPG, WebP, GIF, PDF, TXT, Markdown, CSV or JSON";
/** FILE_TYPES_LABEL in the given language. MAX_FILE_LABEL ("10 MB") reads the same in both. */
export function fileTypesLabel(lang: Lang = "en"): string {
  return messages[lang]["lib.evidence.fileTypes"];
}
export const FILE_ACCEPT = Object.keys(FILE_TYPES).map((e) => `.${e}`).join(",");

export function fileExtension(name: string): string {
  const m = /\.([A-Za-z0-9]+)$/.exec(name);
  return m ? m[1]!.toLowerCase() : "";
}

export type FileCheck = { ok: true; type: string } | { ok: false; reason: string };

export function checkFile(name: string, size: number, lang: Lang = "en"): FileCheck {
  const t = messages[lang];
  const type = FILE_TYPES[fileExtension(name)];
  if (!type) return { ok: false, reason: t["lib.evidence.notAllowed"](name, fileTypesLabel(lang)) };
  if (size === 0) return { ok: false, reason: t["lib.evidence.empty"](name) };
  if (size > MAX_FILE_BYTES) return { ok: false, reason: t["lib.evidence.tooLarge"](name, MAX_FILE_LABEL) };
  return { ok: true, type };
}

/** Keeps a readable file name: no folders, no control characters, at most 200 characters. */
export function cleanFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "file";
  const cleaned = base.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  return (cleaned || "file").slice(0, 200);
}

export function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** A Git commit identifier: 7 to 40 hexadecimal characters. */
export const COMMIT = /^[0-9a-f]{7,40}$/i;
