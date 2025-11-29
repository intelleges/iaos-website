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
        isScrolled ? "h-16" : "h-20"
      )}>
        <Link href="/" className="flex items-center gap-2">
          {/* Full logo: visible on md and up (768px+) */}
          <img src="/logo.png" alt="Intelleges" className="hidden md:block h-8 lg:h-10 xl:h-12 w-auto" />
          {/* Favicon only: visible on small screens (below 768px) */}
          <img src="/favicon.png" alt="Intelleges" className="block md:hidden h-10 w-10" />
        </Link>

        {/* Desktop Navigation - Hidden on smaller screens (below 1024px) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "text-sm 2xl:text-base font-light tracking-wide transition-colors hover:text-foreground cursor-pointer whitespace-nowrap",
                location === item.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side: Buttons and optional certification */}
        <div className="flex items-center gap-2 md:gap-3 2xl:gap-6">
          {/* Certification labels - Hidden first (below 1280px) */}
          <div className="hidden xl:block text-xs 2xl:text-sm font-semibold text-primary tracking-wide whitespace-nowrap">
            ISO 27001 Certified · Battelle Supplier of the Year
          </div>
          
          {/* CTA Buttons - Always visible on desktop */}
          <div className="hidden md:flex items-center gap-2 xl:gap-3">
            <Link href="/login">
              <Button size="sm" className="text-sm 2xl:text-base font-light bg-[#0A3A67] hover:bg-[#0A3A67]/90 text-white rounded-full px-3 xl:px-4 2xl:px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap">
                Client Login
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm" className="rounded-full px-3 xl:px-4 2xl:px-6 text-sm 2xl:text-base font-light transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle - Visible below lg (1024px) */}
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
                  className="flex items-center gap-3 text-base font-light py-3 text-muted-foreground hover:text-foreground cursor-pointer tracking-wide transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
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
