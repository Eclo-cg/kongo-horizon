"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function ThematicCard({ title, href, description }: { title: string; href: string; description: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const enter = () => gsap.to(el, { y: -4, scale: 1.01, duration: 0.2, ease: "power2.out" });
    const leave = () => gsap.to(el, { y: 0, scale: 1, duration: 0.25, ease: "power2.out" });
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      className="block rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:bg-slate-50"
    >
      <div className="text-base font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </Link>
  );
}
