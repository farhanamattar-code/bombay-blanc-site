import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import SectionLabel from "./SectionLabel";
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

export default function JournalPreview() {
  const latest = journalPosts.slice(0, 3);

  return (
    <section style={{ background: "#F2EBDA" }}>
      <div className="section-container pt-16 pb-20">
        <Reveal>
          <div className="vermilion-line mb-6" />
        </Reveal>

        <SectionLabel>The Journal</SectionLabel>

        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4">
            <h2 className="font-serif text-h2-work font-normal text-indigo">
              From the<br />production floor.
            </h2>
            <Link
              to="/journal"
              className="font-mono text-xs uppercase tracking-wideMono text-vermilion no-underline transition-colors hover:text-indigo"
            >
              All entries →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {latest.map((post) => (
            <Reveal key={post.slug}>
              <Link
                to={`/journal/${post.slug}`}
                className="group block no-underline border border-khadi bg-bone/40 p-6 lg:p-8 transition-shadow duration-400 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-wideMono text-ash">
                    {post.category}
                  </span>
                  <span className="font-mono text-[10px] text-ash">·</span>
                  <span className="font-mono text-[10px] text-ash">
                    {formatDate(post.date)}
                  </span>
                </div>
                <h3 className="font-serif text-pillar font-normal text-indigo mb-3">
                  {post.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.58] text-indigo/60 mb-4">
                  {post.hook}
                </p>
                <span className="font-mono text-xs uppercase tracking-wideMono text-vermilion transition-colors group-hover:text-indigo">
                  Read →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
