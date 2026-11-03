import { NextResponse } from "next/server";
import { fetchJobs } from "../../lib/githubJobs";

// GET /api/collect-jobs?limit=30&page=1
// Devolve as vagas abertas do GitHub (backend-br/vagas) já tratadas.
// Não usa mais MySQL local: roda normalmente na Vercel.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 30;
    const page = Number(searchParams.get("page")) || 1;

    const jobs = await fetchJobs(limit, page);

    return NextResponse.json({ total: jobs.length, jobs });
  } catch (err) {
    const details = err instanceof Error ? err.message : "erro desconhecido";
    return NextResponse.json({ error: "Falha ao buscar vagas", details }, { status: 502 });
  }
}
