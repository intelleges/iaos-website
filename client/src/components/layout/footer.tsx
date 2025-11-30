import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-border/20 bg-muted/30">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-base font-normal">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/product" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/protocols" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Protocols
                </Link>
              </li>
              <li>
                <Link href="/supplier-onboarding" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Supplier Onboarding
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-base font-normal">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="tel:+19178180225" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  +1-917-818-0225
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-base font-normal">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/case-studies" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/one-pagers" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  One-Pagers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-base font-normal">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Login */}
          <div className="space-y-4">
            <h3 className="text-base font-normal">Access</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/login" className="text-base font-light text-muted-foreground hover:text-foreground transition-colors">
                  Client Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base font-light text-muted-foreground">
            © {new Date().getFullYear()} Intelleges. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-base font-light text-muted-foreground">
              ISO 27001 Certified
            </p>
            <p className="text-base font-light text-muted-foreground">
              Battelle Supplier of the Year
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
