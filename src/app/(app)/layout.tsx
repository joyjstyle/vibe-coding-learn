import type { ReactNode } from "react";
import { contentFor } from "@/lib/content/curriculum";
import { getLang } from "@/lib/i18n/server";
import { getIdentity, requireIntern } from "@/lib/identity";
import { getHelpData } from "@/lib/help-data";
import { HelpProvider } from "@/components/help/HelpContext";
import { AppFrame } from "@/components/AppFrame";
import { TopBar } from "@/components/TopBar";

export default async function MainLayout({ children }: { children: ReactNode }) {
  await requireIntern();
  const [{ name, initials }, help, lang] = await Promise.all([getIdentity(), getHelpData(), getLang()]);
  const { platform } = contentFor(lang);
  return (
    <HelpProvider data={help}>
      <AppFrame bar={<TopBar brand={platform.name} name={name} initials={initials} />}>{children}</AppFrame>
    </HelpProvider>
  );
}
