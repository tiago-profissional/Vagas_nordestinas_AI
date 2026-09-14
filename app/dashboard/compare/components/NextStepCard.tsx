import Card from "@/app/components/ui/Card";

export function NextStepCard() {
  return (
    <Card
      variant="banner"
      className="rounded-2xl border-yellow-200 bg-yellow-50/40 px-6 py-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-2xl">
          ⭐
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Próximo passo: escolha uma vaga para visualizar o matching detalhado.
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Ao clicar em “Comparar”, você verá um relatório completo com
            compatibilidade de skills, experiência e sugestões de melhoria.
          </p>
        </div>
      </div>
    </Card>
  );
}