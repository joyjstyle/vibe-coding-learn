import Link from "next/link";
import { contentFor } from "@/lib/content/curriculum";
import { getLang, getT } from "@/lib/i18n/server";
import { AppFrame } from "@/components/AppFrame";
import { LangToggle } from "@/components/LangToggle";
import { PageHeader } from "@/components/PageHeader";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.notFoundTitle"] };
}

export default async function NotFound() {
  const lang = await getLang();
  const t = await getT();
  const { platform } = contentFor(lang);
  return (
    <AppFrame
      bar={
        <header className="ob-topbar" data-surface="dark">
          <Link className="ob-brand" href="/home">
            {platform.name}
          </Link>
          <LangToggle />
        </header>
      }
    >
      <PageHeader title={t["pages.notFoundTitle"]} lead={t["pages.notFound.lead"]} />
      <p className="ob-p">
        <Link className="ob-btn ob-btn--primary" href="/home">
          {t["pages.goHome"]}
        </Link>
      </p>
    </AppFrame>
  );
}
