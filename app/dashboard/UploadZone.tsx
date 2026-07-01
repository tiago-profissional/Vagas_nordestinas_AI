"use client";

import Image from "next/image";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import { useCVStore } from "../store/useCVStore";

export function UploadZone() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const uploadCV = useCVStore((state) => state.uploadCV);

  async function handleUpload() {
    if (!file) return;
    await uploadCV(file);
  }

  return (
    <div className="flex min-h-[260px] w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-primary bg-white px-4 py-6 text-center sm:px-8">
      <Image
        src="/images/sub_images/upload_icon.png"
        alt="Upload icon"
        width={70}
        height={70}
        className="h-[60px] w-auto object-contain sm:h-[70px]"
      />

      <h3 className="text-base font-bold leading-tight text-gray-900 sm:text-lg">
        Arraste seu currículo ou
        <br />
        clique para enviar
      </h3>

      <div>
        <p className="text-xs text-gray-500 sm:text-sm">
          Formatos aceitos: PDF, DOCX
        </p>
        <p className="text-xs text-gray-500 sm:text-sm">
          Tamanho máximo: 5MB
        </p>
      </div>

      <input
        type="file"
        onChange={(e) => {
          const chosen = e.target.files?.[0] ?? null;
          setFile(chosen);
          setFileName(chosen?.name ?? "");
        }}
        className="max-w-full text-xs sm:text-sm"
      />

      {fileName && (
        <p className="text-sm text-green-600">
          Selecionado: {fileName}
        </p>
      )}

      <Button variant="primary" size="sm" onClick={handleUpload}>
        Enviar Currículo
      </Button>
    </div>
  );
}