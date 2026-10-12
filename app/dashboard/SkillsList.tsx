"use client";

import { useState } from "react";
import { Code2 } from "lucide-react";
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
      <Card variant="dashboard" className="vn-card--clip">
        <div className="vn-card-body">
          <div className="vn-card-heading">
            <div className="vn-card-icon vn-card-icon--round" aria-hidden="true">
              <Code2 size={20} />
            </div>

            <h2 className="vn-card-title">Skills detectadas</h2>
          </div>

          <div className="vn-card-content">
            {!hasCV || !cvData ? (
              <p className="vn-empty">
                Envie seu currículo para ver as skills detectadas.
              </p>
            ) : (
              <div className="vn-tags vn-tags--center">
                {visibleSkills.map((skill) => (
                  <span key={skill} className="vn-tag vn-tag--soft">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="vn-link-arrow"
            disabled={totalSkills === 0}
            onClick={() => setIsModalOpen(true)}
          >
            Ver todas as skills ({totalSkills})
          </button>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={`Todas as skills detectadas (${totalSkills})`}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="vn-tags vn-tags--lg">
          {skills.map((skill) => (
            <span key={skill} className="vn-tag vn-tag--lg">
              {skill}
            </span>
          ))}
        </div>
      </Modal>
    </>
  );
}