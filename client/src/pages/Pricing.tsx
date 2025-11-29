import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Pricing" 
        description="Simple, transparent pricing for enterprise compliance automation. Get started with Intelleges today."
      />
      
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Enterprise-grade compliance automation that scales with your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Starter */}
            <div className="rounded-2xl border border-border/40 p-8 space-y-8 bg-background">
              <div className="space-y-4">
                <h3 className="text-2xl font-light">Starter</h3>
                <div className="space-y-2">
                  <p className="text-4xl font-normal">Custom</p>
                  <p className="text-sm text-muted-foreground font-light">
                    Based on supplier volume and workflows
                  </p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Up to 100 suppliers",
                  "Core compliance workflows",
                  "Standard templates",
                  "Email support",
                  "Basic dashboards"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/contact">
                <Button variant="outline" className="w-full rounded-full font-light">
                  Contact Sales
                </Button>
              </Link>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border-2 border-primary p-8 space-y-8 bg-background relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-light px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-light">Enterprise</h3>
                <div className="space-y-2">
                  <p className="text-4xl font-normal">Custom</p>
                  <p className="text-sm text-muted-foreground font-light">
                    Tailored to your organization's needs
                  </p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Unlimited suppliers",
                  "All compliance workflows",
                  "Custom templates",
                  "Priority support",
                  "Advanced analytics",
                  "API access",
                  "Dedicated account manager",
                  "Custom integrations"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/contact">
                <Button className="w-full rounded-full font-light">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-3xl font-light text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              {[
                {
                  q: "How is pricing calculated?",
                  a: "Pricing is based on the number of suppliers you manage and the complexity of your compliance workflows. We'll work with you to create a custom plan that fits your needs and budget."
                },
                {
                  q: "Is there a setup fee?",
                  a: "No. We include onboarding, training, and template configuration as part of your subscription."
                },
                {
                  q: "Can I change plans later?",
                  a: "Yes. You can upgrade or adjust your plan at any time as your needs evolve."
                },
                {
                  q: "Do suppliers need to pay or create accounts?",
                  a: "No. Suppliers access workflows via secure links — no login or payment required."
                },
                {
                  q: "What kind of support do you offer?",
                  a: "All plans include email support. Enterprise plans include priority support and a dedicated account manager."
                }
              ].map((faq, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-lg font-normal">{faq.q}</h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-light tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Book a demo to see how Intelleges can transform your compliance workflows.
            </p>
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
