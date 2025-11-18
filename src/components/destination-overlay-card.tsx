"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function DestinationOverlayCard({
  title,
  subtitle,
  image,
  href,
  badges,
}: {
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  badges?: { icon?: ReactNode; text: string; color?: string }[];
}) {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-xl border border-slate-200">
      <div className="relative aspect-4/3">
        <Image src={image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="text-white/90">{subtitle}</div>
        <div className="text-lg font-semibold text-white">{title}</div>
        {badges && badges.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {badges.map((b, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 rounded-full ${b.color ?? "bg-[#009543]"} px-2 py-0.5 text-[11px] font-medium text-white/95`}
              >
                {b.icon ? b.icon : null}
                {b.text}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
