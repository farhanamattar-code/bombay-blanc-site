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

function Pillar({ label, title, body, italic, image, alt }) {
  return (
    <div className="group px-0 lg:px-8 first:lg:pl-0 last:lg:pr-0 transition-colors duration-400 hover:bg-bone/30">
      <div className="w-full overflow-hidden mb-6" style={{ aspectRatio: '1.95 / 1' }}>
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 ease-film group-hover:scale-[1.02]"
        />
      </div>
      <p className="font-mono text-xs uppercase tracking-wideMono text-indigo mb-4">
        {label}
      </p>
      <h3 className="font-serif text-pillar font-normal text-indigo mb-4 whitespace-pre-line">
        {title}
      </h3>
      <p className="font-sans text-[15px] leading-[1.58] text-indigo mb-4">
        {body}
      </p>
      <p className="font-serif italic text-[17px] leading-[1.35] text-indigo">
        {italic}
      </p>
    </div>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="pt-[72px] pb-20" style={{ background: '#F2EBDA' }}>
      <div className="section-container">
        <Reveal>
          <div className="vermilion-line mb-6" />
        </Reveal>

        <SectionLabel>The Work</SectionLabel>

        <Reveal>
          <h2 className="font-serif text-h2-work font-normal text-indigo mb-6">
            Three forms. One taste.
          </h2>
        </Reveal>

        <Reveal>
          <p className="font-sans text-[17px] leading-[1.62] text-indigo max-w-[640px] mb-14">
            Bombay Blanc works across brand, scripted, and unscripted formats —
            not as separate businesses, but as one studio language applied to
            different kinds of stories.
          </p>
        </Reveal>

        {/* Desktop: 3 columns with dividers */}
        <Reveal>
          <div className="hidden lg:grid grid-cols-[1fr_1px_1fr_1px_1fr]">
            <Pillar {...workPillars[0]} />
            <div className="bg-khadi self-stretch" />
            <Pillar {...workPillars[1]} />
            <div className="bg-khadi self-stretch" />
            <Pillar {...workPillars[2]} />
          </div>

          {/* Mobile: stacked with horizontal rules */}
          <div className="lg:hidden space-y-10">
            {workPillars.map((pillar, i) => (
              <div key={pillar.label}>
                {i > 0 && <div className="h-px bg-khadi mb-10" />}
                <Pillar {...pillar} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="text-center mt-14 pt-8 border-t border-khadi text-[17px] text-indigo">
            Not sure which format fits?{" "}
            <a
              href="#contact"
              className="text-indigo underline underline-offset-4 decoration-vermilion/50 transition-colors duration-300 hover:decoration-vermilion"
            >
              Book a call.
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
