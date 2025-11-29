import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Home as HomeIcon, Package, FileText, Info, DollarSign, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Product", href: "/product", icon: Package },
    { name: "Protocols", href: "/protocols", icon: FileText },
    { name: "About", href: "/about", icon: Info },
    { name: "Pricing", href: "/pricing", icon: DollarSign },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80 transition-all duration-300">
      <div className={cn(
        "container flex items-center justify-between transition-all duration-300",
        isScrolled ? "h-[151px]" : "h-[173px]"
      )}>
        <Link href="/" className="flex items-center gap-2">
          {/* Full logo on desktop/tablet (768px+) */}
          <img src="/logo.png" alt="Intelleges" className="hidden md:block h-[151px] w-auto" />
          {/* Favicon on mobile (below 768px) */}
          <img src="/favicon.png" alt="Intelleges" className="block md:hidden h-28 w-28" />
        </Link>

        {/* Desktop Navigation - hide below 1024px (lg) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "relative inline-block text-base font-light tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap group pb-1",
                location === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.name}
              {/* Animated underline */}
              <span className={cn(
                "absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300 ease-out",
                location === item.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </nav>

        {/* Right side: Certification + Buttons */}
        <div className="flex items-center gap-6">
          {/* Certification labels - hide first (below 1280px / xl) */}
          <div className="hidden xl:block text-base font-semibold text-primary tracking-wide whitespace-nowrap">
            ISO 27001 Certified · Battelle Supplier of the Year
          </div>
          
          {/* CTA Buttons - always visible on desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button size="sm" className="text-base font-light bg-[#0A3A67] hover:bg-[#0A3A67]/90 text-white rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap">
                Client Login
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm" className="text-base rounded-full px-6 font-light transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle - show below 1024px (lg) */}
        <button 
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border/20 bg-background animate-in slide-in-from-top-4 duration-300">
          <div className="container py-6 flex flex-col gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className="flex items-center gap-3 text-base font-light py-3 text-muted-foreground hover:text-foreground cursor-pointer tracking-wide transition-all duration-300 hover:translate-x-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {item.name}
                </Link>
              );
            })}
            <div className="text-base font-semibold text-primary tracking-wide py-2 border-t border-border/20 mt-2 pt-4">
              ISO 27001 Certified · Battelle Supplier of the Year
            </div>
            <Link href="/login">
              <Button className="w-full rounded-full font-light bg-[#0A3A67] hover:bg-[#0A3A67]/90 text-white transition-all duration-300 hover:scale-105" onClick={() => setIsMenuOpen(false)}>
                Client Login
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="w-full rounded-full mt-2 font-light transition-all duration-300 hover:scale-105" onClick={() => setIsMenuOpen(false)}>
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
