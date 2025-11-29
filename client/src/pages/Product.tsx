import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Database, CheckCircle, BarChart3, FileCheck, Users, Zap } from "lucide-react";

export default function Product() {
  const capabilities = [
    {
      icon: Database,
      title: "Data & Document Collection",
      description: "Collect anything from anyone:",
      items: [
        "supplier questionnaires",
        "certifications",
        "insurance documents",
        "product conformance",
        "quality systems",
        "ESG",
        "security",
        "regulatory declarations",
        "evidence for investigations"
      ],
      footer: "No spreadsheets. No email chains."
    },
    {
      icon: CheckCircle,
      title: "Validation & Verification",
      description: "Intelleges automatically:",
      items: [
        "validates responses",
        "enforces required fields",
        "applies skip logic",
        "checks document types",
        "logs timestamps",
        "captures signatures",
        "flags missing or inaccurate data",
        "scores supplier risk"
      ],
      footer: "Verification is built into every protocol."
    },
    {
      icon: BarChart3,
      title: "Audit-Ready Tracking & Intelligence",
      description: "Intelleges provides:",
      items: [
        "global response dashboards",
        "expiration alerts",
        "risk indicators",
        "delivery performance data",
        "compliance scoring",
        "full audit trails",
        "downloadable audit-ready PDF packages"
      ],
      footer: "Everything is tracked, logged, and defensible."
    }
  ];

  const features = [
    {
      icon: FileCheck,
      title: "Audit-Proof Templates",
      description: "Always current with regulatory changes."
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description: "Invitations, reminders, escalations — all handled for you."
    },
    {
      icon: Users,
      title: "Supplier-Friendly",
      description: "No login required for suppliers."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Product" 
        description="One Platform. Every Requirement. Complete Confidence. Intelleges helps enterprises collect, validate, verify, and analyze supplier data automatically."
      />
      
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Product Overview
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              One Platform. Every Requirement. Complete Confidence.
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto pt-4">
              Intelleges is the platform enterprises use to collect, validate, verify, and analyze supplier and regional data — automatically and at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              Three Core Capabilities
            </h2>
            
            <div className="space-y-8">
              {capabilities.map((capability, i) => (
                <div key={i} className="p-8 rounded-lg border border-border/40 bg-background space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <capability.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-normal">{i + 1}. {capability.title}</h3>
                      <p className="text-base text-muted-foreground font-light">{capability.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 pl-[72px]">
                    {capability.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-sm font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-lg font-normal pl-[72px] pt-2">
                    {capability.footer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              Key Product Features
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="space-y-4 p-6 rounded-lg border border-border/40">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-normal">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-lg border border-border/40">
                <h3 className="text-lg font-normal mb-2">Extensible Protocol Library</h3>
                <p className="text-sm text-muted-foreground font-light">
                  Annual reps & certs, BAA, ESG, ITAR, eSRS, COI, PO delays, conformance, and more.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-border/40">
                <h3 className="text-lg font-normal mb-2">Global Supplier Vetting</h3>
                <p className="text-sm text-muted-foreground font-light">
                  Foreign supplier verification, regional scanning, due diligence support.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-border/40 md:col-span-2">
                <h3 className="text-lg font-normal mb-2">Enterprise-Ready</h3>
                <p className="text-sm text-muted-foreground font-light">
                  Supports 10 to 10,000 suppliers without performance degradation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              See It In Action
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8 font-light">
                  See the Product Demo
                </Button>
              </Link>
              <Link href="/protocols">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-light">
                  Browse All Protocols
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
