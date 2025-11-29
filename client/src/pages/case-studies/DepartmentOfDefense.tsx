import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Shield, Binary, Network, Zap, CheckCircle2 } from "lucide-react";

export default function DepartmentOfDefense() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="U.S. Department of Defense Case Study - zCode CMMC Implementation"
        description="How Intelleges's proprietary zCode system enables DOD to track thousands of suppliers with detailed granularity for CMMC compliance across legacy and modern systems."
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
              <img src="/logos/dod.svg" alt="U.S. Department of Defense" className="h-20 w-auto" />
              <div>
                <h1 className="text-5xl font-light mb-2">U.S. Department of Defense</h1>
                <p className="text-xl text-muted-foreground font-light">
                  Modernizing Supplier Vetting with zCode for CMMC Compliance
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
              <Network className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">1000s</div>
              <div className="text-base text-muted-foreground">Suppliers Tracked</div>
            </div>
            <div className="text-center">
              <Binary className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">1 Decimal</div>
              <div className="text-base text-muted-foreground">Granular Tracking</div>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">CMMC</div>
              <div className="text-base text-muted-foreground">Compliance Ready</div>
            </div>
            <div className="text-center">
              <Zap className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">Legacy + Modern</div>
              <div className="text-base text-muted-foreground">System Integration</div>
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
              The U.S. Department of Defense faced a critical challenge in implementing new supplier vetting requirements related to Cybersecurity Maturity Model Certification (CMMC). With thousands of suppliers across the defense industrial base, DOD needed a system that could track detailed compliance information with extreme granularity while maintaining compatibility with both legacy and modern IT systems.
            </p>

            <p>
              The complexity was unprecedented. DOD's IT infrastructure spans decades of technology evolution, from mainframe systems dating back to the 1970s to cutting-edge cloud platforms. Any supplier tracking solution had to work seamlessly across this entire spectrum. Traditional identification systems—whether alphanumeric codes, GUIDs, or custom schemas—proved inadequate for the level of detail required by CMMC while maintaining backward compatibility.
            </p>

            <p>
              The CMMC framework requires tracking not just supplier identity, but detailed cybersecurity posture, certification levels, assessment dates, scope of certification, and ongoing compliance status. This information must be queryable, auditable, and accessible across dozens of DOD systems that were never designed to communicate with each other.
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-light mb-8">The Intelleges Solution: zCode</h2>
          
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              Intelleges developed <strong>zCode</strong>, a proprietary identification system based on binary mathematics that enables the Department of Defense to track literally thousands of suppliers with detailed granularity using just one decimal point. This elegant solution bridges the gap between legacy systems and modern requirements, providing unprecedented flexibility and precision.
            </p>

            <p>
              The genius of zCode lies in its mathematical foundation. By leveraging binary number theory, each zCode can encode multiple dimensions of supplier information—CMMC level, certification status, assessment date, scope, and custom attributes—within a single, compact identifier. Legacy systems see it as a simple numeric code they can process. Modern systems can decode the rich metadata embedded within.
            </p>

            <p>
              For example, a single zCode like "1024.5" might encode: CMMC Level 3 certification, assessed within the last 90 days, scope covering CUI handling, and active status. The decimal component provides additional granularity for sub-categories and temporal tracking. The system is infinitely extensible—new attributes can be added without breaking existing integrations.
            </p>
          </div>

          <div className="mt-12 p-8 bg-background border border-border rounded-lg">
            <h3 className="text-2xl font-light mb-6">zCode Technical Advantages</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Binary-Based Encoding:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    Leverages binary mathematics to pack multiple data dimensions into compact codes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Legacy System Compatibility:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    Appears as simple numeric codes to mainframe and legacy systems
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Modern System Intelligence:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    Modern systems decode rich metadata embedded within the code
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Infinite Extensibility:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    New attributes can be added without breaking existing integrations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Granular Tracking:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    Single decimal point enables detailed sub-category and temporal tracking
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
              <div className="text-3xl font-light text-primary mb-2">1000s</div>
              <div className="text-base font-medium mb-2">Suppliers Tracked</div>
              <p className="text-base text-muted-foreground">
                Comprehensive tracking across the entire defense industrial base
              </p>
            </div>
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">100%</div>
              <div className="text-base font-medium mb-2">System Compatibility</div>
              <p className="text-base text-muted-foreground">
                Works seamlessly with both legacy mainframes and modern cloud platforms
              </p>
            </div>
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">Detailed</div>
              <div className="text-base font-medium mb-2">Granular Tracking</div>
              <p className="text-base text-muted-foreground">
                Single decimal point encodes multiple compliance dimensions
              </p>
            </div>
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">CMMC</div>
              <div className="text-base font-medium mb-2">Compliance Ready</div>
              <p className="text-base text-muted-foreground">
                Full support for all CMMC levels and certification requirements
              </p>
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              The zCode system transformed DOD's ability to implement CMMC requirements across the defense industrial base. For the first time, both legacy systems and modernized platforms could consume the same supplier identification codes, eliminating data silos and enabling enterprise-wide visibility into supplier cybersecurity posture.
            </p>

            <p>
              Procurement officers using 1970s-era mainframe terminals see simple numeric codes they can enter and query. Meanwhile, analysts using modern dashboards can decode those same codes to reveal rich compliance metadata, certification timelines, and risk indicators. This dual-mode operation was previously considered impossible.
            </p>

            <p>
              Most importantly, zCode's extensibility means DOD can adapt to future compliance requirements without replacing the system. As CMMC evolves, as new cybersecurity frameworks emerge, and as supplier vetting requirements change, zCode can encode new attributes within its existing structure. The investment in this system will pay dividends for decades.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6">
            Need a supplier tracking system that works with legacy and modern infrastructure?
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-8">
            See how Intelleges's zCode can solve your complex identification challenges.
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
