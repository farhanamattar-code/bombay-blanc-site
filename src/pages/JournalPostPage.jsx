import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useReveal } from "../hooks/useReveal";
import journalPosts from "../data/journalPosts";

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function JournalPostPage() {
  const { slug } = useParams();
  const post = journalPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return;
    document.title = post.seoTitle;
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", post.seoDescription);
    setMeta("keywords", post.seoKeywords);
    setMeta("og:title", post.seoTitle);
    setMeta("og:description", post.seoDescription);
    setMeta("og:type", "article");
    setMeta("og:url", `https://www.bombayblanc.com/journal/${post.slug}`);
    if (post.heroImage) setMeta("og:image", `https://www.bombayblanc.com${post.heroImage}`);

    let script = document.querySelector("#article-schema");
    if (!script) {
      script = document.createElement("script");
      script.id = "article-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.seoDescription,
      datePublished: post.date,
      author: { "@type": "Person", name: "Hana Mattar" },
      publisher: {
        "@type": "Organization",
        name: "Bombay Blanc",
        url: "https://www.bombayblanc.com",
      },
      image: post.heroImage ? `https://www.bombayblanc.com${post.heroImage}` : undefined,
      mainEntityOfPage: `https://www.bombayblanc.com/journal/${post.slug}`,
    });

    return () => {
      document.title = "Bombay Blanc — Contained Heat.";
      if (script) script.remove();
    };
  }, [post]);

  if (!post) return <Navigate to="/journal" replace />;

  // Split body into lede (first text block) and rest
  const ledeIndex = post.body.findIndex((b) => b.type === "text");
  const lede = ledeIndex >= 0 ? post.body[ledeIndex] : null;
  const remaining = post.body.filter((_, i) => i !== ledeIndex);

  // Group remaining body into sections split by headings
  const sections = [];
  let currentSection = { heading: null, blocks: [] };
  remaining.forEach((block) => {
    if (block.type === "heading") {
      if (currentSection.heading || currentSection.blocks.length) {
        sections.push(currentSection);
      }
      currentSection = { heading: block.content, blocks: [] };
    } else {
      currentSection.blocks.push(block);
    }
  });
  if (currentSection.heading || currentSection.blocks.length) {
    sections.push(currentSection);
  }

  return (
    <article className="pt-[148px] pb-24" style={{ background: "#F2EBDA" }}>
      {/* ── Header ── */}
      <div className="section-container" style={{ maxWidth: '1200px' }}>
        <Reveal>
          <Link
            to="/journal"
            className="inline-block font-mono text-xs uppercase tracking-wideMono text-ash no-underline mb-10 transition-colors hover:text-indigo"
          >
            ← Back to Journal
          </Link>
        </Reveal>

        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-wideMono text-vermilion">
              {post.category}
            </span>
            <span className="font-mono text-xs text-ash">·</span>
            <span className="font-mono text-xs text-ash">
              {formatDate(post.date)}
            </span>
          </div>
        </Reveal>

        <Reveal>
          <h1 className="font-serif font-normal text-indigo mb-4"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: '1.0', letterSpacing: '-0.04em' }}
          >
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="font-serif text-indigo/50 mb-8"
              style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: '1.35', fontStyle: 'italic' }}
            >
              {post.subtitle}
            </p>
          )}
        </Reveal>

        <Reveal>
          <div className="flex items-center gap-6 mb-10">
            <div className="vermilion-line" style={{ width: '48px' }} />
            <p className="font-mono text-[11px] uppercase tracking-wideMono text-ash">
              By Hana Mattar · Founder, Bombay Blanc
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── Hero image — full-bleed with brand treatment ── */}
      {post.articleImage && (
        <Reveal>
          <div className="relative overflow-hidden mb-16" style={{ maxHeight: '520px' }}>
            <img
              src={post.articleImage}
              alt={post.articleImageAlt || post.heroAlt}
              className="w-full h-full"
              style={{
                objectFit: 'cover',
                objectPosition: 'center 40%',
                filter: 'saturate(0.35) sepia(0.25) contrast(0.92) brightness(1.05)',
              }}
            />
            {/* Grain overlay */}
            <div className="hero-grain" aria-hidden="true" style={{ zIndex: 2, opacity: 0.18 }} />
            {/* Top blend */}
            <div className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{ height: '20%', background: 'linear-gradient(to bottom, #F2EBDA, transparent)' }}
            />
            {/* Bottom blend */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{ height: '30%', background: 'linear-gradient(to top, #F2EBDA, transparent)' }}
            />
            {/* Caption */}
            {post.articleImageCaption && (
              <div className="absolute bottom-4 right-6" style={{ zIndex: 3 }}>
                <span className="font-mono text-[10px] uppercase tracking-wideMono text-indigo/40">
                  {post.articleImageCaption}
                </span>
              </div>
            )}
          </div>
        </Reveal>
      )}

      {/* ── Lede paragraph — drop cap, larger text ── */}
      <div className="section-container" style={{ maxWidth: '1200px' }}>
        {lede && (
          <Reveal>
            <div className="mb-14 lg:mb-16" style={{ maxWidth: '780px' }}>
              <p
                className="font-serif text-indigo leading-[1.55]"
                style={{
                  fontSize: 'clamp(19px, 1.6vw, 23px)',
                  textIndent: '0',
                }}
              >
                <span
                  className="float-left font-serif text-vermilion mr-3"
                  style={{
                    fontSize: 'clamp(64px, 6vw, 96px)',
                    lineHeight: '0.78',
                    paddingTop: '6px',
                    fontWeight: 'normal',
                  }}
                  aria-hidden="true"
                >
                  {lede.content.charAt(0)}
                </span>
                {lede.content.slice(1)}
              </p>
            </div>
          </Reveal>
        )}

        {/* ── Body — two-column editorial layout on desktop ── */}
        <div className="lg:columns-2 lg:gap-12" style={{ columnRule: '1px solid #D8CFBC' }}>
          {sections.map((section, si) => (
            <Reveal key={si}>
              <div style={{ breakInside: 'avoid', marginBottom: si < sections.length - 1 ? '2rem' : '0' }}>
                {section.heading && (
                  <h2
                    className="font-serif font-normal text-indigo mb-4"
                    style={{
                      fontSize: 'clamp(24px, 2.2vw, 32px)',
                      lineHeight: '1.1',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {section.heading}
                  </h2>
                )}
                {section.blocks.map((block, bi) => (
                  <p
                    key={bi}
                    className="font-sans text-indigo mb-5"
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.72',
                      textIndent: bi > 0 ? '2em' : '0',
                    }}
                  >
                    {block.content}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── CTA ── */}
        {post.cta && (
          <Reveal>
            <div className="border-t border-khadi mt-16 pt-12 text-center">
              <p className="font-serif text-indigo mb-5" style={{ fontSize: '20px', fontStyle: 'italic' }}>
                {post.cta.text}
              </p>
              <a
                href={post.cta.link}
                className="inline-flex h-14 items-center justify-between bg-indigo px-8 text-cotton font-mono text-xs uppercase tracking-wideMono no-underline transition-colors duration-300 hover:bg-graphite"
              >
                <span>{post.cta.linkText}</span>
                <span className="ml-8">→</span>
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </article>
  );
}
