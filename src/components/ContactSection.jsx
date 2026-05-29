import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import SectionLabel from "./SectionLabel";

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export default function ContactSection() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xqenjqzq", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="min-h-screen bg-bone p-4 sm:p-6 lg:p-12">
      <div className="max-w-[1440px] mx-auto border border-khadi p-6 sm:p-8 lg:p-16 bg-bone">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* Left */}
          <div className="flex flex-col">
            <div>
              <SectionLabel>The Brief</SectionLabel>

              <Reveal>
                <h2 className="font-serif text-h2 font-normal italic text-graphite mb-6">
                  Bring the brief.<br />
                  We will bring<br />
                  the frame.
                </h2>
              </Reveal>

              <Reveal>
                <p className="font-serif italic text-lg leading-[1.45] text-indigo mb-8">
                  Tell us what you are building, launching,
                  filming, or trying to clarify. If there is a fit,
                  we will come back with a sharp point of view.
                </p>
              </Reveal>
            </div>

            {/* Statue — fills remaining height, bottom aligns with Request A Call button */}
            <div className="flex-1 mt-8 lg:mt-10 relative overflow-hidden min-h-[180px]">
              {/* Top fade — edge only */}
              <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{
                  height: '10%',
                  zIndex: 1,
                  background: 'linear-gradient(to bottom, #E5DBC4 0%, transparent 100%)',
                }}
              />
              {/* Left fade — edge only */}
              <div
                className="absolute inset-y-0 left-0 pointer-events-none"
                style={{
                  width: '10%',
                  zIndex: 1,
                  background: 'linear-gradient(to right, #E5DBC4, transparent)',
                }}
              />
              {/* Right fade — edge only */}
              <div
                className="absolute inset-y-0 right-0 pointer-events-none"
                style={{
                  width: '8%',
                  zIndex: 1,
                  background: 'linear-gradient(to left, #E5DBC4, transparent)',
                }}
              />
              <img
                src="/images/hero-statue-sm.jpg"
                alt="Lady of Progress statue — symbol of Bombay Blanc creative production house, Singapore"
                className="absolute inset-0 w-full h-full block"
                style={{ objectFit: 'contain', objectPosition: 'center center' }}
              />
            </div>

            {/* Spacer: matches height of below-button form content
                (microcopy mt-5 + text + ornament my-5 + email + form pb-12 ≈ 184px) */}
            <div className="hidden lg:block" style={{ height: '184px' }} />
          </div>

          {/* Right: Form */}
          <Reveal>
            <div className="border border-khadi p-6 sm:p-8 lg:p-12">
              <form onSubmit={handleSubmit}>
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-[11px] tracking-wideMono uppercase text-indigo mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="h-12 w-full border border-khadi bg-transparent px-4 font-serif text-[15px] text-indigo outline-none transition-colors focus:border-graphite focus:ring-1 focus:ring-vermilion/50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-[11px] tracking-wideMono uppercase text-indigo mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="h-12 w-full border border-khadi bg-transparent px-4 font-serif text-[15px] text-indigo outline-none transition-colors focus:border-graphite focus:ring-1 focus:ring-vermilion/50"
                    />
                  </div>
                </div>

                {/* Brand / Company */}
                <div className="mb-5">
                  <label
                    htmlFor="company"
                    className="block font-mono text-[11px] tracking-wideMono uppercase text-indigo mb-2"
                  >
                    Brand / Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="h-12 w-full border border-khadi bg-transparent px-4 font-serif text-[15px] text-indigo outline-none transition-colors focus:border-graphite focus:ring-1 focus:ring-vermilion/50"
                  />
                </div>

                {/* What are you building? */}
                <div className="mb-5">
                  <label
                    htmlFor="building"
                    className="block font-mono text-[11px] tracking-wideMono uppercase text-indigo mb-2"
                  >
                    What are you building?
                  </label>
                  <textarea
                    id="building"
                    name="building"
                    rows={3}
                    className="min-h-[88px] w-full resize-none border border-khadi bg-transparent px-4 py-3 font-serif text-[15px] text-indigo outline-none transition-colors focus:border-graphite focus:ring-1 focus:ring-vermilion/50"
                  />
                </div>

                {/* Work type */}
                <div className="mb-5">
                  <label
                    htmlFor="work-type"
                    className="block font-mono text-[11px] tracking-wideMono uppercase text-indigo mb-2"
                  >
                    What kind of work do you need?
                  </label>
                  <select
                    id="work-type"
                    name="work-type"
                    defaultValue=""
                    className="h-12 w-full appearance-none border border-khadi bg-transparent px-4 font-serif text-[15px] text-ash outline-none transition-colors focus:border-graphite focus:ring-1 focus:ring-vermilion/50 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%237A7669%22%20fill%3D%22none%22%20stroke-width%3D%221.5%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]"
                  >
                    <option value="" disabled>Choose an option</option>
                    <option>Brand film / campaign</option>
                    <option>Scripted short / series</option>
                    <option>Documentary / unscripted</option>
                    <option>Hospitality content</option>
                    <option>Founder film</option>
                    <option>Digital marketing strategy</option>
                    <option>Social campaign</option>
                    <option>Communications design</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Timeline */}
                <div className="mb-5">
                  <label
                    htmlFor="timeline"
                    className="block font-mono text-[11px] tracking-wideMono uppercase text-indigo mb-2"
                  >
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    defaultValue=""
                    className="h-12 w-full appearance-none border border-khadi bg-transparent px-4 font-serif text-[15px] text-ash outline-none transition-colors focus:border-graphite focus:ring-1 focus:ring-vermilion/50 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%237A7669%22%20fill%3D%22none%22%20stroke-width%3D%221.5%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]"
                  >
                    <option value="" disabled>Choose an option</option>
                    <option>Within 1 month</option>
                    <option>1 – 3 months</option>
                    <option>3 – 6 months</option>
                    <option>6+ months</option>
                    <option>Flexible</option>
                  </select>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block font-mono text-[11px] tracking-wideMono uppercase text-indigo mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="min-h-[88px] w-full resize-none border border-khadi bg-transparent px-4 py-3 font-serif text-[15px] text-indigo outline-none transition-colors focus:border-graphite focus:ring-1 focus:ring-vermilion/50"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group w-full h-14 flex items-center justify-center gap-4 bg-graphite text-cotton font-mono text-xs uppercase tracking-wideMono border-none cursor-pointer transition-colors duration-300 hover:bg-indigo disabled:opacity-60 disabled:cursor-wait"
                >
                  <span>
                    {status === "submitting" ? "Sending…" : "Request a call"}
                  </span>
                  {status !== "submitting" && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  )}
                </button>

                {status === "success" && (
                  <p className="text-center mt-4 font-mono text-[11px] tracking-[0.18em] uppercase text-indigo">
                    Thank you — we'll be in touch soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center mt-4 font-mono text-[11px] tracking-[0.18em] uppercase text-vermilion">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>

              {/* Microcopy */}
              <p className="text-center mt-5 font-mono text-[10px] tracking-[0.18em] uppercase text-ash leading-relaxed">
                We respond to considered briefs. No spam. No mailing list unless you ask for one.
              </p>

              <div className="flex items-center justify-center gap-3 my-5 text-khadi text-base">
                ✦
              </div>

              <p className="text-center font-mono text-[11px] tracking-[0.18em] uppercase text-ash">
                Prefer email?{" "}
                <a
                  href="mailto:studio@bombayblanc.com"
                  className="text-indigo no-underline border-b border-khadi pb-px transition-colors duration-300 hover:border-vermilion"
                >
                  studio@bombayblanc.com
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
