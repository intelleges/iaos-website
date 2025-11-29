import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pillars = [
  {
    title: 'Procurement intelligence',
    body: 'Unify spend, supplier, and contract data into one normalized view so buyers see risk, opportunity, and compliance in real time.',
  },
  {
    title: 'Compliance automation',
    body: 'Automate evidence collection, supplier attestations, and scorecards so audits become a report, not a fire drill.',
  },
  {
    title: 'Supplier performance',
    body: 'Track quality, delivery, cost, and ESG across categories—then act on outliers with playbooks instead of spreadsheets.',
  },
  {
    title: 'Nearshoring infrastructure',
    body: 'Match US demand with Mexican and Latin American capacity using a curated registry, maturity scoring, and ongoing coaching.',
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
          <Card key={pillar.title} className="h-full border border-border/60 bg-card/50 shadow-sm transition-all hover:shadow-md hover:border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold tracking-tight">
                {pillar.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {pillar.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
