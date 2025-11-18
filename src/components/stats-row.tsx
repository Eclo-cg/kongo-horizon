export function StatsRow() {
  const items = [
    { label: "Voyageurs", value: "12k+" },
    { label: "Ans d'histoire", value: "10+" },
    { label: "Sites répertoriés", value: "50+" },
  ];
  return (
    <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-white p-4 text-center sm:gap-6 sm:p-6">
      {items.map((it) => (
        <div key={it.label}>
          <div className="text-xl font-semibold text-slate-900">{it.value}</div>
          <div className="text-xs text-slate-600">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
