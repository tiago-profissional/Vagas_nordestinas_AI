// Busca as vagas direto do GitHub (backend-br/vagas), sem banco de dados.
// Funciona na Vercel: nada de localhost/MySQL.

const REPO = "backend-br/vagas";
const META_LABELS = ["PJ", "CLT", "Remoto", "Presencial", "Híbrido", "Júnior", "Pleno", "Sênior"];

export type Job = {
  id: number;
  title: string;
  url: string;
  skills: string[];
  workModel: string;
  seniority: string;
  postedBy: string | null;
  postedAt: string;
  description: string | null;
};

type GithubLabel = { name: string };

type GithubIssue = {
  number: number;
  title: string;
  html_url: string;
  labels?: GithubLabel[];
  user?: { login: string } | null;
  created_at: string;
  body?: string | null;
  pull_request?: unknown;
};

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "vagas-nordestinas-app",
  };
  // Opcional: aumenta o limite da API do GitHub (60/h sem token).
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

function cleanTitle(title: string): string {
  return title.replace(/^\[.*?\]\s*/, "").trim() || title;
}

function pick(names: string[], options: string[], fallback: string): string {
  return options.find((option) => names.includes(option)) ?? fallback;
}

function toJob(issue: GithubIssue): Job {
  const names = (issue.labels ?? []).map((label) => label.name);

  return {
    id: issue.number,
    title: cleanTitle(issue.title),
    url: issue.html_url,
    skills: names.filter((name) => !META_LABELS.includes(name)),
    workModel: pick(names, ["Remoto", "Presencial", "Híbrido"], "Não informado"),
    seniority: pick(names, ["Sênior", "Pleno", "Júnior"], "Não informado"),
    postedBy: issue.user?.login ?? null,
    postedAt: issue.created_at,
    description: issue.body ?? null,
  };
}

export async function fetchJobs(perPage = 30, page = 1): Promise<Job[]> {
  const size = Math.min(Math.max(perPage, 1), 100);
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/issues?state=open&per_page=${size}&page=${page}`,
    { headers: githubHeaders(), next: { revalidate: 600 } }
  );

  if (!res.ok) {
    throw new Error(`GitHub respondeu ${res.status}`);
  }

  const issues: GithubIssue[] = await res.json();
  return issues.filter((issue) => !issue.pull_request).map(toJob);
}

export async function fetchJob(id: number): Promise<Job | null> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/issues/${id}`, {
    headers: githubHeaders(),
    next: { revalidate: 600 },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub respondeu ${res.status}`);
  }

  const issue: GithubIssue = await res.json();
  return issue.pull_request ? null : toJob(issue);
}
