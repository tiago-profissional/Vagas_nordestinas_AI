export type WorkMode = "remoto" | "hibrido" | "presencial" | "nao_informado";
export type Seniority = "junior" | "pleno" | "senior" | "nao_informado";
export type Contract = "clt" | "pj" | "estagio" | "nao_informado";

export interface Job {
  id: string;
  title: string;
  company: string;
  city: string;
  state: string;
  area: string;
  mode: WorkMode;
  seniority: Seniority;
  contract: Contract;
  skills: string[];
  description: string;
  url?: string;
}

export interface JobFilters {
  q: string;
  area: string; // "" = todas
  location: string;
  mode: WorkMode | "";
  seniority: Seniority | "";
  contract: Contract | "";
  sort: "match" | "recentes";
}

export interface Resume {
  skills: string[];
  experience: string;
  location: string;
}

export interface RankedJob {
  job: Job;
  score: number; // 0 a 100
  matched: string[];
  missing: string[];
}