export default function Menu({ items }) {
  return (
    <nav className="flex items-center gap-5">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="rounded-md px-2 py-1 transition hover:bg-white/10 hover:text-sky-300"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}