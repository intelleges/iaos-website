import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import { useState } from "react";

export default function COOComplianceCaseStudy() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container max-w-4xl">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Case Study
          </div>
          <h1 className="text-5xl font-light mb-6">
            Country of Origin (COO) Compliance at the Part Number Level
          </h1>
          <p className="text-2xl text-muted-foreground font-light">
            How Intelleges Eliminated Hundreds of Spreadsheets and Enabled Part-Level COO Traceability for Honeywell Aerospace
          </p>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-light mb-6">Executive Summary</h2>
          <p className="text-lg leading-relaxed mb-6">
            Aerospace manufacturers like Honeywell manage dozens, hundreds, or even thousands of unique part numbers sourced from a global network of suppliers. Traditional COO verification relies on spreadsheets, email chains, and inconsistent documentation, creating compliance gaps that expose primes to audit risk, counterfeit parts, and Buy American Act violations.
          </p>
          <p className="text-lg leading-relaxed">
            Intelleges solved this problem by deploying a Part-Number–Level Questionnaire System that allows suppliers to answer COO questions for every part individually, all within a single interface. The system replaces hundreds of spreadsheets and provides a clean, scalable, auditable COO verification process aligned with BAA, TAA, DFARS, ITAR/EAR, and aerospace OEM requirements.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-light mb-6">Problem: COO Compliance at Scale Was Unmanageable</h2>
          
          <p className="text-lg leading-relaxed mb-8">
            Honeywell Aerospace needed to verify Country of Origin for each part, not just each supplier, while meeting Buy American Act and Trade Agreements Act requirements. They had to trace components across multi-tier international supply chains, eliminate hundreds of manual spreadsheets, ensure accuracy before Department of Defense or NASA audits, and reduce risk of counterfeit or misdeclared parts.
          </p>

          <div className="bg-background rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-light mb-4">Why Spreadsheet-Based Systems Failed</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg leading-relaxed">
                  <span className="font-medium">• Mis-declared COO:</span> Suppliers often mis-declared COO for some parts
                </p>
              </div>
              <div>
                <p className="text-lg leading-relaxed">
                  <span className="font-medium">• Version confusion:</span> Multiple part revisions caused confusion
                </p>
              </div>
              <div>
                <p className="text-lg leading-relaxed">
                  <span className="font-medium">• No audit trail:</span> No audit trail existed across revisions
                </p>
              </div>
              <div>
                <p className="text-lg leading-relaxed">
                  <span className="font-medium">• No automation:</span> No automated risk identification
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-lg leading-relaxed">
                  <span className="font-medium">• Unmanageable scale:</span> No way to manage thousands of row-level COO entries
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed">
            Honeywell needed a modernized, part-level COO verification system.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-light mb-6">Solution: The Intelleges Part-Level COO Questionnaire System</h2>
          
          <p className="text-lg leading-relaxed mb-12">
            Intelleges deployed its proprietary platform enabling comprehensive part-level COO verification through five integrated capabilities:
          </p>

          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">1. One Questionnaire → Hundreds of Part Numbers</h3>
              <p className="text-lg leading-relaxed mb-4">
                A single supplier questionnaire dynamically expands to every part number the supplier provides. Suppliers answer COO and traceability questions for each part:
              </p>
              <ul className="space-y-2 text-lg">
                <li>• Raw material origin</li>
                <li>• Subassembly origin</li>
                <li>• Manufacturing location</li>
                <li>• Final assembly location</li>
                <li>• Any foreign content thresholds</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">2. Automated Document Collection</h3>
              <p className="text-lg leading-relaxed mb-4">
                Suppliers upload comprehensive documentation:
              </p>
              <ul className="space-y-2 text-lg">
                <li>• COO certificates</li>
                <li>• Manufacturer's Certificates of Conformance</li>
                <li>• Invoices</li>
                <li>• Chain-of-custody records</li>
                <li>• Routing documentation</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">3. AI Validation and Risk Identification</h3>
              <p className="text-lg leading-relaxed mb-4">
                The system automatically flags:
              </p>
              <ul className="space-y-2 text-lg">
                <li>• COO inconsistencies</li>
                <li>• High-risk geographies</li>
                <li>• Conflicts between invoices & COO statements</li>
                <li>• Potential counterfeit indicators</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">4. Call-Center Verification Layer</h3>
              <p className="text-lg leading-relaxed mb-4">
                Intelleges investigators verify data via:
              </p>
              <ul className="space-y-2 text-lg">
                <li>• Live supplier outreach</li>
                <li>• COO confirmation calls</li>
                <li>• Documentation requests</li>
                <li>• Audit support</li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-4">5. Audit-Ready Reporting</h3>
              <p className="text-lg leading-relaxed mb-4">
                Every part number receives its own:
              </p>
              <ul className="space-y-2 text-lg">
                <li>• COO status</li>
                <li>• Documentation trail</li>
                <li>• Risk score</li>
                <li>• Timestamped verification log</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-light mb-8">Results</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-2xl font-medium mb-2">100s</h3>
              <p className="text-lg text-muted-foreground">Spreadsheets eliminated</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-2xl font-medium mb-2">100%</h3>
              <p className="text-lg text-muted-foreground">Part-level COO traceability</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-2xl font-medium mb-2">Significant</h3>
              <p className="text-lg text-muted-foreground">Reduction in audit failures</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-2xl font-medium mb-2">Much faster</h3>
              <p className="text-lg text-muted-foreground">Supplier onboarding</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-2xl font-medium mb-2">Uniform</h3>
              <p className="text-lg text-muted-foreground">Compliance across components</p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-2xl font-medium mb-2">Reduced</h3>
              <p className="text-lg text-muted-foreground">Counterfeit and gray-market risk</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6">
            Need part-level COO verification for your supply chain?
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-8">
            See how Intelleges can eliminate spreadsheets and provide audit-ready COO compliance.
          </p>
          <div className="flex gap-4 justify-center">
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
              Download Whitepaper
            </Button>
          </div>
        </div>
      </section>

      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        downloadUrl="/documents/CountryofOrigin-BuyAmericanAct.pdf"
        resourceTitle="Country of Origin Compliance Whitepaper"
        documentType="whitepaper"
      />
    </div>
  );
}
