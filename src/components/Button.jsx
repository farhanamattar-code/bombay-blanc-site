export default function Button({ children, href, type, className = "", ...props }) {
  const classes = `
    group inline-flex h-14 items-center justify-between
    bg-indigo px-8 text-cotton
    font-mono text-xs uppercase tracking-wideMono
    transition-all duration-300 ease-film
    hover:bg-graphite
    ${className}
  `.trim();

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        <span>{children}</span>
        <span className="ml-8 transition-transform duration-300 ease-film group-hover:translate-x-1">
          →
        </span>
      </a>
    );
  }

  return (
    <button type={type || "button"} className={classes} {...props}>
      <span>{children}</span>
      <span className="ml-8 transition-transform duration-300 ease-film group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}
