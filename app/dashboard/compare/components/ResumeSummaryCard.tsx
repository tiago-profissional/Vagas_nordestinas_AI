import Card from "@/app/components/ui/Card";
import { mockResume } from "../data/mockResume";

type ResumeMetricProps = {
  icon: string;
  label: string;
  value: string;
};

export function ResumeSummaryCard() {
  const skillsCount = mockResume.skills.length;

  const skillsText = `${skillsCount} ${
    skillsCount === 1 ? "habilidade" : "habilidades"
  }`;

  return (
    <Card className="h-auto min-h-0 rounded-2xl border-yellow-200 px-5 py-5 lg:px-6 lg:py-5">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-yellow-300 bg-yellow-50 text-2xl">
            📄
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Seu currículo atual
            </h2>

            <span className="mt-2 inline-flex rounded-md bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Currículo pronto para comparação
            </span>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-3 xl:max-w-2xl">
          <ResumeMetric
            icon="🧩"
            label="Skills detectadas"
            value={skillsText}
          />

          <ResumeMetric
            icon="⏱️"
            label="Experiência total"
            value={mockResume.experience}
          />

          <ResumeMetric
            icon="📍"
            label="Localização"
            value={mockResume.location}
          />
        </div>

        <button
          type="button"
          className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
        >
          Ver detalhes do currículo
        </button>
      </div>
    </Card>
  );
}

function ResumeMetric({ icon, label, value }: ResumeMetricProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </div>
  );
}