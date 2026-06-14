import { useReveal } from "../hooks/useReveal";

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

const CLIENTS = [
  { name: "Singapore Tourism Board", tracking: "0.12em" },
  { name: "Danone", tracking: "0.14em" },
  { name: "P&G", tracking: "0.14em" },
  { name: "Storm Studios", tracking: "0.14em" },
];

export default function ClientStrip() {
  return (
    <section style={{ background: '#F2EBDA' }}>
      <div className="section-container py-14">
        <Reveal>
          <p className="text-center font-mono text-[10px] tracking-[0.18em] uppercase text-ash mb-8">
            Trusted by premium teams across Asia
          </p>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {CLIENTS.map(({ name, tracking }) => (
              <span
                key={name}
                className="font-mono text-[13px] uppercase text-indigo/40 select-none"
                style={{ letterSpacing: tracking }}
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
