import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { platform } from "@/lib/content/curriculum";
import { auth, isLoginEnabled } from "@/lib/platform/auth";
import { isDatabaseMode } from "@/lib/platform/db";
import { safeNext } from "@/lib/safe-next";
import { AppFrame } from "@/components/AppFrame";
import { PageHeader } from "@/components/PageHeader";
import { SignInForm } from "./SignInForm";

export const metadata = { title: "Sign in", robots: { index: false, follow: false } };

/** The simplified branded shell with no navigation, as the design system asks before sign-in. */
export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  await connection();
  const next = safeNext((await searchParams).next);
  if (isDatabaseMode() && !isLoginEnabled()) redirect(next);
  if (await auth.getCurrentIntern()) redirect(next);
  return (
    <AppFrame
      bar={
        <header className="ob-topbar" data-surface="dark">
          <p className="ob-brand ob-p">{platform.name}</p>
        </header>
      }
    >
      <div className="gl-narrow">
        <PageHeader eyebrow={platform.description} title="Sign in to Genie Lab" />
        {isDatabaseMode() ? (
          <section className="ob-card ob-card--outlined gl-signin-card" aria-label="Sign in">
            <SignInForm next={next} />
            <p className="ob-p ob-secondary">Your supervisor sets up your account. If you&apos;ve forgotten your password, ask them to reset it.</p>
          </section>
        ) : (
          <section className="ob-card ob-card--outlined" aria-label="Sign-in not set up">
            <p className="ob-p">Sign-in is not set up here. Local development signs you in automatically.</p>
            <p className="ob-p">
              <Link className="ob-btn ob-btn--primary" href="/home">
                Go to Home
              </Link>
            </p>
          </section>
        )}
      </div>
    </AppFrame>
  );
}
