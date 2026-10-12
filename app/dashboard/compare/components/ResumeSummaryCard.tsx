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
    <Card className="cmp-card">
      <div className="cmp-summary__top">
        <div className="cmp-summary__identity">
          <div className="vn-card-icon vn-card-icon--round" aria-hidden="true">
            📄
          </div>

          <div>
            <h2 className="vn-card-title">Seu currículo atual</h2>

            <span className="vn-badge cmp-summary__badge">
              Currículo pronto para comparação
            </span>
          </div>
        </div>

        <button type="button" className="vn-button vn-button--outline">
          Ver detalhes do currículo
        </button>
      </div>

      <div className="cmp-summary__metrics">
        <ResumeMetric icon="🧩" label="Skills detectadas" value={skillsText} />
        <ResumeMetric icon="⏱️" label="Experiência total" value={experience} />
        <ResumeMetric icon="📍" label="Localização" value={location} />
      </div>
    </Card>
  );
}

function ResumeMetric({ icon, label, value }: ResumeMetricProps) {
  return (
    <div className="cmp-metric">
      <div className="vn-card-icon vn-card-icon--sm" aria-hidden="true">
        {icon}
      </div>

      <div>
        <p className="cmp-metric__label">{label}</p>
        <p className="cmp-metric__value">{value}</p>
      </div>
    </div>
  );
}