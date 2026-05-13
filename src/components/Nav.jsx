import { useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Founder", href: "#founder" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="section-container flex items-start justify-between pt-8">
        {/* Logo */}
        <a href="#" className="block w-40 flex-shrink-0">
          <div className="font-serif text-4xl leading-[0.82] tracking-[-0.04em] uppercase text-indigo font-semibold">
            Bombay<br />Blanc
          </div>
          <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-ash mt-2 text-center leading-relaxed">
            A creative production house<br />· Singapore · Bombay
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-12 pt-2 list-none">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-mono text-[13px] tracking-wideMono uppercase text-indigo no-underline transition-colors duration-300 hover:text-ash"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="lg:hidden p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
        >
          <span className="block w-6 h-px bg-indigo mb-1.5" />
          <span className="block w-6 h-px bg-indigo mb-1.5" />
          <span className="block w-6 h-px bg-indigo" />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-cotton z-50 flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-8 right-8 p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <span className="block w-6 h-px bg-indigo rotate-45 translate-y-px" />
            <span className="block w-6 h-px bg-indigo -rotate-45 -translate-y-px" />
          </button>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-base tracking-wideMono uppercase text-indigo no-underline"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
