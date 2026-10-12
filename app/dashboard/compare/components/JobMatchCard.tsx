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

export function JobMatchCard({ job, onCompare }: JobMatchCardProps) {
  return (
    <article className="vn-card cmp-job">
      <header>
        <h3 className="vn-card-title">{job.title}</h3>
        <p className="cmp-job__company">{job.company}</p>
      </header>

      <div className="cmp-job__score">
        <div className="cmp-job__score-row">
          <p className="vn-score">{job.score}%</p>
          <p className="cmp-job__score-label">{getMatchLabel(job.score)}</p>
        </div>

        <div
          className="vn-bar vn-bar--sm"
          role="progressbar"
          aria-valuenow={job.score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Compatibilidade com o seu currículo"
        >
          <span style={{ width: `${job.score}%` }} />
        </div>
      </div>

      <div className="cmp-job__meta">
        <p>📍 {job.location}</p>
        <p>💼 {job.modality} · {job.seniority}</p>
      </div>

      <p className="cmp-job__description">{job.description}</p>

      <section className="cmp-job__skills">
        <h4 className="cmp-job__skills-title">Habilidades necessárias</h4>

        <div className="cmp-job__chips">
          {job.skills.map((skill) => (
            <span key={skill} className="vn-tag vn-tag--soft">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <button
        type="button"
        className="vn-button vn-button--primary vn-button--block cmp-job__action"
        onClick={() => onCompare(job)}
      >
        Comparar
      </button>
    </article>
  );
}