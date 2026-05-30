import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import SectionLabel from "./SectionLabel";
import workPillars from "../data/workPillars";
import caseStudies from "../data/caseStudies";

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function PillarCard({ label, title, body, italic, image, alt, imagePosition = "center" }) {
  return (
    <div className="group flex flex-col border border-khadi bg-bone/40 transition-shadow duration-400 hover:shadow-md">
      {/* Image — full width, fixed 16:9 via padding-top trick (most reliable cross-browser) */}
      <div className="w-full relative overflow-hidden" style={{ paddingTop: '56.25%' }}>
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-film group-hover:scale-[1.02]"
          style={{ objectPosition: imagePosition }}
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col flex-1 p-6 lg:p-8">
        <p className="font-mono text-xs uppercase tracking-wideMono text-indigo mb-4">
          {label}
        </p>
        <h3 className="font-serif text-pillar font-normal text-indigo mb-4 whitespace-pre-line">
          {title}
        </h3>
        <p className="font-sans text-[15px] leading-[1.58] text-indigo mb-6">
          {body}
        </p>
        <div className="border-t border-khadi mb-6" />
        <p className="font-serif italic text-[16px] leading-[1.45] text-indigo mt-auto">
          {italic}
        </p>
      </div>
    </div>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="pt-[72px] pb-20" style={{ background: '#F2EBDA' }}>
      <div className="section-container">

        {/* Header: label + 2-col heading / description */}
        <Reveal>
          <div className="vermilion-line mb-6" />
        </Reveal>

        <SectionLabel>The Work</SectionLabel>

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14 items-end">
            <h2 className="font-serif text-h2-work font-normal text-indigo">
              Three forms.<br />One taste.
            </h2>
            <p className="font-sans text-[17px] leading-[1.62] text-indigo max-w-[480px]">
              Bombay Blanc works across brand, scripted, and unscripted formats —
              not as separate businesses, but as one studio language applied to
              different kinds of stories.
            </p>
          </div>
        </Reveal>

        {/* Cards */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {workPillars.map((pillar) => (
              <PillarCard key={pillar.label} {...pillar} />
            ))}
          </div>
        </Reveal>

        {/* Featured case study */}
        {caseStudies.length > 0 && (
          <Reveal>
            <div className="mt-14 mb-14">
              <p className="font-mono text-[10px] uppercase tracking-wideMono text-ash mb-6">
                Featured Work
              </p>
              {caseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  to={`/work/${cs.slug}`}
                  className="group block border border-khadi bg-bone/40 no-underline transition-shadow duration-400 hover:shadow-md"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div
                      className="lg:col-span-5 relative overflow-hidden"
                      style={{ minHeight: "240px" }}
                    >
                      <img
                        src={cs.heroImage}
                        alt={cs.heroAlt}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-film group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="lg:col-span-7 flex flex-col justify-center p-6 lg:p-10">
                      <p className="font-mono text-[10px] uppercase tracking-wideMono text-vermilion mb-3">
                        {cs.pillar} · {cs.metadata.client}
                      </p>
                      <h3
                        className="font-serif font-normal text-indigo mb-3 whitespace-pre-line"
                        style={{
                          fontSize: "clamp(28px, 2.5vw, 36px)",
                          lineHeight: "1.1",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {cs.title}
                      </h3>
                      <p className="font-sans text-[14px] leading-[1.55] text-ash max-w-[420px] mb-4">
                        {cs.metadata.format}{cs.metadata.episodes ? ` · ${cs.metadata.episodes} episodes` : ''}{cs.metadata.director ? ` · Dir. ${cs.metadata.director}` : ''} · {cs.metadata.year}
                      </p>
                      <span className="font-mono text-[10px] uppercase tracking-wideMono text-indigo group-hover:text-vermilion transition-colors">
                        View case study →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        )}

        {/* Footer CTA — text centred in the rule */}
        <Reveal>
          <div className="flex items-center gap-6 mt-14">
            <div className="flex-1 border-t border-khadi" />
            <p className="text-[17px] text-indigo whitespace-nowrap">
              Not sure which format fits?{" "}
              <a
                href="#contact"
                className="font-serif italic text-indigo underline underline-offset-4 decoration-vermilion/50 transition-colors duration-300 hover:decoration-vermilion"
              >
                Book a call.
              </a>
            </p>
            <div className="flex-1 border-t border-khadi" />
          </div>
        </Reveal>

      </div>
    </section>
  );
}
