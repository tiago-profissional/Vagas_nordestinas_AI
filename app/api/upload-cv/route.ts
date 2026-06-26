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

    console.log("API KEY:", process.env.GEMINI_API_KEY);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Você é um analisador de currículos. Analise o currículo abaixo e responda com um resumo do candidato, suas principais skills, e 3 sugestões de melhoria.\n\nCurrículo:\n${text}`;

    const result = await model.generateContent(prompt);
    const analise = result.response.text();

    return NextResponse.json({ message: "análise pronta", analise });
  } catch (error) {
    console.error("ERRO NA ROTA:", error);
    return NextResponse.json(
      { message: "erro", detalhe: String(error) },
      { status: 500 }
    );
  }
}