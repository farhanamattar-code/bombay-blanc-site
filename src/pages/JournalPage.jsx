import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import SectionLabel from "../components/SectionLabel";
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

function PostCard({ slug, title, date, category, hook, heroImage, heroAlt }) {
  return (
    <Link
      to={`/journal/${slug}`}
      className="group block no-underline border border-khadi bg-bone/40 transition-shadow duration-400 hover:shadow-md"
    >
      <div className="w-full relative overflow-hidden" style={{ paddingTop: "56.25%" }}>
        <img
          src={heroImage}
          alt={heroAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-film group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs uppercase tracking-wideMono text-ash">
            {category}
          </span>
          <span className="font-mono text-xs text-ash">·</span>
          <span className="font-mono text-xs text-ash">
            {formatDate(date)}
          </span>
        </div>
        <h2 className="font-serif text-pillar font-normal text-indigo mb-3">
          {title}
        </h2>
        <p className="font-sans text-[15px] leading-[1.58] text-indigo/70">
          {hook}
        </p>
        <p className="font-mono text-xs uppercase tracking-wideMono text-vermilion mt-4 transition-colors group-hover:text-indigo">
          Read →
        </p>
      </div>
    </Link>
  );
}

export default function JournalPage() {
  return (
    <section className="pt-[148px] pb-20" style={{ background: "#F2EBDA" }}>
      <div className="section-container">
        <Reveal>
          <div className="vermilion-line mb-6" />
        </Reveal>

        <SectionLabel>The Journal</SectionLabel>

        <Reveal>
          <h1 className="font-serif text-h2 font-normal text-indigo mb-4">
            Observations from<br />the production floor.
          </h1>
          <p className="font-sans text-[17px] leading-[1.62] text-indigo/70 max-w-[520px] mb-14">
            Craft, process, and the India-Singapore bridge — from a founder
            who has been on both sides of the conversation for twenty years.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {journalPosts.map((post) => (
            <Reveal key={post.slug}>
              <PostCard {...post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
