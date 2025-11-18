import Link from "next/link";
import Image from "next/image";
import type { Place } from "@/types/place.types";
import { MapPin, Star } from "lucide-react";

export function CardPlace({ place }: { place: Place }) {
  return (
    <Link
      href={`/explore/${place.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white"
    >
      <div className="relative aspect-4/3 w-full">
        <Image src={place.cover} alt={place.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <MapPin size={14} />
          <span>{place.city} • {place.category}</span>
          <span className="ml-auto inline-flex items-center gap-1 text-slate-700"><Star size={12} />4.7</span>
        </div>
        <h3 className="mt-1 text-base font-semibold text-slate-900 leading-tight">{place.name}</h3>
      </div>
    </Link>
  );
}
