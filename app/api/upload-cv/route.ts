import { NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_URL = (
  process.env.NEXT_PUBLIC_AI_API_URL ?? "http://localhost:8001"
).replace(/\/$/, "");

// Grava o currículo no banco (via backend). Se falhar, o upload continua valendo.
async function saveToBackend(cvData: unknown, fileName: string): Promise<boolean> {
  try {
    const data = cvData as { skills?: unknown };
    const skills = Array.isArray(data.skills)
      ? data.skills.filter(
          (skill): skill is string =>
            typeof skill === "string" && skill.trim() !== "" && skill !== "Não informado",
        )
      : [];

    const response = await fetch(`${API_URL}/api/resume`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills, fileName, analysis: cvData }),
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok;
  } catch (error) {
    console.error("Não foi possível salvar o currículo no backend:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "erro", detalhe: "Nenhum arquivo enviado" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);

    const pdf = await getDocumentProxy(uint8);
    const { text } = await extractText(pdf, { mergePages: true });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a resume analyzer. Read the resume text below and return ONLY a single valid JSON object. Do not explain anything. No markdown, no backticks, no text before or after the JSON. Use exactly this shape:

{
  "name": "",
  "email": "",
  "phone": "",
  "location": "",
  "totalExperience": "",
  "skills": [],
  "experience": [{ "title": "", "company": "", "period": "", "current": false }],
  "aiAnalysis": [{ "text": "", "status": "success" }],
  "score": 0
}

If a field is not found, use "Não informado" for text, [] for lists, 0 for score. For aiAnalysis, give 3-4 improvement suggestions, each with status "success" or "warning".

Resume text:
${text}`;

    const result = await model.generateContent(prompt);

    let raw = result.response.text();
    raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

    const cvData = JSON.parse(raw);

    // Salva no banco: skills em usuarios.skills e a análise completa em curriculos
    const saved = await saveToBackend(cvData, file.name);

    return NextResponse.json({ message: "análise pronta", cvData, saved });
  } catch (error) {
    console.error("ERRO NA ROTA:", error);
    return NextResponse.json(
      { message: "erro", detalhe: String(error) },
      { status: 500 },
    );
  }
}