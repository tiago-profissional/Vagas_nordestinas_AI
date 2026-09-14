import type { JobMatch } from "../types";

 

export const mockJobs: JobMatch[] = [
  {
    id: 1,
    title: "Desenvolvedor Front-end Pleno",
    company: "TechSoft Solutions",
    location: "Recife, PE",
    modality: "Híbrido",
    seniority: "Pleno",
    skills: ["React", "TypeScript", "Next.js", "SASS"],
    description:
      "Buscamos um desenvolvedor front-end para atuar em aplicações web modernas com foco em performance e experiência do usuário.",
    score: 92,
  },
  {
    id: 2,
    title: "Desenvolvedor Back-end Node.js",
    company: "Numberella Tech",
    location: "Fortaleza, CE",
    modality: "Remoto",
    seniority: "Pleno",
    skills: ["Node.js", "TypeScript", "PostgreSQL", "AWS"],
    description:
      "Desenvolva APIs escaláveis e integrações robustas em um ambiente ágil e colaborativo.",
    score: 78,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Agilize Digital",
    location: "Salvador, BA",
    modality: "Híbrido",
    seniority: "Sênior",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    description:
      "Atuação full stack em projetos desafiadores com autonomia para propor soluções técnicas.",
    score: 62,
  },
  {
    id: 4,
    title: "Desenvolvedor Front-end React",
    company: "BlueWave Sistemas",
    location: "Recife, PE",
    modality: "Presencial",
    seniority: "Júnior",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    description:
      "Vaga para desenvolvimento front-end com foco em React e crescimento profissional.",
    score: 56,
  },
];