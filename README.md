# Personal Website

A portfolio site built with React, TypeScript, Vite, and React Router. It includes an About section, GitHub-backed projects, professional experience cards, and a dedicated resume page.

## What’s on the site

- **About** and **Experience** — static content in `src/HomePage.tsx`.
- **Projects** — titles are shown on each card; choose **More** to open the GitHub description, languages (topics or primary language from the API), and a link to the repository on GitHub.
- **Resume** — **View resume** goes to `/resume`, which embeds your PDF and includes a back link to the home page.

## GitHub data

Projects are not hard-coded in the UI. A small script fetches metadata for a fixed list of repositories and writes `src/data/githubProjects.json`.

- **Script:** `scripts/fetch-github-projects.mjs` (owner and repo names are configured at the top of that file).
- **Refresh data:** `npm run fetch-projects` (updates the JSON on disk).
- **Production builds:** `npm run build` runs `fetch-projects` first via `prebuild`, so deploys pick up the latest public repo metadata.

Optional: set `GITHUB_TOKEN` in your environment when running the script for higher GitHub API rate limits. The token is only used at build or fetch time, not in the browser.

### Editing what appears on each project card

On GitHub, open the repository, then use **About** (gear icon):

- **Description** — short plain text; shown as the project description when a card is expanded.
- **Topics** — used as “Languages used” tags when present; otherwise the repo’s primary language from the API is shown as a single tag.

## How to run locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open the URL printed in the terminal. For up-to-date project data after changing a repo on GitHub, run `npm run fetch-projects` once (the dev server does not run that step automatically).

## Build for production

```bash
npm run build
```

Output is written to `dist/`.

## Resume PDF

Place the PDF in `public/` and keep the path in sync with `src/ResumePage.tsx` (currently `Nolan_McDonald_Resume.pdf`). The home page **View resume** link navigates to `/resume`, which loads that file in the page.
