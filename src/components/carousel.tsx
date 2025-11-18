"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({ children, step = 336 }: { children: React.ReactNode; step?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const doScroll = (delta: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };
  return (
    <div className="relative" onKeyDown={(e) => { if (e.key === "ArrowLeft") doScroll(-step); if (e.key === "ArrowRight") doScroll(step); }} tabIndex={0} aria-roledescription="carousel">
      <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-hidden pb-2" role="group">
        {children}
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button aria-label="Précédent" onClick={() => doScroll(-step)} className="inline-flex h-8 items-center justify-center rounded-md border border-slate-200 px-3 text-sm">
          <ChevronLeft size={16} />
        </button>
        <button aria-label="Suivant" onClick={() => doScroll(step)} className="inline-flex h-8 items-center justify-center rounded-md border border-slate-200 px-3 text-sm">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
