import { useCVStore } from "../store/useCVStore";
import Card from "../components/ui/Card";

export function SkillsList() {
  const { hasCV, cvData } = useCVStore();

  const skills = cvData?.skills ?? [];
  const totalSkills = skills.length;

  return (
    <Card variant="dashboard" className="overflow-hidden rounded-[22px] border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <div className="flex h-full w-full flex-col p-5">
        {/* Header */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-sm font-bold text-yellow-600">
            {"</>"}
          </div>
          <h2 className="text-[18px] font-bold text-gray-900">Skills detectadas</h2>
        </div>

        {/* Middle */}
        <div className="flex flex-1 items-center justify-center">
          {!hasCV || !cvData ? (
            <p className="text-center text-[15px] text-gray-400">
              Envie seu currículo para ver as skills detectadas.
            </p>
          ) : (
            <div className="grid max-w-[330px] grid-cols-3 justify-items-center gap-x-3 gap-y-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    flex h-7 w-[95px] items-center justify-center
                    rounded-full bg-yellow-50 px-2 text-center
                    text-[12px] font-semibold leading-none
                    text-yellow-700 whitespace-nowrap
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-[-10px] flex w-full justify-center px-[22px]">
          <footer className="flex w-full max-w-[300px] items-center justify-between">
            <button className="text-[15px] font-semibold text-yellow-600">
              Ver todas as skills ({totalSkills})
            </button>
            <span className="text-lg text-yellow-500">→</span>
          </footer>
        </div>
      </div>
    </Card>
  );
}