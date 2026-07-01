"use client";

import { useState } from "react";
import { useCVStore } from "../store/useCVStore";
import Card from "../components/ui/Card";

export function AnalysisTips() {
  const { hasCV, cvData } = useCVStore();
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <Card variant="dashboard" className="overflow-hidden">
      <div className="grid h-full w-full grid-rows-[auto_1fr_auto]">
        {/* HEADER */}
        <div className="mb-5 flex items-center gap-3 sm:mb-7 sm:gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-base sm:h-10 sm:w-10 sm:text-lg">
            ✨
          </div>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-[22px]">Análise da IA</h2>
        </div>

        {/* MIDDLE — limitado em altura, não estoura */}
        {!hasCV || !cvData ? (
          <div className="flex items-center">
            <p className="text-base text-gray-400 sm:text-lg">
              Envie seu currículo para receber uma análise completa com insights e recomendações personalizadas.
            </p>
          </div>
        ) : (
          <div className="min-h-0 overflow-hidden">
            <h3 className="mb-3 text-sm font-semibold text-gray-800 sm:text-base">
              Seu currículo está bem estruturado, mas pode melhorar:
            </h3>
            <div className="grid content-start gap-y-3">
              {cvData.aiAnalysis.map((tip) => (
                <div key={tip.text} className="grid grid-cols-[28px_1fr] items-start gap-x-4">
                  <span
                    className={`
                      mt-0.5 flex h-7 w-7 items-center justify-center
                      rounded-full text-[14px] font-bold text-white
                      ${tip.status === "success" ? "bg-green-500" : "bg-yellow-400"}
                    `}
                  >
                    {tip.status === "success" ? "✓" : "!"}
                  </span>
                  {/* line-clamp-2 = mostra só 2 linhas, corta o resto com ... */}
                  <p className="line-clamp-2 text-sm text-gray-700 sm:text-base">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER — botão abre o modal */}
        <footer className="flex items-center justify-between pt-5 sm:pt-7">
          <button
            onClick={() => setModalAberto(true)}
            className="text-sm font-semibold text-yellow-600 hover:text-yellow-700 sm:text-base"
          >
            Ver dicas detalhadas
          </button>
          <span className="text-xl text-yellow-500 sm:text-2xl">→</span>
        </footer>
      </div>

      {/* MODAL — só aparece quando aberto */}
      {modalAberto && cvData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* fundo escuro: clicar fecha */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModalAberto(false)}
          />

          {/* caixa central */}
          <div className="relative z-10 flex max-h-[85vh] w-full max-w-[600px] flex-col rounded-3xl bg-white shadow-2xl">
            {/* cabeçalho do modal */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-lg">
                  ✨
                </div>
                <h2 className="text-lg font-bold text-gray-900">Análise da IA</h2>
              </div>
              <button
                onClick={() => setModalAberto(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            {/* corpo do modal — rola se for grande */}
            <div className="overflow-y-auto px-6 py-5">
              <h3 className="mb-4 text-base font-semibold text-gray-800">
                Seu currículo está bem estruturado, mas pode melhorar:
              </h3>
              <div className="grid gap-y-4">
                {cvData.aiAnalysis.map((tip) => (
                  <div key={tip.text} className="grid grid-cols-[28px_1fr] items-start gap-x-4">
                    <span
                      className={`
                        mt-0.5 flex h-7 w-7 items-center justify-center
                        rounded-full text-[14px] font-bold text-white
                        ${tip.status === "success" ? "bg-green-500" : "bg-yellow-400"}
                      `}
                    >
                      {tip.status === "success" ? "✓" : "!"}
                    </span>
                    {/* SEM line-clamp aqui — mostra o texto INTEIRO */}
                    <p className="text-base leading-relaxed text-gray-700">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}