import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Target, Eye, Award, Globe, Shield, Building } from "lucide-react";

export default function About() {
  const differentiators = [
    {
      icon: Award,
      title: "Deep Expertise",
      description: "We've spent decades inside enterprise compliance systems — not on the outside looking in."
    },
    {
      icon: Shield,
      title: "Always Up to Date",
      description: "Regulations change constantly. Intelleges changes with them."
    },
    {
      icon: Building,
      title: "Audit-Ready by Default",
      description: "Every workflow produces defensible, time-stamped, signature-verified PDF packages."
    },
    {
      icon: Globe,
      title: "Global Supply Chain Intelligence",
      description: "We support nearshoring, offshoring, re-shoring, supplier vetting, and regional assessments."
    }
  ];

  const industries = [
    "Aerospace",
    "Defense",
    "Healthcare",
    "Energy",
    "Manufacturing",
    "Pharmaceuticals",
    "Finance"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="About" 
        description="25 Years of Building the Compliance Systems that Protect America's Largest Enterprises"
      />
      
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              About Intelleges
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light leading-relaxed">
              25 Years of Building the Compliance Systems that Protect America's Largest Enterprises
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <p className="text-xl font-light leading-relaxed">
                Intelleges was founded on a simple idea:
              </p>
              <p className="text-2xl font-normal leading-relaxed">
                Compliance, data collection, and supplier verification should not be the bottleneck in enterprise operations.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                For 25 years, we've built, maintained, and modernized compliance systems for organizations responsible for national security, public health, and global manufacturing.
              </p>
            </div>
            
            <div className="space-y-4 pt-8">
              <p className="text-lg font-light">Our clients include:</p>
              <p className="text-xl font-normal leading-relaxed">
                Honeywell Aerospace, Battelle, Celestica, Con Edison, Becton Dickinson, Memorial Sloan Kettering, Sanofi-Aventis, Hoffmann-La Roche, JP Morgan Chase, and the U.S. Department of Defense.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed pt-4">
                We are <strong className="font-normal text-foreground">ISO 27001 certified</strong> and recognized as <strong className="font-normal text-foreground">Battelle Supplier of the Year</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="space-y-6 p-8 rounded-lg border border-border/40">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-light">Our Mission</h2>
              </div>
              <p className="text-lg font-light leading-relaxed">
                To make data and document collection simple, accurate, and audit-ready for every organization — from Fortune 100 enterprises to growing manufacturers.
              </p>
            </div>
            
            {/* Vision */}
            <div className="space-y-6 p-8 rounded-lg border border-border/40">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-light">Our Vision</h2>
              </div>
              <p className="text-lg font-light leading-relaxed">
                A world where organizations never need to chase suppliers for information again — because the collection, validation, and verification process is fully automated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              What Makes Us Different
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((item, i) => (
                <div key={i} className="space-y-4 p-6 rounded-lg border border-border/40 bg-background">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-normal">{item.title}</h3>
                  </div>
                  <p className="text-base text-muted-foreground font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              Trusted Across Regulated Industries
            </h2>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              {industries.map((industry, i) => (
                <div key={i} className="px-6 py-3 rounded-full border border-border/40 bg-muted/30">
                  <span className="text-sm font-light">{industry}</span>
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
              Ready to Learn More?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8 font-light">
                  Learn More About Our Work
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
