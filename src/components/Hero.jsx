import Button from "./Button";
import TextLink from "./TextLink";

export default function Hero() {
  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{ background: '#EDE8DF' }}
    >
      {/* Grain texture — sits above statue, below content */}
      <div className="hero-grain" aria-hidden="true" style={{ zIndex: 2 }} />

      {/* Statue — fills full right half from very top */}
      <div
        className="hidden lg:block absolute right-0 top-0 w-1/2 h-full"
        style={{ zIndex: 1, background: '#EDE8DF' }}
      >
        <img
          src="/images/hero-statue.png"
          alt="Lady of Progress statue in architectural arch — Bombay Blanc brand symbol"
          className="w-full h-full object-contain object-bottom animate-heroScale"
        />
      </div>

      {/* Left content — clears nav with padding-top */}
      <div
        className="absolute top-0 left-0 h-full flex flex-col justify-center lg:w-1/2"
        style={{
          zIndex: 10,
          paddingLeft: 'clamp(24px, 5vw, 96px)',
          paddingRight: 'clamp(20px, 3vw, 64px)',
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

      {/* Mobile image */}
      <div className="lg:hidden absolute bottom-0 right-0 w-full h-[40vh]" style={{ zIndex: 1 }}>
        <img
          src="/images/hero-statue.png"
          alt="Lady of Progress statue in architectural arch — Bombay Blanc brand symbol"
          className="w-full h-full object-contain object-bottom"
        />
      </div>
    </section>
  );
}
