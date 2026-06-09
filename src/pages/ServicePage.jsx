import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import SectionLabel from "../components/SectionLabel";
import Button from "../components/Button";
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

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    if (!service) return;
    document.title = service.seoTitle;
    const url = `https://www.bombayblanc.com/services/${service.slug}`;
    setCanonical(url);
    setOgUrl(url);

    // Update meta description
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", service.metaDescription);

    window.scrollTo(0, 0);
  }, [service]);

  if (!service) {
    return (
      <main className="bg-cotton min-h-screen pt-40 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-h2 font-normal text-indigo mb-6">
            Not found.
          </h1>
          <Link
            to="/services"
            className="font-mono text-xs uppercase tracking-wideMono text-indigo border-b border-khadi pb-px hover:border-vermilion transition-colors"
          >
            View all services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cotton min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-24 scroll-mt-[148px]">
        <div className="section-container max-w-4xl">
          <SectionLabel>{service.label}</SectionLabel>

          <Reveal>
            <h1 className="font-serif text-h2 font-normal text-indigo mb-8">
              {service.headline.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < service.headline.length - 1 && <br />}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal>
            <div className="vermilion-line mb-10" />
          </Reveal>

          {service.body.map((para, i) => (
            <Reveal key={i}>
              <p className="font-sans text-base leading-[1.72] text-indigo/80 mb-7 max-w-2xl">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What this looks like */}
      <section className="pb-20 lg:pb-28">
        <div className="section-container max-w-4xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-wideMono text-ash mb-8">
              What this looks like
            </p>
          </Reveal>

          <Reveal>
            <div className="font-sans text-base leading-[1.72] text-indigo/70 space-y-2">
              {service.includes.map((item, i) => (
                <p key={i} className="pl-6 -indent-6">
                  — {item}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="section-container max-w-4xl">
          <Reveal>
            <div className="border-t border-khadi pt-10">
              <p className="font-serif italic text-lg leading-[1.45] text-indigo mb-8">
                Tell us what you are building. If there is a fit,
                we will come back with a sharp point of view.
              </p>
              <Button href="/#contact">Request a call</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
