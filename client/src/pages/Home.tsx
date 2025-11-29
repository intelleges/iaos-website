import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import LogoCarousel from "@/components/LogoCarousel";
import { Link } from "wouter";
import { Check, FileText, Download } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import { protocolCaseStudies } from "@/config/protocolCaseStudies";
import { serviceDocuments, getServiceDocumentByTitle } from "@/config/serviceDocuments";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  const trustBlock = useScrollAnimation();
  const whatWeDo = useScrollAnimation();
  const protocols = useScrollAnimation();
  const howItWorks = useScrollAnimation();
  const whitepaper = useScrollAnimation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<{ title: string; filename: string } | null>(null);
  
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ title: string; pdfPath: string; fileName: string } | null>(null);

  const handleProtocolClick = (protocolName: string) => {
    const caseStudy = protocolCaseStudies[protocolName];
    if (caseStudy) {
      setSelectedProtocol(caseStudy);
      setIsModalOpen(true);
    }
  };

  const handleServiceClick = (serviceTitle: string) => {
    const serviceDoc = getServiceDocumentByTitle(serviceTitle);
    if (serviceDoc) {
      setSelectedService(serviceDoc);
      setIsServiceModalOpen(true);
    }
  };

  const handleVideoClick = () => {
    window.open('https://www.youtube.com/watch?v=7BstopG9qbU', '_blank');
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
      <SEO 
        title="Home" 
        description="Intelleges makes data & document collection simple. Enterprise compliance depends on information. We get it all cleanly, automatically, and on time."
      />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
              Intelleges makes data &<br />
              document collection simple.<br />
              <span className="text-muted-foreground">Easy. A no-brainer.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-4xl mx-auto">
              Enterprise compliance depends on information. Intelleges gets it all cleanly, automatically, and on time — without email chains, spreadsheets, or chasing suppliers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8 font-light">
                  Book a Demo
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 font-light"
                onClick={handleVideoClick}
              >
                Watch 2-Minute Overview
              </Button>
            </div>
            
             <p className="text-base text-muted-foreground font-light pt-8">
              Trusted by organizations in aerospace, defense, healthcare, and manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Block - 25 Years */}
      <section 
        ref={trustBlock.ref}
        className={`py-20 bg-muted/30 transition-all duration-1000 ${
          trustBlock.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              25 Years of Expertise
            </h2>
            
            <div className="space-y-6 text-center">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                For 25 years, Intelleges has helped the world's most demanding organizations build and maintain their enterprise compliance systems.
              </p>
              
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                We've supported programs for: <strong className="font-normal text-foreground">Honeywell Aerospace, Battelle, Celestica, Con Edison, Becton Dickinson, Memorial Sloan Kettering, Sanofi-Aventis, Hoffmann-La Roche, JP Morgan Chase, and the U.S. Department of Defense.</strong>
              </p>
              
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                Intelleges is <strong className="font-normal text-foreground">ISO 27001 certified</strong> and was named <strong className="font-normal text-foreground">Battelle Supplier of the Year</strong> for excellence in national security–related compliance systems.
              </p>
            </div>
            
            {/* Client Logos */}
            <LogoCarousel />
          </div>
        </div>
      </section>

      {/* What Intelleges Does */}
      <section 
        ref={whatWeDo.ref}
        className={`py-20 transition-all duration-1000 ${
          whatWeDo.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                What Intelleges Does
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                Intelleges is the unified platform enterprises use to collect, validate, and analyze the information they need to make confident, compliant, and risk-aware decisions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Collect supplier data and documentation",
                "Validate and verify information",
                "Manage compliance workflows",
                "Vet domestic and foreign suppliers",
                "Support offshoring, nearshoring, and re-shoring transitions",
                "Conduct investigations & due diligence",
                "Perform environmental scans & regional assessments",
                "Track expirations, risk indicators, and quality data",
                "Produce audit-ready documentation automatically"
              ].map((item, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <div 
                      onClick={() => handleServiceClick(item)}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border/40 transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-primary/30 cursor-pointer group"
                    >
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110" />
                      <span className="text-base font-light transition-all duration-300 group-hover:text-lg group-hover:font-normal flex-1">{item}</span>
                      <Download className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to download service overview</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            
            <div className="text-center space-y-2 pt-8">
              <p className="text-2xl font-light">One platform. Every requirement.</p>
              <p className="text-xl text-muted-foreground font-light">Collect. Validate. Decide.</p>
            </div>
          </div>
        </div>
      </section>

       {/* Protocols */}
      <section 
        ref={protocols.ref}
        className={`py-20 bg-muted/30 transition-all duration-1000 ${
          protocols.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                Protocols
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                Intelleges provides a library of always-up-to-date, audit-ready protocols that evolve automatically with changes to Executive Orders, FAR/DFARS, USMCA, BAA, ITAR/EAR, eSRS, ESG, and other regulatory frameworks.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Annual Reps & Certifications",
                "Buy America Act",
                "ESG & Sustainability",
                "eSRS Reporting",
                "ITAR/EAR",
                "Certificates of Insurance",
                "Product Conformance",
                "Purchase Order Delays & Delivery Forecasts",
                "Foreign Supplier Verification",
                "Offshoring / Nearshoring Transitions",
                "Investigations & Due Diligence",
                "Environmental Scans & Regional Profiling",
                "Quality Systems (ISO, AS9100, GMP)",
                "Conflict Minerals",
                "Counterfeit Parts Prevention",
                "Site Security (C-TPAT / CFATS)",
                "Sole Source Risk Mitigation"
              ].map((protocol, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <div 
                      onClick={() => handleProtocolClick(protocol)}
                      className="p-4 rounded-lg border border-border/40 bg-background transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/30 cursor-pointer"
                    >
                      <p className="text-base font-light transition-all duration-300 hover:text-lg hover:font-normal">{protocol}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Case Study
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            
            <div className="text-center pt-8">
              <p className="text-xl font-light">Just pick a protocol — Intelleges handles the rest.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Intelleges Works */}
      <section 
        ref={howItWorks.ref}
        className={`py-20 transition-all duration-1000 ${
          howItWorks.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                How Intelleges Works
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                Simple. Reliable. Audit-ready.
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  step: "Step 1",
                  title: "Pick a Protocol",
                  description: "Choose from our library of compliance, supplier vetting, regional, and due-diligence protocols."
                },
                {
                  step: "Step 2",
                  title: "Use Our Audit-Proof Templates",
                  description: "Intelleges provides secure, electronic, regulatory-compliant templates with built-in data validation, skip logic, conditional branching, required document rules, expiration tracking, and regulatory references. Templates update automatically as regulations change."
                },
                {
                  step: "Step 3",
                  title: "Add Suppliers, Buyers & Reviewers",
                  description: "Upload suppliers via spreadsheet, ERP sync, or manual entry. Assign internal compliance personnel in minutes."
                },
                {
                  step: "Step 4",
                  title: "Automated Invitations, Reminders & Confirmations",
                  description: "Intelleges sends everything automatically — invitations, reminders, follow-ups, and confirmations — for 10 suppliers or 10,000."
                },
                {
                  step: "Step 5",
                  title: "Track Global Responses in Real Time",
                  description: "Monitor responses, non-responses, bounced emails, missing items, expirations, risk indicators, supplier scores, and delivery performance from a single dashboard."
                },
                {
                  step: "Step 6",
                  title: "Generate Audit-Ready PDF Packages",
                  description: "Every completed protocol produces a fully time-stamped, signature-verified, audit-proof PDF containing all responses and documentation."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-lg border border-border/40">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-light text-primary">{i + 1}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-normal">{item.title}</h3>
                    <p className="text-base text-muted-foreground font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Whitepaper CTA */}
      <section 
        ref={whitepaper.ref}
        className={`py-20 bg-primary/5 transition-all duration-1000 ${
          whitepaper.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                Download the Free Whitepaper
              </h2>
              <p className="text-xl font-normal">
                "The Hidden Cost of Supplier Compliance — And How Automation Fixes It."
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Learn how leading enterprises streamline compliance, reduce risk, and eliminate manual data collection.
              </p>
            </div>
            
            <Button size="lg" className="rounded-full px-8 font-light">
              <Download className="mr-2 h-5 w-5" />
              Download Whitepaper
            </Button>
          </div>
        </div>
      </section>

      {/* Email Capture Modal for Protocols */}
      {selectedProtocol && (
        <EmailCaptureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          downloadUrl={`/case-studies/${selectedProtocol.filename}`}
          resourceTitle={selectedProtocol.title}
        />
      )}

      {/* Email Capture Modal for Service Documents */}
      {selectedService && (
        <EmailCaptureModal
          isOpen={isServiceModalOpen}
          onClose={() => setIsServiceModalOpen(false)}
          downloadUrl={selectedService.pdfPath}
          resourceTitle={selectedService.title}
          resourceType="service-overview"
        />
      )}
      </div>
    </TooltipProvider>
  );
}
