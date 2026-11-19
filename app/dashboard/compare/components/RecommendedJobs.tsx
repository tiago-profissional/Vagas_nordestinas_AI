"use client";

import type { RankedJob } from "../data/types";
import {
  CONTRACT_LABEL,
  SENIORITY_LABEL,
  WORK_MODE_LABEL,
} from "../data/jobLabels";
import {
  cardClass,
  chipClass,
  mutedChipClass,
  primaryButtonClass,
  sectionTitleClass,
} from "../data/styles";

interface Props {
  ranked: RankedJob[];
  onSelect?: (jobId: string) => void;
}

export function RecommendedJobs({ ranked, onSelect }: Props) {
  return (
    <section className={`${cardClass} cmp-card`}>
      <h2 className={`${sectionTitleClass} vn-card-heading`}>
        Vagas recomendadas ({ranked.length}{" "}
        {ranked.length === 1 ? "resultado" : "resultados"})
      </h2>

      {ranked.length === 0 ? (
        <p className="cmp-next__text">
          Nenhuma vaga encontrada com esses filtros.
        </p>
      ) : (
        <div className="cmp-carousel">
          {ranked.map(({ job, score, matched, missing }) => (
            <div key={job.id} className="cmp-carousel__item">
              <article className={`${cardClass} cmp-job`}>
                <h3 className="font-bold">{job.title}</h3>
                <p className="cmp-job__company">{job.company}</p>

                <div className="cmp-job__score">
                  <div className="cmp-job__score-row">
                    <span className="cmp-job__score-label">
                      Compatibilidade
                    </span>
                    <strong>{score}%</strong>
                  </div>
                  <progress
                    className="w-full accent-[#EA7805]"
                    value={score}
                    max={100}
                    aria-label={`Compatibilidade de ${score}%`}
                  />
                </div>

                <div className="cmp-job__meta">
                  <span>
                    {[job.city, job.state].filter(Boolean).join(", ") ||
                      "Local não informado"}
                  </span>
                  <span>
                    {WORK_MODE_LABEL[job.mode]} · {SENIORITY_LABEL[job.seniority]}{" "}
                    · {CONTRACT_LABEL[job.contract]}
                  </span>
                </div>

                <p className="cmp-job__description">{job.description}</p>

                <div className="cmp-job__skills">
                  <p className="cmp-job__skills-title">Skills</p>
                  <div className="cmp-job__chips">
                    {matched.map((skill) => (
                      <span key={skill} className={chipClass}>
                        {skill}
                      </span>
                    ))}
                    {missing.map((skill) => (
                      <span key={skill} className={mutedChipClass}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className={`${primaryButtonClass} cmp-job__action`}
                  onClick={() => onSelect?.(job.id)}
                >
                  Analisar compatibilidade
                </button>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}