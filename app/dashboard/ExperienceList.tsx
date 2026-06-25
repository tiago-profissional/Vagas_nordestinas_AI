import Card from "../components/ui/Card";
import { useCVStore } from "../store/useCVStore";

type Experience = {
  title?: string;
  company?: string;
  period?: string;
};

type ExperienceListProps = {
  experiences?: Experience[] | null | undefined;
};

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <Card variant="dashboard" className="overflow-hidden">
      <div className="flex h-full w-full flex-col p-5">
        {/* Header */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-100 text-2xl">
            💼
          </div>

          <h2 className="text-[24px] font-bold text-gray-900">
            Experiência detectada
          </h2>
        </div>

        {/* Experience list */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-[340px]">
            {/* Timeline line */}
            <div className="absolute left-[9px] top-5 h-[100px] w-px bg-yellow-200" />

            <div className="space-y-7">
              {(experiences ?? []).map((experience, index) => (
                <div key={experience.title} className="relative flex gap-6">
                  {/* Dot */}
                  <span className="mt-2 h-5 w-5 shrink-0 rounded-full bg-yellow-500" />

                  {/* Content */}
                  <div className="min-w-0 flex-1 border-b border-gray-200 pb-6">
                    <div className="flex min-w-0 items-start justify-between gap-5">
                      <div className="min-w-0">
                        <h3 className="truncate text-[18px] font-bold text-gray-900">
                          {experience.title}
                        </h3>

                        <p className="truncate text-[17px] text-gray-500">
                          {experience.company}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span className="whitespace-nowrap text-[16px] text-gray-500">
                          {experience.period}
                        </span>

                        {index === 0 && (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-[14px] font-semibold text-green-700">
                            Atual
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer area */}
        <div className="mt-[-2px] flex w-full justify-center px-[22px]">
          <footer className="flex w-full max-w-[450px] items-center justify-between">
            <button className="text-[18px] font-semibold text-yellow-600">
              Ver todas as experiências ({experiences?.length ?? 0})
            </button>

            <span className="text-2xl text-yellow-500">→</span>
          </footer>
        </div>
      </div>
    </Card>
  );
}