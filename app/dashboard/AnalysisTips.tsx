"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useCVStore } from "../store/useCVStore";
import Card from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";

type Tip = {
  text: string;
  status: string;
};

function TipList({ tips, clamp = false }: { tips: Tip[]; clamp?: boolean }) {
  return (
    <ul className={`vn-tip-list ${clamp ? "vn-tip-list--clamp" : ""}`}>
      {tips.map((tip) => (
        <li key={tip.text} className="vn-tip">
          <span
            aria-hidden="true"
            className={`vn-tip__icon ${
              tip.status === "success"
                ? "vn-tip__icon--success"
                : "vn-tip__icon--warning"
            }`}
          >
            {tip.status === "success" ? "✓" : "!"}
          </span>

          <p className="vn-tip__text">{tip.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function AnalysisTips() {
  const { hasCV, cvData } = useCVStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasAnalysis = hasCV && !!cvData;

  return (
    <>
      <Card variant="dashboard" className="vn-card--clip">
        <div className="vn-card-body">
          <div className="vn-card-heading">
            <div className="vn-card-icon vn-card-icon--round" aria-hidden="true">
              <Sparkles size={20} />
            </div>

            <h2 className="vn-card-title">Análise da IA</h2>
          </div>

          {!hasAnalysis ? (
            <p className="vn-empty">
              Envie seu currículo para receber uma análise completa com
              insights e recomendações personalizadas.
            </p>
          ) : (
            <div className="vn-card-content vn-card-content--top">
              <div>
                <h3 className="vn-tip-title">
                  Seu currículo está bem estruturado, mas pode melhorar:
                </h3>

                <TipList tips={cvData.aiAnalysis} clamp />
              </div>
            </div>
          )}

          <button
            type="button"
            className="vn-link-arrow"
            disabled={!hasAnalysis}
            onClick={() => setIsModalOpen(true)}
          >
            Ver dicas detalhadas
          </button>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen && hasAnalysis}
        title="Análise da IA"
        onClose={() => setIsModalOpen(false)}
      >
        <h3 className="vn-tip-title">
          Seu currículo está bem estruturado, mas pode melhorar:
        </h3>

        {cvData && <TipList tips={cvData.aiAnalysis} />}
      </Modal>
    </>
  );
}