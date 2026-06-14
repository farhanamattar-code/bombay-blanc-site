import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useReveal } from "../hooks/useReveal";
import caseStudies from "../data/caseStudies";

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = caseStudies.find((s) => s.slug === slug);

  useEffect(() => {
    if (!study) return;
    document.title = study.seoTitle;
    const setMeta = (name, content) => {
      let el =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", study.seoDescription);
    setMeta("keywords", study.seoKeywords);
    setMeta("og:title", study.seoTitle);
    setMeta("og:description", study.seoDescription);
    setMeta("og:type", "article");
    setMeta(
      "og:url",
      `https://www.bombayblanc.com/work/${study.slug}`
    );
    if (study.heroImage)
      setMeta(
        "og:image",
        `https://www.bombayblanc.com${study.heroImage}`
      );

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://www.bombayblanc.com/work/${study.slug}`);

    let script = document.querySelector("#casestudy-schema");
    if (!script) {
      script = document.createElement("script");
      script.id = "casestudy-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: study.title.replace(/\n/g, " "),
      description: study.seoDescription,
      dateCreated: study.metadata.year,
      creator: { "@type": "Person", name: "Hana Mattar" },
      productionCompany: {
        "@type": "Organization",
        name: "Bombay Blanc",
        url: "https://www.bombayblanc.com",
      },
      image: study.heroImage
        ? `https://www.bombayblanc.com${study.heroImage}`
        : undefined,
      mainEntityOfPage: `https://www.bombayblanc.com/work/${study.slug}`,
    });

    // ── VideoObject schema (only when a film is embedded) ──
    let videoScript = document.querySelector("#casestudy-video-schema");
    if (study.video && study.video.id) {
      if (!videoScript) {
        videoScript = document.createElement("script");
        videoScript.id = "casestudy-video-schema";
        videoScript.type = "application/ld+json";
        document.head.appendChild(videoScript);
      }
      const embedUrl =
        study.video.provider === "youtube"
          ? `https://www.youtube.com/embed/${study.video.id}`
          : `https://player.vimeo.com/video/${study.video.id}`;
      videoScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: study.video.title || study.title.replace(/\n/g, " "),
        description: study.seoDescription,
        thumbnailUrl: study.heroImage
          ? `https://www.bombayblanc.com${study.heroImage}`
          : undefined,
        uploadDate: study.metadata.year
          ? `${study.metadata.year}-01-01`
          : undefined,
        embedUrl,
        director: { "@type": "Person", name: "Hana Mattar" },
        productionCompany: {
          "@type": "Organization",
          name: "Bombay Blanc",
          url: "https://www.bombayblanc.com",
        },
      });
    } else if (videoScript) {
      videoScript.remove();
    }

    return () => {
      document.title = "Bombay Blanc — Contained Heat.";
      if (script) script.remove();
      const vs = document.querySelector("#casestudy-video-schema");
      if (vs) vs.remove();
    };
  }, [study]);

  if (!study) return <Navigate to="/" replace />;

  const meta = study.metadata;
  const metaEntries = [
    ["Client", meta.client],
    meta.network ? ["Network", meta.network] : meta.platform ? ["Platform", meta.platform] : null,
    ["Format", meta.format],
    meta.episodes ? ["Episodes", meta.episodes] : meta.director ? ["Director", meta.director] : null,
    ["Role", meta.role],
    meta.year ? ["Year", meta.year] : null,
  ].filter(Boolean);

  return (
    <article className="pt-[120px] pb-32" style={{ background: "#F2EBDA" }}>
      {/* ── Back link ── */}
      <div className="section-container" style={{ maxWidth: "1200px" }}>
        <Reveal>
          <Link
            to="/#work"
            className="inline-block font-mono text-xs uppercase tracking-wideMono text-ash no-underline mb-12 transition-colors hover:text-indigo"
          >
            ← Back to Work
          </Link>
        </Reveal>
      </div>

      {/* ── Hero — film embed (if uploaded) or cinematic image crop ── */}
      {study.video && study.video.id ? (
        <Reveal>
          <div className="section-container mb-16" style={{ maxWidth: "1200px" }}>
            {/* Narrow the frame for tall/4:3 films so they read editorial, not overwhelming */}
            <div
              className="mx-auto"
              style={{
                maxWidth:
                  /^(4|3|1)\s*\//.test(study.video.aspectRatio || "16 / 9")
                    ? "880px"
                    : "1200px",
              }}
            >
              <div
                className="relative overflow-hidden border border-khadi bg-dusk"
                style={{ aspectRatio: study.video.aspectRatio || "16 / 9" }}
              >
                <iframe
                  src={
                    study.video.provider === "youtube"
                      ? `https://www.youtube-nocookie.com/embed/${study.video.id}?rel=0&modestbranding=1${study.video.start ? `&start=${study.video.start}` : ""}`
                      : `https://player.vimeo.com/video/${study.video.id}?title=0&byline=0&portrait=0&color=B5352A&dnt=1${study.video.start ? `#t=${study.video.start}s` : ""}`
                  }
                  title={study.video.title || study.title.replace(/\n/g, " ")}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </Reveal>
      ) : (
        <Reveal>
          <div
            className="section-container mb-16"
            style={{ maxWidth: "1200px" }}
          >
            <div
              className="relative overflow-hidden border border-khadi"
              style={{ aspectRatio: "2.39 / 1" }}
            >
              <img
                src={study.heroImage}
                alt={study.heroAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Metadata + Title — two-column split ── */}
      <div className="section-container" style={{ maxWidth: "1200px" }}>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
            {/* Left: metadata */}
            <div className="lg:col-span-4">
              <div className="vermilion-line mb-6" />
              <p className="font-mono text-[10px] uppercase tracking-wideMono text-ash mb-8">
                {study.pillar}
              </p>
              <div className="space-y-3">
                {metaEntries.map(([label, value]) => (
                  <div key={label} className="flex gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-wideMono text-ash w-20 shrink-0">
                      {label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wideMono text-indigo">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: title + subtitle */}
            <div className="lg:col-span-8">
              <h1
                className="font-serif font-normal text-indigo mb-5 whitespace-pre-line"
                style={{
                  fontSize: "clamp(40px, 4.5vw, 56px)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.035em",
                }}
              >
                {study.title}
              </h1>
              <p
                className="font-sans text-indigo/70"
                style={{
                  fontSize: "clamp(15px, 1.3vw, 18px)",
                  lineHeight: "1.55",
                  maxWidth: "560px",
                }}
              >
                {study.subtitle}
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Divider ── */}
        <div className="border-t border-khadi mb-20" />

        {/* ── Overview ── */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-wideMono text-ash">
                Overview
              </p>
            </div>
            <div className="lg:col-span-8">
              <p
                className="font-serif text-indigo"
                style={{
                  fontSize: "clamp(17px, 1.4vw, 20px)",
                  lineHeight: "1.65",
                  maxWidth: "600px",
                }}
              >
                {study.overview}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── First still(s) ── */}
      {study.isVertical && study.stills.length >= 2 ? (
        <Reveal>
          <div
            className="section-container mb-20"
            style={{ maxWidth: "1200px" }}
          >
            <div className="grid grid-cols-2 gap-4">
              {study.stills.slice(0, 2).map((still, i) => (
                <div key={i}>
                  <div className="border border-khadi overflow-hidden">
                    <img
                      src={still.src}
                      alt={still.alt}
                      className="w-full block"
                      style={{ aspectRatio: still.aspectRatio || "9 / 16", objectFit: "cover" }}
                    />
                  </div>
                  {still.caption && (
                    <p className="font-mono text-[10px] uppercase tracking-wideMono text-ash mt-3 text-right">
                      {still.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ) : study.stills[0] && (
        <Reveal>
          <div
            className="section-container mb-20"
            style={{ maxWidth: "1200px" }}
          >
            <div className="border border-khadi overflow-hidden">
              <img
                src={study.stills[0].src}
                alt={study.stills[0].alt}
                className="w-full block"
                style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
              />
            </div>
            {study.stills[0].caption && (
              <p className="font-mono text-[10px] uppercase tracking-wideMono text-ash mt-3 text-right">
                {study.stills[0].caption}
              </p>
            )}
          </div>
        </Reveal>
      )}

      {/* ── Pull quote ── */}
      <Reveal>
        <div
          className="section-container mb-20"
          style={{ maxWidth: "1200px" }}
        >
          <div className="border-t border-khadi pt-16 pb-16">
            <div className="max-w-[720px] mx-auto text-center">
              <span
                className="block font-serif text-vermilion mb-4"
                style={{ fontSize: "48px", lineHeight: "1" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p
                className="font-serif italic text-indigo"
                style={{
                  fontSize: "clamp(24px, 2.5vw, 32px)",
                  lineHeight: "1.35",
                }}
              >
                {study.pullQuote}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── The Approach ── */}
      <div className="section-container" style={{ maxWidth: "1200px" }}>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-wideMono text-ash">
                The Approach
              </p>
            </div>
            <div className="lg:col-span-8">
              <p
                className="font-sans text-indigo"
                style={{
                  fontSize: "15.5px",
                  lineHeight: "1.75",
                  maxWidth: "600px",
                }}
              >
                {study.approach}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Remaining stills ── */}
      {study.isVertical ? (
        /* Vertical stills: display in pairs */
        (() => {
          const remaining = study.stills.slice(2);
          const pairs = [];
          for (let i = 0; i < remaining.length; i += 2) {
            pairs.push(remaining.slice(i, i + 2));
          }
          return pairs.map((pair, pi) => (
            <Reveal key={pi}>
              <div
                className="section-container mb-20"
                style={{ maxWidth: "1200px" }}
              >
                <div className={`grid gap-4 ${pair.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
                  {pair.map((still, si) => (
                    <div key={si} className={pair.length === 1 ? 'col-start-1' : ''}>
                      <div className="border border-khadi overflow-hidden">
                        <img
                          src={still.src}
                          alt={still.alt}
                          className="w-full block"
                          style={{ aspectRatio: still.aspectRatio || "9 / 16", objectFit: "cover" }}
                        />
                      </div>
                      {still.caption && (
                        <p className="font-mono text-[10px] uppercase tracking-wideMono text-ash mt-3 text-right">
                          {still.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ));
        })()
      ) : (
        study.stills.slice(1).map((still, i) => (
          <Reveal key={i}>
            <div
              className="section-container mb-20"
              style={{ maxWidth: "1200px" }}
            >
              <div className="border border-khadi overflow-hidden">
                <img
                  src={still.src}
                  alt={still.alt}
                  className="w-full block"
                  style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                />
              </div>
              {still.caption && (
                <p className="font-mono text-[10px] uppercase tracking-wideMono text-ash mt-3 text-right">
                  {still.caption}
                </p>
              )}
            </div>
          </Reveal>
        ))
      )}

      {/* ── CTA ── */}
      <div className="section-container" style={{ maxWidth: "1200px" }}>
        <Reveal>
          <div className="border-t border-khadi pt-16 text-center">
            <p
              className="font-serif italic text-indigo mb-6"
              style={{ fontSize: "20px" }}
            >
              A project like this begins with a conversation.
            </p>
            <a
              href="/#contact"
              className="inline-flex h-14 items-center justify-between bg-indigo px-8 text-cotton font-mono text-xs uppercase tracking-wideMono no-underline transition-colors duration-300 hover:bg-graphite"
            >
              <span>Get in touch</span>
              <span className="ml-8">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
