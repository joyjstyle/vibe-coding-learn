import { connection } from "next/server";
import { getIdentity } from "@/lib/identity";
import { PageHeader } from "@/components/PageHeader";
import { getT } from "@/lib/i18n/server";
import { SettingsForm } from "./SettingsForm";
import { SignOut } from "./SignOut";
import { isDatabaseMode } from "@/lib/platform/db";
import { isLoginEnabled } from "@/lib/platform/auth";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.settings.title"] };
}

export default async function SettingsPage() {
  await connection();
  const { intern, settings } = await getIdentity();
  const t = await getT();
  return (
    <div className="gl-narrow">
      <PageHeader title={t["pages.settings.title"]} lead={t["pages.settings.lead"]} />
      <SettingsForm initial={settings} canSave={Boolean(intern)} />
      {isDatabaseMode() && isLoginEnabled() && intern ? <SignOut /> : null}
    </div>
  );
}
