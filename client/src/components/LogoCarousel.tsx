import { useEffect, useRef } from "react";
import { Link } from "wouter";

interface Logo {
  src: string;
  alt: string;
  link: string;
}

const logos: Logo[] = [
  { src: "/logos/honeywell.jpg", alt: "Honeywell Aerospace", link: "/case-studies/honeywell-aerospace" },
  { src: "/logos/battelle.png", alt: "Battelle", link: "/case-studies/battelle" },
  { src: "/logos/dod.svg", alt: "U.S. Department of Defense", link: "/case-studies/department-of-defense" },
  { src: "/logos/celestica.png", alt: "Celestica", link: "/case-studies" },
  { src: "/logos/conedison-new.png", alt: "Con Edison", link: "/case-studies" },
  { src: "/logos/bd.jpg", alt: "Becton Dickinson", link: "/case-studies" },
  { src: "/logos/msk-new.png", alt: "Memorial Sloan Kettering", link: "/case-studies" },
];

export default function LogoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!isPausedRef.current) {
        scrollPosition += scrollSpeed;
        
        // Reset when we've scrolled through half the content (since we duplicate)
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    animationFrameRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <div className="mt-16 pt-12 border-t border-border/20">
      <p className="text-base text-muted-foreground font-light text-center mb-8">
        Trusted by leading organizations
      </p>
      
      <div 
        ref={scrollRef}
        className="overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        }}
      >
        <div className="flex gap-16 animate-scroll">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <Link key={`logo-${index}`} href={logo.link} className="flex-shrink-0">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              />
            </Link>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <Link key={`logo-duplicate-${index}`} href={logo.link} className="flex-shrink-0">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
