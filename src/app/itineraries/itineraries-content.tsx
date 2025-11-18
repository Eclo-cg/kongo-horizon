'use client';

import { useSearchParams } from 'next/navigation';
import items from "@/data/itineraries.json";
import type { Itinerary } from "@/types/itinerary.types";
import { SectionHeader } from "@/components/section-header";
import { GridList } from "@/components/grid-list";
import { ItineraryCard } from "@/components/itinerary-card";
import { Pagination } from "@/components/pagination";

export function ItinerariesContent() {
  const searchParams = useSearchParams();
  const all = items as Itinerary[];
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const pageSize = 9;
  const start = (page - 1) * pageSize;
  const data = all.slice(start, start + pageSize);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeader title="Itinéraires" description="Parcours recommandés regroupant plusieurs sites." />
      <GridList>
        {data.map((it) => (
          <ItineraryCard key={it.id} item={it} />
        ))}
      </GridList>
      <Pagination total={all.length} pageSize={pageSize} />
    </div>
  );
}
