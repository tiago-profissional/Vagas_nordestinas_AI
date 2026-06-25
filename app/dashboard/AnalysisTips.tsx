import { useCVStore } from "../store/useCVStore";
import Card from "../components/ui/Card";

export function AnalysisTips() {
  const { hasCV, cvData } = useCVStore();

  return (
    <Card variant="dashboard" className="overflow-hidden">
      <div className="grid h-full w-full grid-rows-[auto_1fr_auto]">
        {/* HEADER */}
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-lg">
            ✨
          </div>
          <h2 className="text-[22px] font-bold text-gray-900">Análise da IA</h2>
        </div>

        {/* MIDDLE — empty state or list */}
        {!hasCV || !cvData ? (
          <div className="flex items-center">
            <p className="text-[20px] text-gray-400">
              Envie seu currículo para receber uma análise completa com insights e recomendações personalizadas.
            </p>
          </div>
        ) : (
          <div className="grid content-start gap-y-[14px]">
            <h3 className="mb-3 text-[17px] font-semibold text-gray-800">
              Seu currículo está bem estruturado, mas pode melhorar:
            </h3>
            {cvData.aiAnalysis.map((tip) => (
              <div key={tip.text} className="grid grid-cols-[28px_1fr] items-center gap-x-5">
                <span
                  className={`
                    flex h-7 w-7 items-center justify-center
                    rounded-full text-[14px] font-bold text-white
                    ${tip.status === "success" ? "bg-green-500" : "bg-yellow-400"}
                  `}
                >
                  {tip.status === "success" ? "✓" : "!"}
                </span>
                <p className="text-[16px] text-gray-700">{tip.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <footer className="flex items-center justify-between pt-10">
          <button className="text-[16px] font-semibold text-yellow-600">
            Ver dicas detalhadas
          </button>
          <span className="text-2xl text-yellow-500">→</span>
        </footer>
      </div>
    </Card>
  );
}