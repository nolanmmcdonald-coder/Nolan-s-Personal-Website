import { useState } from "react";
import "./styles.css";

type Project = {
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
};

type ResumeItem = {
  title: string;
  company: string;
  date: string;
  details: string[];
};

const projects: Project[] = [
  {
    name: "Personal Website",
    description: "A simple portfolio website built with React, TypeScript, and CSS.",
    longDescription:
      "This website is designed to be easy to expand over time. The project section currently uses local placeholder data, but it can later be replaced with data from the GitHub API.",
    tech: ["React", "TypeScript", "CSS"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    name: "Project Placeholder",
    description: "A placeholder card for a future GitHub-connected project.",
    longDescription:
      "Later, this card can automatically display a GitHub repository name, description, language, stars, and links pulled directly from your GitHub account.",
    tech: ["GitHub API", "TypeScript"],
    githubUrl: "#",
  },
];

const resumeItems: ResumeItem[] = [
  {
    title: "Software Engineering / Data Engineering Intern",
    company: "Company Name",
    date: "Summer 2025",
    details: [
      "Built and maintained technical tools used by internal teams.",
      "Worked with data pipelines, backend systems, and software development workflows.",
      "Collaborated with engineers to improve reliability and usability.",
    ],
  },
  {
    title: "Computer Science Student",
    company: "Arizona State University",
    date: "Expected Graduation: 2026",
    details: [
      "Studying software engineering, data structures, algorithms, and systems programming.",
      "Interested in backend development, full-stack projects, and practical software tools.",
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

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Hide" : "More"}
        </button>
      </div>

      {isOpen && (
        <div className="expanded-content">
          <p>{project.longDescription}</p>

          <div className="tags">
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="links">
            {project.githubUrl && <a href={project.githubUrl}>GitHub</a>}
            {project.liveUrl && <a href={project.liveUrl}>Live Demo</a>}
          </div>
        </div>
      )}
    </article>
  );
}

function ResumeCard({ item }: { item: ResumeItem }) {
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

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Hide" : "More"}
        </button>
      </div>

      {isOpen && (
        <ul>
          {item.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function App() {
  return (
    <main>
      <header>
        <div className="container nav-container">
          <h1>Nolan McDonald</h1>

          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
          </nav>
        </div>
      </header>

      <section className="hero container">
        <p className="eyebrow">Computer Science Student</p>

        <h2>Building clean, useful software and learning more every day.</h2>

        <p className="hero-text">
          I am a computer science student interested in software engineering,
          full-stack development, and building practical tools that solve real problems.
        </p>
      </section>

      <section id="about" className="section white-section">
        <div className="container">
          <h2>About Me</h2>

          <p>
            I am currently studying computer science and growing my skills in software engineering.
            My experience includes working with data, backend systems, and web development. I enjoy
            learning new technologies and turning ideas into working projects.
          </p>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Projects</h2>
            <p>
              Click each project to expand it. Later, this section can pull projects directly from GitHub.
            </p>
          </div>

          <div className="grid">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="resume" className="section white-section">
        <div className="container">
          <h2>Resume</h2>

          <p>
            Add your resume here so recruiters or visitors can quickly view or download it.
          </p>

          <div className="resume-list">
            {resumeItems.map((item) => (
              <ResumeCard key={`${item.title}-${item.company}`} item={item} />
            ))}
          </div>

          <a href="/resume.pdf" className="resume-button">
            View Resume
          </a>
        </div>
      </section>

      <footer>© {new Date().getFullYear()} Nolan McDonald. All rights reserved.</footer>
    </main>
  );
}

/*
Future GitHub project idea:

1. Create a function that calls:
   https://api.github.com/users/YOUR_USERNAME/repos

2. Store the response in state.

3. Replace the placeholder projects array with the GitHub repo data.

Example fields to use:
- repo.name
- repo.description
- repo.html_url
- repo.homepage
- repo.language
*/
