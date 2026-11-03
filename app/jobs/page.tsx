import Link from "next/link";
import { fetchJobs } from "../lib/githubJobs";

export const metadata = { title: "Vagas | Vagas Nordestinas" };

// Renderiza a cada acesso; o fetch das vagas continua em cache de 10 min (ver githubJobs.ts).
export const dynamic = "force-dynamic";

export default async function JobsPage() {
  let jobs: Awaited<ReturnType<typeof fetchJobs>> = [];
  let failed = false;

  try {
    jobs = await fetchJobs(30);
  } catch {
    failed = true;
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Vagas</h1>
      <p style={{ opacity: 0.75, marginBottom: 24 }}>
        Vagas abertas de tecnologia, atualizadas a cada 10 minutos.
      </p>

      {failed && (
        <p role="alert">Não foi possível carregar as vagas agora. Tente novamente em instantes.</p>
      )}

      {!failed && jobs.length === 0 && <p>Nenhuma vaga encontrada.</p>}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {jobs.map((job) => (
          <li key={job.id}>
            <Link
              href={`/jobs/${job.id}`}
              style={{
                display: "block",
                padding: 16,
                border: "1px solid rgb(25 24 21 / 15%)",
                borderRadius: 12,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <strong style={{ display: "block", fontSize: 17 }}>{job.title}</strong>
              <span style={{ fontSize: 14, opacity: 0.8 }}>
                {job.workModel} · {job.seniority}
              </span>
              {job.skills.length > 0 && (
                <span style={{ display: "block", marginTop: 8, fontSize: 13 }}>
                  {job.skills.slice(0, 8).join(" • ")}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
