import Button from "./Button";
import TextLink from "./TextLink";

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden pb-16" style={{ background: '#EDE8DF' }}>
      {/* Plaster grain texture overlay */}
      <div className="hero-grain" aria-hidden="true" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-100px)] items-center">
          {/* Left Content */}
          <div className="relative z-10 lg:pr-12 pt-8 lg:pt-0 order-2 lg:order-1">
            <p
              className="font-mono text-xs uppercase tracking-wideMono text-indigo mb-8 opacity-0 animate-fadeUp"
              style={{ animationDelay: "0.1s" }}
            >
              Singapore · India · Southeast Asia
            </p>

            <h1
              className="font-serif text-hero font-normal text-vermilion mb-8 opacity-0 animate-fadeUp"
              style={{ animationDelay: "0.2s" }}
            >
              Contained<br />heat.
            </h1>

            <p
              className="font-serif text-subhead font-normal text-indigo mb-6 opacity-0 animate-fadeUp"
              style={{ animationDelay: "0.3s" }}
            >
              Films, campaigns, and stories<br />
              with world-class restraint.
            </p>

            <div
              className="vermilion-line mb-6 opacity-0 animate-fadeUp"
              style={{ animationDelay: "0.3s" }}
            />

            <p
              className="font-sans text-base leading-[1.62] tracking-[-0.01em] text-indigo max-w-[460px] mb-10 opacity-0 animate-fadeUp"
              style={{ animationDelay: "0.4s" }}
            >
              Bombay Blanc is a story-led creative production house
              for brands that need more than content. We bring world-class
              craft from India and Southeast Asia, with the taste of a
              cinematic studio and the operating discipline of a
              producer-led business.
            </p>

            <div
              className="flex flex-col gap-5 items-start opacity-0 animate-fadeUp"
              style={{ animationDelay: "0.5s" }}
            >
              <Button href="#contact" className="w-full sm:w-auto">
                Book a call
              </Button>
              <TextLink href="#founder">Read the founder note</TextLink>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex items-center justify-center h-[50vh] lg:h-[calc(100vh-100px)] order-1 lg:order-2">
            <img
              src="/images/hero-statue.png"
              alt="Lady of Progress statue in architectural arch — Bombay Blanc brand symbol"
              className="w-4/5 lg:w-[85%] max-h-[90vh] object-contain object-bottom animate-heroScale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
