 import Card from "../components/ui/Card";

type ScoreCardProps = {
  score: number | null | undefined;
};

export function ScoreCard({ score }: ScoreCardProps) {
  return (
    <Card variant="dashboard" className="overflow-hidden">
      <div className="flex h-full w-full flex-col">
        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-lg">
            🎯
          </div>
          <h2 className="text-[22px] font-bold text-gray-900">
            Score do currículo
          </h2>
        </div>

        {/* CONTENT */}
        {score ? (
          <div className="flex flex-1 items-center justify-center gap-16">
            {/* CIRCLE */}
            <div className="relative flex h-[180px] w-[180px] shrink-0 items-center justify-center rounded-full border-[12px] border-yellow-400">
              <div className="text-center">
                <h3 className="text-[52px] font-bold text-gray-900">
                  {score}
                </h3>
                <p className="text-[24px] text-gray-500">/100</p>
              </div>
            </div>

            {/* TEXT */}
            <div className="max-w-[260px]">
              <h3 className="mb-4 text-[24px] font-bold text-gray-900">
                Bom trabalho! 🎉
              </h3>
              <p className="text-[17px] leading-[1.8] text-gray-600">
                Seu currículo está acima da média, mas ainda tem espaço para
                melhorias significativas.
              </p>
              <button className="mt-7 text-[16px] font-semibold text-yellow-600">
                Entenda sua pontuação
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-center text-[17px] text-gray-500">
              Envie seu currículo para ver seu score e áreas de melhoria.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
 