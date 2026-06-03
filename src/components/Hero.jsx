import Button from "./Button";
import TextLink from "./TextLink";

const BG = '#EDE8DF';
// Single source of truth: both the top gradient and the content paddingTop
// share this value, so the arch tip is always exactly at the "C" position.
const CONTENT_TOP = 'clamp(148px, 14vh, 160px)';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: BG }}
    >

      {/* ── DESKTOP ──
           NON-NEGOTIABLE: archway top + base engravings must ALWAYS be visible.

           The image is IN FLOW (not absolute) with width:100% and no fixed
           height, so it renders at its native aspect ratio — full width,
           proportional height. This means it is NEVER cropped vertically.
           The text overlays on top via absolute positioning.
           minHeight:100vh on the wrapper ensures full-screen on narrow screens;
           on wide screens the image's proportional height takes over. */}

      {/* Desktop wrapper */}
      <div className="hidden lg:block relative" style={{ minHeight: '100vh' }}>

        {/* Hero image — in flow, width:100%, natural aspect ratio.
            On wide viewports the image is taller than 100vh (good — no crop).
            On narrow viewports minHeight:100vh + object-fit:cover fills the gap. */}
        <img
          src="/images/hero-statue.jpg"
          alt="Lady of Progress statue in architectural arch — Bombay Blanc brand symbol"
          className="w-full block animate-heroScale"
          style={{
            minHeight: '100vh',
            objectFit: 'cover',
            objectPosition: 'right center',
          }}
        />

        {/* Left veil — keeps text readable over the image texture */}
        <div
          className="absolute inset-y-0 left-0 pointer-events-none"
          style={{
            width: '52%',
            zIndex: 5,
            background: `linear-gradient(to right,
              rgba(237,232,223,0.45) 0%,
              rgba(237,232,223,0.25) 60%,
              transparent 100%)`,
          }}
        />

        {/* Left content column — absolute overlay, vertically centred */}
        <div
          className="absolute inset-y-0 left-0 flex flex-col justify-center"
          style={{
            zIndex: 10,
            width: '50%',
            paddingTop: '80px',
            paddingBottom: '80px',
            paddingLeft: 'clamp(48px, 5vw, 96px)',
            paddingRight: '56px',
          }}
        >
          <h1
            className="font-serif text-hero font-normal text-vermilion mb-8 opacity-0 animate-fadeUp"
            style={{ animationDelay: '0.2s' }}
          >
            Contained<br />heat.
          </h1>

          <p
            className="font-serif text-subhead font-normal text-indigo mb-6 opacity-0 animate-fadeUp"
            style={{ animationDelay: '0.3s' }}
          >
            Vertical-first films, campaigns, and stories<br />with world-class restraint.
          </p>

          <div
            className="vermilion-line mb-6 opacity-0 animate-fadeUp"
            style={{ animationDelay: '0.3s' }}
          />

          <p
            className="font-sans text-base leading-[1.62] tracking-[-0.01em] text-indigo max-w-[460px] mb-10 opacity-0 animate-fadeUp"
            style={{ animationDelay: '0.4s' }}
          >
            Bombay Blanc is a 9:16-native production house for luxury
            hotels and FMCG brands making the next-stage expand into Southeast Asia.
            We bring world-class craft from Singapore and India, with the
            taste of a cinematic studio and the operating discipline of a
            producer-led business.
          </p>

          <div
            className="flex flex-col gap-5 items-start opacity-0 animate-fadeUp"
            style={{ animationDelay: '0.5s' }}
          >
            <Button href="#work">See the work</Button>
            <TextLink href="#contact">Book a call</TextLink>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── Stacked: content then statue */}
      <div className="lg:hidden flex flex-col" style={{ zIndex: 10, paddingTop: '148px' }}>
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
            Vertical-first films, campaigns, and stories<br />with world-class restraint.
          </p>
          <div className="vermilion-line mb-5" />
          <p className="font-sans text-base leading-[1.62] text-indigo mb-8">
            Bombay Blanc is a 9:16-native production house for luxury
            hotels and FMCG brands making the next-stage expand into Southeast Asia.
            We bring world-class craft from Singapore and India, with the
            taste of a cinematic studio and the operating discipline of a
            producer-led business.
          </p>
          <div className="flex flex-col gap-5 items-start">
            <Button href="#work">See the work</Button>
            <TextLink href="#contact">Book a call</TextLink>
          </div>
        </div>

        {/* Mobile statue */}
        <div style={{ height: '55vw', minHeight: '260px', position: 'relative' }}>
          <img
            src="/images/hero-statue.jpg"
            alt="Lady of Progress statue in architectural arch — Bombay Blanc brand symbol"
            className="w-full h-full"
            style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
          />
        </div>
      </div>

    </section>
  );
}
