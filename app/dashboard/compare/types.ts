
type Job = { 
  id: number,
  title: string,
  company: string,
  location: string,
  modality: "remote" | "hybrid" | "onsite",
  seniority: "junior" | "pleno" | "senior",
  techStack: string[],
  matchPercentage: number,
}

type FilterState = {
  searchTerm: string,
  technology: string,
  location: string,
  modality: "all" | "remote" | "hybrid" | "onsite",
  seniority: string[],
  sortBy: "match" | "title" | "recent",
}


export type JobMatch = {
  id: number;
  title: string;
  company: string;
  location: string;
  modality: string;
  seniority: string;
  skills: string[];
  description: string;
  score: number;
};

