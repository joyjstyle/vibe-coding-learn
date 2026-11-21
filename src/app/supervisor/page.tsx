import Link from "next/link";
import { connection } from "next/server";
import { reviewPointFor } from "@/lib/config";
import { lessons } from "@/lib/content/curriculum";
import { getLang, getT } from "@/lib/i18n/server";
import { requireSupervisor } from "@/lib/identity";
import { settingsStore, workStore } from "@/lib/platform/stores";
import { listStudents } from "@/lib/platform/supervisors";
import { reviewState } from "@/lib/work-rules";
import { dateTime } from "@/components/work/EvidenceView";
import { PageHeader } from "@/components/PageHeader";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.supervisor.title"], robots: { index: false, follow: false } };
}

/** Every student: lessons complete, submissions waiting for review and when they were last active. */
export default async function SupervisorPage() {
  await connection();
  await requireSupervisor();
  const lang = await getLang();
  const t = await getT();
  const reviewLessons = lessons.filter((l) => reviewPointFor(l.id));
  const students = await Promise.all(
    (await listStudents()).map(async (s) => {
      const [settings, work] = await Promise.all([settingsStore.get(s.id), workStore.get(s.id)]);
      const awaiting = reviewLessons.filter((l) => reviewState(work, l.id) === "awaiting_review").length;
      return { ...s, name: settings.name ?? s.name, awaiting };
    }),
  );

  return (
    <>
      <PageHeader title={t["pages.supervisor.title"]} lead={t["pages.supervisor.lead"]} />
      {!students.length ? (
        <section className="ob-card ob-card--outlined gl-empty" aria-label={t["pages.supervisor.listLabel"]}>
          <p className="ob-p">{t["pages.supervisor.none"]}</p>
        </section>
      ) : (
        <ul className="ob-list gl-sublist" aria-label={t["pages.supervisor.listLabel"]}>
          {students.map((s) => (
            <li key={s.id} className="ob-sub gl-sub">
              <div className="gl-sub__main">
                <p className="ob-p gl-sub__title">{s.name ?? s.email}</p>
                <p className="ob-meta ob-p">{s.email}</p>
                <p className="ob-sub__meta ob-meta ob-p">
                  <span>{t["pages.supervisor.lessonsComplete"](s.completeLessons, lessons.length)}</span>
                  {s.awaiting ? <span>{t["pages.supervisor.awaiting"](s.awaiting)}</span> : null}
                  <span>{s.lastActive ? t["pages.supervisor.lastActive"](dateTime(s.lastActive, lang)) : t["pages.supervisor.notStarted"]}</span>
                </p>
              </div>
              <div className="ob-sub__actions">
                <Link className="ob-link" href={`/supervisor/students/${encodeURIComponent(s.id)}`} aria-label={t["pages.supervisor.viewLabel"](s.name ?? s.email)}>
                  {t["pages.supervisor.view"]}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
