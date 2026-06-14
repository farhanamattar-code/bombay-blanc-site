import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Lady of Progress", href: "/" },
  { label: "The Work", href: "/#featured-work" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/journal" },
  { label: "Studio", href: "/#studio" },
  { label: "Founder", href: "/#founder" },
  { label: "Contact", href: "/#contact" },
];

function NavLink({ label, href, onClick }) {
  const isRoute = !href.includes("#");
  if (isRoute) {
    // For root-route links (Lady of Progress → "/"), always scroll to top —
    // even when the user is already on the homepage and pathname doesn't change.
    const handleClick = (e) => {
      if (href === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (onClick) onClick(e);
    };
    return (
      <Link
        to={href}
        onClick={handleClick}
        className="font-mono text-[13px] tracking-wideMono uppercase text-indigo no-underline transition-colors duration-300 hover:text-ash"
      >
        {label}
      </Link>
    );
  }
  return (
    <a
      href={href}
      onClick={onClick}
      className="font-mono text-[13px] tracking-wideMono uppercase text-indigo no-underline transition-colors duration-300 hover:text-ash"
    >
      {label}
    </a>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  function handleAnchorClick(href) {
    if (href.startsWith("/#") && location.pathname !== "/") {
      window.location.href = href;
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#EDE8DF]">
        <div
          className="flex items-start justify-between pt-8 pb-6"
          style={{
            paddingLeft: "clamp(24px, 5vw, 96px)",
            paddingRight: "clamp(24px, 5vw, 96px)",
          }}
        >
          <Link to="/" className="block flex-shrink-0 no-underline">
            <div className="font-serif text-4xl leading-[0.82] tracking-[-0.04em] uppercase text-indigo font-semibold">
              Bombay<br />Blanc
            </div>
            <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-ash mt-2 whitespace-nowrap">
              A creative production house · Singapore · Bombay
            </div>
          </Link>

          <ul className="hidden lg:flex gap-12 pt-2 list-none">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <NavLink
                  label={label}
                  href={href}
                  onClick={() => handleAnchorClick(href)}
                />
              </li>
            ))}
          </ul>

          <button
            className="lg:hidden p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className="block w-6 h-px bg-indigo mb-1.5" />
            <span className="block w-6 h-px bg-indigo mb-1.5" />
            <span className="block w-6 h-px bg-indigo" />
          </button>
        </div>
      </nav>

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
            <NavLink
              key={label}
              label={label}
              href={href}
              onClick={() => {
                setMobileOpen(false);
                handleAnchorClick(href);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
