import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const site = "https://cypherx.tech";
const read = (file) => fs.readFileSync(file, "utf8");
const decodeHtml = (value) =>
  value.replace(
    /&(?:amp|lt|gt|quot|apos|#39|#x27|nbsp);/g,
    (entity) =>
      ({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&apos;": "'",
        "&#39;": "'",
        "&#x27;": "'",
        "&nbsp;": " ",
      }[entity])
  );
const meta = (html, pattern) => html.match(pattern)?.[1] || "";
const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name === "index.html") htmlFiles.push(file);
  }
};
walk("public");
assert.ok(htmlFiles.length >= 60);
const expectedBlogRoutes = new Set(
  fs
    .readdirSync("src/posts")
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const frontmatter = read(path.join("src/posts", file)).split("---", 3)[1];
      assert.match(
        frontmatter,
        /^type:\s*["']?blog["']?\s*$/m,
        `${file}: post type`
      );
      const slug = frontmatter.match(/^slug:\s*["']?([^"'\s]+)["']?\s*$/m)?.[1];
      assert.ok(slug && slug !== "null", `${file}: valid blog slug required`);
      return `/blog/${slug.toLowerCase()}/`;
    })
);
const homeLinks = new Set(
  [
    ...read("public/index.html").matchAll(/<a\b[^>]*href="([^"]+)"/g),
  ].map((match) =>
    new URL(decodeHtml(match[1]), site).pathname.replace(/\/?$/, "/")
  )
);
const routeFor = (file) => {
  const relative = path.relative("public", path.dirname(file));
  return relative ? `/${relative.replaceAll(path.sep, "/")}/` : "/";
};
const parseSchema = (html, file) => {
  const raw = html.match(
    /<script[^>]*type="application\/ld\+json"[^>]*>([^<]+)<\/script>/
  )?.[1];
  assert.ok(raw, `${file}: JSON-LD`);
  return JSON.parse(raw.replace(/&quot;/g, '"').replace(/\\u003c/g, "<"));
};

