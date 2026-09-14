"use client";

import type { JobMatch } from "../types";

type JobMatchCardProps = {
  job: JobMatch;
  onCompare: (job: JobMatch) => void;
};

function getMatchLabel(score: number): string {
  if (score >= 90) return "Excelente compatibilidade";
  if (score >= 80) return "Boa compatibilidade";
  if (score >= 60) return "Compatibilidade razoável";
  if (score >= 40) return "Baixa compatibilidade";

  return "Pouca compatibilidade";
}

export function JobMatchCard({
  job,
  onCompare,
}: JobMatchCardProps) {
  return (
    <article>
      <h2>{job.title}</h2>

      <section>
        <h3>Habilidades necessárias</h3>

        <p>{job.score}%</p>
        <p>{getMatchLabel(job.score)}</p>

        <div>
          {job.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.modality}</p>
      <p>{job.seniority}</p>
      <p>{job.description}</p>

      <button type="button" onClick={() => onCompare(job)}>
        Comparar
      </button>
    </article>
  );
}