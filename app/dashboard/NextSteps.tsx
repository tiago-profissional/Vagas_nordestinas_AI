export function NextSteps() {
  return (
    <section className="flex w-full flex-col gap-4 rounded-2xl border border-[var(--primary)] bg-[var(--surface)] px-5 py-5 shadow-sm sm:px-6 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-bold text-[var(--primary-dark)] sm:text-xl lg:text-[22px]">
          Próximos passos recomendados
        </h2>

        <p className="text-sm text-[var(--text-secondary)] sm:text-[15px]">
          Vamos deixar seu currículo ainda mais competitivo!
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4 xl:w-auto">
        <button
          type="button"
          className="flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border-2 border-[var(--primary)] bg-[var(--surface)] text-[15px] font-semibold text-[var(--primary-dark)] shadow-sm transition-colors hover:bg-[var(--primary-10)] sm:flex-1 xl:w-[240px] xl:flex-none"
        >
          <span className="text-[20px] leading-none">⌕</span>
          <span>Comparar com vaga</span>
        </button>

        <button
          type="button"
          className="flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border-2 border-[var(--primary)] bg-[var(--primary)] text-[15px] font-semibold text-[var(--text-on-primary)] shadow-sm transition-colors hover:bg-[var(--primary-hover)] sm:flex-1 xl:w-[240px] xl:flex-none"
        >
          <span className="text-[20px] leading-none">🪄</span>
          <span>Otimizar currículo</span>
        </button>
      </div>
    </section>
  );
}