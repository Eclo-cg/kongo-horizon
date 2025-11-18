"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";
import { gsap } from "gsap";

export function PageTransition({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.fromTo(el, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" });
  }, []);
  return <div ref={ref}>{children}</div>;
}
