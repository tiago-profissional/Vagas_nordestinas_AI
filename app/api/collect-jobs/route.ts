import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    // 1. Fetch jobs from GitHub
    const res = await fetch(
      "https://api.github.com/repos/backend-br/vagas/issues?state=open&per_page=10",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "vagas-nordestinas-app",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub responded ${res.status}` },
        { status: res.status }
      );
    }

    const issues = await res.json();

    // 2. Clean the data
    const jobs = issues.map((issue: any) => ({
      externalId: issue.number,
      title: cleanTitle(issue.title),
      url: issue.html_url,
      skills: (issue.labels ?? [])
        .map((l: any) => l.name)
        .filter((name: string) => !isMetaLabel(name)),
      workModel: getWorkModel(issue.labels),
      seniority: getSeniority(issue.labels),
      postedBy: issue.user?.login,
      postedAt: issue.created_at,
      description: issue.body,
    }));

    // 3. Connect to MySQL
    const db = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "vagas_nordestinas",
    });

    // 4. Insert each job (skip duplicates via external_id UNIQUE)
    let inserted = 0;
    for (const job of jobs) {
      // Convert postedAt from GitHub format to MySQL DATETIME
      const postedAt = new Date(job.postedAt)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const [result]: any = await db.execute(
        `INSERT IGNORE INTO github_jobs
         (external_id, title, url, skills, work_model, seniority, posted_by, posted_at, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          job.externalId,
          job.title,
          job.url,
          JSON.stringify(job.skills), // array → JSON string for the TEXT column
          job.workModel,
          job.seniority,
          job.postedBy,
          postedAt,
          job.description,
        ]
      );
      if (result.affectedRows > 0) inserted++;
    }

    await db.end();

    return NextResponse.json({
      message: "Collection complete",
      fetched: jobs.length,
      inserted, // how many were NEW (duplicates skipped)
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed", details: err.message },
      { status: 500 }
    );
  }
}

function cleanTitle(title: string) {
  return title.replace(/^\[.*?\]\s*/, "").trim();
}

const META_LABELS = ["PJ", "CLT", "Remoto", "Presencial", "Híbrido", "Júnior", "Pleno", "Sênior"];
function isMetaLabel(name: string) {
  return META_LABELS.includes(name);
}

function getWorkModel(labels: any[] = []) {
  const names = labels.map((l) => l.name);
  if (names.includes("Remoto")) return "Remoto";
  if (names.includes("Presencial")) return "Presencial";
  if (names.includes("Híbrido")) return "Híbrido";
  return "Não informado";
}

function getSeniority(labels: any[] = []) {
  const names = labels.map((l) => l.name);
  if (names.includes("Sênior")) return "Sênior";
  if (names.includes("Pleno")) return "Pleno";
  if (names.includes("Júnior")) return "Júnior";
  return "Não informado";
}