# AGENTS.md

This document serves as the primary system instruction manual and repository reference for autonomous coding agents, LLM-based assistants (like Copilot, Cursor, Claude Code, or open-source equivalents), and human developers working in this codebase.

## Overview & Architecture

This repository is a modern React web application built on **Gatsby** (v5). It employs a hybrid styling approach using `styled-components`, standard CSS (`layout.css`), and Sass (`gatsby-plugin-sass`). It acts as a performant static site generator (SSG) with robust SEO optimizations.

**Key Technologies:**

- **Framework:** Gatsby (React 18)
- **Styling:** `styled-components`, Sass (`scss/` dir), and global CSS
- **Data Fetching:** GraphQL (Gatsby's `useStaticQuery` and page-level queries)
- **Languages:** JavaScript (ES6+), JSX, and transitioning to TypeScript

---

## Content Locations

- **Blog Posts (MDX):** `src/posts/`
  - Frontmatter typically includes: `title`, `date`, `description`, `image`, `type`, `slug`
- **Blog Images:** `static/images/blog/`
  - Frontmatter `image` paths reference `/images/blog/<file>`

---

## Post Generation CLI (No LLM)

Use the local CLI to create blog posts from **provided** text and images. The repository does **not** generate content with an LLM.

- **Script:** `scripts/create-post.mjs`
- **Output:**
  - Post file: `src/posts/NN_slug.mdx` (auto-incremented)
  - Image file: `static/images/blog/<slug>.<ext>`
- **Required inputs:** `title`, `date` (`YYYY-MM-DD`), `description`, `body`, `imagePath`
- **Optional:** `slug`, `type` (defaults to `blog`)
- **CTA insertion:** A Calendly CTA is inserted by default in the first third or middle. Disable with `--no-cta` or `ctaEnabled: false`. Override with `--cta-html` and `--cta-position`, or place `<!-- CTA -->` in the body to force location.

Example (body file):
```bash
node scripts/create-post.mjs \
  --title "Post title" \
  --date 2026-03-13 \
  --description "Short summary" \
  --body-file /path/to/body.md \
  --image-path /path/to/image.jpg
```

Example (JSON):
```bash
node scripts/create-post.mjs --json /path/to/post.json
```

## Build, Lint, and Test Commands

Agents must strictly adhere to the following commands to verify their changes locally before submitting them or finalizing a task.

### Development & Build

- **Start Development Server:**
  ```bash
  npm run start
  # or
  npm run develop
  ```
  Runs on `http://localhost:8000`. Use `npm run develop-refresh` to enable the Gatsby refresh endpoint if webhooks are being tested.
- **Production Build:**
  ```bash
  npm run build
  ```
- **Clean Cache:**
  ```bash
  npm run clean
  ```
  _Agent Note:_ Always run `npm run clean` if you encounter unexpected GraphQL schema errors or stale build artifacts after adding new Gatsby plugins or changing `gatsby-config.js`.

### Formatting & Linting

- **Format Codebase:**
  ```bash
  npm run format
  ```
  This command runs Prettier across all `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, and `.md` files. Agents **must** format code before finishing a task to maintain style consistency.
- **Linting:** Currently, ESLint is not explicitly configured via package scripts. Ensure your IDE or agent strictly adheres to standard React Hooks rules (`eslint-plugin-react-hooks`) organically.

### Testing (Single & Suite)

_Note: A formal test suite (e.g., Jest + React Testing Library) is currently pending setup in this repository (`npm test` currently exits with an error footprint)._

When a testing framework is configured (e.g., Jest), agents should follow these testing paradigms:

- **Run the full test suite:**
  ```bash
  npm test
  ```
- **Run a single test file (Important for Agents):**
  ```bash
  npx jest src/components/Navbar.test.js
  # or
  npm test -- src/components/Navbar.test.js
  ```
- **Test Structure:** Place tests adjacent to the component they are testing (e.g., `Navbar.js` alongside `Navbar.test.js`).
- Agents are encouraged to proactively write unit tests for critical UI components using `@testing-library/react` once initialized.

---

## Code Style Guidelines

Agents must mimic the existing project style, writing highly readable, idiomatic React code.

### 1. File & Naming Conventions

- **React Components:** Use `PascalCase` for both filenames and component names (e.g., `Navbar.js`, `Layout.js`).
- **Utility/Helper Files:** Use `camelCase` or `kebab-case` (e.g., `portfolio-mdx.js`, `navigation.yml`).
- **Constants:** Use `UPPER_SNAKE_CASE` for global constants.
- **Variables/Functions:** Use `camelCase` for variables, state items, and functional helpers.

### 2. Component Architecture

- Use **Functional Components** exclusively. Do not write React Class components.
- Rely on **React Hooks** (`useState`, `useEffect`, `useCallback`) for state management and side effects.
- Destructure props directly in the component signature:
  ```javascript
  const MyComponent = ({ title, isActive, children }) => { ... }
  ```
- Use `PropTypes` for runtime type checking in existing JavaScript files (e.g., `children: PropTypes.node.isRequired`).

### 3. TypeScript (Migration Path)

While the codebase is predominantly JavaScript, TypeScript is installed in `package.json` (`v4.9.5`).

- **New Files:** Agents should proactively prefer creating `.tsx` or `.ts` files for new components and utilities.
- **Interfaces:** Define clear `interface` or `type` contracts for all component props in TS.
- Avoid the `any` type; use `unknown` if the type is truly dynamic, and narrow it down safely.

### 4. Imports and Exports

- Group imports systematically to maintain a clean header:
  1. Built-in React and Gatsby imports (e.g., `import React, { useState } from "react"; import { Link, graphql } from "gatsby";`).
  2. Third-party libraries (`import styled from "styled-components";`).
  3. Internal local components (`import Navbar from "./Navbar";`).
  4. Data, Styles, and Assets (`import Navigate from "../data/navigation.yml"; import "./layout.css";`).
- Use `export default` for main page elements and UI components. Use named exports for granular utilities.

### 5. Styling

- **Styled Components:** Prefer `styled-components` for component-scoped styling to prevent CSS global scope leakage.
  ```javascript
  const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  `;
  ```
- **Responsive Design:** Implement mobile-first media queries directly within styled-components using `@media` blocks.
- Use the existing SCSS directory (`src/scss/`) primarily for global resets, color variables, typography defaults, or legacy themes.

### 6. Error Handling

- Use `try/catch` blocks strictly around asynchronous external operations or `fetch` calls.
- Handle missing data gracefully. In Gatsby `useStaticQuery`, always use optional chaining (`data?.site?.siteMetadata?.title`) to prevent hard crashes if GraphQL queries return null or undefined during build time.
- `console.log` statements should be strictly removed or limited to `console.error` for caught exceptions before finalizing a task.

---

## AI Agent Directives & RTK (Rust Token Killer)

The environment incorporates **RTK (Rust Token Killer)**, a token-optimized CLI proxy designed to save LLM tokens (60-90% savings) during autonomous coding.

### Using RTK

- **Transparent Hook:** The `rtk` proxy is automatically hooked for standard shell commands (e.g., `git status` automatically routes through RTK to prevent massive console output bloat). Agents do not need to manually prefix commands unless debugging.
- **Analytics:** Agents can run `rtk gain` to review token savings or `rtk gain --history` for past command histories.
- **Debugging:** If the filtered output from a command is missing critical diagnostic info, run the command explicitly via proxy: `rtk proxy <cmd>` to get the raw, unfiltered output.
- **Discovery:** Run `rtk discover` to analyze command usage and identify missed optimization opportunities.

### General Agent Workflow

1. **Understand Context:** Use parallel `glob` and `grep` calls. Review `package.json` for dependencies and `gatsby-node.js` / `gatsby-config.js` for project configuration.
2. **Plan & Confirm:** For substantial changes, outline file creations/modifications clearly before proceeding. Use `read` frequently to not make assumptions.
3. **Execute & Verify:** Make incremental edits. Run `npm run format` after modifying `.js`/`.jsx` files to ensure Prettier constraints are met. Always ensure the build (`npm run build`) doesn't break due to GraphQL schema updates.
