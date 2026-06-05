import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import LogoCarousel from "@/components/LogoCarousel";
import RequestAccessGate from "@/components/RequestAccessGate";
import { Link } from "wouter";
import { useRef, useState } from "react";
import { Check, ChevronRight, Menu, X } from "lucide-react";

/**
 * Campaign library — every document routes to the on-page REQUEST ACCESS form,
 * which submits through the existing email-gate mechanism (EmailCaptureModal →
 * trpc.documentDownloads.checkLimit / recordDownload). No new capture plumbing.
 *
 * `file` points at a PDF that exists in client/public today; docs without a
 * file yet are recorded as access requests (lead + intent) and fulfilled by
 * the existing scheduled follow-up email — no broken auto-download.
 */
interface LibraryDoc {
  title: string;
  type: "whitepaper" | "case_study" | "capability";
  file?: string; // path under client/public; omit when the PDF doesn't exist yet
}

const DEFAULT_BRIEFING: LibraryDoc = {
  title: "The Auditor Is Getting an Upgrade",
  type: "whitepaper",
};

const LIBRARY: { category: string; docs: LibraryDoc[] }[] = [
  {
    category: "Executive Briefings",
    docs: [
      DEFAULT_BRIEFING,
      { title: "AI Enforcement", type: "whitepaper" },
      { title: "Nearshoring", type: "whitepaper" },
    ],
  },
  {
    category: "Case Studies",
    docs: [
      {
        title: "Conflict Minerals",
        type: "case_study",
        file: "/case-studies/Case_Study_14_Conflict_Minerals_CMRT_EMRT_Consumer_Electronics_EV_Battery_and_Semiconductor_Supply_Chains.pdf",
      },
      {
        title: "Counterfeit Parts",
        type: "case_study",
        file: "/case-studies/Case_Study_15_Counterfeit_Parts_Prevention_Aviation_MRO_Maintenance_Repair_Overhaul.pdf",
      },
      { title: "Flow-Down Compliance", type: "case_study" },
      { title: "Government Property", type: "case_study" },
      {
        title: "Supply Chain Security",
        type: "case_study",
        file: "/case-studies/Case_Study_16_Site_Security_C_TPAT_CFATS_Chemical_Hazardous_Materials_Manufacturing.pdf",
      },
    ],
  },
  {
    category: "Compliance Guides",
    docs: [
      {
        title: "eSRS / Subcontract Reporting",
        type: "whitepaper",
        file: "/case-studies/Case_Study_04_eSRS_Reporting_Construction.pdf",
      },
      { title: "CMMC / Cybersecurity", type: "whitepaper" },
      {
        title: "Counterfeit Parts",
        type: "whitepaper",
        file: "/documents/UnifiedCounterfeitPartsStandardsIntegration.pdf",
      },
      {
        title: "Conflict Minerals",
        type: "whitepaper",
        file: "/case-studies/Case_Study_14_Conflict_Minerals_CMRT_EMRT_Consumer_Electronics_EV_Battery_and_Semiconductor_Supply_Chains.pdf",
      },
      { title: "Flow-Down Compliance", type: "whitepaper" },
      { title: "Government Property", type: "whitepaper" },
      {
        title: "Certificate of Insurance",
        type: "whitepaper",
        file: "/case-studies/Case_Study_06_Certificates_of_Insurance_Logistics.pdf",
      },
      {
        title: "Supplier Qualification",
        type: "capability",
        file: "/capabilities/vet-domestic-foreign.pdf",
      },
    ],
  },
  {
    category: "Nearshoring & Mexico",
    docs: [
      { title: "Tariff Impact", type: "whitepaper" },
      { title: "Aerospace Clusters", type: "whitepaper" },
      { title: "Supplier Development", type: "whitepaper" },
      { title: "Market Entry", type: "whitepaper" },
    ],
  },
];

