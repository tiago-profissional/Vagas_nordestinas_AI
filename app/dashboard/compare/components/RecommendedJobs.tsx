"use client";

import { JobMatchCard } from "./JobMatchCard";
import type { JobMatch } from "../types";

type RecommendedJobsProps = {
  jobs: JobMatch[];
};

export function RecommendedJobs({ jobs }: RecommendedJobsProps) {
  return (
    <section>
      <div className="vn-card-heading">
        <div className="vn-card-icon vn-card-icon--round" aria-hidden="true">⭐</div>

        <h2 className="vn-card-title vn-card-title--lg">
          Vagas recomendadas para comparar
        </h2>

        <span className="vn-badge vn-badge--neutral">{jobs.length} resultados</span>
      </div>

      <div className="cmp-carousel small-scrollbar">
        {jobs.map((job) => (
          <div key={job.id} className="cmp-carousel__item">
            <JobMatchCard
              job={job}
              onCompare={(selectedJob) => {
                console.log(selectedJob);
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}