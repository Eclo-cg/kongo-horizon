"use client";

import type { ReactNode } from "react";

export function IconBadge({ icon, text, color = "bg-[#009543]" }: { icon: ReactNode; text: string; color?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${color} px-2 py-0.5 text-[11px] font-medium text-white/95`}> 
      {icon}
      {text}
    </span>
  );
}
