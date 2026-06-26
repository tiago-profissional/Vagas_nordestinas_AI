import { NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);

  const pdf = await getDocumentProxy(uint8);
  const { text } = await extractText(pdf, { mergePages: true });

  return NextResponse.json({ message: "texto extraído", texto: text });
}