import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { contentFor } from "@/lib/content/curriculum";
import { getLang, getT } from "@/lib/i18n/server";
import { auth, isLoginEnabled } from "@/lib/platform/auth";
import { isDatabaseMode } from "@/lib/platform/db";
import { safeNext } from "@/lib/safe-next";
import { AppFrame } from "@/components/AppFrame";
import { PageHeader } from "@/components/PageHeader";
import { SignInForm } from "./SignInForm";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.signIn.metaTitle"], robots: { index: false, follow: false } };
}

/** The simplified branded shell with no navigation, as the design system asks before sign-in. */
export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  await connection();
  const next = safeNext((await searchParams).next);
  if (isDatabaseMode() && !isLoginEnabled()) redirect(next);
  if (await auth.getCurrentIntern()) redirect(next);
  const lang = await getLang();
  const t = await getT();
  const { platform } = contentFor(lang);
  return (
    <AppFrame
      bar={
        <header className="ob-topbar" data-surface="dark">
          <p className="ob-brand ob-p">{platform.name}</p>
        </header>
      }
    >
      <div className="gl-narrow">
        <PageHeader eyebrow={platform.name} title={t["pages.signIn.title"]} />
        {isDatabaseMode() ? (
          <section className="ob-card ob-card--outlined gl-signin-card" aria-label={t["pages.signIn.sectionLabel"]}>
            <SignInForm next={next} />
            <p className="ob-p ob-secondary">{t["pages.signIn.forgotten"]}</p>
          </section>
        ) : (
          <section className="ob-card ob-card--outlined" aria-label={t["pages.signIn.notSetUpLabel"]}>
            <p className="ob-p">{t["pages.signIn.notSetUp"]}</p>
            <p className="ob-p">
              <Link className="ob-btn ob-btn--primary" href="/home">
                {t["pages.goHome"]}
              </Link>
            </p>
          </section>
        )}
      </div>
    </AppFrame>
  );
}
