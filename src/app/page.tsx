"use client";

import Link from "next/link";
import { HeroBanner } from "@/components/hero-banner";
import { SectionHeader } from "@/components/section-header";
 
import { CardPlace } from "@/components/card-place";
import { GridList } from "@/components/grid-list";
import { StatsRow } from "@/components/stats-row";
import { DestinationOverlayCard } from "@/components/destination-overlay-card";
import { MasonryGallery } from "@/components/masonry-gallery";
import { Testimonials } from "@/components/testimonials";
import { Flame, Crown, Landmark } from "lucide-react";
import { MapInteractiveMini } from "@/components/map-interactive";
import { FooterComplete } from "@/components/footer-complete";
import places from "@/data/places.json";
import itineraries from "@/data/itineraries.json";
import type { Place } from "@/types/place.types";
import type { Itinerary } from "@/types/itinerary.types";

export default function Home() {
  const allPlaces = places as Place[];
  const topTwelve = allPlaces.slice(0, 12);
  const its = itineraries as Itinerary[];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-10 overflow-x-hidden">
      {/* Hero Banner */}
        <HeroBanner />
      
      <div data-reveal data-reveal-delay="0.05">
        <StatsRow />
      </div>

      {/* Catégories visuelles */}
      <section className="mt-24" data-reveal>
        <SectionHeader title="Par catégories" description="Accédez rapidement aux univers clés : histoire, culture et nature." />
        <div className="grid gap-4 sm:grid-cols-3">
          <DestinationOverlayCard title="Histoire" subtitle="Moments clés" image="/placeholder/anne.svg" href="/history" badges={[{icon:<Landmark size={12}/>, text:"Patrimoine", color:"bg-[#DC241F]"}]} />
          <DestinationOverlayCard title="Culture" subtitle="Arts & langues" image="/placeholder/anne2.svg" href="/culture" badges={[{icon:<Crown size={12}/>, text:"Incontournable", color:"bg-[#FCD116] text-slate-900"}]} />
          <DestinationOverlayCard title="Nature" subtitle="Sites remarquables" image="/placeholder/loufoulakari.svg" href="/explore?category=nature" badges={[{icon:<Flame size={12}/>, text:"Trending"}]} />
        </div>
      </section>

      {/* Top Destinations grid (3) */}
      <section className="mt-24">
        <SectionHeader
          title="Destinations phares"
          description="Depuis les cascades jusqu’aux sites historiques, découvrez vos prochains lieux."
          action={<Link href="/explore" className="inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 hover:bg-slate-50">Voir plus</Link>}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {topTwelve.slice(0,3).map((p) => (
            <CardPlace key={p.id} place={p} />
          ))}
        </div>
      </section>

      {/* 3 thèmes principaux */}
      <section className="mt-16">
        <SectionHeader
          title="Explorer par thèmes"
          description="Découvrir (culture/histoire), Explorer (nature/parcs), Apprendre (gastronomie/artisanat)."
          action={<Link href="/explore" className="inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 hover:bg-slate-50">Voir plus</Link>}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <DestinationOverlayCard title="Découvrir" subtitle="Culture & histoire" image="/placeholder/anne.svg" href="/explore?category=culture" badges={[{ icon:<Landmark size={12}/>, text:"Patrimoine", color:"bg-[#DC241F]" }]} />
          <DestinationOverlayCard title="Explorer" subtitle="Nature & parcs" image="/placeholder/loufoulakari.svg" href="/explore?category=nature" badges={[{ icon:<Flame size={12}/>, text:"Aventure" }]} />
          <DestinationOverlayCard title="Apprendre" subtitle="Gastronomie & artisanat" image="/placeholder/anne2.svg" href="/learn" badges={[{ icon:<Crown size={12}/>, text:"Incontournable", color:"bg-[#F7C600] text-slate-900" }]} />
        </div>
      </section>

      {/* Mini carte interactive */}
      <section className="mt-24" data-reveal data-reveal-y="16">
        <SectionHeader
          title="Aperçu de la carte"
          description="Repérez Brazzaville, Pointe‑Noire et les régions voisines puis explorez en détail."
          action={<Link href="/explore" className="inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 hover:bg-slate-50">Ouvrir la carte</Link>}
        />
        <MapInteractiveMini />
      </section>

      {/* Packages / Itineraires visuels */}
      <section className="mt-16">
        <SectionHeader title="Parcours" description="Des itinéraires concis pour explorer le Congo efficacement." action={<Link href="/itineraries" className="inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 hover:bg-slate-50">Voir plus</Link>} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {its.slice(0, 3).map((it) => (
            <DestinationOverlayCard
              key={it.id}
              title={it.name}
              subtitle={it.duration}
              image={it.cover}
              href={`/itineraries?page=1`}
              badges={[{ text: it.duration, color: "bg-[#FCD116] text-slate-900" }]}
            />
          ))}
        </div>
      </section>

      {/* Galerie inspirante */}
      <section className="mt-16">
        <SectionHeader
          title="Galerie inspirante"
          description="Un aperçu visuel pour vous donner envie de visiter le Congo."
          action={<Link href="/gallery" className="inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 hover:bg-slate-50">Voir plus</Link>}
        />
        <MasonryGallery images={["/placeholder/anne.svg","/placeholder/anne2.svg","/placeholder/loufoulakari.svg","/placeholder/lou2.svg"]} />
      </section>

      {/* Témoignages */}
      <section className="mt-16">
        <SectionHeader
          title="Ils en parlent"
          description="Des voyageurs conquis par la découverte du Congo."
          action={<Link href="/reviews" className="inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 hover:bg-slate-50">Voir plus d’avis</Link>}
        />
        <Testimonials />
      </section>

      {/* Steps row */}
      <section className="mt-24 rounded-xl border border-slate-200 bg-white p-6">
        <SectionHeader
          title="Comment ça marche"
          description="Réservez des découvertes en 3 étapes simples."
          action={<Link href="/explore" className="inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 hover:bg-slate-50">Commencer</Link>}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">1. Choisissez une destination</div>
            <p className="text-sm text-slate-600">Filtrez par ville, catégorie ou popularité.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">2. Personnalisez votre parcours</div>
            <p className="text-sm text-slate-600">Sélectionnez les étapes qui vous inspirent le plus.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">3. Explorez</div>
            <p className="text-sm text-slate-600">Profitez d’un guide clair, avec contenus audio et visuels.</p>
          </div>
        </div>
      </section>

      {/* CTA footer section */}
      <section className="mt-16 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="text-lg font-semibold text-slate-900">Prêt à explorer le Congo ?</div>
            <p className="text-sm text-slate-600">Commencez par les destinations phares ou parcourez la carte interactive.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/explore" className="inline-flex h-10 items-center rounded-md bg-[#009543] px-4 text-sm font-medium text-white hover:bg-[#00823a]">Explorer</Link>
            <Link href="/map" className="inline-flex h-10 items-center rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 hover:bg-slate-50">Carte</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
