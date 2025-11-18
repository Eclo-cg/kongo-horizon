"use client";

import places from "@/data/places.json";
import type { Place } from "@/types/place.types";
import { useFavoritesStore } from "@/lib/favorites.store";
import { CardPlace } from "@/components/card-place";
import { GridList } from "@/components/grid-list";
import { SectionHeader } from "@/components/section-header";

export default function FavoritesPage() {
  const ids = useFavoritesStore((s) => s.ids);
  const data = (places as Place[]).filter((p) => ids.includes(p.id));
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeader title="Favoris" description="Vos lieux enregistrés en local (navigateur)." />
      {data.length === 0 ? (
        <p className="text-slate-600">Aucun favori pour le moment.</p>
      ) : (
        <GridList>
          {data.map((p) => (
            <CardPlace key={p.id} place={p} />
          ))}
        </GridList>
      )}
    </div>
  );
}
