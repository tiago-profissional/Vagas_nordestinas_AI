export function NextSteps() {
  return (
    <section className="flex h-[96px] w-full items-center justify-center rounded-2xl border border-[#C9A227] bg-white px-6 shadow-sm">
      <div className="flex h-full w-[92%] items-center justify-between">
        {/* Text area */}
        <div className="flex flex-col justify-center">
          <h2 className="text-[22px] font-bold text-[#C9A227]">
            Próximos passos recomendados
          </h2>

          <p className="text-[15px] text-gray-500">
            Vamos deixar seu currículo ainda mais competitivo!
          </p>
        </div>

        {/* Buttons area */}
        <div className="flex items-center gap-6">
          <button className="flex h-[52px] w-[280px] items-center justify-center gap-4 rounded-xl border-2 bg-white text-[16px] font-semibold shadow-sm"
            style={{
              borderColor: "#C9A227",
              color: "#C9A227",
            }}
          >
            <span className="text-[24px] leading-none">⌕</span>
            <span>Comparar com vaga</span>
          </button>

          <button
            className="flex h-[52px] w-[280px] items-center justify-center gap-4 rounded-xl border-2 text-[16px] font-semibold text-white shadow-sm"
            style={{
              backgroundColor: "#C9A227",
              borderColor: "#C9A227",
              color: "#ffffff",
            }}
          >
            <span className="text-[22px] leading-none text-white">🪄</span>
            <span>Otimizar currículo</span>
          </button>
        </div>
      </div>
    </section>
  );
}