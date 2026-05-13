/**
 * Fetches curated public repos from the GitHub API and writes src/data/githubProjects.json
 *
 * Run: npm run fetch-projects
 * Runs automatically before production build (npm run build).
 *
 * --- How to write your GitHub repo description (shown on the site) ---
 * Edit it on GitHub: repo page → ⚙️ About (gear) → Description.
 * It is a single plain-text line (no Markdown). GitHub may ignore line breaks.
 * Tips: one or two short sentences; say what it does and optionally how (stack);
 * emojis are fine. Add topics in the same About panel for skill tags on the site.
 * Optional "Website" field there becomes the Live Demo link.
 *
 * Optional: set GITHUB_TOKEN in the environment for higher API rate limits during fetch.
 */

import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "src", "data", "githubProjects.json");

const OWNER = "nolanmmcdonald-coder";
const REPOS = ["Terminal-Based-Wordle", "Nolan-s-Personal-Website"];

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function fetchRepo(name) {
  const url = `https://api.github.com/repos/${OWNER}/${name}`;
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json", ...authHeaders() } });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub ${res.status} for ${name}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

function toProject(repo) {
  const text = (repo.description && String(repo.description).trim()) || "";
  const topics = Array.isArray(repo.topics) && repo.topics.length > 0 ? repo.topics : [];
  const tech = topics.length > 0 ? topics : repo.language ? [repo.language] : [];

  const homepage = repo.homepage && String(repo.homepage).trim();

  return {
    name: repo.name,
    description: text,
    longDescription: text,
    tech,
    githubUrl: repo.html_url,
    ...(homepage ? { liveUrl: homepage } : {}),
  };
}

async function main() {
  const projects = [];
  for (const repoName of REPOS) {
    const repo = await fetchRepo(repoName);
    projects.push(toProject(repo));
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    projects,
  };

  writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${OUT} (${projects.length} projects)`);
}

main().catch((err) => {
  console.error(err.message || err);
  if (existsSync(OUT)) {
    console.error("Keeping existing githubProjects.json");
    process.exit(0);
  }
  process.exit(1);
});
