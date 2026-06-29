"use client"

import { DashboardLayout } from "../components/layout/DashboardLayout";
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
    <DashboardLayout>
      <div className="flex w-full justify-center overflow-x-hidden px-8">
        <div className="w-[95%] max-w-[1350px]">
          <ActionButtons />

          <section className="mt-8 space-y-[10px]">
            {/* Primeira linha */}
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
              <div className="min-h-[310px] xl:col-span-5 [&>*]:h-full">
                <UploadZone />
              </div>
              <div className="min-h-[310px] xl:col-span-7 [&>*]:h-full">
                <ResumeStatus />
              </div>
            </div>

            {/* Segunda linha */}
            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
              <div className="[&>*]:h-full">
                <ExtractedInfo />
              </div>
              <div className="[&>*]:h-full">
                <SkillsList />
              </div>
              <div className="md:col-span-2 xl:col-span-1 [&>*]:h-full">
                <ExperienceList />
              </div>
            </div>

            {/* Terceira linha */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <AnalysisTips />
              </div>
              <div>
                <ScoreCard score={cvData?.score} />
              </div>
            </div>

            {/* Última linha */}
            <div>
              <NextSteps />
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}