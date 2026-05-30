export default function TextLink({ children, href, className = "" }) {
  return (
    <a
      href={href}
      className={`
        group inline-flex items-center gap-3
        font-mono text-xs uppercase tracking-wideMono
        text-ash
        transition-colors duration-300
        hover:text-indigo
        ${className}
      `}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
