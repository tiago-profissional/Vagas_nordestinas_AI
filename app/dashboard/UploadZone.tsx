"use client";

import { useRef, useState } from "react";
import type { DragEvent } from "react";
import { CloudUpload, FileText, X } from "lucide-react";

import { Button } from "../components/ui/Button";
import { useCVStore } from "../store/useCVStore";

export function UploadZone() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const uploadCV = useCVStore((state) => state.uploadCV);

  function selectFile(chosen: File | null) {
    if (!chosen) return;

    const message = !/\.(pdf|docx)$/i.test(chosen.name)
      ? "Selecione um arquivo PDF ou DOCX."
      : chosen.size > 5 * 1024 * 1024
        ? "O arquivo deve ter no máximo 5 MB."
        : "";

    setError(message);
    setFile(message ? null : chosen);
    setFileName(message ? "" : chosen.name);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function removeFile() {
    setFile(null);
    setFileName("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!Array.from(event.dataTransfer.types).includes("Files")) {
      return;
    }

    dragCounter.current += 1;
    setIsDragging(true);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    dragCounter.current = Math.max(0, dragCounter.current - 1);

    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    dragCounter.current = 0;
    setIsDragging(false);

    selectFile(event.dataTransfer.files[0] ?? null);
  }

  async function handleUpload() {
    if (!file) return;
    await uploadCV(file);
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`vn-upload ${isDragging ? "vn-upload--dragging" : ""}`}
    >
      <div className="vn-upload-icon" aria-hidden="true">
        <CloudUpload size={32} strokeWidth={2.3} />
      </div>

      <h3 className="vn-upload-title">
        {isDragging ? "Solte seu currículo aqui" : "Arraste seu currículo para cá"}
      </h3>

      <div className="vn-upload-hints">
        <p className="vn-muted">
          {file
            ? "Para trocar, arraste outro arquivo para esta área"
            : "Ou use o botão Escolher arquivo"}
        </p>

        <p className="vn-muted">Formatos aceitos: PDF, DOCX</p>

        <p className="vn-muted">Tamanho máximo: 5MB</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        aria-label="Selecionar currículo"
        hidden
        onChange={(event) => {
          selectFile(event.target.files?.[0] ?? null);
        }}
      />

      {error && (
        <p role="alert" className="vn-field-error">
          {error}
        </p>
      )}

      {file && (
        <div aria-live="polite" className="vn-file">
          <div className="vn-file__icon" aria-hidden="true">
            <FileText size={40} strokeWidth={1.7} />

            <span className="vn-file__ext">
              {file.name.toLowerCase().endsWith(".pdf") ? "PDF" : "DOCX"}
            </span>
          </div>

          <div className="vn-file__info">
            <p className="vn-note">Arquivo selecionado</p>

            <p className="vn-file__name">{fileName}</p>
          </div>

          <button
            type="button"
            className="vn-file__remove"
            aria-label={`Remover arquivo ${fileName}`}
            title="Remover arquivo"
            onClick={removeFile}
          >
            <X size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      )}

      <Button
        variant={file ? "primary" : "secondary"}
        size="sm"
        onClick={file ? handleUpload : () => inputRef.current?.click()}
      >
        {file ? "Enviar arquivo" : "Escolher arquivo"}
      </Button>
    </div>
  );
}