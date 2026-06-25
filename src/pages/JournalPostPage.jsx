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
    setMeta("og:url", `https://www.bombayblanc.com/journal/${post.slug}/`);
    if (post.heroImage) setMeta("og:image", `https://www.bombayblanc.com${post.heroImage}`);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://www.bombayblanc.com/journal/${post.slug}/`);

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
      mainEntityOfPage: `https://www.bombayblanc.com/journal/${post.slug}/`,
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

  return (
    <article className="pt-[148px] pb-24" style={{ background: "#F2EBDA" }}>
      {/* ── Header — centered, narrow ── */}
      <div className="section-container" style={{ maxWidth: '780px' }}>
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
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: '1.05', letterSpacing: '-0.035em' }}
          >
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="font-serif text-indigo/50 mb-8"
              style={{ fontSize: 'clamp(17px, 1.8vw, 22px)', lineHeight: '1.35', fontStyle: 'italic' }}
            >
              {post.subtitle}
            </p>
          )}
        </Reveal>

        <Reveal>
          <div className="flex items-center gap-6 mb-12">
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
          <div className="section-container mb-14" style={{ maxWidth: '1100px' }}>
            <div className="relative overflow-hidden" style={{ maxHeight: '480px' }}>
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
              {/* Bottom blend */}
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: '25%', background: 'linear-gradient(to top, #F2EBDA, transparent)' }}
              />
            </div>
            {post.articleImageCaption && (
              <p className="font-mono text-[10px] uppercase tracking-wideMono text-ash mt-3 text-right">
                {post.articleImageCaption}
              </p>
            )}
          </div>
        </Reveal>
      )}

      {/* ── Lede — drop cap, larger serif ── */}
      <div className="section-container" style={{ maxWidth: '780px' }}>
        {lede && (
          <Reveal>
            <p
              className="font-serif text-indigo mb-12"
              style={{ fontSize: 'clamp(18px, 1.5vw, 21px)', lineHeight: '1.65' }}
            >
              <span
                className="float-left font-serif text-vermilion"
                style={{
                  fontSize: '72px',
                  lineHeight: '0.8',
                  paddingTop: '4px',
                  paddingRight: '12px',
                  paddingBottom: '4px',
                }}
              >
                {lede.content.charAt(0)}
              </span>
              {lede.content.slice(1)}
            </p>
          </Reveal>
        )}
      </div>

      {/* ── Body — two-column grid on desktop ── */}
      <div className="section-container" style={{ maxWidth: '960px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-14">
          {/* Split remaining blocks roughly in half across two columns */}
          {(() => {
            // Flatten into renderable blocks
            const allBlocks = remaining.map((block, i) => ({ ...block, key: i }));
            const midpoint = Math.ceil(allBlocks.length / 2);
            const leftCol = allBlocks.slice(0, midpoint);
            const rightCol = allBlocks.slice(midpoint);

            function renderBlock(block, isFirst) {
              if (block.type === "heading") {
                return (
                  <h2
                    key={`h-${block.key}`}
                    className="font-serif font-normal text-indigo mt-8 mb-3"
                    style={{ fontSize: 'clamp(22px, 2vw, 28px)', lineHeight: '1.12', letterSpacing: '-0.02em' }}
                  >
                    {block.content}
                  </h2>
                );
              }
              return (
                <p
                  key={`p-${block.key}`}
                  className="font-sans text-indigo mb-5"
                  style={{
                    fontSize: '15.5px',
                    lineHeight: '1.75',
                    textIndent: !isFirst ? '1.5em' : '0',
                  }}
                >
                  {block.content}
                </p>
              );
            }

            return (
              <>
                <Reveal>
                  <div className="lg:border-r lg:border-khadi lg:pr-14">
                    {leftCol.map((block, i) => {
                      const prevIsHeading = i > 0 && leftCol[i - 1].type === "heading";
                      const isFirstAfterHeading = block.type === "text" && (i === 0 || prevIsHeading);
                      return renderBlock(block, isFirstAfterHeading);
                    })}
                  </div>
                </Reveal>
                <Reveal>
                  <div>
                    {rightCol.map((block, i) => {
                      const prevIsHeading = i > 0 && rightCol[i - 1].type === "heading";
                      const isFirstAfterHeading = block.type === "text" && (i === 0 || prevIsHeading);
                      return renderBlock(block, isFirstAfterHeading);
                    })}
                  </div>
                </Reveal>
              </>
            );
          })()}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="section-container" style={{ maxWidth: '780px' }}>
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
