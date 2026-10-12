"use client";

import { useState } from "react";
import { BriefcaseBusiness } from "lucide-react";
import Card from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";

type Experience = {
  title?: string;
  company?: string;
  period?: string;
  description?: string;
};

type ExperienceListProps = {
  experiences?: Experience[] | null;
};

export function ExperienceList({ experiences = [] }: ExperienceListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const experienceList = experiences ?? [];
  const totalExperiences = experienceList.length;
  const visibleExperiences = experienceList.slice(0, 2);

  return (
    <>
      <Card variant="dashboard" className="vn-card--clip">
        <div className="vn-card-body">
          <div className="vn-card-heading">
            <div className="vn-card-icon vn-card-icon--round" aria-hidden="true">
              <BriefcaseBusiness size={22} />
            </div>

            <h2 className="vn-card-title">Experiência detectada</h2>
          </div>

          <div className="vn-card-content">
            {totalExperiences === 0 ? (
              <p className="vn-empty">
                Envie seu currículo para visualizar suas experiências.
              </p>
            ) : (
              <ul className="vn-timeline">
                {visibleExperiences.map((experience, index) => (
                  <li
                    key={`${experience.title}-${experience.company}-${index}`}
                    className="vn-timeline__item"
                  >
                    <span className="vn-timeline__dot" aria-hidden="true" />

                    <div className="vn-timeline__body">
                      <h3 className="vn-timeline__title">
                        {experience.title || "Cargo não informado"}
                      </h3>

                      <p className="vn-timeline__company">
                        {experience.company || "Empresa não informada"}
                      </p>

                      <div className="vn-timeline__meta">
                        <span>{experience.period || "Período não informado"}</span>

                        {index === 0 && (
                          <span className="vn-badge vn-badge--success">Atual</span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            className="vn-link-arrow"
            disabled={totalExperiences === 0}
            onClick={() => setIsModalOpen(true)}
          >
            Ver todas as experiências ({totalExperiences})
          </button>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={`Experiências profissionais (${totalExperiences})`}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="vn-stack">
          {experienceList.map((experience, index) => (
            <article
              key={`${experience.title}-${experience.company}-${index}`}
              className="vn-entry"
            >
              <div className="vn-entry__head">
                <div>
                  <h3 className="vn-subtitle">
                    {experience.title || "Cargo não informado"}
                  </h3>

                  <p className="vn-muted">
                    {experience.company || "Empresa não informada"}
                  </p>
                </div>

                <div className="vn-timeline__meta">
                  <span>{experience.period || "Período não informado"}</span>

                  {index === 0 && (
                    <span className="vn-badge vn-badge--success">Atual</span>
                  )}
                </div>
              </div>

              {experience.description && (
                <p className="vn-text">{experience.description}</p>
              )}
            </article>
          ))}
        </div>
      </Modal>
    </>
  );
}