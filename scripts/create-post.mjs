import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const postsDir = path.join(repoRoot, "src", "posts");
const imagesDir = path.join(repoRoot, "static", "images", "blog");
const defaultCtaHtml = [
  '<a href="https://calendly.com/selim_cypherx_tech" target="_blank" rel="noopener noreferrer">',
  "Schedule a call",
  "</a>",
].join("\n");

const args = process.argv.slice(2);

function hasFlag(flag) {
  return args.includes(flag);
}

function getArg(flag) {
  const idx = args.indexOf(flag);
  if (idx === -1) return null;
  const value = args[idx + 1];
  if (!value || value.startsWith("--")) return null;
  return value;
}

function exitWithError(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function printHelp() {
  const helpText = `\
Create a CypherX blog post (MDX) from provided text and image.

Usage:
  node scripts/create-post.mjs --title "..." --date YYYY-MM-DD --description "..." \
    --body-file /path/to/body.md --image-path /path/to/image.jpg [--slug my-slug] [--git] [--push]

  cat /path/to/body.md | node scripts/create-post.mjs --title "..." --date YYYY-MM-DD \
    --description "..." --image-path /path/to/image.jpg

  node scripts/create-post.mjs --json /path/to/post.json [--git] [--push]

JSON input format (example):
{
  "title": "Post title",
  "date": "2026-03-13",
  "description": "Short summary for SEO",
  "body": "Markdown or MDX body...",
  "imagePath": "/abs/path/to/image.jpg",
  "slug": "optional-slug",
  "type": "blog",
  "ctaHtml": "<a href=\\"https://calendly.com/selim_cypherx_tech\\" ...>Schedule a call</a>",
  "ctaPosition": "auto",
  "ctaEnabled": true
}

Notes:
- Description is required and must be provided (no auto-generation).
- Image is always provided and is copied into static/images/blog.
- Output file format: NN_slug.mdx (auto-increment NN).
- A Calendly CTA is inserted by default. Disable with --no-cta.
- Use --cta-html to override the CTA block and --cta-position to place it.
- Use the <!-- CTA --> placeholder in the body to force CTA placement.
`;
  console.log(helpText);
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function yamlValue(value) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  const needsQuotes =
    str.length === 0 ||
    /[:\n"\\]/.test(str) ||
    /^\s|\s$/.test(str) ||
    /^(true|false|null|~)$/i.test(str) ||
    /^[-?:]|^\d{4}-\d{2}-\d{2}$/.test(str);
  if (!needsQuotes) return str;
  const escaped = str.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
  return `"${escaped}"`;
}

async function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", (err) => reject(err));
  });
}

async function loadJson(jsonPath) {
  const raw = await fs.readFile(jsonPath, "utf8");
  try {
    return JSON.parse(raw);
  } catch (error) {
    exitWithError(`Invalid JSON in ${jsonPath}: ${error.message}`);
  }
}

function runGit(argsList, cwd) {
  const result = spawnSync("git", argsList, { cwd, stdio: "inherit" });
  if (result.status !== 0) {
    exitWithError(`Git command failed: git ${argsList.join(" ")}`);
  }
}

async function getNextPostNumber() {
  const entries = await fs.readdir(postsDir);
  let max = 0;
  for (const name of entries) {
    const match = name.match(/^(\d+)/);
    if (match) {
      const value = Number.parseInt(match[1], 10);
      if (!Number.isNaN(value)) max = Math.max(max, value);
    }
  }
  return max + 1;
}

function resolveCtaIndex(paragraphs, position) {
  if (!position || position === "auto") {
    if (paragraphs.length >= 6) return Math.max(1, Math.floor(paragraphs.length / 3));
    if (paragraphs.length >= 3) return Math.max(1, Math.floor(paragraphs.length / 2));
    return paragraphs.length;
  }
  if (position === "first-third") return Math.max(1, Math.floor(paragraphs.length / 3));
  if (position === "middle") return Math.max(1, Math.floor(paragraphs.length / 2));
  if (position === "end") return paragraphs.length;
  const afterMatch = position.match(/^after:(\d+)$/);
  if (afterMatch) {
    const after = Math.max(1, Number.parseInt(afterMatch[1], 10));
    return Math.min(paragraphs.length, after);
  }
  return Math.max(1, Math.floor(paragraphs.length / 2));
}

function applyCta(body, options) {
  if (!options.enabled || !options.html) return body;
  if (body.includes("calendly.com/selim_cypherx_tech")) return body;
  if (body.includes("<!-- CTA -->")) {
    return body.replace("<!-- CTA -->", options.html);
  }

  const paragraphs = body.split(/\n\s*\n/);
  if (paragraphs.length < 2) {
    return `${body}\n\n${options.html}`;
  }

  const insertIndex = resolveCtaIndex(paragraphs, options.position);
  if (insertIndex >= paragraphs.length) {
    return `${body}\n\n${options.html}`;
  }

  const updated = [...paragraphs];
  updated.splice(insertIndex, 0, options.html);
  return updated.join("\n\n");
}

