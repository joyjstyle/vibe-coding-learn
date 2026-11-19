import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getLesson } from "@/lib/content/curriculum";
import { getLang, getT } from "@/lib/i18n/server";
import { submissionsFor } from "@/lib/work-rules";
import { PageHeader } from "@/components/PageHeader";
import { EvidenceView } from "@/components/work/EvidenceView";
import { ShareShell } from "./shell";
import { workStore } from "@/lib/platform/stores";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t["pages.share.metaTitle"],
    robots: { index: false, follow: false, nocache: true },
    referrer: "no-referrer",
  };
}

/** Read-only page for a supervisor who opens a share link. No editing, no navigation. */
export default async function SharePage({ params }: { params: Promise<{ token: string }> }) {
  await connection();
  const { token } = await params;
  const found = await workStore.findShare(token);
  if (!found) notFound();
  const lang = await getLang();
  const t = await getT();
  const lesson = getLesson(found.share.lessonId, lang);
  const versions = submissionsFor(await workStore.get(found.internId), found.share.lessonId);
  if (!lesson || !versions.length) notFound();
  const [latest, ...earlier] = versions;
  const fileHref = (id: string) => `/share/${token}/files/${id}`;
  return (
    <ShareShell>
      <PageHeader
        eyebrow={t["pages.share.eyebrow"](lesson.day, lesson.id)}
        title={lesson.title}
        lead={t["pages.share.lead"]}
      />
      <section className="gl-section" aria-labelledby="latest">
        <h2 id="latest" className="ob-h t-section-heading">
          {earlier.length ? t["pages.share.latestVersion"](latest!.version) : t["pages.share.submittedEvidence"]}
        </h2>
        <EvidenceView lesson={lesson} submission={latest!} fileHref={fileHref} />
      </section>
      {earlier.length ? (
        <section className="gl-section" aria-labelledby="earlier">
          <h2 id="earlier" className="ob-h t-section-heading">
            {t["pages.earlierVersions"]}
          </h2>
          {earlier.map((v) => (
            <details key={v.id} className="ob-card ob-card--outlined gl-version">
              <summary className="ob-h t-card-title">{t["pages.versionN"](v.version)}</summary>
              <EvidenceView lesson={lesson} submission={v} fileHref={fileHref} />
            </details>
          ))}
        </section>
      ) : null}
    </ShareShell>
  );
}
