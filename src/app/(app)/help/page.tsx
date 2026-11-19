import { connection } from "next/server";
import { getHelpData } from "@/lib/help-data";
import { PageHeader } from "@/components/PageHeader";
import { HelpContent } from "@/components/help/HelpContent";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.help.title"] };
}

/** The same help as the drawer, as a page with its own link. */
export default async function HelpPage() {
  await connection();
  const t = await getT();
  return (
    <div className="gl-narrow">
      <PageHeader title={t["pages.help.title"]} lead={t["pages.help.lead"]} />
      <HelpContent data={await getHelpData()} headingLevel={2} />
    </div>
  );
}
