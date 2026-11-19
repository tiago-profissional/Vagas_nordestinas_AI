import type { JobFilters, RankedJob } from "../data/types";

const API_URL = (
  process.env.NEXT_PUBLIC_AI_API_URL ?? "http://localhost:8001"
).replace(/\/$/, "");

export const EMPTY_FILTERS: JobFilters = {
  q: "",
  area: "",
  location: "",
  mode: "",
  seniority: "",
  contract: "",
  sort: "match",
};

interface JobsResponse {
  success: boolean;
  total: number;
  jobs: RankedJob[];
}

interface AreasResponse {
  success: boolean;
  areas: string[];
}

// Vagas filtradas e ordenadas pelo backend, já com score/matched/missing
export async function fetchRankedJobs(
  filters: JobFilters,
  signal?: AbortSignal,
): Promise<RankedJob[]> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value); // filtro vazio não vai na URL
  }

  const response = await fetch(`${API_URL}/api/jobs?${params.toString()}`, {
    signal,
  });
  if (!response.ok) throw new Error(`Erro ${response.status} ao buscar vagas`);

  const data: JobsResponse = await response.json();
  return data.jobs;
}

export async function fetchTop5Jobs(
  filters: JobFilters,
  resumeText: string,
  signal?: AbortSignal,
): Promise<RankedJob[]> {
  const response = await fetch(`${API_URL}/ai/match/top5`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      resume_text: resumeText,
      q: filters.q,
      area: filters.area,
      location: filters.location,
      mode: filters.mode,
      seniority: filters.seniority,
      contract: filters.contract,
    }),
  });
  if (!response.ok) throw new Error(`Erro ${response.status} ao buscar vagas`);

  const data: JobsResponse = await response.json();
  return data.jobs;
}

export interface SkillEvidence {
  skill: string;
  resume_excerpt: string;
  resume_source: string;
  job_excerpt: string;
  job_source: string;
}

export interface JobExplanation {
  score: number;
  matched_skills: SkillEvidence[];
  missing_gaps: string[];
}

export async function fetchJobExplanation(
  jobId: string,
  resumeText: string,
  signal?: AbortSignal,
): Promise<JobExplanation> {
  const response = await fetch(
    `${API_URL}/ai/match/${encodeURIComponent(jobId)}/explain`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify({ resume_text: resumeText }),
    },
  );
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao explicar compatibilidade`);
  }
  return response.json();
}

export async function fetchAreas(signal?: AbortSignal): Promise<string[]> {
  const response = await fetch(`${API_URL}/api/areas`, { signal });
  if (!response.ok) throw new Error(`Erro ${response.status} ao buscar áreas`);

  const data: AreasResponse = await response.json();
  return data.areas;
}

export interface ResumeSummary {
  skills: string[];
  experience: string;
  location: string;
}

// Currículo que o backend está usando para calcular os scores
export async function fetchResume(
  signal?: AbortSignal,
): Promise<ResumeSummary | null> {
  const response = await fetch(`${API_URL}/api/resume`, { signal });
  if (!response.ok) throw new Error(`Erro ${response.status} ao buscar currículo`);

  const data: { success: boolean; resume: ResumeSummary | null } =
    await response.json();
  return data.resume;
}