"use client";

type JobMatch = {
  id: number;
  title: string;
  company: string;
  location: string;
  modality: "Remote" | "On-site" | "Hybrid";
  experienceLevel:
    | "Internship"
    | "Entry-level"
    | "Mid-level"
    | "Senior"
    | "Not specified";
  skills: string[];
  description: string;
  score: number;
};

type JobMatchCardProps = {
  job: JobMatch;
  onCompare: (job: JobMatch) => void;
};


function getMatchLabel(score: number): string {

  if(score >= 90){
    return "Excellent match";

  } else if(score >= 80){
    return "Good match";

  } else if(score >= 60){
    return "Fair match";
  } else if(score >= 40){
    return "Weak match";
  } else {
    return "Poor match";
  }


}


export function JobMatchCard({ job, onCompare }: JobMatchCardProps) {



  return (
    <article>
      <h2>{job.title}</h2>
      
      <section>
        <h3>Required skills</h3>
        <p>{job.score}%</p>
        <p>{getMatchLabel(job.score)}</p>

        <div>
          {job.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.modality}</p>
      <p>{job.experienceLevel}</p>
      <p>{job.description}</p>

      <button type="button" onClick={() => onCompare(job)}>Compare</button>
       
    </article>
  );
}