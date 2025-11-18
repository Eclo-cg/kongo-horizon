"use client";

import Link from "next/link";
import Image from "next/image";

export function HeroBanner() {
  return (
    <section className="rounded-2xl  sm:mx-0">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative aspect-video md:aspect-16/6 w-full">
          <Image 
            src="/placeholder/loufoulakari.svg" 
            alt="Paysage du Congo Brazzaville" 
            fill 
            className="object-cover" 
            priority 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px" 
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          {/* Congo ribbon accent */}
          <div className="absolute left-4 sm:left-6 top-4 sm:top-6 h-1 w-16 sm:w-24 rounded-full" style={{ background: "linear-gradient(90deg,#009543,#FCD116,#DC241F)" }} />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8 xl:p-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-white">
              Congo Horizon
            </h1>
            <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-white/90 sm:text-white/85">
              Découvrez des destinations d'exception, préparez vos parcours, et laissez-vous guider.
            </p>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              <Link 
                href="/explore" 
                className="inline-flex h-9 sm:h-10 items-center rounded-md bg-[#009543] px-3 sm:px-4 text-xs sm:text-sm font-medium text-white hover:bg-[#00823a] transition-colors"
              >
                Explorer
              </Link>
              <Link 
                href="/map" 
                className="inline-flex h-9 sm:h-10 items-center rounded-md border border-white/70 bg-white/10 px-3 sm:px-4 text-xs sm:text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition-colors"
              >
                Voir la carte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
