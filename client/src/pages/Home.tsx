import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogoCarousel from "@/components/LogoCarousel";
import EmailCaptureModal from "@/components/EmailCaptureModal";
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

const WHY_CARDS = [
  { title: "Audit Ready", body: "Create defensible compliance records supported by complete documentation and audit trails." },
  { title: "Compliance Automated", body: "Reduce manual collection, reminders, follow-ups, and administrative effort." },
  { title: "Data Harmonized", body: "Transform fragmented information into structured, validated, usable data." },
  { title: "Supply Chain Connected", body: "Collect information across suppliers, contractors, and third parties." },
  { title: "Enterprise Integrated", body: "Work alongside existing systems and organizational workflows." },
  { title: "Battle Tested", body: "25 Years of Compliance Experience. Battelle Supplier of the Year." },
];

const ECCP_QUESTIONS = [
  "Can compliance personnel access and analyze relevant data?",
  "Does the company use data analytics to measure whether the compliance program is effective?",
  "Does the compliance function have technology resources comparable to other parts of the business?",
  "Is there an imbalance where revenue-generating functions have advanced technology while compliance remains manual?",
];

const CALENDLY_URL = "https://calendly.com/intelleges/intelleges-introduction";
const PHONE_DISPLAY = "+1 855 383 8744";
const PHONE_TEL = "tel:+18553838744";

export default function Home() {
  const [selectedDoc, setSelectedDoc] = useState<LibraryDoc | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const briefingRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const activeDoc = selectedDoc ?? DEFAULT_BRIEFING;

  const scrollToBriefing = () => {
    briefingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Footer library drilldown: scroll-in-place to the form and retarget its label.
  const requestDoc = (doc: LibraryDoc) => {
    setSelectedDoc(doc);
    scrollToBriefing();
    setTimeout(() => emailInputRef.current?.focus(), 500);
  };

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid business email address");
      return;
    }
    setEmailError("");
    // Hand off to the existing email-gate mechanism (same modal + tRPC flow
    // used by the capability and protocol cards). Email is prefilled.
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="The Auditor Is Getting an Upgrade"
        description="Government oversight is changing. Intelleges provides Audit-Ready Compliance Management for organizations with government reporting requirements."
        keywords="audit ready compliance, compliance management, government audits, AI enforcement, DOJ ECCP, supplier compliance, compliance automation, federal compliance, ISO 27001"
      />

      {/* Top trust bar */}
      <div className="bg-primary text-primary-foreground text-center text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase py-2 px-4">
        ISO 27001 Certified&nbsp;&nbsp;|&nbsp;&nbsp;Battelle Supplier of the Year&nbsp;&nbsp;|&nbsp;&nbsp;25 Years of Compliance Experience
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
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="rounded-full px-5">Book a Demo</Button>
            </a>
            {/* NOTE: campaign design calls for a /free_trial destination; route does not exist yet, pointing at /contact until it does */}
            <Link href="/contact">
              <Button size="sm" className="rounded-full px-5 bg-green-600 hover:bg-green-700 text-white">Start Free Trial</Button>
            </Link>
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
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a Demo</a>
            <Link href="/contact">Start Free Trial</Link>
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
              <p>
                Intelleges provides an Audit-Ready Compliance Management platform for organizations with
                government reporting requirements.
              </p>
            </div>
            <div className="pt-4">
              <Button size="lg" className="rounded-full px-8 tracking-wide" onClick={scrollToBriefing}>
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
              <Button size="lg" className="rounded-full px-8 tracking-wide" onClick={scrollToBriefing}>
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
                  <p className="text-base text-muted-foreground font-light leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <p className="text-center text-lg font-medium">Companies in the know, rely on Intelleges</p>
              <LogoCarousel />
            </div>

            <div className="text-center">
              <Button size="lg" className="rounded-full px-8 tracking-wide" onClick={scrollToBriefing}>
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

            <div className="bg-card text-card-foreground rounded-xl shadow-2xl p-8">
              <form onSubmit={handleRequestAccess} noValidate>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1">
                  Request Access
                  {selectedDoc && (
                    <span className="font-bold ml-2 text-foreground">— TO: {selectedDoc.title}</span>
                  )}
                </p>
                {selectedDoc && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter your business email to receive access instructions.
                  </p>
                )}
                <div className="mt-4 mb-6 space-y-2">
                  <label htmlFor="briefing-email" className="block text-sm font-semibold">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    ref={emailInputRef}
                    id="briefing-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    className={selectedDoc
                      ? "border-2 border-amber-400 ring-2 ring-amber-400/20"
                      : emailError ? "border-red-500" : ""}
                  />
                  {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                </div>
                <Button type="submit" className="w-full rounded-full tracking-wide" size="lg">
                  REQUEST ACCESS
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Access instructions will be sent to your email address.
                </p>
              </form>
            </div>
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
              Government audits are changing. Find out whether your organization is ready.
            </p>
            <div className="pt-2">
              <Button size="lg" className="rounded-full px-8 tracking-wide" onClick={scrollToBriefing}>
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
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="block hover:text-white">Book a Demo</a>
              <Link href="/contact" className="block hover:text-white">Start Free Trial</Link>
              <a href="https://app.intelleges.com/login" className="block hover:text-white">Client Login</a>
              <a href="mailto:info@intelleges.com" className="block hover:text-white">Contact Us</a>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">Executive Briefings</p>
              {LIBRARY[0].docs.map((doc) => (
                <button key={doc.title} onClick={() => requestDoc(doc)} className="block text-left hover:text-white">
                  {doc.title}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">Solutions</p>
              <button onClick={() => whyRef.current?.scrollIntoView({ behavior: "smooth" })} className="block text-left hover:text-white">Audit Ready Compliance</button>
              <button onClick={() => whyRef.current?.scrollIntoView({ behavior: "smooth" })} className="block text-left hover:text-white">Automated Data Harmonized</button>
              <button onClick={() => whyRef.current?.scrollIntoView({ behavior: "smooth" })} className="block text-left hover:text-white">Supply Chain Connected</button>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">Proof</p>
                <p><span className="text-amber-500 mr-2">★</span>Battelle Supplier of the Year</p>
                <p><span className="text-amber-500 mr-2">◆</span>25 Years of Compliance Experience</p>
                <p><span className="text-amber-500 mr-2">✓</span>ISO 27001 Certified</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">Company</p>
                <Link href="/about" className="block hover:text-white">About</Link>
                <Link href="/security" className="block hover:text-white">Security</Link>
                <Link href="/privacy" className="block hover:text-white">Privacy</Link>
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
                          onClick={() => requestDoc(doc)}
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
            <p>ISO 27001 Certified&nbsp; | &nbsp;Battelle Supplier of the Year&nbsp; | &nbsp;25 Years of Compliance Experience</p>
          </div>
        </div>
      </footer>

      {/* Existing email-gate mechanism — same modal + tRPC flow as the
          capability/protocol cards. Email prefilled from the inline form;
          docs without a published PDF skip the auto-download (access request
          is still recorded and the follow-up email still goes out). */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        downloadUrl={activeDoc.file ?? `/library/${activeDoc.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`}
        resourceTitle={activeDoc.title}
        documentType={activeDoc.type}
        initialEmail={email}
        skipAutoDownload={!activeDoc.file}
      />
    </div>
  );
}
