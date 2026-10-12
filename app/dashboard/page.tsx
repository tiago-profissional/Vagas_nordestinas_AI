"use client";

import ActionButtons from "./ActionButtons";
import { UploadZone } from "./UploadZone";
import { ResumeStatus } from "./ResumeStatus";
import { ExtractedInfo } from "./ExtractedInfo";
import { SkillsList } from "./SkillsList";
import { ExperienceList } from "./ExperienceList";
import { ScoreCard } from "./ScoreCard";
import { AnalysisTips } from "./AnalysisTips";
import { NextSteps } from "./NextSteps";

import { useCVStore } from "../store/useCVStore";

export default function DashboardPage() {
  const cvData = useCVStore((state) => state.cvData);

  return (
    <div className="vn-page vn-stack">
      <ActionButtons />

      {/* Primeira linha */}
      <div className="vn-grid vn-grid--split">
        <div className="vn-fill vn-fill--tall">
          <UploadZone />
        </div>

        <div className="vn-fill vn-fill--tall">
          <ResumeStatus />
        </div>
      </div>

      {/* Segunda linha */}
      <div className="vn-grid vn-grid--cards">
        <div className="vn-fill">
          <ExtractedInfo />
        </div>

        <div className="vn-fill">
          <SkillsList />
        </div>

        <div className="vn-fill vn-span-wide">
          <ExperienceList experiences={cvData?.experience} />
        </div>
      </div>

      {/* Terceira linha */}
      <div className="vn-grid vn-grid--2">
        <AnalysisTips />
        <ScoreCard score={cvData?.score} />
      </div>

      {/* Última linha */}
      <NextSteps />
    </div>
  );
}