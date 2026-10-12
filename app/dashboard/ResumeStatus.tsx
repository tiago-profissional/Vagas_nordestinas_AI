"use client";

import { FileText } from "lucide-react";
import { useCVStore } from "../store/useCVStore";

export function ResumeStatus() {
  const { hasCV, cvData } = useCVStore();

  return (
    <section className="vn-card vn-state">
      <div className="vn-card-icon vn-card-icon--lg" aria-hidden="true">
        <FileText size={32} strokeWidth={2.3} />
      </div>

      {!hasCV || !cvData ? (
        <>
          <h2 className="vn-card-title vn-card-title--lg">
            Nenhum currículo enviado ainda
          </h2>

          <p className="vn-description">
            Envie seu currículo para receber análises personalizadas e
            recomendações.
          </p>
        </>
      ) : (
        <>
          <h2 className="vn-card-title vn-card-title--lg">
            Currículo analisado com sucesso ✓
          </h2>

          <p className="vn-description">
            Boas-vindas, {cvData.name}! Sua análise está pronta — confira as
            informações, skills e recomendações abaixo.
          </p>
        </>
      )}
    </section>
  );
}