import { Link } from "wouter";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/">
              <a className="flex items-center gap-2">
                <img src="/logo.png" alt="Intelleges" className="h-8 w-auto" />
                <span className="text-xl font-semibold tracking-tight">Intelleges</span>
              </a>
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
              <li><Link href="/#features"><a className="hover:text-foreground transition-colors">Features</a></Link></li>
              <li><Link href="/#solutions"><a className="hover:text-foreground transition-colors">Solutions</a></Link></li>
              <li><Link href="/pricing"><a className="hover:text-foreground transition-colors">Pricing</a></Link></li>
              <li><Link href="/#integrations"><a className="hover:text-foreground transition-colors">Integrations</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about"><a className="hover:text-foreground transition-colors">About Us</a></Link></li>
              <li><Link href="/careers"><a className="hover:text-foreground transition-colors">Careers</a></Link></li>
              <li><Link href="/blog"><a className="hover:text-foreground transition-colors">Blog</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-foreground transition-colors">Contact</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy"><a className="hover:text-foreground transition-colors">Privacy Policy</a></Link></li>
              <li><Link href="/terms"><a className="hover:text-foreground transition-colors">Terms of Service</a></Link></li>
              <li><Link href="/security"><a className="hover:text-foreground transition-colors">Security</a></Link></li>
              <li><Link href="/cookies"><a className="hover:text-foreground transition-colors">Cookie Policy</a></Link></li>
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
