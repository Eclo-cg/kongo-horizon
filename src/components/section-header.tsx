type Props = { title: string; description?: string; action?: React.ReactNode };

export function SectionHeader({ title, description, action }: Props) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div className="h-1 w-24 rounded-full" style={{ background: "linear-gradient(90deg,#009543,#FCD116,#DC241F)" }} />
        {/* empty spacer to align with action below if needed */}
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-slate-900">{title}</h2>
          {description ? (
            <p className="mt-1 max-w-2xl text-slate-600">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
