import { Link } from "wouter";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Intelleges" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The universal engine for supplier management, compliance automation, and nearshoring intelligence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-foreground transition-colors cursor-pointer">Features</Link></li>
              <li><Link href="/#solutions" className="hover:text-foreground transition-colors cursor-pointer">Solutions</Link></li>
              <li><Link href="/case-studies" className="hover:text-foreground transition-colors cursor-pointer">Case Studies</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors cursor-pointer">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors cursor-pointer">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-foreground transition-colors cursor-pointer">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors cursor-pointer">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors cursor-pointer">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-foreground transition-colors cursor-pointer">Security</Link></li>
              <li><Link href="/cookies" className="hover:text-foreground transition-colors cursor-pointer">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Intelleges.com. All rights reserved.</p>
          <p>Designed with Scandinavian minimalism.</p>
        </div>
      </div>
    </footer>
  );
}
