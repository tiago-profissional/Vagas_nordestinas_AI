"use client";

import type { RankedJob } from "../data/types";

type JobMatchCardProps = {
  job: RankedJob;
  onCompare: (job: RankedJob) => void;
};

function getMatchLabel(score: number): string {
  if (score >= 90) return "Excelente compatibilidade";
  if (score >= 80) return "Boa compatibilidade";
  if (score >= 60) return "Compatibilidade razoável";
  if (score >= 40) return "Baixa compatibilidade";

  return "Pouca compatibilidade";
}

export function JobMatchCard({ job, onCompare }: JobMatchCardProps) {
  const { job: details, score } = job;
  const location = [details.city, details.state].filter(Boolean).join(", ");

  return (
    <article className="vn-card cmp-job">
      <header>
        <h3 className="vn-card-title">{details.title}</h3>
        <p className="cmp-job__company">{details.company}</p>
      </header>

      <div className="cmp-job__score">
        <div className="cmp-job__score-row">
          <p className="vn-score">{score}%</p>
          <p className="cmp-job__score-label">{getMatchLabel(score)}</p>
        </div>

        <div
          className="vn-bar vn-bar--sm"
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Compatibilidade com o seu currículo"
        >
          <span style={{ width: `${score}%` }} />
        </div>
      </div>

      <div className="cmp-job__meta">
        <p>📍 {location || "Local não informado"}</p>
        <p>💼 {details.mode} · {details.seniority}</p>
      </div>

      <p className="cmp-job__description">{details.description}</p>

      <section className="cmp-job__skills">
        <h4 className="cmp-job__skills-title">Habilidades necessárias</h4>

        <div className="cmp-job__chips">
          {details.skills.map((skill) => (
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