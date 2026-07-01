import Image from "next/image";
import { useCVStore } from "../store/useCVStore";

export function ResumeStatus() {
  const { hasCV, cvData } = useCVStore();

  return (
    <section className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-3xl border border-primary/40 bg-white p-6 text-center shadow-sm">
      <div className="mb-5 flex items-center justify-center text-primary">
        <Image
          src="/images/sub_images/resume_icon.png"
          alt="Resume icon"
          width={70}
          height={70}
          className="h-[70px] w-auto object-contain"
        />
      </div>

      {!hasCV || !cvData ? (
        <>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            Nenhum currículo enviado ainda
          </h2>
          <p className="mt-4 max-w-[520px] text-sm text-gray-500 sm:text-base">
            Envie seu currículo para receber análises personalizadas e recomendações.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            Currículo analisado com sucesso ✓
          </h2>
          <p className="mt-4 max-w-[520px] text-sm text-gray-500 sm:text-base">
            Boas-vindas, {cvData.name}! Sua análise está pronta — confira as
            informações, skills e recomendações abaixo.
          </p>
        </>
      )}
    </section>
  );
}