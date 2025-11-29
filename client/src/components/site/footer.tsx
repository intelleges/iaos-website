import { Link } from "wouter";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/40 bg-background">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-medium tracking-tight text-foreground">
              Intelleges
            </h3>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              A universal engine for supplier management, compliance automation, and nearshoring intelligence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16 text-sm">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Platform</h4>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <Link href="/pricing"><a className="hover:text-foreground transition-colors">Pricing</a></Link>
                <Link href="/contact"><a className="hover:text-foreground transition-colors">Contact</a></Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Resources</h4>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <Link href="/docs"><a className="hover:text-foreground transition-colors">Documentation</a></Link>
                <Link href="/admin"><a className="hover:text-foreground transition-colors">Admin Console</a></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Intelleges. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
