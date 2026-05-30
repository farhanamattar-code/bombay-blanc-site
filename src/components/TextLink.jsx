export default function TextLink({ children, href, className = "" }) {
  return (
    <a
      href={href}
      className={`
        group inline-flex h-14 items-center justify-between
        border border-indigo/30 px-8
        font-mono text-xs uppercase tracking-wideMono
        text-indigo
        transition-all duration-300 ease-film
        hover:border-indigo hover:bg-indigo/5
        ${className}
      `}
    >
      <span>{children}</span>
      <span className="ml-8 transition-transform duration-300 ease-film group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
