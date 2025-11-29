import { useEffect, useRef } from "react";

interface Logo {
  src: string;
  alt: string;
}

const logos: Logo[] = [
  { src: "/logos/honeywell.jpg", alt: "Honeywell Aerospace" },
  { src: "/logos/battelle.png", alt: "Battelle" },
  { src: "/logos/dod.png", alt: "U.S. Department of Defense" },
  { src: "/logos/celestica.png", alt: "Celestica" },
  { src: "/logos/conedison-new.png", alt: "Con Edison" },
  { src: "/logos/bd.jpg", alt: "Becton Dickinson" },
  { src: "/logos/msk-new.png", alt: "Memorial Sloan Kettering" },
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
        <div className="flex items-center gap-16 w-max">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <img
              key={`logo-1-${index}`}
              src={logo.src}
              alt={logo.alt}
              className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
            />
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <img
              key={`logo-2-${index}`}
              src={logo.src}
              alt={logo.alt}
              className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
