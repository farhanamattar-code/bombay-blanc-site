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
      style={{ background: BG, minHeight: '100vh' }}
    >

      {/* ── DESKTOP ── */}

      {/* Full-bleed image — arch tip aligns with headline "C" */}
      <div
        className="hidden lg:block absolute inset-0 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <img
          src="/images/hero-statue.jpg"
          alt="Lady of Progress statue in architectural arch — Bombay Blanc brand symbol"
          className="w-full h-full animate-heroScale"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />

        {/* Top gradient — same height as CONTENT_TOP; solid through nav,
            then 12px fade so arch tip emerges exactly where "C" begins */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: CONTENT_TOP,
            background: `linear-gradient(to bottom, ${BG} 0%, ${BG} 88%, transparent 100%)`,
          }}
        />

        {/* Left overlay — light veil so grain texture reads through but
            body text stays crisp; fades to nothing before mid-viewport */}
        <div
          className="absolute inset-y-0 left-0 pointer-events-none"
          style={{
            width: '52%',
            background: `linear-gradient(to right,
              rgba(237,232,223,0.38) 0%,
              rgba(237,232,223,0.22) 50%,
              transparent 100%)`,
          }}
        />

        {/* Right edge — subtle bleed off */}
        <div
          className="absolute inset-y-0 right-0 pointer-events-none"
          style={{
            width: '8%',
            background: `linear-gradient(to left, ${BG} 0%, transparent 100%)`,
          }}
        />

        {/* NO bottom gradient — engravings must show clean */}
      </div>

      {/* Left content column — transparent so image grain shows through */}
      <div
        className="hidden lg:flex flex-col"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '54%',
          minHeight: '100vh',
          paddingTop: CONTENT_TOP,
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
