import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Clock, DollarSign, Package, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Battelle() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Battelle Case Study - Critical Microchip Sourcing"
        description="How Intelleges leveraged its extensive supplier network to source critical microchips with a 52-week backorder, saving a multi-million dollar project."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <Link href="/case-studies">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logos/battelle.png" alt="Battelle" className="h-16 w-auto" />
              <div>
                <h1 className="text-5xl font-light mb-2">Battelle</h1>
                <p className="text-xl text-muted-foreground font-light">
                  Sourcing Critical Components in a Supply Chain Crisis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 border-y border-border/20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">52 Weeks</div>
              <div className="text-base text-muted-foreground">Original Backorder</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">On Time</div>
              <div className="text-base text-muted-foreground">Delivery Achieved</div>
            </div>
            <div className="text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">$M+</div>
              <div className="text-base text-muted-foreground">Project Value Saved</div>
            </div>
            <div className="text-center">
              <Package className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-light mb-2">100%</div>
              <div className="text-base text-muted-foreground">Specs Matched</div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-light mb-8">The Challenge</h2>
          
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              Battelle, a leading research and development organization, faced a critical supply chain crisis that threatened a multi-million dollar project. They needed specialized microchips for a time-sensitive government contract, but their primary supplier informed them of a 52-week backorder—far beyond the project's deadline.
            </p>

            <p>
              The situation was dire. The microchips were highly specialized components with strict technical specifications. Standard procurement channels offered no alternatives within the required timeframe. Battelle's project team explored every traditional option: expedited orders, alternative manufacturers, and even design modifications to use different components. Nothing worked.
            </p>

            <p>
              With the project deadline approaching and millions of dollars at stake, Battelle needed more than a procurement solution—they needed a partner with deep supplier relationships, technical expertise, and the financial capacity to act quickly in a high-stakes situation.
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-light mb-8">The Intelleges Solution</h2>
          
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              Intelleges leveraged its extensive supplier network—built over 25 years of compliance management relationships—to locate an alternative source for the critical microchips. Our team identified a qualified supplier who could meet Battelle's technical specifications and deliver within the required timeframe.
            </p>

            <p>
              However, the solution required more than just finding a supplier. The alternative source required upfront payment of several million dollars, and the tight timeline meant Battelle couldn't complete their standard procurement approval process in time. This is where Intelleges's unique position as a trusted partner made the difference.
            </p>

            <p>
              Based on our long-standing relationship and proven track record, Battelle paid Intelleges upfront. We then purchased the microchips directly from the supplier, managed the logistics, and ensured on-time delivery to Battelle's facility. The components met all technical specifications, arrived on schedule, and the project proceeded without delay.
            </p>
          </div>

          <div className="mt-12 p-8 bg-background border border-border rounded-lg">
            <h3 className="text-2xl font-light mb-6">Why This Worked</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Extensive Supplier Network:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    25 years of compliance relationships gave us access to suppliers outside traditional channels
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Technical Expertise:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    Our team verified that alternative components met all specifications
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Financial Capacity:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    Ability to purchase millions in components upfront and manage the transaction
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-lg">Trusted Partnership:</strong>
                  <p className="text-base text-muted-foreground mt-1">
                    Years of reliable service earned the trust needed for upfront payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-light mb-8">Results & Impact</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">On Time</div>
              <div className="text-base font-medium mb-2">Delivery Success</div>
              <p className="text-base text-muted-foreground">
                Microchips delivered on schedule despite 52-week standard backorder
              </p>
            </div>
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">$M+</div>
              <div className="text-base font-medium mb-2">Project Saved</div>
              <p className="text-base text-muted-foreground">
                Multi-million dollar government contract proceeded without delay
              </p>
            </div>
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">Zero</div>
              <div className="text-base font-medium mb-2">Design Changes</div>
              <p className="text-base text-muted-foreground">
                Original specifications maintained with alternative source
              </p>
            </div>
            <div className="p-6 bg-muted/20 rounded-lg">
              <div className="text-3xl font-light text-primary mb-2">Seamless</div>
              <div className="text-base font-medium mb-2">Transaction Process</div>
              <p className="text-base text-muted-foreground">
                No mess, no fuss—handled entirely by Intelleges
              </p>
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              The microchips were delivered on time, met all technical specifications, and enabled Battelle to complete their government contract on schedule. The project that was at risk of multi-million dollar losses and reputational damage proceeded smoothly, thanks to Intelleges's unique combination of supplier network access, technical expertise, and financial capability.
            </p>

            <p>
              This case demonstrates that Intelleges is more than a compliance platform—we're a strategic partner capable of solving complex supply chain challenges. Our deep supplier relationships, built over 25 years of compliance management, give us access to sources and solutions that traditional procurement channels simply cannot match.
            </p>

            <p>
              Most importantly, the trust Battelle placed in us—paying millions upfront—reflects the strength of our partnership and our proven track record of delivering results in high-stakes situations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6">
            Facing a critical supply chain challenge?
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-8">
            See how Intelleges's supplier network can solve your sourcing problems.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8">
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
