import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ShieldCheck, TrendingUp, Globe2 } from "lucide-react";

const pillars = [
  {
    title: 'Procurement intelligence',
    body: 'Unify spend, supplier, and contract data into one normalized view so buyers see risk, opportunity, and compliance in real time.',
    icon: BarChart3,
    color: "group-hover:text-blue-500",
    borderColor: "hover:border-blue-500/50",
    bgHover: "hover:bg-blue-500/5"
  },
  {
    title: 'Compliance automation',
    body: 'Automate evidence collection, supplier attestations, and scorecards so audits become a report, not a fire drill.',
    icon: ShieldCheck,
    color: "group-hover:text-emerald-500",
    borderColor: "hover:border-emerald-500/50",
    bgHover: "hover:bg-emerald-500/5"
  },
  {
    title: 'Supplier performance',
    body: 'Track quality, delivery, cost, and ESG across categories—then act on outliers with playbooks instead of spreadsheets.',
    icon: TrendingUp,
    color: "group-hover:text-amber-500",
    borderColor: "hover:border-amber-500/50",
    bgHover: "hover:bg-amber-500/5"
  },
  {
    title: 'Nearshoring infrastructure',
    body: 'Match US demand with Mexican and Latin American capacity using a curated registry, maturity scoring, and ongoing coaching.',
    icon: Globe2,
    color: "group-hover:text-rose-500",
    borderColor: "hover:border-rose-500/50",
    bgHover: "hover:bg-rose-500/5"
  },
];

export default function SectionPillars() {
  return (
    <section className="container py-24">
      <header className="mb-12 max-w-2xl space-y-4">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl text-foreground">
          One platform. Four pillars.
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Intelleges was designed around the real work of procurement, supplier diversity,
          and compliance teams—not just dashboards.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar) => (
          <Card 
            key={pillar.title} 
            className={`group h-full border border-border/60 bg-card/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${pillar.borderColor} ${pillar.bgHover}`}
          >
            <CardHeader className="pb-3">
              <div className={`mb-3 w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center transition-colors duration-300 group-hover:bg-background ${pillar.color}`}>
                <pillar.icon className="w-5 h-5" />
              </div>
              <CardTitle className="text-sm font-semibold tracking-tight transition-colors duration-300 group-hover:text-foreground">
                {pillar.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-muted-foreground/80">
                {pillar.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
