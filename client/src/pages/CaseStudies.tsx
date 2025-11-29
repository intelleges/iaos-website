import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEO from "@/components/seo";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, BarChart3, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const caseStudies = [
  {
    id: "aerospace-defense",
    industry: "Aerospace & Defense",
    client: "Major Defense Contractor",
    title: "Streamlining CMMC Compliance for a Tier-1 Supplier",
    summary: "How a leading defense contractor reduced audit preparation time by 65% and achieved perfect CMMC readiness scores using Intelleges' automated compliance engine.",
    metrics: [
      { label: "Audit Prep Time", value: "-65%" },
      { label: "Compliance Score", value: "100%" },
      { label: "Vendor Onboarding", value: "2x Faster" }
    ],
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=2080&auto=format&fit=crop",
    tags: ["CMMC 2.0", "Supply Chain Risk", "Automation"]
  },
  {
    id: "healthcare-logistics",
    industry: "Healthcare Logistics",
    client: "Global Medical Device Manufacturer",
    title: "Securing the Medical Supply Chain Against Counterfeits",
    summary: "Implementing end-to-end traceability for critical medical components, ensuring 100% verification of origin and regulatory adherence across 40+ countries.",
    metrics: [
      { label: "Risk Reduction", value: "90%" },
      { label: "Traceability", value: "100%" },
      { label: "Cost Savings", value: "$2.4M" }
    ],
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2032&auto=format&fit=crop",
    tags: ["FDA Compliance", "Traceability", "Risk Management"]
  },
  {
    id: "energy-infrastructure",
    industry: "Energy Infrastructure",
    client: "National Grid Operator",
    title: "Modernizing Vendor Risk Management for Critical Infrastructure",
    summary: "Replacing legacy spreadsheet-based processes with a dynamic, real-time vendor risk management platform to protect national energy assets.",
    metrics: [
      { label: "Process Efficiency", value: "+80%" },
      { label: "Data Accuracy", value: "99.9%" },
      { label: "Team Productivity", value: "+40%" }
    ],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
    tags: ["Critical Infrastructure", "VRM", "Digital Transformation"]
  }
];

export default function CaseStudies() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Case Studies" 
        description="See how Intelleges helps aerospace, healthcare, and energy companies achieve compliance and optimize their supply chains."
      />
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-muted/30">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm">
              Success Stories
            </Badge>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl mb-6 text-foreground">
              Proven results in the most demanding industries.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              See how leading organizations in aerospace, healthcare, and energy use Intelleges to turn compliance from a burden into a competitive advantage.
            </p>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-gradient-to-l from-muted to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />
      </section>

      {/* Case Studies Grid */}
      <section className="container py-24">
        <div className="grid gap-12">
          {caseStudies.map((study, index) => (
            <div key={study.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-background/90 text-foreground backdrop-blur-md border-none shadow-sm">
                      {study.industry}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-emerald-600 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> {study.client}
                  </h3>
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                    {study.title}
                  </h2>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {study.summary}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/40">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="text-center lg:text-left">
                      <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="group">
                    Read Full Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-24">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-6">
            Ready to write your own success story?
          </h2>
          <p className="text-lg text-muted-foreground/80 mb-10">
            Join the network of industry leaders who trust Intelleges for their mission-critical compliance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-full px-8">
                Start a Conversation
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-muted-foreground/30 text-background hover:bg-muted-foreground/10 hover:text-background rounded-full px-8">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
