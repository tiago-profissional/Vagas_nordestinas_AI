import Card from "../components/ui/Card";

type ScoreCardProps = {
  score: number | null | undefined;
};

export function ScoreCard({ score }: ScoreCardProps) {
  return (
    <Card variant="dashboard" className="overflow-hidden">
      <div className="flex h-full w-full flex-col">
        {/* HEADER */}
        <div className="mb-6 flex items-center gap-3 sm:gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-base sm:h-10 sm:w-10 sm:text-lg">
            🎯
          </div>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-[22px]">
            Score do currículo
          </h2>
        </div>

        {/* CONTENT — @container observa a largura DO CARD, não da tela */}
        {score ? (
          <div className="@container flex flex-1 items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-6 @[420px]:flex-row @[420px]:gap-10">
              {/* CIRCLE */}
              <div className="relative flex h-[130px] w-[130px] shrink-0 items-center justify-center rounded-full border-[9px] border-yellow-400 @[420px]:h-[160px] @[420px]:w-[160px] @[420px]:border-[12px]">
                <div className="text-center">
                  <h3 className="text-[38px] font-bold text-gray-900 @[420px]:text-[50px]">
                    {score}
                  </h3>
                  <p className="text-[17px] text-gray-500 @[420px]:text-[24px]">/100</p>
                </div>
              </div>

              {/* TEXT */}
              <div className="max-w-[280px] text-center @[420px]:text-left">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  Bom trabalho! 🎉
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 @[420px]:text-base">
                  Seu currículo está acima da média, mas ainda tem espaço para
                  melhorias significativas.
                </p>
                <button className="mt-4 text-sm font-semibold text-yellow-600">
                  Entenda sua pontuação
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-center text-sm text-gray-500 sm:text-[17px]">
              Envie seu currículo para ver seu score e áreas de melhoria.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}