const SHIFT_ROWS = [
  { from: "Email", to: "AI-Assisted Review" },
  { from: "Excel", to: "Pattern Recognition" },
  { from: "Shared Drives", to: "Cross-System Analysis" },
  { from: "Paper Questionnaires", to: "Large-Scale Evidence Review" },
  { from: "Manual Follow-Up", to: "Anomaly Detection" },
  { from: "Outdated Systems", to: "Continuous Monitoring" },
];

// Open (un-gated) credibility artifacts — direct downloads, never routed
// through EmailCaptureModal / documentDownloads.
const BATTELLE_PRESS_RELEASE = "/proof/battelle-supplier-of-the-year-2023.pdf";

const WHY_CARDS: { title: string; body: string; link?: { label: string; href: string } }[] = [
  { title: "Audit Ready", body: "Create defensible compliance records supported by complete documentation and audit trails." },
  { title: "Compliance Automated", body: "Reduce manual collection, reminders, follow-ups, and administrative effort." },
  { title: "Data Harmonized", body: "Transform fragmented information into structured, validated, usable data." },
  { title: "Supply Chain Connected", body: "Collect information across suppliers, contractors, and third parties." },
  { title: "Enterprise Integrated", body: "Work alongside existing systems and organizational workflows." },
  {
    title: "Battle Tested",
    body: "25 Years of Compliance Experience.",
    link: { label: "Battelle Supplier of the Year.", href: BATTELLE_PRESS_RELEASE },
  },
];

const ECCP_QUESTIONS = [
  "Can compliance personnel access and analyze relevant data?",
  "Does the company use data analytics to measure whether the compliance program is effective?",
  "Does the compliance function have technology resources comparable to other parts of the business?",
  "Is there an imbalance where revenue-generating functions have advanced technology while compliance remains manual?",
];

const PHONE_DISPLAY = "+1 855 383 8744";
const PHONE_TEL = "tel:+18553838744";

// Gate selection labels — full label (asset + qualifier) renders in brand
// blue, all-caps via the gate header's `uppercase` style.
const AUDITOR_PDF = "The Auditor Is Getting an Upgrade (PDF Download)";
const BOOK_A_DEMO = "Book a Demo (To Schedule a Zoom Meeting)";
const START_FREE_TRIAL = "Start Free Trial (To Setup New Account)";
const pdfLabel = (title: string) => `${title} (PDF Download)`;

