"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANG_COOKIE, LANGS, type Lang } from "@/lib/i18n/lang";
import { useLang, useT } from "@/lib/i18n/client";

const SHORT: Record<Lang, string> = { en: "EN", vi: "VN" };

/** EN/VN switch for the top right of every bar. Stores the choice in a cookie for a year. */
export function LangToggle() {
  const lang = useLang();
  const t = useT();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(next: Lang) {
    if (next === lang) return;
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    startTransition(() => router.refresh());
  }

  return (
    <div className="gl-lang" role="group" aria-label={t["lang.toggleLabel"]} aria-busy={pending || undefined}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className="gl-lang__btn"
          aria-pressed={l === lang}
          lang={l === "vi" ? "vi" : "en"}
          title={t[`lang.${l}`]}
          onClick={() => choose(l)}
        >
          <span aria-hidden="true">{SHORT[l]}</span>
          <span className="sr-only">{t[`lang.${l}`]}</span>
        </button>
      ))}
    </div>
  );
}
