import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Intelleges transformed our supplier audit process from a 3-month nightmare into a continuous, automated workflow.",
    author: "Sarah Jenkins",
    role: "Director of Compliance, Aerospace Dynamics",
    initials: "SJ"
  },
  {
    quote: "The nearshoring intelligence gave us the confidence to expand our manufacturing base into Mexico with full visibility.",
    author: "Miguel Rodriguez",
    role: "VP of Operations, Global Tech Mfg",
    initials: "MR"
  },
  {
    quote: "Finally, a system that speaks the language of federal compliance without the clunky interface of legacy software.",
    author: "David Chen",
    role: "Chief Procurement Officer, Defense Systems Inc.",
    initials: "DC"
  }
];

export default function SectionTestimonials() {
  return (
    <section className="container py-24 bg-muted/30">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-4 text-foreground">
          Trusted by industry leaders.
        </h2>
        <p className="text-lg text-muted-foreground">
          See how organizations are using Intelleges to secure their supply chains.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Card key={i} className="border-border/60 bg-background/50 shadow-sm">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-muted-foreground/20 mb-4" />
              <p className="text-lg text-foreground/90 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-medium text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
