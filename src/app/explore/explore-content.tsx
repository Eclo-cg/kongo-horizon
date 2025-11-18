'use client';

import { useSearchParams } from 'next/navigation';
import places from "@/data/places.json";
import type { Place } from "@/types/place.types";
import { CardPlace } from "@/components/card-place";
import { GridList } from "@/components/grid-list";
import { SectionHeader } from "@/components/section-header";
import { Pagination } from "@/components/pagination";

const categories = ["toutes", "nature", "histoire", "culture", "gastronomie", "art"] as const;

function filterPlaces(all: Place[], city: string, cat: string) {
  return all.filter((p) => (city ? p.city === city : true) && (cat !== "toutes" ? p.category === cat : true));
}

export function ExploreContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city') ?? '';
  const cat = (searchParams.get('category') as (typeof categories)[number]) ?? 'toutes';
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  
  const all = filterPlaces(places as Place[], city, cat);
  const pageSize = 9;
  const start = (page - 1) * pageSize;
  const data = all.slice(start, start + pageSize);

  const cities = Array.from(new Set((places as Place[]).map((p) => p.city)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeader 
        title="Explorer" 
        description="Filtre par ville et catégorie. Animations subtiles, design minimal." 
      />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <select
          value={city}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams);
            if (e.target.value) {
              params.set('city', e.target.value);
            } else {
              params.delete('city');
            }
            window.location.href = `/explore?${params.toString()}`;
          }}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
        >
          <option value="">Toutes les villes</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const params = new URLSearchParams(searchParams);
            params.set('category', c);
            if (!city) params.delete('city');
            
            return (
              <a
                key={c}
                href={`?${params.toString()}`}
                className={`h-9 rounded-full border px-3 text-sm leading-9 ${
                  c === cat 
                    ? 'border-blue-600 text-blue-700' 
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {c}
              </a>
            );
          })}
        </div>
      </div>

      <GridList>
        {data.map((place) => (
          <CardPlace key={place.id} place={place} />
        ))}
      </GridList>

      <div className="mt-8">
        <Pagination total={all.length} pageSize={pageSize} />
      </div>
    </div>
  );
}
