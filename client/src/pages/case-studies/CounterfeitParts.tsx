import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CounterfeitPartsCaseStudy() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container max-w-4xl">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Case Study
          </div>
          <h1 className="text-5xl font-light mb-6">
            Integrating Multiple Counterfeit-Parts Standards into One Unified Questionnaire System
          </h1>
          <p className="text-2xl text-muted-foreground font-light">
            How Intelleges Harmonizes AS5553, AS6081, AS6174, AS6171, AS9100, and DoD Counterfeit Prevention Policies
          </p>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-light mb-6">Executive Summary</h2>
          <p className="text-lg leading-relaxed mb-6">
            The aerospace and defense counterfeit-parts landscape is governed by multiple overlapping standards, each with different requirements: AS5553 (counterfeit electronic parts avoidance), AS6081 (independent distributor requirements), AS6174 (authenticity verification), AS6171 (testing & lab requirements), AS9100 (aerospace QMS), DoDI 4140.67 (DoD counterfeit prevention policy), and Zero-Tolerance Policy for Mission-Critical Components.
          </p>
          <p className="text-lg leading-relaxed">
            Aerospace primes often struggle because these standards require suppliers to provide similar but non-identical data sets across quality, chain of custody, testing, authenticity, documentation, and reporting. Intelleges built a unified questionnaire engine that merges all of these requirements into a single, coherent supplier workflow, eliminating the need for suppliers to answer five different questionnaires.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-light mb-6">Problem: Suppliers and Primes Were Overwhelmed by Too Many Standards</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-background rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">Aerospace & Defense Manufacturers Faced:</h3>
              <ul className="space-y-3 text-lg">
                <li>• Overlapping standards</li>
                <li>• Conflicting formats</li>
                <li>• Redundant questions</li>
                <li>• Multiple risk evaluation frameworks</li>
                <li>• Inconsistent compliance evidence</li>
                <li>• Gray-market exposure</li>
                <li>• Time-consuming auditing</li>
              </ul>
            </div>

            <div className="bg-background rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">Suppliers Were Frustrated By:</h3>
              <ul className="space-y-3 text-lg">
                <li>• Duplicated questions across forms</li>
                <li>• Confusing differences between AS5553 vs AS6081 vs AS6174</li>
                <li>• Various documentation requirements</li>
                <li>• Different audit cycles</li>
                <li>• No unified reporting</li>
              </ul>
            </div>
          </div>

          <p className="text-lg leading-relaxed">
            Prime contractors needed a harmonized system.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-light mb-6">Solution: The Intelleges Unified Counterfeit-Parts Questionnaire</h2>
          
          <p className="text-lg leading-relaxed mb-12">
            Intelleges engineered a single integrated standard that maps all important requirements into one intelligent questionnaire.
          </p>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">1. Requirements Mapping</h3>
              <p className="text-lg leading-relaxed mb-4">
                Every clause of these standards was mapped into a unified requirements matrix:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-lg">
                <div>• AS5553</div>
                <div>• AS6081</div>
                <div>• AS6174</div>
                <div>• AS6171</div>
                <div>• AS9100 (counterfeit & product safety sections)</div>
                <div>• DoDI 4140.67</div>
                <div>• Zero-tolerance policy</div>
                <div>• IUID Marking Requirements</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">2. The Questionnaire Engine Consolidates Requirements</h3>
              <p className="text-lg leading-relaxed mb-4">
                Suppliers receive one questionnaire covering:
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-lg">
                <div>• Procurement controls</div>
                <div>• Authorized distributor verification</div>
                <div>• Part authentication</div>
                <div>• Chain-of-custody documentation</div>
                <div>• Testing & lab requirements (AS6171)</div>
                <div>• Traceability</div>
                <div>• Reporting obligations (GIDEP, PDREP)</div>
                <div>• Training & procedures</div>
                <div>• Counterfeit disposition & quarantine procedures</div>
                <div>• Recordkeeping rules</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">3. Automation Layer</h3>
              <p className="text-lg leading-relaxed mb-4">
                The Intelleges system:
              </p>
              <ul className="space-y-2 text-lg">
                <li>• Determines which sections apply</li>
                <li>• Eliminates irrelevant questions</li>
                <li>• Adjusts based on supplier type</li>
                <li>• Auto-expands into part-level questions when needed</li>
                <li>• Applies AI-driven counterfeit risk detection</li>
                <li>• Flags missing or insufficient documentation</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">4. Call-Center & SME Verification</h3>
              <p className="text-lg leading-relaxed mb-4">
                Intelleges performs:
              </p>
              <ul className="space-y-2 text-lg">
                <li>• Live supplier interviews</li>
                <li>• Document validation</li>
                <li>• COO validation</li>
                <li>• Testing verification under AS6171</li>
                <li>• Audit support</li>
                <li>• Escalation to engineering or compliance SMEs</li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">5. Unified Output: One Audit-Ready Report</h3>
              <p className="text-lg leading-relaxed mb-4">
                Instead of multiple fragmented compliance packets, Intelleges produces:
              </p>
              <ul className="space-y-2 text-lg">
                <li>• One consolidated compliance report</li>
                <li>• Mapped to all relevant standards</li>
                <li>• Ready for DoD or FAA audit</li>
                <li>• Fully timestamped & evidence-backed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-light mb-8">Benefits to Aerospace & Defense Clients</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">One process instead of six</h3>
              <p className="text-lg text-muted-foreground">Unified questionnaire eliminates redundancy</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Massively reduced supplier fatigue</h3>
              <p className="text-lg text-muted-foreground">Single workflow for all standards</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Highly accurate counterfeit detection</h3>
              <p className="text-lg text-muted-foreground">AI-driven risk identification</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Complete standard coverage</h3>
              <p className="text-lg text-muted-foreground">AS5553/6081/6174/6171 compliance</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Seamless DoD compliance</h3>
              <p className="text-lg text-muted-foreground">4140.67, IUID, Zero-Tolerance</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Significant time savings</h3>
              <p className="text-lg text-muted-foreground">For primes and suppliers</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Fewer audit failures</h3>
              <p className="text-lg text-muted-foreground">Comprehensive evidence collection</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Higher integrity supply chain</h3>
              <p className="text-lg text-muted-foreground">End-to-end verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6">
            Need unified counterfeit-parts compliance?
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-8">
            See how Intelleges can harmonize multiple standards into one streamlined process.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8">
                Schedule a Demo
              </Button>
            </Link>
            <a href="/documents/UnifiedCounterfeitPartsStandardsIntegration.pdf" download>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Download Whitepaper
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
