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
  const featured = latest[0];
  const rest = latest.slice(1);

  return (
    <section className="bg-dusk">
      <div className="section-container pt-20 pb-24">
        <Reveal>
          <div className="vermilion-line mb-6" style={{ background: '#B5352A' }} />
        </Reveal>

        <SectionLabel className="text-khadi/60">The Journal</SectionLabel>

        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-4">
            <h2 className="font-serif text-subhead font-normal text-cotton">
              From the production floor.
            </h2>
            <Link
              to="/journal"
              className="font-mono text-xs uppercase tracking-wideMono text-vermilion no-underline transition-colors hover:text-cotton"
            >
              All entries →
            </Link>
          </div>
        </Reveal>

        {/* Featured post — horizontal editorial layout */}
        <Reveal>
          <Link
            to={`/journal/${featured.slug}`}
            className="group block no-underline"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-khadi/20">
              {/* Left — pull quote accent */}
              <div
                className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between"
                style={{ background: 'rgba(242,235,218,0.06)' }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-wideMono text-khadi/50">
                      {featured.category}
                    </span>
                    <span className="font-mono text-[10px] text-khadi/30">·</span>
                    <span className="font-mono text-[10px] text-khadi/50">
                      {formatDate(featured.date)}
                    </span>
                  </div>
                  <h3 className="font-serif text-pillar font-normal text-cotton mb-6 transition-colors duration-300 group-hover:text-cotton/80">
                    {featured.title}
                  </h3>
                  <div className="vermilion-line mb-6" style={{ background: '#B5352A' }} />
                  <p className="font-sans text-[15px] leading-[1.62] text-khadi/70">
                    {featured.hook}
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-wideMono text-vermilion mt-8 transition-colors group-hover:text-cotton">
                  Read →
                </p>
              </div>

              {/* Right — pull quote / editorial accent */}
              <div
                className="lg:col-span-7 p-8 lg:p-12 flex items-center"
                style={{ background: 'rgba(242,235,218,0.03)' }}
              >
                <blockquote className="font-serif text-subhead font-normal text-cotton/40 leading-[1.2] tracking-heading" style={{ fontStyle: 'italic' }}>
                  "I walked onto a set in Mumbai at 4pm. The entire set was finished by the next morning."
                </blockquote>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* Additional posts — compact row */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {rest.map((post) => (
              <Reveal key={post.slug}>
                <Link
                  to={`/journal/${post.slug}`}
                  className="group block no-underline border border-khadi/20 p-6 lg:p-8 transition-all duration-300 hover:border-khadi/40"
                  style={{ background: 'rgba(242,235,218,0.04)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wideMono text-khadi/50">
                      {post.category}
                    </span>
                    <span className="font-mono text-[10px] text-khadi/30">·</span>
                    <span className="font-mono text-[10px] text-khadi/50">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-serif text-[clamp(22px,2vw,28px)] font-normal text-cotton mb-3 leading-[1.1] tracking-heading">
                    {post.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-[1.58] text-khadi/60 mb-4">
                    {post.hook}
                  </p>
                  <span className="font-mono text-xs uppercase tracking-wideMono text-vermilion transition-colors group-hover:text-cotton">
                    Read →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
