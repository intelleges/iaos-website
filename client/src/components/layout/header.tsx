import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Solutions", href: "/#solutions" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Intelleges" className="h-40 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground cursor-pointer",
                location === item.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <a href="https://app.intelleges.com/login" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="rounded-full px-4 text-muted-foreground hover:text-foreground">
              Client Login
            </Button>
          </a>
          <Link href="/contact">
            <Button size="sm" className="rounded-full px-6">Get Started</Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a href="https://app.intelleges.com/login" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" className="w-full rounded-full" onClick={() => setIsMenuOpen(false)}>
                Client Login
              </Button>
            </a>
            <Link href="/contact">
              <Button className="w-full rounded-full mt-2" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
