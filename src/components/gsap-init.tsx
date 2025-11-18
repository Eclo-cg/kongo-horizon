"use client";

import { useEffect } from "react";

export function GsapInit() {
  useEffect(() => {
    let mounted = true;
    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      nodes.forEach((el) => {
        const y = Number(el.dataset.revealY || 20);
        const delay = Number(el.dataset.revealDelay || 0);
        gsap.from(el, {
          autoAlpha: 0,
          y,
          duration: 0.5,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    })();
    return () => {
      mounted = false;
    };
  }, []);
  return null;
}
