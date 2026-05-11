# Personal Website

A barebones expandable personal website built with React, TypeScript, and Vite.

## Sections

- About Me
- Projects
- Resume

The project cards and resume cards are expandable. The projects section currently uses placeholder data, but it is structured so you can later replace it with GitHub API data.

## How to Run

First install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in your terminal.

## Build for Production

```bash
npm run build
```

## Resume File

Put your resume PDF in the `public` folder and name it:

```text
resume.pdf
```

Then the `View Resume` button will work.

## Future GitHub Project Pull

Later, replace the local `projects` array in `src/App.tsx` with data from:

```text
https://api.github.com/users/YOUR_USERNAME/repos
```
