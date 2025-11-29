import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Building2, Users, Globe, Database, CheckCircle2 } from "lucide-react";

export default function HoneywellAerospace() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Honeywell Aerospace Case Study - Reference/Shadow System"
        description="How Intelleges solved Honeywell's multi-site supplier management challenge with proprietary Reference/Shadow technology across 400 global locations."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <Link href="/case-studies">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logos/honeywell.jpg" alt="Honeywell Aerospace" className="h-16 w-auto" />
              <div>
                <h1 className="text-5xl font-light mb-2">Honeywell Aerospace</h1>
                <p className="text-xl text-muted-foreground font-light">
                  Unifying Supplier Compliance Across 400 Global Locations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 border-y border-border/20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Building2 className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">400+</div>
              <div className="text-base text-muted-foreground">Global Locations</div>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">750+</div>
              <div className="text-base text-muted-foreground">Procurement Personnel</div>
            </div>
            <div className="text-center">
              <Database className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">10,000+</div>
              <div className="text-base text-muted-foreground">Suppliers</div>
            </div>
            <div className="text-center">
              <Globe className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">$10B+</div>
              <div className="text-base text-muted-foreground">Government Sales</div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-light mb-8">The Challenge</h2>
          
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              Honeywell Aerospace operates 400 locations globally with over 750 procurement personnel managing relationships with more than 10,000 suppliers. As a major government contractor with over $10 billion in government sales, they must maintain strict compliance with FAR 12 and FAR 15 regulations across all supplier relationships.
            </p>

            <p>
              The critical challenge emerged when multiple Honeywell sites needed to work with the same suppliers but operated on different ERP systems. Each site maintained its own internal supplier identification system, creating a fragmented landscape where the same supplier could have multiple IDs, multiple compliance requests, and conflicting data across different Honeywell locations.
            </p>

            <p>
              This fragmentation created several problems. Suppliers received duplicate compliance requests from different Honeywell sites, leading to confusion and frustration. Procurement teams lacked visibility into supplier relationships across other sites, missing opportunities for volume discounts and standardization. Compliance data was siloed, making it impossible to get a unified view of supplier certifications and audit readiness across the enterprise.
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-light mb-8">The Intelleges Solution</h2>
          
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              Intelleges developed a proprietary <strong>Reference/Shadow system</strong> that revolutionized how Honeywell manages supplier data across multiple sites with different ERP systems. This innovative architecture allows each Honeywell site to maintain its own internal supplier identification while unifying compliance data at the enterprise level.
            </p>

            <p>
              Here's how it works: When a supplier completes a compliance certification, that data is stored as a <strong>Reference</strong> record in the Intelleges system. Each Honeywell site that works with that supplier can then access the compliance data through a <strong>Shadow</strong> record that maps to their internal supplier ID. The supplier only completes the certification once, but the information propagates automatically to all Honeywell sites that need it.
            </p>

            <p>
              Each site can search and filter supplier data using their own internal identifiers and business rules, but they're all accessing the same underlying compliance information. This means a supplier working with three different Honeywell locations receives one email, completes one compliance questionnaire, and that data is instantly available to all three sites—each viewing it through their own ERP lens.
            </p>
          </div>

          <div className="mt-12 p-8 bg-background border border-border rounded-lg">
            <h3 className="text-2xl font-light mb-6">Key Technical Innovation</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Reference Record:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    Single source of truth for supplier compliance data, maintained by the supplier
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Shadow Records:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    Site-specific views that map internal IDs to the reference data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Automatic Propagation:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    Updates to reference data instantly reflect in all shadow records
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-light mb-8">Results & Impact</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">85%</div>
              <div className="text-base font-medium mb-2">Reduction in Duplicate Requests</div>
              <p className="text-base text-muted-foreground">
                Suppliers no longer receive multiple compliance requests from different Honeywell sites
              </p>
            </div>
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">100%</div>
              <div className="text-base font-medium mb-2">Enterprise Visibility</div>
              <p className="text-base text-muted-foreground">
                All sites can access unified supplier compliance data while maintaining their own IDs
              </p>
            </div>
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">60%</div>
              <div className="text-base font-medium mb-2">Faster Compliance Processing</div>
              <p className="text-base text-muted-foreground">
                Automated propagation eliminates manual data entry and reconciliation
              </p>
            </div>
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">Zero</div>
              <div className="text-base font-medium mb-2">ERP Migration Required</div>
              <p className="text-base text-muted-foreground">
                Each site maintains its existing ERP system and internal processes
              </p>
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              The Reference/Shadow system transformed Honeywell's supplier compliance operations. Suppliers praised the simplified process—one login, one questionnaire, one submission—regardless of how many Honeywell sites they work with. Procurement teams gained unprecedented visibility into supplier relationships across the enterprise, enabling better negotiation leverage and standardization opportunities.
            </p>

            <p>
              Most importantly, Honeywell maintained full compliance with FAR 12 and FAR 15 requirements across all 400 locations without forcing a costly and disruptive ERP consolidation. Each site retained its operational autonomy while gaining the benefits of enterprise-wide data unification.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6">
            Ready to unify your supplier compliance across multiple sites?
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-8">
            See how Intelleges can solve your multi-site supplier management challenges.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8">
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
