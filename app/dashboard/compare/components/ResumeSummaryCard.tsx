import Card from "@/app/components/ui/Card";

type ResumeSummaryCardProps = {
  skillsCount: number;
  experience: string;
  location: string;
};

type ResumeMetricProps = {
  icon: string;
  label: string;
  value: string;
};

export function ResumeSummaryCard({
  skillsCount,
  experience,
  location,
}: ResumeSummaryCardProps) {
  const skillsText = `${skillsCount} ${
    skillsCount === 1 ? "habilidade" : "habilidades"
  }`;

  return (
    <Card className="h-auto min-h-0 rounded-2xl border-[var(--border-medium)] bg-[var(--surface)] px-5 py-5 lg:px-6 lg:py-5">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--brand-yellow)] bg-[var(--primary-10)] text-2xl">
            📄
          </div>

          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
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
            value={experience}
          />

          <ResumeMetric
            icon="📍"
            label="Localização"
            value={location}
          />
        </div>

        <button
          type="button"
          className="rounded-xl border border-[var(--border-dark)] px-5 py-3 text-sm font-semibold text-[var(--primary-dark)] transition hover:bg-[var(--primary-10)] hover:text-[var(--primary)]"
        >
          Ver detalhes do currículo
        </button>
      </div>
    </Card>
  );
}

function ResumeMetric({
  icon,
  label,
  value,
}: ResumeMetricProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)]">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </p>

        <p className="text-sm text-[var(--text-secondary)]">
          {value}
        </p>
      </div>
    </div>
  );
}