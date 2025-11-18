"use client";

import Image from "next/image";

export function PlaceGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {images.map((src) => (
        <div key={src} className="relative aspect-4/3 overflow-hidden rounded-md">
          <Image src={src} alt="" fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
