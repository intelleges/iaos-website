import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-border/20 bg-muted/30">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Description */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-sm font-light text-muted-foreground max-w-md leading-relaxed">
              Enterprise compliance depends on information. Intelleges gets it all cleanly, automatically, and on time.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-normal">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#how-it-works" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="https://iaos-compliance-platform-production.up.railway.app/" target="_blank" rel="noopener noreferrer" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                  Client Login
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-normal">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="tel:+19178180225" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                  +1-917-818-0225
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-light text-muted-foreground">
            © {new Date().getFullYear()} Intelleges. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs font-light text-muted-foreground">
              ISO 27001 Certified
            </p>
            <p className="text-xs font-light text-muted-foreground">
              Battelle Supplier of the Year
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
