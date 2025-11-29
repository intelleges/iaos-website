import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, FileCheck } from "lucide-react";
import ProtocolDemo from "@/components/ProtocolDemo";

export default function Protocols() {
  const protocolCategories = [
    {
      title: "Regulatory & Government Contracting",
      protocols: [
        "Annual Reps & Certs",
        "Buy America Act",
        "FAR/DFARS",
        "ITAR/EAR",
        "eSRS",
        "USMCA"
      ]
    },
    {
      title: "Quality & Operational",
      protocols: [
        "Product Conformance",
        "Counterfeit Parts Prevention",
        "Raw Materials Exchange",
        "Supplier Quality Systems (ISO, AS9100, GMP)",
        "Purchase Order Delays & Delivery Forecasts"
      ]
    },
    {
      title: "Risk, Security & Environmental",
      protocols: [
        "Certificates of Insurance (COI)",
        "Site Security (C-TPAT / CFATS)",
        "Environmental Compliance",
        "ESG & Sustainability",
        "Conflict Minerals"
      ]
    },
    {
      title: "Global Supplier Assessment",
      protocols: [
        "Foreign Supplier Vetting",
        "Nearshoring / Offshoring / Re-shoring Transitions",
        "Regional Profiling & Environmental Scans",
        "Multi-tier supply chain visibility"
      ]
    },
    {
      title: "Legal, Investigations & Due Diligence",
      protocols: [
        "Evidence Collection",
        "Incident Documentation",
        "Supplier Dispute Reviews",
        "Adjudication Support",
        "Internal Investigations"
      ]
    }
  ];

  const features = [
    "Secure electronic questionnaire",
    "Built-in data validations",
    "Skip logic & conditional branching",
    "Required document rules",
    "Expiration tracking",
    "Regulatory references",
    "E-signature compliance",
    "Time-stamped audit trails",
    "Auto-generated PDFs",
    "Customizable fields"
  ];

  const differentiators = [
    "Always current — updated automatically as regulations change",
    "Built from 25 years of enterprise expertise",
    "Complete audit readiness",
    "Designed for 10 suppliers or 10,000",
    "Flexible enough for any scenario"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Protocols" 
        description="Every Requirement. One Platform. Always Up to Date. Intelleges provides audit-ready protocols for compliance, supplier vetting, and due diligence."
      />
      
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Protocols
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              Every Requirement. One Platform. Always Up to Date.
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto pt-4">
              Intelleges provides a library of regulatory-compliant, audit-ready protocols used by enterprises to collect, validate, and verify the information they need from suppliers, regions, facilities, and subcontractors.
            </p>
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              For 25 years, we've supported complex compliance programs for some of the largest companies in the world. Today, that same expertise is embedded into every Intelleges protocol — updated automatically as regulations change.
            </p>
          </div>
        </div>
      </section>

      {/* Why Protocols Matter */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              Why Protocols Matter
            </h2>
            <div className="space-y-6 text-center">
              <p className="text-xl font-light">
                Compliance isn't a checklist — it's a moving target.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Executive Orders, FAR/DFARS, USMCA, BAA, ITAR/EAR, eSRS, ESG frameworks, environmental rules, and industry-specific mandates change constantly.
              </p>
              <div className="space-y-3 pt-4">
                <p className="text-lg font-normal">Intelleges protocols evolve the moment the rules do.</p>
                <p className="text-base text-muted-foreground font-light">Your compliance stays current.</p>
                <p className="text-base text-muted-foreground font-light">Your audits stay protected.</p>
                <p className="text-base text-muted-foreground font-light">No manual updates. No guesswork.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                What's Inside an Intelleges Protocol
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                Every protocol includes:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border/40">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-light">{feature}</span>
                </div>
              ))}
            </div>
            
            <p className="text-center text-lg font-light pt-4">
              Use Intelleges protocols as-is or customize based on your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Protocol Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              Featured Protocol Categories
            </h2>
            
            <div className="space-y-8">
              {protocolCategories.map((category, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="text-xl font-normal border-b border-border/40 pb-2">
                    {category.title}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.protocols.map((protocol, j) => (
                      <div key={j} className="flex items-start gap-2 p-3 rounded-lg bg-background border border-border/40">
                        <FileCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm font-light">{protocol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demos */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                Try Interactive Protocol Demos
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                Click any protocol below to see how Intelleges collects, validates, and verifies supplier data.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <ProtocolDemo
                title="Annual Reps & Certs"
                description="Collect annual representations and certifications required for government contracting"
                category="Regulatory & Government Contracting"
              />
              <ProtocolDemo
                title="ITAR/EAR Export Control"
                description="Verify export control compliance for defense and dual-use items"
                category="Regulatory & Government Contracting"
              />
              <ProtocolDemo
                title="ESG & Sustainability"
                description="Document environmental, social, and governance practices"
                category="Risk, Security & Environmental"
              />
              <ProtocolDemo
                title="ISO Quality Systems"
                description="Verify supplier quality management system certifications"
                category="Quality & Operational"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              Why Intelleges Protocols Are Different
            </h2>
            
            <div className="space-y-4">
              {differentiators.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-lg border border-border/40">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-lg font-light">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Ready to Get Started?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8 font-light">
                  Request the Protocol Catalog
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-light">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
