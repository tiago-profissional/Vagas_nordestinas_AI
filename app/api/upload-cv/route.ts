import { NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

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

    return NextResponse.json({ message: "análise pronta", cvData });
  } catch (error) {
    console.error("ERRO NA ROTA:", error);
    return NextResponse.json(
      { message: "erro", detalhe: String(error) },
      { status: 500 }
    );
  }
}