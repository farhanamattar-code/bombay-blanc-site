import { useReveal } from "../hooks/useReveal";
import SectionLabel from "./SectionLabel";

function Reveal({ children, className = "", delay = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`}>
      {children}
    </div>
  );
}

export default function BriefSection() {
  const ruleRef = useReveal();

  return (
    <section id="studio" className="bg-cotton">
      {/* Top rule */}
      <div
        ref={ruleRef}
        className="rule-animate section-container"
      >
        <div className="h-px bg-khadi" />
      </div>

      <div className="section-container pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Copy */}
          <div>
            <SectionLabel>The Brief</SectionLabel>

            <Reveal>
              <h2 className="font-serif text-h2 font-normal text-graphite mb-8">
                You do not need<br />
                more content.<br />
                You need a clearer world.
              </h2>
            </Reveal>

            <Reveal>
              <div className="vermilion-line mb-8" />
            </Reveal>

            <Reveal>
              <p className="font-sans text-base leading-[1.68] text-indigo mb-7">
                Most ambitious brands are not short on assets. They are short on
                taste, continuity, and a production partner who can hold the line
                from idea to final cut.
              </p>
            </Reveal>

            <Reveal>
              <p className="font-sans text-base leading-[1.68] text-indigo mb-7">
                You have the hotel. The product. The founder story. The wedding world.
                The cultural signal. But somewhere between the deck, the shoot,
                the edit, the agency thread, and the eleventh round of feedback,
                the work loses its charge. Bombay Blanc exists to protect the charge.
              </p>
            </Reveal>

            <Reveal>
              <div className="font-sans text-base leading-[1.72] text-indigo space-y-1">
                <p className="pl-6 -indent-6">— One visual world before one hundred assets.</p>
                <p className="pl-6 -indent-6">— One brand-led point of view before another vendor list.</p>
                <p className="pl-6 -indent-6">— One production partner who understands craft, budget, and cultural nuance.</p>
                <p className="pl-6 -indent-6">— One calm process from first treatment to final cut.</p>
              </div>
            </Reveal>
          </div>

          {/* Right: Image */}
          <Reveal className="pt-0 lg:pt-12">
            <img
              src="/images/brief-process.jpg"
              alt="Black and white editorial production process photograph"
              className="w-full aspect-video object-cover grayscale contrast-[0.9]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
