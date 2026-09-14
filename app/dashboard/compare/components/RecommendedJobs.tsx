"use client";

import { JobMatchCard } from "./JobMatchCard";
import type { JobMatch } from "../types";

type RecommendedJobsProps = {
  jobs: JobMatch[];
};

export function RecommendedJobs({
  jobs,
}: RecommendedJobsProps) {
  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50 text-xl">
          ⭐
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Vagas recomendadas para comparar
        </h2>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
          {jobs.length} resultados
        </span>
      </div>

      <div className="small-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="min-w-[280px] max-w-[320px] flex-none snap-start"
          >
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