export function NextSteps() {
  return (
    <section className="flex w-full flex-col gap-4 rounded-2xl border border-[#C9A227] bg-white px-5 py-5 shadow-sm sm:px-6 xl:flex-row xl:items-center xl:justify-between">
      {/* Texto */}
      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-bold text-[#C9A227] sm:text-xl lg:text-[22px]">
          Próximos passos recomendados
        </h2>
        <p className="text-sm text-gray-500 sm:text-[15px]">
          Vamos deixar seu currículo ainda mais competitivo!
        </p>
      </div>

      {/* Botões */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4 xl:w-auto">
        <button className="flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border-2 bg-white text-[15px] font-semibold shadow-sm sm:flex-1 xl:w-[240px] xl:flex-none"
          style={{ borderColor: "#C9A227", color: "#C9A227" }}
        >
          <span className="text-[20px] leading-none">⌕</span>
          <span>Comparar com vaga</span>
        </button>

        <button
          className="flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border-2 text-[15px] font-semibold text-white shadow-sm sm:flex-1 xl:w-[240px] xl:flex-none"
          style={{ backgroundColor: "#C9A227", borderColor: "#C9A227", color: "#ffffff" }}
        >
          <span className="text-[20px] leading-none text-white">🪄</span>
          <span>Otimizar currículo</span>
        </button>
      </div>
    </section>
  );
}