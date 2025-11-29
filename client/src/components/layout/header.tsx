import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
    { name: "Protocols", href: "/protocols" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Intelleges" className="h-[13rem] w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "text-base font-light tracking-wide transition-colors hover:text-foreground cursor-pointer",
                location === item.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Trust Markers & CTA */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="text-base font-semibold text-primary tracking-wide">
            ISO 27001 Certified · Battelle Supplier of the Year
          </div>
          <Link href="/login">
            <Button size="sm" className="text-base font-light bg-[#0A3A67] hover:bg-[#0A3A67]/90 text-white rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Client Login
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="sm" className="rounded-full px-6 font-light transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Book a Demo
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border/20 bg-background">
          <div className="container py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-base font-light py-2 text-muted-foreground hover:text-foreground cursor-pointer tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
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
