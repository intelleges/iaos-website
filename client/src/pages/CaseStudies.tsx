import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEO from "@/components/seo";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, BarChart3, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const caseStudies = [
  {
    id: "foci",
    industry: "Aerospace & Defense",
    client: "FOCI Compliance",
    title: "Integrated Technology, Expertise & Call Centers for FOCI Verification",
    summary: "How Intelleges combines automated technology, compliance expertise, and live call center verification to deliver comprehensive FOCI audits and supplier vetting for aerospace and defense clients.",
    metrics: [
      { label: "Verification Layers", value: "3" },
      { label: "Compliance Rate", value: "100%" },
      { label: "Audit Ready", value: "Always" }
    ],
    image: "/logos/intelleges-logo.svg",
    tags: ["FOCI", "Call Centers", "DFARS/NISPOM"]
  },
  {
    id: "honeywell-aerospace",
    industry: "Aerospace & Defense",
    client: "Honeywell Aerospace",
    title: "Unifying Supplier Compliance Across 400 Global Locations",
    summary: "How Honeywell solved multi-site supplier management challenges with Intelleges's proprietary Reference/Shadow system, eliminating duplicate compliance requests while maintaining ERP autonomy across 400 locations.",
    metrics: [
      { label: "Duplicate Requests", value: "-85%" },
      { label: "Enterprise Visibility", value: "100%" },
      { label: "Processing Speed", value: "+60%" }
    ],
    image: "/logos/honeywell.jpg",
    tags: ["Reference/Shadow System", "Multi-Site Management", "FAR Compliance"]
  },
  {
    id: "battelle",
    industry: "Research & Development",
    client: "Battelle",
    title: "Sourcing Critical Components in a Supply Chain Crisis",
    summary: "Leveraging Intelleges's extensive supplier network to source critical microchips with a 52-week backorder, saving a multi-million dollar project through upfront purchasing and logistics management.",
    metrics: [
      { label: "Backorder Overcome", value: "52 Weeks" },
      { label: "Delivery", value: "On Time" },
      { label: "Project Value", value: "$M+ Saved" }
    ],
    image: "/logos/battelle.png",
    tags: ["Supply Chain", "Supplier Network", "Crisis Management"]
  },
  {
    id: "department-of-defense",
    industry: "Defense & Government",
    client: "U.S. Department of Defense",
    title: "Modernizing Supplier Vetting with zCode for CMMC Compliance",
    summary: "Implementing Intelleges's proprietary zCode system based on binary mathematics to track thousands of suppliers with detailed granularity across legacy mainframes and modern cloud platforms.",
    metrics: [
      { label: "Suppliers Tracked", value: "1000s" },
      { label: "System Compatibility", value: "100%" },
      { label: "Granularity", value: "1 Decimal" }
    ],
    image: "/logos/dod.svg",
    tags: ["zCode", "CMMC", "Legacy Integration"]
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
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group bg-muted/20 flex items-center justify-center p-12">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="h-32 w-auto object-contain transition-transform duration-700 group-hover:scale-110"
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
