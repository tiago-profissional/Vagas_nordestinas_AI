import { useCVStore } from "../store/useCVStore";
import Card from "../components/ui/Card";

export function ExtractedInfo() {
  const { cvData } = useCVStore();

  return (
    <Card variant="dashboard" className="overflow-hidden">
      <div className="flex h-full flex-col items-center">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3 self-start">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-lg text-yellow-600">
            👤
          </div>
          <h2 className="text-base font-bold text-gray-900 sm:text-lg">Informações extraídas</h2>
        </div>

        {/* Content — centralizado vertical e horizontal */}
        <div className="flex w-full flex-1 flex-col justify-center gap-4 sm:gap-5">
          <div className="mx-auto flex w-full max-w-[360px] flex-col gap-4 sm:gap-5">
            <InfoRow label="Nome" value={cvData?.name} />
            <InfoRow label="Email" value={cvData?.email} />
            <InfoRow label="Telefone" value={cvData?.phone} />
            <InfoRow label="Localização" value={cvData?.location} />
            <InfoRow label="Experiência Total" value={cvData?.totalExperience} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-center gap-4 sm:grid-cols-[130px_1fr]">
      <span className="text-sm font-bold text-gray-900 sm:text-[15px]">{label}</span>
      <span className="truncate text-sm font-medium text-gray-600 sm:text-[15px]">
        {value || "Não informado"}
      </span>
    </div>
  );
}