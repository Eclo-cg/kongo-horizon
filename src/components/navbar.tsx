"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
};

const links: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/explore", label: "Explorer" },
  { href: "/itineraries", label: "Itinéraires" },
];

// Animation variants
const menuItemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1 + i * 0.1,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

// Hook pour mesurer les dimensions du conteneur
const useDimensions = (ref: React.RefObject<HTMLElement | null>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    
    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Use requestAnimationFrame to ensure the ref is attached to the DOM
    const raf = requestAnimationFrame(() => {
      updateDimensions();
    });
    
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [ref]);

  return dimensions;
};

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const animationRef = useRef<gsap.core.Timeline|null>(null);
  const { height: containerHeight } = useDimensions(containerRef);

  // Initialize GSAP animations
  useEffect(() => {
    if (!menuRef.current || !menuButtonRef.current) return;

    // Créer un élément pour le fond animé
    const background = document.createElement('div');
    background.className = 'fixed inset-0 bg-white z-20';
    background.style.clipPath = 'circle(0% at 0% 0%)';
    background.style.willChange = 'clip-path';
    
    // Ajouter le fond au document body
    document.body.appendChild(background);
    
    // Créer la timeline d'animation
    const tl = gsap.timeline({ paused: true });
    
    // Animation du fond
    tl.to(background, {
      clipPath: 'circle(150% at 0% 0%)',
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0);
    
    // Animation des éléments du menu
    tl.fromTo(
      menuItemsRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      },
      0.2
    );
    
    // Stocker la timeline dans la ref
    animationRef.current = tl;
    
    // Nettoyage
    return () => {
      tl.kill();
      if (background.parentNode) {
        background.parentNode.removeChild(background);
      }
    };
  }, []);

  // Handle menu open/close with animation
  useEffect(() => {
    if (!animationRef.current) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Forcer le rafraîchissement du DOM avant l'animation
      requestAnimationFrame(() => {
        animationRef.current?.play();
      });
    } else {
      document.body.style.overflow = '';
      animationRef.current.reverse();
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clean up animations on unmount
  useEffect(() => {
    return () => {
      animationRef.current?.kill();
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-slate-200 bg-white/75 backdrop-blur-sm",
      )}
      style={{
        minHeight: '4rem',
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold text-slate-900"
          onClick={() => setIsOpen(false)}
        >
          Kongo Horizon
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-10 hidden items-center gap-6 text-sm text-slate-600 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-2 py-1 transition-colors hover:text-slate-900",
                pathname === link.href
                  ? "font-medium text-slate-900"
                  : "hover:bg-slate-50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          type="button"
          className="relative z-50 -mr-2 p-2 text-slate-600 hover:text-slate-900 focus:outline-none md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          <div className="relative h-6 w-6">
            <span className={cn(
              "absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 transform bg-current transition-all duration-300",
              isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            )}></span>
            <span className={cn(
              "absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 transform bg-current transition-all duration-300",
              isOpen ? "opacity-0" : "opacity-100"
            )}></span>
            <span className={cn(
              "absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 transform bg-current transition-all duration-300",
              isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            )}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-40 flex  bg-white transition-all duration-300 md:hidden",
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        style={{
          top: '4rem', // Hauteur de la navbar
          height: 'calc(100vh - 4rem)' // Hauteur de l'écran moins la hauteur de la navbar
        }}
        aria-hidden={!isOpen}
      >
        
        <nav className=" overflow-y-auto z-50 w-full">
          <ul className="space-y-4 p-5 w-full">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block  text-xl font-medium text-slate-900/70 transition-colors",
                    pathname === link.href ? "text-slate-900 " : "",
                    "border-t border-slate-300 pt-4 w-full"
                  )}
                  onClick={() => {
                    setIsOpen(false);
                    // Arrêter l'animation en cours si elle existe
                    if (animationRef.current) {
                      animationRef.current.kill();
                    }
                  }}
                  ref={el => {
                    if (el) {
                      const index = links.findIndex(l => l.href === link.href);
                      if (index !== -1) {
                        menuItemsRef.current[index] = el;
                      }
                    }
                  }}
                  style={{
                    opacity: 1,
                    transform: 'translateY(0)'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
