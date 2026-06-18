// Build-time prerender for journal articles.
//
// WHY: the site is a client-rendered React SPA. Cloudflare serves the same
// index.html shell for every route, so a crawler that does not run JavaScript
// (Google's first pass, Bing, LinkedIn's link scraper) sees the HOMEPAGE body
// on every /journal/* URL. functions/_middleware.js already fixes the <head>
// (title, description, OG, canonical, JSON-LD) per route — but the <body> a
// crawler reads is still the homepage fallback, so Google indexes identical
// body content across every journal page and none of them can rank.
//
// WHAT THIS DOES: after `vite build`, for each journal post we take the built
// dist/index.html and replace ONLY the #root fallback with the real article
// body (h1, headings, paragraphs, internal links, CTA), writing a static file
// at dist/journal/<slug>/index.html. Cloudflare serves that static file for
// the route (static assets take precedence over the /* SPA rewrite), so the
// real article HTML is in the raw response. React still mounts and replaces
// #root for human visitors (createRoot().render clears #root — no hydration
// mismatch). The <head> is deliberately left untouched here: the edge
// middleware owns per-route head meta, so we avoid duplicate canonical/OG tags.
//
// SOURCE OF TRUTH: src/data/journalPosts.js. Add a post there and it is
// prerendered automatically on the next build — nothing to edit in this file.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import journalPosts from "../src/data/journalPosts.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = process.env.PRERENDER_DIST || join(__dirname, "..", "dist");
const TEMPLATE_PATH = join(DIST, "index.html");

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function fmtDate(d) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Replace the inner content of <div id="root"> using a balanced-tag scan,
// so we don't depend on where Vite places the module <script> after build.
function replaceRootInner(html, inner) {
  const marker = '<div id="root">';
  const start = html.indexOf(marker);
  if (start === -1) return null;
  const contentStart = start + marker.length;
  const re = /<div\b[^>]*>|<\/div>/g;
  re.lastIndex = contentStart;
  let depth = 1;
  let m;
  let closeStart = -1;
  while ((m = re.exec(html))) {
    if (m[0].startsWith("</div")) {
      depth--;
      if (depth === 0) {
        closeStart = m.index;
        break;
      }
    } else {
      depth++;
    }
  }
  if (closeStart === -1) return null;
  return html.slice(0, contentStart) + inner + html.slice(closeStart);
}

function renderArticle(post) {
  const blocks = post.body
    .map((b) =>
      b.type === "heading"
        ? `<h2 style="font-family:Georgia,serif;font-weight:400;font-size:28px;color:#1B2D4A;line-height:1.12;letter-spacing:-0.02em;margin:36px 0 12px">${esc(b.content)}</h2>`
        : `<p style="font-size:16px;color:#1B2D4A;line-height:1.75;margin:0 0 20px;max-width:680px">${esc(b.content)}</p>`
    )
    .join("\n      ");

  const others = journalPosts
    .filter((p) => p.slug !== post.slug)
    .map(
      (p) =>
        `<a href="/journal/${p.slug}" style="display:block;color:#1B2D4A;font-size:17px;line-height:1.3;margin-bottom:10px;text-decoration:none">${esc(p.title)}</a>`
    )
    .join("\n        ");

  const img = post.articleImage
    ? `<img src="${esc(post.articleImage)}" alt="${esc(post.articleImageAlt || post.heroAlt || post.title)}" style="width:100%;max-width:900px;height:auto;display:block;margin:0 0 40px" />`
    : "";

  const subtitle = post.subtitle
    ? `<p style="font-family:Georgia,serif;font-style:italic;font-size:22px;color:#1B2D4A;opacity:0.6;line-height:1.35;margin:0 0 24px;max-width:680px">${esc(post.subtitle)}</p>`
    : "";

  const cta = post.cta
    ? `<div style="border-top:1px solid #d9cfb8;margin-top:48px;padding-top:32px">
        <p style="font-family:Georgia,serif;font-style:italic;font-size:20px;color:#1B2D4A;margin:0 0 16px">${esc(post.cta.text)}</p>
        <a href="${esc(post.cta.link)}" style="display:inline-block;background:#1B2D4A;color:#F2EBDA;padding:0 32px;height:56px;line-height:56px;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none">${esc(post.cta.linkText)} →</a>
      </div>`
    : "";

  return `
    <article style="font-family:Georgia,serif;background:#F2EBDA;min-height:100vh;padding:120px 48px 72px;max-width:900px;margin:0 auto;box-sizing:border-box">
      <a href="/journal" style="font-family:monospace;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#7A7669;text-decoration:none">← Back to Journal</a>
      <div style="margin-top:32px;font-family:monospace;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#9B2920">${esc(post.category)} · ${esc(fmtDate(post.date))}</div>
      <h1 style="font-family:Georgia,serif;font-weight:400;font-size:clamp(36px,5vw,52px);color:#1B2D4A;line-height:1.05;letter-spacing:-0.03em;margin:16px 0 12px">${esc(post.title)}</h1>
      ${subtitle}
      <div style="font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#7A7669;margin:0 0 40px">By Hana Mattar · Founder, Bombay Blanc</div>
      ${img}
      ${blocks}
      ${cta}
      <div style="margin-top:56px;border-top:1px solid #d9cfb8;padding-top:32px">
        <p style="font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#7A7669;margin:0 0 16px">More from the Journal</p>
        ${others}
      </div>
    </article>`;
}

const template = readFileSync(TEMPLATE_PATH, "utf8");
let written = 0;
const failures = [];

for (const post of journalPosts) {
  const html = replaceRootInner(template, renderArticle(post));
  if (!html) {
    failures.push(post.slug);
    continue;
  }
  const outDir = join(DIST, "journal", post.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  written++;
  console.log(`[prerender] wrote /journal/${post.slug}/index.html`);
}

if (failures.length) {
  console.error(
    `[prerender] FAILED to locate #root for: ${failures.join(", ")}`
  );
  process.exit(1);
}
console.log(`[prerender] done — ${written} journal page(s) prerendered`);
