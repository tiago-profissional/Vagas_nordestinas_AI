import type { Contract, Seniority, WorkMode } from "./types";

export const WORK_MODE_LABEL: Record<WorkMode, string> = {
  remoto: "Remoto",
  hibrido: "Híbrido",
  presencial: "Presencial",
  nao_informado: "Não informado",
};

export const SENIORITY_LABEL: Record<Seniority, string> = {
  junior: "Júnior",
  pleno: "Pleno",
  senior: "Sênior",
  nao_informado: "Não informado",
};

export const CONTRACT_LABEL: Record<Contract, string> = {
  clt: "CLT",
  pj: "PJ",
  estagio: "Estágio",
  nao_informado: "Não informado",
};

export const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);