import { Link } from "react-router-dom";
import { useState } from "react";
import githubBundle from "./data/githubProjects.json";

type StoredGithubProject = {
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
};

type Project = {
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
};

const DESCRIPTION_PLACEHOLDER =
  "No description yet. On GitHub: open the repository → About (gear) → Description — add a short plain-text line (one or two sentences). Add topics there for skill tags, and Website for a Live Demo link.";

type ExperienceItem = {
  title: string;
  company: string;
  date: string;
  details?: string[];
  gpa?: string;
  relevantCoursework?: string[];
};

const projects: Project[] = (
  githubBundle as { fetchedAt: string; projects: StoredGithubProject[] }
).projects.map((p) => {
  const raw = (p.description || "").trim();
  const text = raw || DESCRIPTION_PLACEHOLDER;
  return {
    name: p.name,
    description: text,
    longDescription: text,
    tech: p.tech ?? [],
    githubUrl: p.githubUrl || undefined,
    liveUrl: p.liveUrl || undefined,
  };
});

const experienceItems: ExperienceItem[] = [
  {
    title: "Data Engineering Intern - Remote",
    company: "AbbVie Inc.",
    date: "Summer 2025",
    details: [
      "Built data features for an ML-powered medical sales planning tool using PySpark in Palantir Foundry.",
      "Created clean, standardized datasets that could be used by machine learning models.",
      "Worked with data scientists and analysts to understand project requirements and define what data was needed.",
      "Joined Scrum meetings with European teams to discuss progress, clarify tasks, and resolve blockers.",
    ],
  },
  {
    title: "Data Engineering Intern - North Chicago, IL",
    company: "AbbVie Inc.",
    date: "Summer 2024",
    details: [
      "Built SQL ETL pipelines to pull U.S. sales data from multiple sources and turn it into standardized data for reporting.",
      "Automated data processing workflows using Dataiku and SQL, reducing manual work and keeping datasets accurate and up to date.",
      "Combined healthcare datasets from relational databases, making the data easier for analytics teams to access and use for faster decision-making.",
    ],
  },
  {
    title: "Computer Science Student",
    company: "Arizona State University",
    date: "Expected Graduation: 2027",
    gpa: "3.9 / 4.00",
    relevantCoursework: [
      "Data Structures & Algorithms",
      "Principles of Programming",
      "Object-Oriented Program & Data",
      "Computer Organization and Assembly Language Programming",
      "Intro to Programming Languages",
      "Theoretical Computer Science",
      "Discrete Math",
      "Linear Algebra",
      "Information Assurance",
      "Prob & Stats Engineering Problem Solving",
      "Operating Systems",
      "Foundations of Data Visualization",
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="card">
      <div className="card-header">
        <div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>

        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Hide" : "More"}
        </button>
      </div>

      {isOpen && (
        <div className="expanded-content">
          <p>{project.longDescription}</p>

          {project.tech.length > 0 && (
            <div className="tags">
              {project.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}

          <div className="links">
            {project.githubUrl && <a href={project.githubUrl}>GitHub</a>}
            {project.liveUrl && <a href={project.liveUrl}>Live Demo</a>}
          </div>
        </div>
      )}
    </article>
  );
}

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="resume-card">
      <div className="card-header">
        <div>
          <h3>{item.title}</h3>
          <p>
            {item.company} · {item.date}
          </p>
        </div>

        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Hide" : "More"}
        </button>
      </div>

      {isOpen && (
        <>
          {item.details && item.details.length > 0 && (
            <ul>
              {item.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          )}
          {(item.gpa ||
            (item.relevantCoursework && item.relevantCoursework.length > 0)) && (
            <div className="resume-education-meta">
              {item.gpa && (
                <div className="education-row">
                  <span className="resume-meta-label">GPA</span>
                  <span className="gpa-value">{item.gpa}</span>
                </div>
              )}

              {item.relevantCoursework && item.relevantCoursework.length > 0 && (
                <div className="coursework-section">
                  <span className="resume-meta-label">Relevant Coursework</span>

                  <div className="coursework-tags">
                    {item.relevantCoursework.map((course) => (
                      <span key={course}>{course}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </article>
  );
}

export default function HomePage() {
  return (
    <main>
      <header>
        <div className="container nav-container">
          <h1>Nolan McDonald</h1>

          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
          </nav>
        </div>
      </header>

      <section className="hero container">
        <p className="eyebrow">Computer Science Student</p>

        <h2>Building clean, useful software and learning more every day.</h2>

        <p className="hero-text">
          I am a computer science student interested in software engineering, full-stack development, and
          building practical tools that solve real problems.
        </p>
      </section>

      <section id="about" className="section white-section">
        <div className="container">
          <h2>About Me</h2>

          <p>
            I am currently studying computer science and growing my skills in software engineering. My experience
            includes working with data, backend systems, and web development. I enjoy learning new technologies
            and turning ideas into working projects.
          </p>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Projects</h2>
            <p>
              Data comes from your GitHub repositories (description, topics, and website link). Run{" "}
              <span className="inline-code">npm run fetch-projects</span> after you change a repo on GitHub, or it
              refreshes automatically on <span className="inline-code">npm run build</span>.
            </p>
          </div>

          <div className="grid">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section white-section">
        <div className="container">
          <h2>Professional Experience</h2>

          <div className="resume-list">
            {experienceItems.map((item) => (
              <ExperienceCard key={`${item.title}-${item.company}`} item={item} />
            ))}
          </div>

          <Link to="/resume" className="resume-button">
            View resume
          </Link>
        </div>
      </section>

      <footer>© {new Date().getFullYear()} Nolan McDonald. All rights reserved.</footer>
    </main>
  );
}
