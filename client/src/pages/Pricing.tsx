import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import ROICalculator from "@/components/sections/pricing/roi-calculator";

const tiers = [
  {
    name: "Starter",
    price: "$999",
    description: "Essential compliance for small suppliers.",
    features: [
      "Single user license",
      "Basic compliance dashboard",
      "Document storage (10GB)",
      "Email support",
      "Standard reporting"
    ]
  },
  {
    name: "Professional",
    price: "$2,499",
    description: "Advanced tools for growing organizations.",
    features: [
      "5 user licenses",
      "Advanced risk monitoring",
      "Document storage (100GB)",
      "Priority support",
      "Custom reporting",
      "API access"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale solution for large enterprises.",
    features: [
      "Unlimited users",
      "Full supply chain visibility",
      "Unlimited storage",
      "24/7 dedicated support",
      "Advanced analytics",
      "Custom integrations",
      "On-premise deployment option"
    ]
  }
];

export default function Pricing() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="text-4xl font-medium tracking-tight mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-muted-foreground">
          Choose the plan that fits your organization's compliance needs.
          No hidden fees, no surprises.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3 mb-24">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-emerald-500 shadow-md relative' : 'border-border/60'}`}>
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
              </div>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className={`w-full ${tier.popular ? '' : 'variant-outline'}`} variant={tier.popular ? 'default' : 'outline'}>
                {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <ROICalculator />
    </div>
  );
}
