import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import SectionLabel from "../components/SectionLabel";
import journalPosts from "../data/journalPosts";

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

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

function PostCard({ slug, title, subtitle, date, category, hook }) {
  return (
    <Link
      to={`/journal/${slug}`}
      className="group block no-underline border-t border-khadi py-10 lg:py-12 transition-colors duration-300 hover:bg-bone/30"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left — metadata */}
        <div className="lg:col-span-3">
          <div className="flex lg:flex-col items-center lg:items-start gap-3 lg:gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wideMono text-vermilion">
              {category}
            </span>
            <span className="font-mono text-[10px] text-ash lg:hidden">·</span>
            <span className="font-mono text-[11px] text-ash">
              {formatDate(date)}
            </span>
          </div>
        </div>

        {/* Center — title and hook */}
        <div className="lg:col-span-7">
          <h2 className="font-serif text-pillar font-normal text-indigo mb-3 transition-colors duration-300 group-hover:text-graphite">
            {title}
          </h2>
          {subtitle && (
            <p className="font-serif text-[17px] text-indigo/50 mb-4 leading-[1.4]" style={{ fontStyle: 'italic' }}>
              {subtitle}
            </p>
          )}
          <p className="font-sans text-[15px] leading-[1.62] text-indigo/60 max-w-[560px]">
            {hook}
          </p>
        </div>

        {/* Right — read link */}
        <div className="lg:col-span-2 flex lg:justify-end lg:items-start lg:pt-2">
          <span className="font-mono text-xs uppercase tracking-wideMono text-vermilion transition-colors group-hover:text-indigo">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}

function setOgUrl(url) {
  let el = document.querySelector('meta[property="og:url"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", "og:url");
    document.head.appendChild(el);
  }
  el.setAttribute("content", url);
}

export default function JournalPage() {
  useEffect(() => {
    document.title = "The Journal — Bombay Blanc";
    setCanonical("https://www.bombayblanc.com/journal");
    setOgUrl("https://www.bombayblanc.com/journal");
  }, []);

  return (
    <section className="pt-[148px] pb-24" style={{ background: "#F2EBDA" }}>
      <div className="section-container">
        <Reveal>
          <div className="vermilion-line mb-6" />
        </Reveal>

        <SectionLabel>The Journal</SectionLabel>

        <Reveal>
          <h1 className="font-serif text-pillar font-normal text-indigo mb-4">
            Observations from the production floor.
          </h1>
          <p className="font-sans text-[16px] leading-[1.62] text-indigo/60 max-w-[480px] mb-16">
            Craft, process, and the India-Singapore bridge — from a founder
            who has been on both sides of the conversation for twenty years.
          </p>
        </Reveal>

        {/* Editorial list layout — one post per row */}
        <div>
          {journalPosts.map((post) => (
            <Reveal key={post.slug}>
              <PostCard {...post} />
            </Reveal>
          ))}
          {/* Bottom rule */}
          <div className="border-t border-khadi" />
        </div>
      </div>
    </section>
  );
}
