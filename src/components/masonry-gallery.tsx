"use client";

import Image from "next/image";

export function MasonryGallery({ images }: { images: string[] }) {
  return (
    <div className="[column-fill:_balance]_md:columns-3 columns-2 gap-4">
      {images.map((src) => (
        <div key={src} className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-slate-200">
          <div className="relative aspect-[4/3]">
            <Image src={src} alt="" fill className="object-cover" loading="lazy" />
          </div>
        </div>
      ))}
    </div>
  );
}
