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

      {/* ── DESKTOP ── flex: text left, statue right
           NON-NEGOTIABLE: archway top + base engravings must ALWAYS be visible.
           object-fit:contain guarantees the image is NEVER cropped.
           Padding on the image column provides breathing room above arch
           and below engravings, matching the layout guide. */}
      <div
        className="hidden lg:flex"
        style={{ minHeight: '100vh' }}
      >
        {/* Left content column — vertically centred */}
        <div
          className="flex flex-col justify-center"
          style={{
            width: '50%',
            paddingTop: '120px',
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

        {/* Right image column — full statue, never cropped */}
        <div
          className="flex items-center"
          style={{
            width: '50%',
            paddingTop: '100px',
            paddingBottom: '40px',
          }}
        >
          <img
            src="/images/hero-statue.jpg"
            alt="Lady of Progress statue in architectural arch — Bombay Blanc brand symbol"
            className="w-full h-full animate-heroScale"
            style={{ objectFit: 'contain', objectPosition: 'center center' }}
          />
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
