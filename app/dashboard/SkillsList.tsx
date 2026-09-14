"use client";

import { useState } from "react";
import { useCVStore } from "../store/useCVStore";
import Card from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";

export function SkillsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasCV, cvData } = useCVStore();

  const skills = cvData?.skills ?? [];
  const totalSkills = skills.length;
  const visibleSkills = skills.slice(0, 15);

  return (
    <>
      <Card variant="dashboard" className="overflow-hidden">
        <div className="flex h-full w-full flex-col">
          {/* Header */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-sm font-bold text-yellow-600">
              {"</>"}
            </div>

            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              Skills detectadas
            </h2>
          </div>

          {/* Middle */}
          <div className="flex flex-1 items-center justify-center">
            {!hasCV || !cvData ? (
              <p className="px-2 text-center text-sm text-gray-400 sm:text-[15px]">
                Envie seu currículo para ver as skills detectadas.
              </p>
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {visibleSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center justify-center rounded-full bg-yellow-50 px-3 py-1 text-center text-xs font-semibold leading-snug text-yellow-700 sm:text-[13px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-6 flex w-full items-center justify-between gap-2">
            <button
              type="button"
              disabled={totalSkills === 0}
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-semibold text-yellow-600 transition hover:text-yellow-700 disabled:cursor-not-allowed disabled:text-gray-400 sm:text-[15px]"
            >
              Ver todas as skills ({totalSkills})
            </button>

            <button
              type="button"
              disabled={totalSkills === 0}
              onClick={() => setIsModalOpen(true)}
              aria-label="Ver todas as skills"
              className="shrink-0 text-lg text-yellow-500 transition hover:translate-x-1 disabled:text-gray-300"
            >
              →
            </button>
          </footer>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={`Todas as skills detectadas (${totalSkills})`}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </Modal>
    </>
  );
}