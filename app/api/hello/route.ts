import { NextReponse } from "next/server";

export async function POST() {
    return NextReponse.json({ message: "Upload route working" });
}