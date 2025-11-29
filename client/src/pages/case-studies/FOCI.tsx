import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Shield, Users, Cpu, PhoneCall, CheckCircle2, AlertTriangle } from "lucide-react";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import { useState } from "react";

export default function FOCI() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="FOCI Compliance Case Study - Integrated Verification System"
        description="How Intelleges combines technology, expertise, and call centers to deliver comprehensive FOCI audits and supplier verification for aerospace and defense clients."
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
            <h1 className="text-5xl font-light mb-6">FOCI Compliance Verification</h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              How Intelleges integrates technology, expertise, and call centers to deliver comprehensive FOCI audits and supplier verification for aerospace and defense clients.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 border-y border-border/20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Cpu className="h-12 w-12 mx-auto mb-4 text-primary" />
              <div className="text-2xl font-light mb-2">Technology Platform</div>
              <p className="text-base text-muted-foreground">Automated data collection, analytics, verification, and workflow management</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <div className="text-2xl font-light mb-2">Expert Knowledge</div>
              <p className="text-base text-muted-foreground">SMEs in DFARS, NISPOM, FOCI, and supply chain security</p>
            </div>
            <div className="text-center">
              <PhoneCall className="h-12 w-12 mx-auto mb-4 text-primary" />
              <div className="text-2xl font-light mb-2">Call Centers</div>
              <p className="text-base text-muted-foreground">Trained auditors who validate and confirm information directly with suppliers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              To support aerospace and defense clients, Intelleges combines three capabilities into one seamless FOCI compliance operation. Our technology platform handles automated data collection and analytics. Our compliance experts interpret complex ownership structures and foreign influence risks. Our call centers conduct live verification audits with suppliers. Together, these three components form a closed-loop verification system that ensures every supplier is thoroughly vetted, accurate, compliant, and audit-ready.
            </p>
          </div>
        </div>
      </section>

      {/* Component 1: Technology Platform */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Cpu className="h-10 w-10 text-primary" />
            <h2 className="text-4xl font-light">The Intelleges System: Digital Backbone of FOCI Compliance</h2>
          </div>
          
          <p className="text-lg leading-relaxed text-foreground/90 mb-8">
            Our platform handles the entire digital workflow, providing speed, structure, documentation, and automated validation.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light mb-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Multi-Step Questionnaires
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed ml-9">
                Structured FOCI data collection covering ownership, control, influence, governance, sanctions, and foreign exposure.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Automated Verification
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed ml-9 mb-4">
                Cross-checks with multiple authoritative databases:
              </p>
              <div className="ml-9 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-base">Corporate registries</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-base">OFAC / SDN / sanctions lists</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-base">OSINT intelligence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-base">PEP databases</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-base">ITAR / EAR restricted lists</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-base">International company databases</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                AI Risk Scoring
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed ml-9 mb-4">
                Automated detection of hidden risks and anomalies:
              </p>
              <div className="ml-9 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-base">Hidden beneficial owners</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-base">Foreign influence signals</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-base">Suspicious governance structures</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-base">Jurisdiction risk indicators</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-base">Document inconsistencies</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Document Management
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed ml-9">
                Suppliers upload corporate formation documents, equity ownership certifications, shareholder registers, board resolutions, and contracts that may grant foreign influence.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Escalation Workflow
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed ml-9">
                Flagged suppliers are automatically routed to human analysts and call center investigators for deeper review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Component 2: Expertise */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="h-10 w-10 text-primary" />
            <h2 className="text-4xl font-light">Intelleges Knowledge & Expertise: The Human Intelligence</h2>
          </div>
          
          <p className="text-lg leading-relaxed text-foreground/90 mb-8">
            Our specialists provide judgment, interpretation, risk analysis, and credible compliance determinations that technology alone cannot deliver.
          </p>

          <div className="mb-8">
            <h3 className="text-2xl font-light mb-4">Our Team Includes:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                <Users className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-base">DFARS & NISPOM compliance experts</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                <Users className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-base">Export control analysts</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                <Users className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-base">Government contracting specialists</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                <Users className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-base">Corporate governance analysts</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                <Users className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-base">Supply chain security SMEs</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-light mb-3">Interpret Complex Ownership Structures</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Our analysts decode multinational holding companies, multi-tier ownership, foreign equity, investment vehicles, and other complex corporate arrangements.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-3">Resolve Inconsistencies</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                We identify and correct mismatches between supplier disclosures, corporate filings, OSINT intelligence, and document submissions.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-3">Determine Real-World Influence Risk</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Experts assess technical access, board control, veto rights, proxy rights, foreign debt, and other factors that may indicate foreign influence.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-3">Issue Final FOCI Determinations</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Analysts produce definitive, audit-ready reports including risk level, evidence, narrative analysis, and recommended actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Component 3: Call Centers */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <PhoneCall className="h-10 w-10 text-primary" />
            <h2 className="text-4xl font-light">Call Centers: The Verification & Investigation Layer</h2>
          </div>
          
          <p className="text-lg leading-relaxed text-foreground/90 mb-8">
            Our call centers act as the live verification component, delivering accuracy, validation, fraud detection, and escalated investigation capacity.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light mb-4">Supplier Outreach</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                We contact suppliers who provided incomplete information, uploaded questionable documentation, show discrepancies in ownership or corporate data, or need clarification on governance or influence.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4">Live Interviews & Audits</h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Our investigators conduct structured verification calls to confirm:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-base">Identity of executives</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-base">Beneficial ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-base">Corporate structure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-base">Foreign affiliations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-base">Data access roles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-base">Management and board control</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4">Document Validation</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Call center agents request and validate corporate paperwork, tax IDs, ownership attestations, board minutes, certificates of good standing, shareholder agreements, and loan agreements that may confer influence.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4">Real-Time Documentation Correction</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Agents help suppliers correct misinterpretations, missing fields, incorrect ownership data, and misfiled documents.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4">Fraud, Risk & Anomaly Detection</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Human investigators catch what automated systems cannot: contradictory statements, hesitation or evasiveness, behavioral indicators, inability to justify ownership positions, and red-flag patterns observed during calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Workflow */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-light mb-8">The Intelleges FOCI Verification Loop</h2>
          
          <p className="text-lg leading-relaxed text-foreground/90 mb-12">
            Here is the integrated model that aerospace and defense clients value:
          </p>

          <div className="space-y-6">
            {[
              { step: 1, title: "System Collects Data & Documents", desc: "Questionnaires + document uploads + automated screening" },
              { step: 2, title: "System Flags Risks Automatically", desc: "AI risk scoring + sanctions screening + ownership anomaly detection" },
              { step: 3, title: "Expertise Reviews Complex Cases", desc: "Intelleges analysts interpret foreign ownership, influence rights, and risk" },
              { step: 4, title: "Call Center Conducts Live Verification", desc: "Phone/email audits confirm identity, ownership, control, governance, and foreign ties" },
              { step: 5, title: "Call Center Requests Evidence", desc: "Agents obtain updated or missing documents" },
              { step: 6, title: "System Logs Everything", desc: "Every action becomes part of the audit trail" },
              { step: 7, title: "Experts Issue Final FOCI Determination", desc: "Complete report with evidence, analysis, and compliance status" }
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start p-6 bg-muted/20 rounded-lg">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-light">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Clients Trust */}
      <section className="py-24 bg-muted/20">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-light mb-12">Why Aerospace & Defense Clients Trust This Process</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-background rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">FAR, DFARS & NISPOM Compliant</h3>
              <p className="text-base text-muted-foreground">
                A full FOCI evaluation that is defensible during audits
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Highest Possible Accuracy</h3>
              <p className="text-base text-muted-foreground">
                Automation + expertise + live verification covers all angles
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Scalable</h3>
              <p className="text-base text-muted-foreground">
                Thousands of suppliers can be vetted quickly
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Reduces Risk for Primes</h3>
              <p className="text-base text-muted-foreground">
                No hidden foreign ownership, influence, or control slips through
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Fast Turnaround</h3>
              <p className="text-base text-muted-foreground">
                Automated workflows + call centers = rapid results
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Prevents Violations</h3>
              <p className="text-base text-muted-foreground">
                Ensures continued eligibility for classified, ITAR, and defense work
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6">
            Need comprehensive FOCI verification for your supply chain?
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-8">
            See how Intelleges's integrated system can protect your defense contracts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8">
                Schedule a Demo
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8"
              onClick={handleDownloadClick}
            >
              Download Capability Statement
            </Button>
          </div>
        </div>
      </section>

      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        downloadUrl="/documents/Intelleges_Federal_Capability_Statement.pdf"
        resourceTitle="Federal Capability Statement"
      />
    </div>
  );
}
