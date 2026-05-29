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

  return (
    <article className="pt-[148px] pb-20" style={{ background: "#F2EBDA" }}>
      <div className="section-container max-w-[780px]">
        <Reveal>
          <Link
            to="/journal"
            className="inline-block font-mono text-xs uppercase tracking-wideMono text-ash no-underline mb-8 transition-colors hover:text-indigo"
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
          <h1 className="font-serif text-h2 font-normal text-indigo mb-3">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="font-serif italic text-lg text-indigo/70 mb-8">
              {post.subtitle}
            </p>
          )}
        </Reveal>

        <Reveal>
          <div className="vermilion-line mb-10" />
        </Reveal>

        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wideMono text-ash mb-10">
            By Hana Mattar · Founder, Bombay Blanc
          </p>
        </Reveal>

        <div className="space-y-6">
          {post.body.map((block, i) => (
            <Reveal key={i}>
              {block.type === "heading" ? (
                <h2 className="font-serif text-[22px] font-normal text-indigo mt-10 mb-2">
                  {block.content}
                </h2>
              ) : (
                <p className="font-sans text-[17px] leading-[1.72] text-indigo">
                  {block.content}
                </p>
              )}
            </Reveal>
          ))}
        </div>

        {post.cta && (
          <Reveal>
            <div className="border-t border-khadi mt-14 pt-10 text-center">
              <p className="font-serif italic text-lg text-indigo mb-4">
                {post.cta.text}
              </p>
              <a
                href={post.cta.link}
                className="inline-block bg-graphite text-cotton font-mono text-xs uppercase tracking-wideMono px-8 py-4 no-underline transition-colors duration-300 hover:bg-indigo"
              >
                {post.cta.linkText} →
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </article>
  );
}
