type Item = { year: string; title: string; description: string };

export function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="relative space-y-8 border-s-2 border-slate-200 ps-6">
      {items.map((it) => (
        <li key={it.year} className="before:absolute before:-start-[7px] before:mt-1.5 before:size-3 before:rounded-full before:bg-blue-600">
          <div className="mb-1 text-sm font-semibold text-slate-900">{it.year} — {it.title}</div>
          <p className="text-slate-600">{it.description}</p>
        </li>
      ))}
    </ol>
  );
}
