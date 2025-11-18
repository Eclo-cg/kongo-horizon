"use client";

import places from "@/data/places.json";
import type { Place } from "@/types/place.types";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MapPage() {
  const markersRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        markersRef.current,
        { autoAlpha: 0, scale: 0.6 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out", stagger: 0.06 }
      );
    });
    return () => ctx.revert();
  }, []);

  const data = places as Place[];
  return (
    <div className="mx-auto max-w-6xl gap-6 px-4 py-10 md:grid md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="relative aspect-video rounded-lg border border-slate-200 bg-white">
          <div className="absolute inset-0">
            {data.slice(0, 9).map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  if (el) markersRef.current[i] = el;
                }}
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600"
                style={{ left: `${20 + (i % 3) * 25}%`, top: `${20 + Math.floor(i / 3) * 20}%` }}
                title={p.name}
              />
            ))}
          </div>
          <div className="flex h-full w-full items-center justify-center text-slate-500">Carte (placeholder)</div>
        </div>
      </div>
      <aside className="mt-6 space-y-3 md:mt-0">
        {data.slice(0, 9).map((p) => (
          <Link key={p.id} href={`/explore/${p.id}`} className="block rounded-md border border-slate-200 p-3 hover:bg-slate-50">
            <div className="text-sm font-medium text-slate-900">{p.name}</div>
            <div className="text-xs text-slate-600">{p.city} • {p.category}</div>
          </Link>
        ))}
      </aside>
    </div>
  );
}