async function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    printHelp();
    return;
  }

  if (hasFlag("--push") && !hasFlag("--git")) {
    exitWithError("--push requires --git");
  }

  const jsonPath = getArg("--json");
  const bodyFile = getArg("--body-file");
  const bodyArg = getArg("--body");

  let input = {};
  if (jsonPath) {
    const resolvedJsonPath = path.resolve(process.cwd(), jsonPath);
    if (!existsSync(resolvedJsonPath)) {
      exitWithError(`JSON file not found: ${resolvedJsonPath}`);
    }
    input = await loadJson(resolvedJsonPath);
  }

  const overrides = {
    title: getArg("--title"),
    date: getArg("--date"),
    description: getArg("--description"),
    slug: getArg("--slug"),
    type: getArg("--type"),
    imagePath: getArg("--image-path"),
    body: bodyArg,
    bodyFile: bodyFile,
    ctaHtml: getArg("--cta-html"),
    ctaPosition: getArg("--cta-position"),
  };
  if (hasFlag("--no-cta")) {
    overrides.ctaEnabled = false;
  }

  const data = { ...input };
  for (const [key, value] of Object.entries(overrides)) {
    if (value !== null && value !== undefined) data[key] = value;
  }

  let body = data.body;

  if (!body && data.bodyFile) {
    const resolvedBodyPath = path.resolve(process.cwd(), data.bodyFile);
    if (!existsSync(resolvedBodyPath)) {
      exitWithError(`Body file not found: ${resolvedBodyPath}`);
    }
    body = await fs.readFile(resolvedBodyPath, "utf8");
  }

  if (!body && !process.stdin.isTTY) {
    body = await readStdin();
  }

  const title = data.title;
  const date = data.date;
  const description = data.description;
  const imagePath = data.imagePath;
  const type = data.type || "blog";
  const ctaEnabled = data.ctaEnabled !== undefined ? data.ctaEnabled : true;
  const ctaHtml = data.ctaHtml || defaultCtaHtml;
  const ctaPosition = data.ctaPosition || "auto";

  if (!title) exitWithError("Missing required field: title");
  if (!date) exitWithError("Missing required field: date");
  if (!description) exitWithError("Missing required field: description");
  if (!imagePath) exitWithError("Missing required field: imagePath");
  if (!body) exitWithError("Missing required field: body");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    exitWithError(`Invalid date format: ${date} (expected YYYY-MM-DD)`);
  }

  const slug = data.slug ? String(data.slug) : slugify(title);
  if (!slug) exitWithError("Unable to derive slug from title; provide --slug");

  const resolvedImagePath = path.resolve(process.cwd(), imagePath);
  if (!existsSync(resolvedImagePath)) {
    exitWithError(`Image not found: ${resolvedImagePath}`);
  }

  await fs.mkdir(imagesDir, { recursive: true });

  const ext = path.extname(resolvedImagePath) || ".jpg";
  const imageFileName = `${slug}${ext.toLowerCase()}`;
  const imageDestPath = path.join(imagesDir, imageFileName);

  if (existsSync(imageDestPath) && !hasFlag("--overwrite")) {
    exitWithError(`Image already exists: ${imageDestPath} (use --overwrite to replace)`);
  }

  await fs.copyFile(resolvedImagePath, imageDestPath);

  const postNumber = await getNextPostNumber();
  const postFileName = `${postNumber}_${slug}.mdx`;
  const postPath = path.join(postsDir, postFileName);

  if (existsSync(postPath)) {
    exitWithError(`Post file already exists: ${postPath}`);
  }

  const normalizedBody = String(body).replace(/\r\n/g, "\n").trim();
  const bodyWithCta = applyCta(normalizedBody, {
    enabled: ctaEnabled,
    html: ctaHtml,
    position: ctaPosition,
  });
  const frontmatter = [
    "---",
    `title: ${yamlValue(title)}`,
    `date: ${date}`,
    `description: ${yamlValue(description)}`,
    `image: ${yamlValue(`/images/blog/${imageFileName}`)}`,
    `type: ${yamlValue(type)}`,
    `slug: ${yamlValue(slug)}`,
    "---",
  ].join("\n");

  const mdx = `${frontmatter}\n\n${bodyWithCta}\n`;
  await fs.writeFile(postPath, mdx, "utf8");

  if (hasFlag("--git")) {
    let branchName = `codex/${slug}`;
    const branchCheck = spawnSync("git", ["rev-parse", "--verify", branchName], {
      cwd: repoRoot,
      stdio: "ignore",
    });
    if (branchCheck.status === 0) {
      branchName = `codex/${slug}-${Date.now()}`;
    }

    runGit(["checkout", "-b", branchName], repoRoot);
    runGit(["add", postPath, imageDestPath], repoRoot);
    runGit(["commit", "-m", `Add blog post: ${slug}`], repoRoot);

    if (hasFlag("--push")) {
      runGit(["push", "-u", "origin", branchName], repoRoot);
    }
  }

  console.log(`Post created: ${postPath}`);
  console.log(`Image copied: ${imageDestPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
