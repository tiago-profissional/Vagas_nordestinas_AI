import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchJob } from "../../lib/githubJobs";

type JobDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const jobId = Number(id);

  if (!Number.isInteger(jobId) || jobId <= 0) notFound();

  const job = await fetchJob(jobId).catch(() => null);
  if (!job) notFound();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>
      <Link href="/jobs">← Voltar para as vagas</Link>

      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "16px 0 4px" }}>{job.title}</h1>
      <p style={{ opacity: 0.8 }}>
        {job.workModel} · {job.seniority}
      </p>

      {job.skills.length > 0 && (
        <p style={{ margin: "12px 0" }}>{job.skills.join(" • ")}</p>
      )}

      {job.description && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "inherit",
            lineHeight: 1.6,
            margin: "16px 0",
          }}
        >
          {job.description}
        </pre>
      )}

      <a href={job.url} target="_blank" rel="noopener noreferrer">
        Ver vaga original no GitHub →
      </a>
    </main>
  );
}
