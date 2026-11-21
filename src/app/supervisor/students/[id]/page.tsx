import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { reviewPointFor } from "@/lib/config";
import { contentFor, getLesson } from "@/lib/content/curriculum";
import { getLang, getT } from "@/lib/i18n/server";
import { requireSupervisor } from "@/lib/identity";
import { progressStore, settingsStore, workStore } from "@/lib/platform/stores";
import { getStudent } from "@/lib/platform/supervisors";
import { reviewState, submissionsFor } from "@/lib/work-rules";
import { EvidenceView } from "@/components/work/EvidenceView";
import { PageHeader } from "@/components/PageHeader";
import { ProgressBadge, ReviewTag, SubmissionBadge } from "@/components/StatusBadges";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.supervisor.title"], robots: { index: false, follow: false } };
}

/** One student, read-only: every lesson's progress by day, with submitted work under each lesson. */
export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  await requireSupervisor();
  const { id } = await params;
  const student = await getStudent(decodeURIComponent(id));
  if (!student) notFound();
  const lang = await getLang();
  const t = await getT();
  const { days } = contentFor(lang);
  const [settings, progress, work] = await Promise.all([settingsStore.get(student.id), progressStore.list(student.id), workStore.get(student.id)]);
  const name = settings.name ?? student.name ?? student.email;
  const fileHref = (fileId: string) => `/supervisor/students/${encodeURIComponent(student.id)}/files/${encodeURIComponent(fileId)}`;

  return (
    <>
      <p className="ob-p">
        <Link className="gl-link" href="/supervisor">
          {t["pages.supervisor.back"]}
        </Link>
      </p>
      <PageHeader eyebrow={student.email} title={name} lead={t["pages.supervisor.studentLead"]} />
      {days.map((day) => (
        <section key={day.n} className="gl-section" aria-labelledby={`day-${day.n}`}>
          <h2 id={`day-${day.n}`} className="ob-h t-section-heading">
            {t["pages.supervisor.day"](day.n, day.title)}
          </h2>
          <ul className="ob-list gl-sublist">
            {day.lessons.map((l) => {
              const versions = submissionsFor(work, l.id);
              const lesson = versions.length ? getLesson(l.id, lang) : undefined;
              const [latest, ...earlier] = versions;
              return (
                <li key={l.id} className="ob-sub gl-sub">
                  <div className="gl-sub__main">
                    <p className="ob-meta ob-p">{t["pages.dayLesson"](l.day, l.id)}</p>
                    <p className="ob-p gl-sub__title">{l.title}</p>
                    {lesson && latest ? (
                      <details className="gl-version">
                        <summary className="ob-p">{t["pages.supervisor.work"](versions.length)}</summary>
                        <EvidenceView lesson={lesson} submission={latest} fileHref={fileHref} />
                        {earlier.map((v) => (
                          <details key={v.id} className="ob-card ob-card--outlined gl-version">
                            <summary className="ob-h t-card-title">{t["pages.versionN"](v.version)}</summary>
                            <EvidenceView lesson={lesson} submission={v} fileHref={fileHref} />
                          </details>
                        ))}
                      </details>
                    ) : null}
                  </div>
                  <div className="ob-sub__actions">
                    <ProgressBadge status={progress.get(l.id)?.status ?? "not_started"} />
                    {versions.length ? <SubmissionBadge state="submitted" /> : null}
                    {versions.length && reviewPointFor(l.id) ? <ReviewTag decision={reviewState(work, l.id)} /> : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
