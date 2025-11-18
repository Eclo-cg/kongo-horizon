import Image from "next/image";
import Link from "next/link";
import type { Itinerary } from "@/types/itinerary.types";

export function ItineraryCard({ item }: { item: Itinerary }) {
  return (
    <Link href={`/itineraries/${item.id}`} className="group block overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:bg-slate-50">
      <div className="relative aspect-4/3 w-full">
        <Image src={item.cover} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="text-base font-semibold text-slate-900">{item.name}</div>
        <div className="text-sm text-slate-600">Durée: {item.duration}</div>
      </div>
    </Link>
  );
}
