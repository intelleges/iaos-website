import { Check } from "lucide-react";

const benefits = [
  "Unified supplier data model",
  "Automated compliance evidence",
  "Real-time risk monitoring",
  "Cross-border nearshoring",
  "Audit-ready reporting",
  "Secure document vault",
];

export default function SectionValueProp() {
  return (
    <section className="container py-24 border-t border-border/40">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
        <div>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-6 text-foreground">
            Compliance without the chaos.
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Replace fragmented spreadsheets, emails, and shared drives with a single source of truth. 
            Intelleges orchestrates the entire supplier lifecycle from onboarding to audit.
          </p>
          
          <ul className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <Check className="h-3.5 w-3.5" />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-3xl bg-muted/30 border border-border/50 overflow-hidden p-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-muted/50" />
          {/* Abstract representation of order/structure */}
          <div className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-md opacity-80">
            <div className="h-32 rounded-2xl bg-background shadow-sm border border-border/60 p-4">
              <div className="h-2 w-12 rounded-full bg-muted mb-3" />
              <div className="h-2 w-24 rounded-full bg-muted/50" />
            </div>
            <div className="h-32 rounded-2xl bg-background shadow-sm border border-border/60 p-4 translate-y-8">
              <div className="h-2 w-12 rounded-full bg-emerald-500/20 mb-3" />
              <div className="h-2 w-20 rounded-full bg-muted/50" />
            </div>
            <div className="h-32 rounded-2xl bg-background shadow-sm border border-border/60 p-4 -translate-y-4">
              <div className="h-2 w-12 rounded-full bg-blue-500/20 mb-3" />
              <div className="h-2 w-16 rounded-full bg-muted/50" />
            </div>
            <div className="h-32 rounded-2xl bg-background shadow-sm border border-border/60 p-4 translate-y-4">
              <div className="h-2 w-12 rounded-full bg-orange-500/20 mb-3" />
              <div className="h-2 w-20 rounded-full bg-muted/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
