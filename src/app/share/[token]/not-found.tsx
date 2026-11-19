import { ShareShell } from "./shell";
import { PageHeader } from "@/components/PageHeader";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.share.notFoundMetaTitle"], robots: { index: false, follow: false } };
}

export default async function ShareNotFound() {
  const t = await getT();
  return (
    <ShareShell>
      <PageHeader title={t["pages.share.notFoundTitle"]} lead={t["pages.share.notFoundLead"]} />
    </ShareShell>
  );
}
