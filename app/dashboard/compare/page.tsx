"use client";

import { ResumeSummaryCard } from "./components/ResumeSummaryCard";
import { FiltersCard } from "./components/FiltersCard";
import { RecommendedJobs } from "./components/RecommendedJobs";
import { NextStepCard } from "./components/NextStepCard";
import { mockJobs } from "./data/mockJobs";
import { mockResume } from "./data/mockResume";

export default function ComparePage() {
  return (
    <div className="mx-auto w-[95%] max-w-[1450px] space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white">
          Comparar currículo com vaga
        </h1>

        <p className="mt-2 text-gray-400">
          Escolha uma vaga para analisar a compatibilidade com seu currículo.
        </p>
      </header>

      <ResumeSummaryCard
        skillsCount={mockResume.skills.length}
        experience={mockResume.experience}
        location={mockResume.location}
      />

      <FiltersCard />

      <RecommendedJobs jobs={mockJobs} />

      <NextStepCard />
    </div>
  );
}