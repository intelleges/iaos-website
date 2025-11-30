import { useState } from "react";
import { FileText, Calendar, Check, Lock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import { InlineWidget } from "react-calendly";
import { caseStudies } from "@/config/caseStudies";

export default function Resources() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");

  // Group industries for display
  const industryGroups = [
    { name: "Aerospace & Defense", count: caseStudies.filter(cs => cs.industry === "Aerospace" || cs.industry === "Defense").length },
    { name: "Manufacturing", count: caseStudies.filter(cs => cs.industry === "Manufacturing").length },
    { name: "Electronics", count: caseStudies.filter(cs => cs.industry === "Electronics").length },
    { name: "Healthcare / Pharma", count: caseStudies.filter(cs => cs.industry === "Pharma").length },
    { name: "Logistics", count: caseStudies.filter(cs => cs.industry === "Logistics").length },
    { name: "Government", count: caseStudies.filter(cs => cs.industry === "Government").length },
    { name: "Construction", count: caseStudies.filter(cs => cs.industry === "Construction").length },
    { name: "Automotive", count: caseStudies.filter(cs => cs.industry === "Automotive").length },
    { name: "Consumer", count: caseStudies.filter(cs => cs.industry === "Consumer").length },
    { name: "Global", count: caseStudies.filter(cs => cs.industry === "Global").length },
  ].filter(group => group.count > 0);

  const filteredCaseStudies = selectedIndustry === "All" 
    ? caseStudies 
    : selectedIndustry === "Aerospace & Defense"
    ? caseStudies.filter(cs => cs.industry === "Aerospace" || cs.industry === "Defense")
    : selectedIndustry === "Healthcare / Pharma"
    ? caseStudies.filter(cs => cs.industry === "Pharma")
    : caseStudies.filter(cs => cs.industry === selectedIndustry);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Compliance & Supply Chain Intelligence Resource Library
          </h1>
          <p className="text-xl text-muted-foreground">
            Select the resource that matches your procurement, compliance, or supplier-management needs
          </p>
        </div>
      </section>

      {/* Three-Card Choice Section */}
      <section className="container pb-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Card 1: Executive Summary */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 flex flex-col">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Executive Summary</h2>
                <p className="text-base text-muted-foreground">3 pages • 5 minute read</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 text-base">
              Quick Overview for Busy Executives
            </p>

            <ul className="space-y-2 mb-6 text-base text-muted-foreground flex-1">
              <li>• Fast explanation of what Intelleges does</li>
              <li>• High-level workflow diagrams</li>
              <li>• Top 10 value points for compliance teams</li>
              <li>• 3 sample case studies referenced</li>
            </ul>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => setShowEmailModal(true)}
            >
              Get Executive Summary (PDF)
            </Button>
          </Card>

          {/* Card 2: Full Whitepaper with Calendly */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 relative overflow-hidden flex flex-col">
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-base font-semibold px-3 py-1 rounded-full">
              PREMIUM
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Full Whitepaper</h2>
                <p className="text-base text-muted-foreground">15 pages • Complete guide</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 text-base">
              Complete Platform Architecture Guide & Case Studies
            </p>

            <ul className="space-y-2 mb-6 text-base text-muted-foreground flex-1">
              <li>• Full explanation of modules & capabilities</li>
              <li>• Architecture overview</li>
              <li>• All 17 case studies included</li>
              <li>• Best practices for compliance teams</li>
              <li>• ROI model & maturity path</li>
            </ul>

            {!showCalendly ? (
              <>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => setShowCalendly(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Get Full Guide & Book Discovery Call
                </Button>
                <p className="text-base text-muted-foreground mt-4 text-center">
                  Prefer to talk now? Call{" "}
                  <a href="tel:+19178180225" className="text-primary hover:underline font-semibold">
                    (917) 818-0225
                  </a>
                </p>
              </>
            ) : (
              <div className="mt-4">
                <InlineWidget 
                  url="https://calendly.com/intelleges/demo"
                  styles={{ height: "700px" }}
                />
              </div>
            )}
          </Card>

          {/* Card 3: Contact Sales Directly */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 flex flex-col">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Contact Sales</h2>
                <p className="text-base text-muted-foreground">Talk with an expert</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 text-base">
              Talk with an Intelleges Expert
            </p>

            <ul className="space-y-2 mb-6 text-base text-muted-foreground flex-1">
              <li>• For enterprise buyers who dislike scheduling apps</li>
              <li>• For urgent compliance or audit needs</li>
              <li>• For onboarding procurement teams</li>
              <li>• Direct access to solutions architects</li>
            </ul>

            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => window.location.href = "tel:+19178180225"}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (917) 818-0225
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full"
                onClick={() => window.location.href = "mailto:john@intelleges.com"}
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Us Directly
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="container pb-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What You'll Learn</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Both resources cover the Intelleges platform's unified approach to compliance and supply chain intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-base">
                How to structure supplier compliance workflows
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-base">
                How Intelleges supports FOIC, eSRS, CMMC, and audit readiness
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-base">
                How procurement uses Intelleges for buyer training
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-base">
                How compliance teams reduce risk and documentation errors
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-base">
                How national labs & aerospace manufacturers operationalize supplier oversight
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-base">
                How case studies map to your industry
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Case Studies Teaser Section */}
      <section className="container pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-semibold mb-4">
              <Lock className="h-4 w-4" />
              Included with your consultation
            </div>
            <h2 className="text-3xl font-bold mb-4">17 Industry Case Studies</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Real-world examples of how organizations use Intelleges to solve complex compliance challenges across industries
            </p>
          </div>

          {/* Industry Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={selectedIndustry === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedIndustry("All")}
            >
              All Industries ({caseStudies.length})
            </Button>
            {industryGroups.map(group => (
              <Button
                key={group.name}
                variant={selectedIndustry === group.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedIndustry(group.name)}
              >
                {group.name} ({group.count})
              </Button>
            ))}
          </div>

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCaseStudies.map(caseStudy => (
              <Card 
                key={caseStudy.id} 
                className="p-5 hover:shadow-lg transition-all duration-300 border-2 opacity-75 cursor-not-allowed relative"
              >
                <div className="absolute top-3 right-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-base">
                    {String(caseStudy.number).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-1 line-clamp-2">
                      {caseStudy.title}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {caseStudy.industry}
                    </p>
                  </div>
                </div>
                <div className="text-base text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                  Included with your consultation
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container pb-20 px-4">
        <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Compliance Operations?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto px-4">
            Whether you need a quick overview or want to dive deep into best practices, we have the right resource for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setShowEmailModal(true)}>
              Get Executive Summary
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setShowCalendly(true)}
            >
              Schedule Discovery Call
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = "tel:+19178180225"}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
          </div>
        </Card>
      </section>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        downloadUrl="/resources/Intelleges_Executive_Summary.pdf"
        resourceTitle="Executive Summary"
        resourceType="service-overview"
      />
    </div>
  );
}
