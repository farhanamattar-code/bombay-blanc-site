// Cloudflare Pages Edge Middleware
// Injects route-specific meta tags into the SPA's index.html on the fly,
// so LinkedIn / Twitter / Bing / AI crawlers (which do NOT execute JS) see
// the correct title, description, OG image and canonical for /journal/* and
// /work/* routes. React still mounts and runs normally for real users.
//
// Add new entries to ROUTE_META whenever a new journal post or case study
// goes live. Keep this file in sync with src/data/journalPosts.js + caseStudies.js.

const SITE = "https://www.bombayblanc.com";

const ROUTE_META = {
  "/journal/the-fifth-wall": {
    title: "The Fifth Wall — Bombay Blanc Journal",
    description:
      "There is a new wall in content. The fourth wall separates performer from audience. The fifth wall separates their world from yours. When it breaks, the brand moves into your life.",
    image: `${SITE}/images/hana-mattar-the-fifth-wall-geography-of-intimacy-bombay-blanc-og.jpg`,
    type: "article",
  },
  "/journal/india-sea-bridge": {
    title: "The India-Singapore Production Bridge — Bombay Blanc Journal",
    description:
      "Why the India-Singapore production corridor is the best-kept secret in Asian content. Speed, craft, and a standard learned in Scandinavia.",
    image: `${SITE}/images/journal-india-sea-bridge.jpeg`,
    type: "article",
  },
  "/journal": {
    title: "The Journal — Bombay Blanc",
    description:
      "Observations from the production floor. Craft, process, and the India-Singapore bridge — from a founder who has been on both sides of the conversation for twenty years.",
    image: `${SITE}/images/og-image.jpg`,
    type: "website",
  },
};

class MetaRewriter {
  constructor(meta, canonicalUrl) {
    this.meta = meta;
    this.canonicalUrl = canonicalUrl;
    this.headEndInjected = false;
  }
  element(element) {
    const tag = element.tagName;
    const name = element.getAttribute("name");
    const prop = element.getAttribute("property");

    if (tag === "title") {
      element.setInnerContent(this.meta.title);
    } else if (tag === "meta") {
      if (name === "description") element.setAttribute("content", this.meta.description);
      else if (prop === "og:title") element.setAttribute("content", this.meta.title);
      else if (prop === "og:description") element.setAttribute("content", this.meta.description);
      else if (prop === "og:image") element.setAttribute("content", this.meta.image);
      else if (prop === "og:type") element.setAttribute("content", this.meta.type);
      else if (name === "twitter:title") element.setAttribute("content", this.meta.title);
      else if (name === "twitter:description") element.setAttribute("content", this.meta.description);
      else if (name === "twitter:image") element.setAttribute("content", this.meta.image);
    } else if (tag === "head" && !this.headEndInjected) {
      // Inject og:url and canonical link
      element.append(
        `<meta property="og:url" content="${this.canonicalUrl}" />\n` +
        `<link rel="canonical" href="${this.canonicalUrl}" />`,
        { html: true }
      );
      this.headEndInjected = true;
    }
  }
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname.replace(/\/$/, "") || "/";

  const meta = ROUTE_META[pathname];
  const response = await context.next();

  // Only rewrite HTML responses on matched routes
  const ct = response.headers.get("content-type") || "";
  if (!meta || !ct.includes("text/html")) return response;

  const canonical = `${SITE}${pathname}`;
  return new HTMLRewriter()
    .on("title", new MetaRewriter(meta, canonical))
    .on("meta", new MetaRewriter(meta, canonical))
    .on("head", new MetaRewriter(meta, canonical))
    .transform(response);
}
