"use client";

import { useState } from "react";
import { Target } from "lucide-react";
import Card from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";

type ScoreCardProps = {
  score: number | null | undefined;
};

export function ScoreCard({ score }: ScoreCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card variant="dashboard" className="vn-card--clip">
        <div className="vn-card-body">
          <div className="vn-card-heading">
            <div className="vn-card-icon vn-card-icon--round" aria-hidden="true">
              <Target size={22} />
            </div>

            <h2 className="vn-card-title">Score do currículo</h2>
          </div>

          {score !== null && score !== undefined ? (
            <div className="vn-score-panel">
              <div className="vn-score-body">
                <div className="vn-ring">
                  <div>
                    <p className="vn-ring__value">{score}</p>
                    <p className="vn-ring__max">/100</p>
                  </div>
                </div>

                <div className="vn-score-text">
                  <h3 className="vn-subtitle">Bom trabalho! 🎉</h3>

                  <p className="vn-text">
                    Seu currículo está acima da média, mas ainda tem espaço
                    para melhorias significativas.
                  </p>

                  <button
                    type="button"
                    className="vn-link"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Entenda sua pontuação
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="vn-empty">
              Envie seu currículo para ver seu score e áreas de melhoria.
            </p>
          )}
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        title="Como sua pontuação foi calculada"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="vn-stack">
          <div className="vn-panel">
            <p className="vn-muted">Sua pontuação atual</p>
            <p className="vn-panel__value">{score ?? 0}/100</p>
          </div>

          <section>
            <h3 className="vn-subtitle">O que foi analisado</h3>

            <ul className="vn-bullets">
              <li>• Estrutura e organização do currículo</li>
              <li>• Clareza das experiências profissionais</li>
              <li>• Quantidade e relevância das skills</li>
              <li>• Uso de palavras-chave técnicas</li>
              <li>• Resultados e conquistas apresentados</li>
              <li>• Consistência das datas e informações</li>
            </ul>
          </section>

          <section className="vn-stack vn-stack--sm">
            <h3 className="vn-subtitle">Como melhorar sua pontuação</h3>

            <p className="vn-text">
              Adicione resultados mensuráveis às experiências, revise datas,
              destaque tecnologias relevantes e adapte o currículo para cada
              vaga.
            </p>
          </section>
        </div>
      </Modal>
    </>
  );
}