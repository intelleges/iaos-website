import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Stethoscope, Beaker, Factory } from "lucide-react";

const industries = [
  {
    title: "Aerospace & Defense",
    icon: Plane,
    description: "Manage complex supply chains with strict ITAR and CMMC requirements."
  },
  {
    title: "Healthcare",
    icon: Stethoscope,
    description: "Ensure supplier quality and compliance with FDA and HIPAA standards."
  },
  {
    title: "National Labs",
    icon: Beaker,
    description: "Secure research supply chains with DOE-grade compliance protocols."
  },
  {
    title: "Manufacturing",
    icon: Factory,
    description: "Optimize production with real-time supplier performance monitoring."
  }
];

export default function SectionIndustries() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-4 text-foreground">
          Tailored for critical industries.
        </h2>
        <p className="text-lg text-muted-foreground">
          We specialize in sectors where compliance is not optional and failure is not an option.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => (
          <Card key={industry.title} className="border-border/60 hover:border-border transition-colors">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-4 text-foreground">
                <industry.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">{industry.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {industry.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