for (const file of htmlFiles) {
  const html = read(file);
  const route = routeFor(file);
  const is404 = route === "/404/" || file.endsWith("404.html");
  const title = decodeHtml(meta(html, /<title[^>]*>([^<]+)<\/title>/));
  const description = decodeHtml(
    meta(html, /<meta name="description"[^>]+content="([^"]+)"/)
  );
  assert.ok(title, `${file}: title`);
  assert.ok(description, `${file}: description`);
  const canonicals = [
    ...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g),
  ].map((m) => m[1]);
  if (!is404) {
    assert.equal(canonicals.length, 1, `${file}: canonical count`);
    assert.equal(
      canonicals[0],
      route === "/" ? `${site}/` : `${site}${route}`,
      `${file}: canonical`
    );
    assert.ok(
      meta(html, /<meta property="og:title"[^>]+content="([^"]+)"/),
      `${file}: og:title`
    );
    assert.equal(
      meta(html, /<meta property="og:url"[^>]+content="([^"]+)"/),
      canonicals[0],
      `${file}: og:url`
    );
    assert.ok(
      meta(html, /<meta name="twitter:title"[^>]+content="([^"]+)"/),
      `${file}: twitter:title`
    );
    const schema = parseSchema(html, file);
    if (route.startsWith("/blog/") && route !== "/blog/") {
      assert.ok(
        expectedBlogRoutes.has(route),
        `${file}: unexpected non-post blog route`
      );
      assert.equal(schema["@type"], "Article", `${file}: Article type`);
      assert.ok(
        schema.datePublished &&
          Number.isFinite(Date.parse(schema.datePublished)),
        `${file}: Article date`
      );
      assert.equal(
        schema.author?.["@type"],
        "Organization",
        `${file}: author type`
      );
      assert.equal(schema.author?.name, "CypherX", `${file}: author`);
      assert.equal(schema.publisher?.name, "CypherX", `${file}: publisher`);
    }
    for (const pattern of [
      /<meta property="og:image"[^>]+content="([^"]+)"/,
      /<meta name="twitter:image"[^>]+content="([^"]+)"/,
    ]) {
      const image = decodeHtml(meta(html, pattern));
      assert.match(image, /^https:\/\//, `${file}: absolute social image`);
      const imageUrl = new URL(image);
      if (imageUrl.origin === site) {
        const imageFile = path.join(
          "public",
          decodeURIComponent(imageUrl.pathname).replace(/^\//, "")
        );
        assert.ok(
          fs.existsSync(imageFile) && fs.statSync(imageFile).isFile(),
          `${file}: missing image ${image}`
        );
      }
    }
  }
}
for (const file of ["public/404.html", "public/404/index.html"]) {
  const html = read(file);
  assert.match(html, /noindex,nofollow/);
  assert.equal(
    decodeHtml(meta(html, /<title[^>]*>([^<]+)<\/title>/)),
    "Page not found | CypherX"
  );
}
const pageData = (route) =>
  JSON.parse(
    read(
      path.join("public/page-data", route.replace(/^\//, ""), "page-data.json")
    )
  ).result;
for (const directory of ["src/features", "src/portfolio"]) {
  for (const file of fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".mdx"))) {
    const route = `/${file.replace(/\.mdx$/, "")}/`;
    assert.ok(
      homeLinks.has(route),
      `${file}: missing homepage service/project link`
    );
    const data = pageData(route).pageContext.frontmatter;
    const html = read(
      path.join("public", file.replace(/\.mdx$/, ""), "index.html")
    );
    assert.equal(
      decodeHtml(meta(html, /<title[^>]*>([^<]+)<\/title>/)),
      `${data.title} | CypherX`
    );
    assert.equal(
      decodeHtml(meta(html, /<meta name="description"[^>]+content="([^"]+)"/)),
      data.description
    );
    const json = parseSchema(html, file);
    assert.equal(json.url, `${site}/${file.replace(/\.mdx$/, "")}/`);
  }
}
for (const file of fs
  .readdirSync("src/posts")
  .filter((name) => name.endsWith(".mdx"))) {
  const slug = read(path.join("src/posts", file))
    .match(/^slug:\s*([^\n]+)/m)?.[1]
    ?.trim();
  const routeSlug = slug.toLowerCase();
  const data = JSON.parse(
    read(path.join("public/page-data/blog", routeSlug, "page-data.json"))
  ).result.data.mdx.frontmatter;
  const html = read(path.join("public/blog", routeSlug, "index.html"));
  assert.equal(
    decodeHtml(meta(html, /<title[^>]*>([^<]+)<\/title>/)),
    `${data.title} | CypherX`
  );
  assert.equal(
    decodeHtml(
      meta(html, /<meta property="og:description"[^>]+content="([^"]+)"/)
    ),
    data.description
  );
  const json = parseSchema(html, file);
  assert.equal(json["@type"], "Article");
  assert.equal(json.url, `${site}/blog/${routeSlug}/`);
  assert.equal(json.headline, data.title);
  assert.equal(json.image, `${site}${data.image}`);
  assert.equal(json.datePublished, new Date(data.date).toISOString());
}
const sitemap = fs
  .readdirSync("public")
  .filter((name) => name.startsWith("sitemap-") && name.endsWith(".xml"))
  .map((name) => read(path.join("public", name)))
  .join("\n");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1]
);
assert.ok(sitemapUrls.includes(`${site}/`));
for (const file of htmlFiles) {
  const route = routeFor(file);
  if (route !== "/" && route !== "/404/")
    assert.ok(
      sitemapUrls.includes(`${site}${route}`),
      `${file}: sitemap coverage`
    );
}
assert.ok(
  !sitemapUrls.some(
    (url) => url.includes("design-prototypes") || url.includes("404")
  )
);
const llms = read("static/llms.txt");
for (const target of [...llms.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(
  (m) => m[1]
)) {
  const route = new URL(target).pathname;
  assert.ok(
    fs.existsSync(path.join("public", route.replace(/^\//, ""), "index.html")),
    `llms target: ${target}`
  );
}
const contact = read("public/contact/index.html");
for (const id of ["contact-name", "contact-email", "contact-message"]) {
  assert.match(contact, new RegExp(`for=\\"${id}\\"`));
  assert.match(contact, new RegExp(`id=\\"${id}\\"`));
}
assert.equal(
  read("public/robots.txt").trim(),
  "User-agent: *\nAllow: /\nSitemap: https://cypherx.tech/sitemap-index.xml\nHost: https://cypherx.tech"
);
console.log(
  `Discovery checks passed across ${htmlFiles.length} generated HTML routes.`
);
