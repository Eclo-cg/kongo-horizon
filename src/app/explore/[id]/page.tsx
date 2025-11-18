"use client";
import places from "@/data/places.json";
import type { Place } from "@/types/place.types";
import { PlaceGallery } from "@/components/place-gallery";
import { Button } from "@/components/button";
import { useFavoritesStore } from "@/lib/favorites.store";

export default function PlacePage({ params }: { params: { id: string } }) {
  const place = (places as Place[]).find((p) => p.id === params.id);
  if (!place) return <div className="mx-auto max-w-6xl px-4 py-10">Lieu introuvable.</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{place.name}</h1>
          <p className="text-slate-600">{place.city} • {place.category}</p>
        </div>
        <FavoriteButton id={place.id} />
      </div>
      <div className="mb-8">
        <div className="relative aspect-video overflow-hidden rounded-lg border border-slate-200 bg-white">
          {/* placeholder for map */}
          <div className="flex h-full w-full items-center justify-center text-slate-500">Carte (placeholder)</div>
        </div>
      </div>
      <div className="prose max-w-none">
        <p className="text-slate-700">{place.description}</p>
        {place.history ? <p className="text-slate-700">{place.history}</p> : null}
      </div>
      <div className="mt-10">
        <PlaceGallery images={place.images} />
      </div>
    </div>
  );
}

function FavoriteButton({ id }: { id: string }) {
  const has = useFavoritesStore((s) => s.has(id));
  const toggle = useFavoritesStore((s) => s.toggle);
  return (
    <Button variant={has ? "outline" : "default"} onClick={() => toggle(id)}>
      {has ? "Retirer des favoris" : "Ajouter aux favoris"}
    </Button>
  );
}
