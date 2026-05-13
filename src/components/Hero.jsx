import Button from "./Button";
import TextLink from "./TextLink";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-screen lg:h-screen"
      style={{ background: '#EDE8DF' }}
    >
      {/* Grain — over everything visual */}
      <div className="hero-grain" aria-hidden="true" style={{ zIndex: 3 }} />

      {/* ── DESKTOP ── Statue: right 58%, full height, gradient fade on left edge */}
      <div
        className="hidden lg:block absolute right-0 top-0 h-full"
        style={{ zIndex: 1, width: '58%', background: '#EDE8DF' }}
      >
        <img
          src="/images/hero-statue.png"
          alt="Lady of Progress statue in architectural arch — Bombay Blanc brand symbol"
          className="w-full h-full animate-heroScale"
          style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
        />
        {/* Gradient: fades stone wall into cream seamlessly */}
        <div
          className="absolute inset-y-0 left-0 pointer-events-none"
          style={{
            width: '45%',
            zIndex: 2,
            background: 'linear-gradient(to right, #EDE8DF 20%, rgba(237,232,223,0.7) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* ── DESKTOP ── Left content: absolute, centred vertically, left half */}
      <div
        className="hidden lg:flex lg:flex-col lg:justify-center absolute top-0 left-0 h-full"
        style={{
          zIndex: 10,
          width: '50%',
          paddingLeft: 'clamp(24px, 5vw, 96px)',
          paddingRight: 'clamp(20px, 3vw, 56px)',
          paddingTop: '100px',
        }}
      >
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
          Films, campaigns, and stories<br />with world-class restraint.
        </p>
        <div className="vermilion-line mb-6 opacity-0 animate-fadeUp" style={{ animationDelay: "0.3s" }} />
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
        <div className="flex flex-col gap-5 items-start opacity-0 animate-fadeUp" style={{ animationDelay: "0.5s" }}>
          <Button href="#contact">Book a call</Button>
          <TextLink href="#founder">Read the founder note</TextLink>
        </div>
      </div>

      {/* ── MOBILE ── Stacked layout: content then statue below */}
      <div
        className="lg:hidden flex flex-col"
        style={{ zIndex: 10, paddingTop: '110px' }}
      >
        <div
          style={{
            paddingLeft: 'clamp(24px, 6vw, 48px)',
            paddingRight: 'clamp(24px, 6vw, 48px)',
            paddingBottom: '32px',
          }}
        >
          <h1 className="font-serif text-hero font-normal text-vermilion mb-6">
            Contained<br />heat.
          </h1>
          <p className="font-serif text-subhead font-normal text-indigo mb-5">
            Films, campaigns, and stories<br />with world-class restraint.
          </p>
          <div className="vermilion-line mb-5" />
          <p className="font-sans text-base leading-[1.62] text-indigo mb-8">
            Bombay Blanc is a story-led creative production house
            for brands that need more than content. We bring world-class
            craft from India and Southeast Asia, with the taste of a
            cinematic studio and the operating discipline of a
            producer-led business.
          </p>
          <div className="flex flex-col gap-5 items-start">
            <Button href="#contact">Book a call</Button>
            <TextLink href="#founder">Read the founder note</TextLink>
          </div>
        </div>

        {/* Mobile statue — below content, in flow */}
        <div style={{ height: '50vw', minHeight: '240px', position: 'relative', zIndex: 1 }}>
          <img
            src="/images/hero-statue.png"
            alt="Lady of Progress statue in architectural arch — Bombay Blanc brand symbol"
            className="w-full h-full"
            style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
          />
        </div>
      </div>
    </section>
  );
}
