"use client";

import { useCVStore } from "../store/useCVStore";
import Card from "../components/ui/Card";

export function ExtractedInfo() {
  const { cvData } = useCVStore();

  return (
    <Card variant="dashboard" className="vn-card--clip">
      <div className="vn-card-body">
        <div className="vn-card-heading">
          <div className="vn-card-icon vn-card-icon--round" aria-hidden="true">
            👤
          </div>

          <h2 className="vn-card-title">Informações extraídas</h2>
        </div>

        <div className="vn-card-content">
          <dl className="vn-info-list vn-info-list--narrow">
            <InfoRow label="Nome" value={cvData?.name} />
            <InfoRow label="Email" value={cvData?.email} />
            <InfoRow label="Telefone" value={cvData?.phone} />
            <InfoRow label="Localização" value={cvData?.location} />
            <InfoRow label="Experiência Total" value={cvData?.totalExperience} />
          </dl>
        </div>
      </div>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <>
      <dt>{label}</dt>
      <dd title={value || undefined}>{value || "Não informado"}</dd>
    </>
  );
}