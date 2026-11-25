import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type CVData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  totalExperience: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    period: string;
    current: boolean;
  }[];
  aiAnalysis: {
    text: string;
    status: "success" | "warning";
  }[];
  score: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseCVData(value: unknown): CVData {
  if (!isRecord(value)) {
    throw new Error("O Gemini retornou uma resposta que não é um objeto JSON.");
  }

  const textFields = [
    "name",
    "email",
    "phone",
    "location",
    "totalExperience",
  ] as const;
  if (
    !textFields.every((field) => typeof value[field] === "string") ||
    !Array.isArray(value.skills) ||
    !Array.isArray(value.experience) ||
    !Array.isArray(value.aiAnalysis) ||
    typeof value.score !== "number" ||
    !Number.isFinite(value.score)
  ) {
    throw new Error("O Gemini retornou campos fora do formato esperado.");
  }

  const experience = value.experience.map((item) => {
    if (!isRecord(item)) {
      throw new Error("O Gemini retornou uma experiência em formato inválido.");
    }

    return {
      title: typeof item.title === "string" ? item.title : "Não informado",
      company: typeof item.company === "string" ? item.company : "Não informado",
      period: typeof item.period === "string" ? item.period : "Não informado",
      current: typeof item.current === "boolean" ? item.current : false,
    };
  });

  const aiAnalysis = value.aiAnalysis.map((item) => {
    if (!isRecord(item) || typeof item.text !== "string") {
      throw new Error("O Gemini retornou uma recomendação em formato inválido.");
    }

    return {
      text: item.text,
      status: item.status === "warning" ? "warning" as const : "success" as const,
    };
  });

  return {
    name: value.name as string,
    email: value.email as string,
    phone: value.phone as string,
    location: value.location as string,
    totalExperience: value.totalExperience as string,
    skills: value.skills.filter(
      (skill): skill is string => typeof skill === "string",
    ),
    experience,
    aiAnalysis,
    score: Math.max(0, Math.min(100, Math.round(value.score))),
  };
}

export async function POST(request: Request) {
  let stage = "recepção do arquivo";

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado.", details: "Campo file ausente." },
        { status: 400 },
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension !== "pdf" && extension !== "docx") {
      return NextResponse.json(
        {
          error: "Formato inválido.",
          details: "Envie um arquivo PDF ou DOCX.",
        },
        { status: 400 },
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error:
            file.size === 0
              ? "O arquivo enviado está vazio."
              : "O arquivo deve ter no máximo 5 MB.",
          details: `Tamanho recebido: ${file.size} bytes.`,
        },
        { status: 413 },
      );
    }

    stage = "extração de texto";
    const bytes = Buffer.from(await file.arrayBuffer());
    let resumeText: string;

    if (extension === "pdf") {
      const parser = new PDFParse({ data: bytes });
      try {
        resumeText = (await parser.getText()).text;
      } finally {
        await parser.destroy();
      }
    } else {
      resumeText = (await mammoth.extractRawText({ buffer: bytes })).value;
    }

    if (!resumeText.trim()) {
      throw new Error("Não foi encontrado texto extraível no currículo.");
    }

    stage = "configuração do Gemini";
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("A variável GEMINI_API_KEY não está configurada.");
    }

    stage = "análise do currículo pelo Gemini";
    const model = new GoogleGenerativeAI(apiKey).getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });
    const result = await model.generateContent(`Analise o currículo abaixo e retorne somente um objeto JSON válido, sem markdown ou texto adicional, com exatamente esta estrutura:
{
  "name": "Nome completo ou Não informado",
  "email": "Email ou Não informado",
  "phone": "Telefone ou Não informado",
  "location": "Cidade/estado ou Não informado",
  "totalExperience": "Tempo total de experiência ou Não informado",
  "skills": ["habilidades identificadas"],
  "experience": [
    { "title": "Cargo", "company": "Empresa", "period": "Período", "current": false }
  ],
  "aiAnalysis": [
    { "text": "Sugestão de melhoria", "status": "success" }
  ],
  "score": 0
}
Use de 3 a 4 sugestões em aiAnalysis, cada status deve ser "success" ou "warning", e score deve ser um número entre 0 e 100. Não invente informações ausentes.

Currículo:
${resumeText}`);

    stage = "interpretação da resposta do Gemini";
    const cvData = parseCVData(JSON.parse(result.response.text()));

    return NextResponse.json(cvData, { status: 200 });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`Falha na etapa "${stage}" da rota /api/upload-cv:`, error);
    return NextResponse.json(
      {
        error: `Falha ao processar o currículo na etapa "${stage}".`,
        details: detail,
      },
      { status: 500 },
    );
  }
}
