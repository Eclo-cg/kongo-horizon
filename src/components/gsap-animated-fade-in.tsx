"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";
import { gsap } from "gsap";

export function GSAPAnimatedFadeIn({ children, y = 12 }: PropsWithChildren<{ y?: number }>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }, ref);
    return () => ctx.revert();
  }, [y]);
  return <div ref={ref}>{children}</div>;
}
