import Link from "next/link";
import { connection } from "next/server";
import { allReviewPoints } from "@/lib/config";
import { contentFor } from "@/lib/content/curriculum";
import { getLang, getT } from "@/lib/i18n/server";
import { getProgrammeView } from "@/lib/programme";
import { Inlines } from "@/components/content/Inlines";
import { WelcomeAction } from "./WelcomeActions";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.welcome.metaTitle"] };
}

const STEPS = ["pages.welcome.step1", "pages.welcome.step2", "pages.welcome.step3", "pages.welcome.step4"] as const;

export default async function WelcomePage({ searchParams }: { searchParams: Promise<{ step?: string }> }) {
  await connection();
  const lang = await getLang();
  const t = await getT();
  const { days, platform } = contentFor(lang);
  const requested = Number((await searchParams).step ?? "1");
  const step = Number.isInteger(requested) && requested >= 1 && requested <= STEPS.length ? requested : 1;
  const view = await getProgrammeView();
  const day1 = view.days[0]!;
  const firstLesson = day1.lessons[0]!;
  const day1Open = day1.access !== "locked";

  return (
    <div className="gl-welcome">
      <header className="gl-page-head">
        <p className="ob-p t-label-meta gl-eyebrow">{platform.description}</p>
        <h1 className="ob-h t-page-heading">{t["pages.welcome.title"](platform.name)}</h1>
      </header>

      <nav className="gl-welcome__steps" aria-label={t["pages.welcome.tourLabel"]}>
        <p className="ob-p t-label-meta" aria-live="polite">
          {t["pages.welcome.stepOf"](step, STEPS.length)}
        </p>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s}>
              <Link href={`/welcome?step=${i + 1}`} aria-current={i + 1 === step ? "step" : undefined}>
                {t[s]}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <section className="ob-card ob-card--outlined gl-welcome__card" aria-labelledby="step-title">
        <h2 id="step-title" className="ob-h t-section-heading">
          {t[STEPS[step - 1]!]}
        </h2>

        {step === 1 ? (
          <div className="gl-prose">
            <p>
              {t["pages.welcome.buildIntro"](days.length, day1.lessons.length)}
            </p>
            <ol>
              {days.map((d) => (
                <li key={d.n}>
                  {t["pages.welcome.dayItem"](d.n, d.title)}
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="gl-prose">
            <p>{t["pages.welcome.lessonIntro"]}</p>
            <ol>
              <li>{t["pages.welcome.lessonStep1"]}</li>
              <li>{t["pages.welcome.lessonStep2"]}</li>
              <li>{t["pages.welcome.lessonStep3"]}</li>
              <li>{t["pages.welcome.lessonStep4"]}</li>
            </ol>
            <p>{t["pages.welcome.lessonSaved"]}</p>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="gl-prose">
            <p>
              {t["pages.welcome.review1"](allReviewPoints.length)}
            </p>
            <p>{t["pages.welcome.review2"]}</p>
            <p>{t["pages.welcome.review3"]}</p>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="gl-prose">
            <p>{t["pages.welcome.materials"]}</p>
            <dl className="gl-needs">
              {day1.lessons.map((l) => (
                <div key={l.id} className="gl-needs__item">
                  <dt className="t-label-meta">
                    {t["pages.lessonTitle"](l.id, l.title)}
                  </dt>
                  <dd className="ob-p">
                    <Inlines nodes={l.requiredMaterials} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        <div className="gl-welcome__nav">
          {step > 1 ? (
            <Link className="ob-btn ob-btn--secondary ob-btn--large" href={`/welcome?step=${step - 1}`}>
              {t["pages.welcome.back"]}
            </Link>
          ) : (
            <span />
          )}
          {step < STEPS.length ? (
            <Link className="ob-btn ob-btn--primary ob-btn--large" href={`/welcome?step=${step + 1}`}>
              {t["pages.welcome.next"]}
            </Link>
          ) : day1Open ? (
            <WelcomeAction href={`/lesson/${firstLesson.slug}`} label={t["pages.startLessonN"](firstLesson.id)} variant="primary" />
          ) : (
            <WelcomeAction href="/home" label={t["pages.goHome"]} variant="primary" />
          )}
        </div>
      </section>

      {step < STEPS.length ? (
        <p className="ob-p">
          <WelcomeAction href="/home" label={t["pages.welcome.skip"]} variant="tertiary" />
        </p>
      ) : !day1Open ? (
        <p className="ob-p ob-secondary">{t["pages.welcome.day1Unknown"]}</p>
      ) : (
        <p className="ob-p ob-secondary">{t["pages.welcome.reopen"]}</p>
      )}
    </div>
  );
}