export default function Home() {
  // Gate target: every gated asset routes here — the REQUEST ACCESS card
  // scrolls into view and references the selected collateral by name.
  // `nonce` forces a card remount (reset to S1, fields cleared) on EVERY
  // selection — including re-selecting the same asset.
  const [gateTarget, setGateTarget] = useState<{ selection: string; mode: "document" | "action"; nonce: number }>({
    selection: AUDITOR_PDF,
    mode: "document",
    nonce: 0,
  });
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const briefingRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  const scrollToBriefing = () => {
    briefingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const requestGate = (selection: string, mode: "document" | "action") => {
    setGateTarget(prev => ({ selection, mode, nonce: prev.nonce + 1 }));
    setMobileMenuOpen(false);
    scrollToBriefing();
  };

  // The four hero/section CTAs all request the Auditor briefing PDF —
  // overwriting any stale selection and resetting the card to S1.
  const requestAuditorPdf = () => requestGate(AUDITOR_PDF, "document");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="The Auditor Is Getting an Upgrade"
        description="Government oversight is changing. Intelleges provides Audit-Ready Compliance Management for organizations with government reporting requirements."
        keywords="audit ready compliance, compliance management, government audits, AI enforcement, DOJ ECCP, supplier compliance, compliance automation, federal compliance, ISO 27001"
      />

      {/* Top trust bar */}
      <div className="bg-primary text-primary-foreground text-center text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase py-2 px-4">
        ISO 27001 Certified&nbsp;&nbsp;|&nbsp;&nbsp;
        <a
          href={BATTELLE_PRESS_RELEASE}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="underline underline-offset-2 decoration-primary-foreground/40 hover:decoration-primary-foreground"
        >
          Battelle Supplier of the Year
        </a>
        &nbsp;&nbsp;|&nbsp;&nbsp;25 Years of Compliance Experience
      </div>

      {/* Campaign header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="container flex items-center justify-between py-3 gap-4">
          <div className="flex items-center gap-6 min-w-0">
            <Link href="/">
              <img src="/logo.png" alt="Intelleges" className="h-8 w-auto shrink-0" />
            </Link>
            <nav className="hidden lg:flex items-center gap-6 text-sm">
              <a href={PHONE_TEL} className="text-foreground/80 hover:text-foreground whitespace-nowrap">{PHONE_DISPLAY}</a>
              <button onClick={scrollToBriefing} className="text-foreground/80 hover:text-foreground">Executive Briefing</button>
              <a href="mailto:info@intelleges.com" className="text-foreground/80 hover:text-foreground">Contact Us</a>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button size="sm" className="rounded-full px-5" onClick={() => requestGate(BOOK_A_DEMO, "action")}>Book a Demo</Button>
            <Button size="sm" className="rounded-full px-5 bg-green-600 hover:bg-green-700 text-white" onClick={() => requestGate(START_FREE_TRIAL, "action")}>Start Free Trial</Button>
            <a href="https://app.intelleges.com/login" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="rounded-full px-5">Client Login</Button>
            </a>
          </div>
          <button
            className="md:hidden p-2"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background px-6 py-4 flex flex-col gap-3 text-sm">
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            <button onClick={() => { setMobileMenuOpen(false); scrollToBriefing(); }} className="text-left">Executive Briefing</button>
            <a href="mailto:info@intelleges.com">Contact Us</a>
            <button onClick={() => requestGate(BOOK_A_DEMO, "action")} className="text-left">Book a Demo</button>
            <button onClick={() => requestGate(START_FREE_TRIAL, "action")} className="text-left">Start Free Trial</button>
            <a href="https://app.intelleges.com/login">Client Login</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight uppercase">
              The Auditor Is Getting an Upgrade.
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground italic font-light">
              Is Your Organization Ready?
            </p>
            <div className="space-y-4 pt-4 text-base md:text-lg text-foreground/90 font-light leading-relaxed max-w-3xl mx-auto">
              <p>Government oversight is changing.</p>
              <p>
                Organizations that continue to rely on spreadsheets, email chains, disconnected systems,
                shared drives, and manual compliance processes may find themselves increasingly exposed.
              </p>
              <p className="text-brand-blue">
                Intelleges provides an Audit-Ready Compliance Management platform for organizations with
                government reporting requirements.
              </p>
            </div>
            <div className="pt-4">
              <Button size="lg" className="rounded-full px-8 tracking-wide" onClick={requestAuditorPdf}>
                SEE WHAT'S CHANGING
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cartoon */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <img
            src="/campaign/auditor-upgrade-cartoon.png"
            alt="Two stick figures: a Gov't Contractor holding stacks of papers with a speech bubble saying 'I have a manual process' versus a Gov't Auditor holding a laptop with a speech bubble saying 'I have AI'. Caption: the auditor is getting an upgrade."
            className="max-w-3xl w-full mx-auto rounded-lg"
          />
        </div>
      </section>

      {/* The Shift */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                The Compliance Environment
              </p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight">The Shift</h2>
            </div>

            <div className="grid grid-cols-2 rounded-lg overflow-hidden shadow-md border border-border/50">
              <div className="bg-muted/50 px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                You Rely On…
              </div>
              <div className="bg-primary px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase text-primary-foreground/80">
                The Auditor Now Relies On…
              </div>
              {SHIFT_ROWS.map((row, i) => (
                <div key={i} className="contents">
                  <div className="px-5 py-4 border-t border-border/50 bg-background text-foreground/80">
                    <span className="text-muted-foreground mr-3">—</span>{row.from}
                  </div>
                  <div className="px-5 py-4 border-t border-primary-foreground/10 bg-primary text-primary-foreground font-medium">
                    <span className="text-amber-400 mr-3">→</span>{row.to}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center space-y-3 text-lg font-light pt-2">
              <p>The compliance environment is evolving.</p>
              <p>The question is not whether your organization will face oversight.</p>
              <p className="font-medium">The question is whether it will be ready.</p>
            </div>

            <div className="text-center">
              <Button size="lg" className="rounded-full px-8 tracking-wide" onClick={requestAuditorPdf}>
                SEE IF YOUR ORGANIZATION IS KEEPING UP
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Organizations Choose Intelleges */}
      <section ref={whyRef} className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                Why Organizations Choose Intelleges
              </p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
                Why Organizations Choose Intelleges
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_CARDS.map((card, i) => (
                <div key={i} className="bg-card rounded-lg border border-border/50 p-6 space-y-3 shadow-sm">
                  <h3 className="text-sm font-semibold tracking-[0.12em] uppercase text-primary">
                    {card.title}
                  </h3>
                  <p className="text-base text-muted-foreground font-light leading-relaxed">
                    {card.body}
                    {card.link && (
                      <>
                        {" "}
                        <a
                          href={card.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="text-brand-blue underline underline-offset-2 hover:opacity-80"
                        >
                          {card.link.label}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <p className="text-center text-lg font-medium">Companies in the know, rely on Intelleges</p>
              <LogoCarousel />
            </div>

            <div className="text-center">
              <Button size="lg" className="rounded-full px-8 tracking-wide" onClick={requestAuditorPdf}>
                SEE HOW LEADING ORGANIZATIONS ARE RESPONDING
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Briefing — REQUEST ACCESS */}
      <section ref={briefingRef} id="briefing" className="py-20 bg-primary text-primary-foreground scroll-mt-16">
        <div className="container">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground/70">
                The Auditor Is Getting an Upgrade
              </p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
                Get Access to the Executive Briefing
              </h2>
              <p className="text-primary-foreground/85 font-light leading-relaxed">
                The U.S. Department of Justice's Evaluation of Corporate Compliance Programs (ECCP) asks
                questions such as:
              </p>
              <ul className="space-y-4">
                {ECCP_QUESTIONS.map((q, i) => (
                  <li key={i} className="flex gap-3">
                    <Check className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
                    <span className="font-light leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
              <hr className="border-primary-foreground/20" />
              <div className="space-y-4 text-primary-foreground/85 font-light leading-relaxed">
                <p>For many organizations, these questions represent a significant shift in expectations.</p>
                <p>
                  Government audits are changing. Find out what's changing, why it matters, and whether your
                  organization is keeping up.
                </p>
                <p className="font-medium text-primary-foreground">
                  Request access to the Executive Briefing today.
                </p>
              </div>
            </div>

            {/* The gate — every gated asset routes here; key remounts the card
                so a new selection always restarts at the capture state. */}
            <RequestAccessGate
              key={`${gateTarget.selection}|${gateTarget.mode}|${gateTarget.nonce}`}
              selection={gateTarget.selection}
              mode={gateTarget.mode}
            />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-10 border-b border-border/50">
        <div className="container text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            ISO 27001 Certified&nbsp;&nbsp;|&nbsp;&nbsp;25 Years of Compliance Experience&nbsp;&nbsp;|&nbsp;&nbsp;Battelle Supplier of the Year
          </p>
          <p className="text-base text-muted-foreground font-light">
            Built for highly regulated environments where compliance failures have real consequences.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight uppercase">
              The Auditor Is Getting an Upgrade.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground uppercase tracking-wide font-light">
              Is Your Organization Ready?
            </p>
            <p className="text-base text-muted-foreground font-light">
              Government audits are changing.
            </p>
            <div className="pt-2">
              <Button size="lg" className="rounded-full px-8 tracking-wide" onClick={requestAuditorPdf}>
                FIND OUT WHETHER YOUR COMPANY IS READY
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign footer */}
      <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 text-sm">
            <div className="space-y-4 col-span-2 md:col-span-3 lg:col-span-1">
              <p className="font-medium text-white">Audit-Ready Compliance Management</p>
              <div className="space-y-1">
                <a href={PHONE_TEL} className="block hover:text-white">{PHONE_DISPLAY}</a>
                <a href="mailto:info@intelleges.com" className="block hover:text-white">info@intelleges.com</a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">Get Help</p>
              <button onClick={() => requestGate(BOOK_A_DEMO, "action")} className="block text-left hover:text-white">Book a Demo</button>
              <button onClick={() => requestGate(START_FREE_TRIAL, "action")} className="block text-left hover:text-white">Start Free Trial</button>
              <a href="https://app.intelleges.com/login" className="block hover:text-white">Client Login</a>
              <a href="mailto:info@intelleges.com" className="block hover:text-white">Contact Us</a>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">Executive Briefings</p>
              {LIBRARY[0].docs.map((doc) => (
                <button key={doc.title} onClick={() => requestGate(pdfLabel(doc.title), "document")} className="block text-left hover:text-white">
                  {doc.title}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">Solutions</p>
              <button onClick={() => requestGate(pdfLabel("Audit Ready Compliance"), "document")} className="block text-left hover:text-white">Audit Ready Compliance</button>
              <button onClick={() => requestGate(pdfLabel("Automated Data Harmonized"), "document")} className="block text-left hover:text-white">Automated Data Harmonized</button>
              <button onClick={() => requestGate(pdfLabel("Supply Chain Connected"), "document")} className="block text-left hover:text-white">Supply Chain Connected</button>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">Proof</p>
                <p>
                  <span className="text-amber-500 mr-2">★</span>
                  <a
                    href={BATTELLE_PRESS_RELEASE}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="hover:text-white underline underline-offset-2 decoration-neutral-600"
                  >
                    Battelle Supplier of the Year
                  </a>
                </p>
                <p><span className="text-amber-500 mr-2">◆</span>25 Years of Compliance Experience</p>
                <p><span className="text-amber-500 mr-2">✓</span>ISO 27001 Certified</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">Company</p>
                <Link href="/about" className="block hover:text-white">About</Link>
                <Link href="/security" className="block hover:text-white">Security</Link>
                <Link href="/privacy" className="block hover:text-white">Privacy</Link>
                <button onClick={() => requestGate(pdfLabel("Capability Statement"), "document")} className="block text-left hover:text-white">
                  Capability Statement
                </button>
                <button onClick={() => requestGate(pdfLabel("Brochure"), "document")} className="block text-left hover:text-white">
                  Intelleges Brochure
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">Resources</p>
              {LIBRARY.map(({ category, docs }) => (
                <div key={category}>
                  <button
                    onClick={() => setOpenCategory(openCategory === category ? null : category)}
                    className="flex items-center gap-1.5 text-left hover:text-white"
                  >
                    <ChevronRight
                      className={`h-3.5 w-3.5 shrink-0 transition-transform ${openCategory === category ? "rotate-90" : ""}`}
                    />
                    {category}
                  </button>
                  {openCategory === category && (
                    <div className="ml-5 mt-2 space-y-2">
                      {docs.map((doc) => (
                        <button
                          key={doc.title}
                          onClick={() => requestGate(pdfLabel(doc.title), "document")}
                          className="flex items-center gap-1.5 text-left text-neutral-400 hover:text-white"
                        >
                          <ChevronRight className="h-3 w-3 shrink-0" />
                          {doc.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-6 space-y-2 text-xs text-neutral-500">
            <p>© 2026 Intelleges</p>
            <p>
              ISO 27001 Certified&nbsp; | &nbsp;
              <a
                href={BATTELLE_PRESS_RELEASE}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="hover:text-white underline underline-offset-2 decoration-neutral-700"
              >
                Battelle Supplier of the Year
              </a>
              &nbsp; | &nbsp;25 Years of Compliance Experience
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
