"use client";

import { useEffect, useState } from "react";
import { ResumeSummaryCard } from "./components/ResumeSummaryCard";
import { FiltersCard } from "./components/FiltersCard";
import { RecommendedJobs } from "./components/RecommendedJobs";
import { NextStepCard } from "./components/NextStepCard";
import type { JobFilters, RankedJob } from "./data/types";
import {
  EMPTY_FILTERS,
  fetchAreas,
  fetchJobExplanation,
  fetchResume,
  fetchTop5Jobs,
  type JobExplanation,
  type ResumeSummary,
} from "./lib/api";

export default function ComparePage() {
  const [filters, setFilters] = useState<JobFilters>(EMPTY_FILTERS);
  const [ranked, setRanked] = useState<RankedJob[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [resume, setResume] = useState<ResumeSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<JobExplanation | null>(null);
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);

  const resumeText = [
    resume?.skills.join(", "),
    resume?.experience,
  ]
    .filter(Boolean)
    .join("\n");

  // Áreas do filtro e currículo: buscam uma vez
  useEffect(() => {
    const controller = new AbortController();
    fetchAreas(controller.signal)
      .then(setAreas)
      .catch(() => {});
    fetchResume(controller.signal)
      .then(setResume)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  // Vagas: busca a cada mudança de filtro (com 300 ms de espera ao digitar)
  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        setRanked(await fetchTop5Jobs(filters, resumeText, controller.signal));
      } catch {
        if (controller.signal.aborted) return;
        setError(
          "Não foi possível carregar as vagas. Verifique se o backend está rodando.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [filters, resumeText]);

  const updateFilters = (patch: Partial<JobFilters>) =>
    setFilters((current) => ({ ...current, ...patch }));

  async function selectJob(jobId: string) {
    setSelectedJobId(jobId);
    setExplanation(null);
    setExplanationError(null);
    setExplanationLoading(true);
    try {
      setExplanation(await fetchJobExplanation(jobId, resumeText));
    } catch {
      setExplanationError("Não foi possível carregar as evidências desta vaga.");
    } finally {
      setExplanationLoading(false);
    }
  }

  return (
    <>
      <header>
        <h1 className="vn-title">Comparar currículo com vaga</h1>

        <p className="vn-description">
          Escolha uma vaga para analisar a compatibilidade com seu currículo.
        </p>
      </header>

      <ResumeSummaryCard
        skillsCount={resume?.skills.length ?? 0}
        experience={resume?.experience || "Não informado"}
        location={resume?.location || "Não informado"}
      />

      <FiltersCard
        filters={filters}
        areas={areas}
        onChange={updateFilters}
        onClear={() => setFilters(EMPTY_FILTERS)}
      />

      {error && (
        <p role="alert" className="cmp-next__text">
          {error}
        </p>
      )}
      {loading && !error && <p className="cmp-next__text">Carregando vagas...</p>}

      {!(loading && ranked.length === 0) && (
        <RecommendedJobs ranked={ranked} onSelect={selectJob} />
      )}

      {selectedJobId && (
        <section className="vn-card cmp-card" aria-live="polite">
          <h2 className="vn-card-heading">Evidências da compatibilidade</h2>
          {explanationLoading && <p>Carregando explicação...</p>}
          {explanationError && <p role="alert">{explanationError}</p>}
          {explanation && (
            <>
              <p>Score baseado em evidências: {explanation.score}%</p>
              {explanation.matched_skills.map((evidence) => (
                <article key={evidence.skill}>
                  <h3>{evidence.skill}</h3>
                  <p>
                    Currículo ({evidence.resume_source}): “
                    {evidence.resume_excerpt}”
                  </p>
                  <p>
                    Vaga ({evidence.job_source}): “{evidence.job_excerpt}”
                  </p>
                </article>
              ))}
              {explanation.missing_gaps.length > 0 && (
                <div>
                  <h3>Não encontrado no texto informado</h3>
                  <ul>
                    {explanation.missing_gaps.map((gap) => (
                      <li key={gap}>{gap}</li>
                    ))}
                  </ul>
                  <p>Isso não significa que você não saiba essas habilidades.</p>
                </div>
              )}
            </>
          )}
        </section>
      )}

      <NextStepCard />
    </>
  );
}