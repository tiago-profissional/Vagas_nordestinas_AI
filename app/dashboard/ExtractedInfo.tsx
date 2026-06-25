import { useCVStore } from "../store/useCVStore";
import Card from "../components/ui/Card";

export function ExtractedInfo() {
  const { cvData } = useCVStore();

  return (
    <Card variant="dashboard" className="overflow-hidden">
      <div className="grid h-full grid-rows-[auto_1fr]" style={{ marginLeft: "10px" }}>
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-lg text-yellow-600">
            👤
          </div>
          <h2 className="text-[18px] font-bold text-gray-900">Informações extraídas</h2>
        </div>

        {/* Content */}
        <div className="grid content-center gap-5">
          <InfoRow label="Nome" value={cvData?.name} />
          <InfoRow label="Email" value={cvData?.email} />
          <InfoRow label="Telefone" value={cvData?.phone} />
          <InfoRow label="Localização" value={cvData?.location} />
          <InfoRow label="Experiência Total" value={cvData?.totalExperience} />
        </div>
      </div>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-center gap-5">
      <span className="text-[15px] font-bold text-gray-900">{label}</span>
      <span className="truncate text-[15px] font-medium text-gray-600">
        {value || "Não informado"}
      </span>
    </div>
  );
}