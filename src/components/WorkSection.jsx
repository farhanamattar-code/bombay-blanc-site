import { useReveal } from "../hooks/useReveal";
import SectionLabel from "./SectionLabel";
import workPillars from "../data/workPillars";

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function PillarCard({ label, title, body, italic, image, alt }) {
  return (
    <div className="group flex flex-col border border-khadi bg-bone/40 transition-shadow duration-400 hover:shadow-md">
      {/* Image — full width, no padding */}
      <div className="w-full overflow-hidden" style={{ aspectRatio: '1.6 / 1' }}>
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 ease-film group-hover:scale-[1.02]"
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

        {/* Footer CTA */}
        <Reveal>
          <div className="border-t border-khadi mt-14 pt-8 text-center text-[17px] text-indigo">
            Not sure which format fits?{" "}
            <a
              href="#contact"
              className="font-serif italic text-indigo underline underline-offset-4 decoration-vermilion/50 transition-colors duration-300 hover:decoration-vermilion"
            >
              Book a call.
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
