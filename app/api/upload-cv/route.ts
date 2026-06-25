import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  return NextResponse.json({ message: "arquivo recebido", nome: file?.name });
}