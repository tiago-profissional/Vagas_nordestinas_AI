"use client";

import { ResumeSummaryCard } from "./components/ResumeSummaryCard";
import { FiltersCard } from "./components/FiltersCard";
import { RecommendedJobs } from "./components/RecommendedJobs";
import { NextStepCard } from "./components/NextStepCard";
import { mockJobs } from "./data/mockJobs";
import { mockResume } from "./data/mockResume";

export default function ComparePage() {
  return (
    <>
      <header>
        <h1 className="vn-title">Comparar currículo com vaga</h1>

        <p className="vn-description">
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
    </>
  );
}