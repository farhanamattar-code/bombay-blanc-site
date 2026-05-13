import { useReveal } from "../hooks/useReveal";

export default function SectionLabel({ children }) {
  const ref = useReveal();

  return (
    <p
      ref={ref}
      className="reveal font-mono text-xs uppercase tracking-wideMono text-indigo mb-6"
    >
      {children}
    </p>
  );
}
