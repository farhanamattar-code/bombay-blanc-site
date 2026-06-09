import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import SectionLabel from "../components/SectionLabel";
import services from "../data/services";

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function setOgUrl(url) {
  let el = document.querySelector('meta[property="og:url"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", "og:url");
    document.head.appendChild(el);
  }
  el.setAttribute("content", url);
}

function ServiceCard({ service }) {
  return (
    <Reveal>
      <Link
        to={`/services/${service.slug}`}
        className="group block border border-khadi p-8 lg:p-10 bg-cotton transition-colors duration-300 hover:border-ash no-underline"
      >
        <p className="font-mono text-[11px] uppercase tracking-wideMono text-ash mb-4">
          {service.label}
        </p>
        <h2 className="font-serif text-subhead font-normal text-indigo mb-4">
          {service.headline[0]}
        </h2>
        <p className="font-sans text-sm leading-[1.68] text-indigo/65 mb-6">
          {service.body[0].substring(0, 140)}…
        </p>
        <span className="font-mono text-[11px] uppercase tracking-wideMono text-indigo border-b border-khadi pb-px transition-colors duration-300 group-hover:border-vermilion">
          Learn more →
        </span>
      </Link>
    </Reveal>
  );
}

export default function ServicesPage() {
  useEffect(() => {
    document.title =
      "Services — Bombay Blanc | Creative Production House | Singapore";
    setCanonical("https://www.bombayblanc.com/services");
    setOgUrl("https://www.bombayblanc.com/services");

    let meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Brand films, content marketing, brand strategy, and vertical content production. A creative production house headquartered in Singapore, powered by India."
      );

    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-cotton min-h-screen">
      <section className="pt-40 pb-24 lg:pt-48 lg:pb-32">
        <div className="section-container max-w-4xl">
          <SectionLabel>Services</SectionLabel>

          <Reveal>
            <h1 className="font-serif text-h2 font-normal text-indigo mb-6">
              One studio.<br />
              Four ways in.
            </h1>
          </Reveal>

          <Reveal>
            <div className="vermilion-line mb-10" />
          </Reveal>

          <Reveal>
            <p className="font-sans text-base leading-[1.72] text-indigo/80 mb-16 max-w-2xl">
              Bombay Blanc is a creative production house headquartered in
              Singapore with a production engine in India. We produce brand
              films, content marketing, brand strategy, and vertical content for
              brands that care about how the work looks and feels — not just
              that it ships.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
