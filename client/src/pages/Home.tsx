import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Home" 
        description="Intelleges makes data & document collection simple. Enterprise compliance depends on information. We get it all cleanly, automatically, and on time."
      />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight">
              Intelleges makes data & document collection{" "}
              <span className="font-normal">simple.</span>
              <br />
              <span className="text-muted-foreground">Easy. A no-brainer.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
              Enterprise compliance depends on information. Intelleges gets it all cleanly, automatically, and on time — without email chains, spreadsheets, or chasing suppliers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8 text-base">
                  Book a Demo
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-light">
                Watch 2-Minute Overview
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground font-light pt-8">
              Trusted by organizations in aerospace, defense, healthcare, and manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                How Intelleges Works
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                A five-step process designed for speed, clarity, and zero frustration.
              </p>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/5-step-process.png" 
                alt="5-Step Process: Pick the Protocol, Load Your Suppliers, Use Our Compliant Templates, Collect Automatically, Track & Monitor Compliance" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Data Collection is Broken */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                Why Data Collection is Broken
              </h2>
              <p className="text-2xl text-muted-foreground font-light">
                Data is power — but collecting it is pain.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              {[
                "Suppliers ignore emails",
                "Employees miss deadlines",
                "Documents expire without warning",
                "Data is incomplete or inconsistent",
                "Information is scattered",
                "Spreadsheets multiply",
                "Audits become fire drills",
                "No one knows what's missing"
              ].map((problem, i) => (
                <div key={i} className="space-y-2">
                  <div className="w-2 h-2 rounded-full bg-destructive/60" />
                  <p className="text-sm font-light text-muted-foreground">{problem}</p>
                </div>
              ))}
            </div>
            
            <p className="text-xl font-light pt-8">
              Intelleges eliminates the bottleneck at the source — the collection process itself.
            </p>
          </div>
        </div>
      </section>

      {/* What You Can Collect */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                The Simplest Way to Collect Data & Documents
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                Intelleges is the modern platform enterprises use to collect:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Annual Reps & Certs",
                "Buy America Act documentation",
                "ESG disclosures & sustainability data",
                "eSRS reporting information",
                "ITAR/EAR regulatory declarations",
                "Certificates of Insurance (COI)",
                "Purchase Order Delays & Delivery Forecasts",
                "Product Conformance documentation",
                "Supplier safety, quality, and environmental data",
                "Subcontractor & 2nd/3rd-tier attestations",
                "Risk, compliance, and audit evidence"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm font-light">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-center text-muted-foreground font-light">
              …and much more — all in one clean, automated workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Why Intelleges */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-center mb-16">
              Why Intelleges
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "Simple",
                  description: "One platform. One workflow. One source of truth."
                },
                {
                  title: "Fast",
                  description: "Collect everything in days — not months."
                },
                {
                  title: "Reliable",
                  description: "Audit-ready. Secure. Regulatory-aware."
                },
                {
                  title: "Enterprise-Friendly",
                  description: "Built for aerospace, defense, healthcare, manufacturing, government contractors, and complex supply chains."
                },
                {
                  title: "Supplier-Friendly",
                  description: "No login required. No confusion. No friction."
                },
                {
                  title: "Always Current",
                  description: "Templates updated with regulatory changes automatically."
                }
              ].map((benefit, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-xl font-normal">{benefit.title}</h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Make data & document collection{" "}
              <span className="font-normal">simple.</span>
              <br />
              <span className="text-muted-foreground">Easy. A no-brainer.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8">
                  Book a Demo
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-light">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
