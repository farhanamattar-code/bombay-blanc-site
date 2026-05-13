export default function TextLink({ children, href, className = "" }) {
  return (
    <a
      href={href}
      className={`
        group inline-flex items-center gap-2
        border-b border-vermilion/50 pb-0.5
        font-serif text-lg text-indigo
        transition-colors duration-300
        hover:text-graphite hover:border-vermilion
        ${className}
      `}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1 not-italic">
        →
      </span>
    </a>
  );
}
