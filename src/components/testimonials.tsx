"use client";

import { Carousel } from "@/components/carousel";
import { Quote, Star } from "lucide-react";

const items = [
  { quote: "Une expérience unique, j'ai découvert le Congo autrement.", author: "Amina, Paris" },
  { quote: "Itinéraires clairs et inspirants, parfait pour un court séjour.", author: "Lucas, Genève" },
  { quote: "La galerie donne vraiment envie de partir.", author: "Sara, Montréal" },
];

export function Testimonials() {
  return (
    <div>
      <Carousel>
        {items.map((t, idx) => (
          <div key={idx} className="min-w-[320px] snap-start">
            <figure className="rounded-xl border border-slate-200 bg-white p-6">
              <Quote size={18} className="text-slate-400" />
              <blockquote className="mt-3 text-slate-900">{t.quote}</blockquote>
              <figcaption className="mt-2 text-sm text-slate-600">{t.author}</figcaption>
              <div className="mt-2 flex items-center gap-1 text-[#009543]">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} />
              </div>
            </figure>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
