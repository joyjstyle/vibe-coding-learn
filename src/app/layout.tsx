import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { platform } from "@/lib/content/curriculum";
import { SkipLink } from "@/components/SkipLink";
import { getIdentity } from "@/lib/identity";
import { getLang } from "@/lib/i18n/server";
import { HTML_LANG } from "@/lib/i18n/lang";
import { I18nProvider } from "@/lib/i18n/client";
import "@/styles/generated/tokens.css";
import "@/styles/generated/ds.css";
import "@/styles/app.css";

// The design system's two faces, self-hosted at build time. The token stacks read them
// from --font-face-heading and --font-face-body, then fall back as tokens.json lists.
const heading = Bricolage_Grotesque({ subsets: ["latin", "latin-ext", "vietnamese"], axes: ["opsz"], variable: "--font-face-heading", display: "swap" });
const body = Manrope({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-face-body", display: "swap" });

export const metadata: Metadata = {
  title: { template: `%s · ${platform.name}`, default: platform.name },
  description: platform.description,
  applicationName: platform.name,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Text size and reduced motion are applied here, on the server, so pages never flash at the wrong size.
  const { settings } = await getIdentity();
  const lang = await getLang();
  return (
    <html lang={HTML_LANG[lang]} className={`${heading.variable} ${body.variable}`} data-text-size={settings.textSize} data-reduced-motion={String(settings.reducedMotion)}>
      <body>
        <I18nProvider lang={lang}>
          <SkipLink />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
