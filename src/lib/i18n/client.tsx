"use client";

/**
 * The language in client components. The root layout wraps the app in <I18nProvider>,
 * so any client component can call useT() for messages or useLang() for the language.
 */
import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LANG, type Lang } from "./lang";
import { messages, type Messages } from "./messages";

const LangContext = createContext<Lang>(DEFAULT_LANG);

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

export function useT(): Messages {
  return messages[useLang()];
}
