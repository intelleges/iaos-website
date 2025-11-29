import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { UserCheck, Smartphone, CheckSquare, RefreshCw, Globe } from "lucide-react";

export default function SupplierOnboarding() {
  const benefits = [
    {
      icon: UserCheck,
      title: "No Login Required",
      description: "Suppliers can complete workflows instantly."
    },
    {
      icon: Smartphone,
      title: "Mobile-Friendly",
      description: "Complete from phone, tablet, or laptop."
    },
    {
      icon: CheckSquare,
      title: "Clear Guidance",
      description: "Only see questions relevant to them (skip logic)."
    },
    {
      icon: RefreshCw,
      title: "One-and-Done",
      description: "No multiple forms or duplicate requests."
    }
  ];

  const features = [
    "clear instructions",
    "required fields",
    "built-in validations",
    "document upload prompts",
    "signature capture",
    "progress indicators"
  ];

  const useCases = [
    "report certifications",
    "confirm regulatory compliance",
    "validate product specifications",
    "document ESG & labor practices",
    "respond to due diligence requests",
    "support investigations"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Supplier Onboarding" 
        description="A Simple, Frictionless Experience for Suppliers Anywhere in the World"
      />
      
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Supplier Onboarding
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              A Simple, Frictionless Experience for Suppliers Anywhere in the World
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto pt-4">
              Intelleges makes supplier onboarding easy — no portal accounts, no passwords, no complexity.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              How It Works
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg font-light text-center leading-relaxed">
                Suppliers receive a secure link and complete the workflow with:
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-border/40 bg-background">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-sm font-light">{feature}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-lg font-light text-center pt-4">
                Everything is designed to eliminate confusion and ensure accurate, complete submissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Suppliers Love It */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              Why Suppliers Love Intelleges
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="space-y-4 p-6 rounded-lg border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-normal">{benefit.title}</h3>
                  </div>
                  <p className="text-base text-muted-foreground font-light leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="p-8 rounded-lg border border-border/40 bg-muted/30">
              <h3 className="text-xl font-normal mb-4">Easy Follow-Up</h3>
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                Suppliers can update data or respond to comments with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Supply Chains */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                Built for Global Supply Chains
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg font-light text-center leading-relaxed">
                Suppliers across North America, Europe, Latin America, and Asia use Intelleges to:
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {useCases.map((useCase, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border/40 bg-background">
                    <CheckSquare className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-light">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              See the Supplier Experience
            </h2>
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8 font-light">
                See the Supplier Experience Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
