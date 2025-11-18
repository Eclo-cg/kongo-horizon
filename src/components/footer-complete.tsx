"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function FooterComplete() {
  return (
    <footer className="mt-24 bg-[#005A2B] text-white/90">
      <div className="mx-auto max-w-7xl px-4 md:px-10 pt-16 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-lg font-semibold text-white">Kongo Horizon</div>
            <div className="mt-2 h-1 w-10 bg-[#F7C600]" />
            <p className="mt-3 text-sm text-white/80">Portail touristique pour explorer, apprendre et planifier vos découvertes au Congo.</p>
            <div className="mt-5 flex items-center gap-3">
              <Link aria-label="Facebook" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10"><Facebook size={16} /></Link>
              <Link aria-label="Instagram" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10"><Instagram size={16} /></Link>
              <Link aria-label="Twitter" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10"><Twitter size={16} /></Link>
              <Link aria-label="Contact" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10"><Mail size={16} /></Link>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Découvrir</div>
            <div className="mt-2 h-1 w-8 bg-[#F7C600]" />
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><Link className="hover:underline" href="/explore?category=histoire">Histoire</Link></li>
              <li><Link className="hover:underline" href="/explore?category=culture">Culture</Link></li>
              <li><Link className="hover:underline" href="/explore?category=nature">Nature & Parcs</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Explorer</div>
            <div className="mt-2 h-1 w-8 bg-[#F7C600]" />
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><Link className="hover:underline" href="/explore">Carte & Lieux</Link></li>
              <li><Link className="hover:underline" href="/itineraries">Itinéraires</Link></li>
              <li><Link className="hover:underline" href="/events">Événements</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Préférences</div>
            <div className="mt-2 h-1 w-8 bg-[#F7C600]" />
            <div className="mt-4"><LanguageSwitcher initial="fr" variant="dark" /></div>
            <div className="mt-4 text-xs text-white/60">Langues disponibles: Français, English</div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center">
          <div className="text-xs text-white/60">© {new Date().getFullYear()} Congo Horizon. Tous droits réservés.</div>
          <div className="flex gap-4 text-xs text-white/80">
            <Link className="hover:underline" href="#">Mentions légales</Link>
            <Link className="hover:underline" href="#">Confidentialité</Link>
            <Link className="hover:underline" href="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
