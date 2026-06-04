import { useReveal } from "../hooks/useReveal";
import SectionLabel from "./SectionLabel";
import TextLink from "./TextLink";

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export default function FounderSection() {
  return (
    <section
      id="founder"
      className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:items-stretch scroll-mt-[148px]"
      style={{ background: '#F2EBDA' }}
    >
      {/* Left: Founder Letter */}
      <div className="flex flex-col justify-center px-6 lg:px-[clamp(24px,5vw,96px)] py-[72px] order-2 lg:order-1">
        <SectionLabel>The Founder</SectionLabel>

        <Reveal>
          <h2 className="font-serif text-h2 font-normal text-graphite mb-10">
            A note from<br />the founder.
          </h2>
        </Reveal>

        <Reveal>
          <div className="font-serif text-[17px] leading-[1.6] text-indigo mb-10 space-y-5">
            <p>
              I built Bombay Blanc for the brands that know the difference
              between looking expensive and feeling considered.
            </p>
            <p>
              The next decade of premium content will not be won by
              the biggest teams. It will be won by the clearest ones.
              Small teams with taste. Directors with range. Producers
              who understand the budget. Editors who know when to stop.
              AI used quietly, inside the pipeline — not shouted from
              the homepage.
            </p>
            <p>
              Bombay Blanc is Singapore-headquartered and India-engined
              because that is the bridge I know how to build: world-class
              craft, sharper economics, and stories that can travel across
              markets without losing their soul.
            </p>
            <p>
              We are not here to make more noise.<br />
              We are here to make the frame hold.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-6">
            <p className="font-serif italic text-xl text-indigo">Hana Mattar</p>
            <p className="text-sm text-ash mt-1">Founder, Bombay Blanc</p>
          </div>
        </Reveal>

        <Reveal>
          <TextLink href="#contact">Book a call with Hana</TextLink>
        </Reveal>
      </div>

      {/* Right: Portrait */}
      <div className="relative overflow-hidden h-[60vh] lg:h-auto order-1 lg:order-2">
        <img
          src="/images/founder.jpg"
          alt="Hana Mattar, Founder of Bombay Blanc, in architectural setting"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}
