import { useReveal } from "../hooks/useReveal";

export default function SectionLabel({ children, className = "" }) {
  const ref = useReveal();

  return (
    <p
      ref={ref}
      className={`reveal font-mono text-xs uppercase tracking-wideMono mb-6 ${className || "text-indigo"}`}
    >
      {children}
    </p>
  );
}
