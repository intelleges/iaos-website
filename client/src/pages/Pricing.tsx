import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, X, Plus } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Bronze",
      subtitle: "Essential Coverage",
      description: "For small teams starting their compliance journey",
      price: "$800",
      period: "per user / year",
      users: "Includes 10 users",
      color: "from-amber-900/20 to-amber-800/10",
      borderColor: "border-amber-900/30",
      features: [
        { text: "Access to all Intelleges protocol templates (read-only)", included: true },
        { text: "1 protocol, 1 touchpoint", included: true },
        { text: "Manual ERP/eSRS via spreadsheets", included: true },
        { text: "Email support", included: true },
        { text: "Online manuals + YouTube training", included: true },
        { text: "No supplier portal", included: false },
        { text: "No template editing or branding", included: false },
        { text: "No automation", included: false }
      ],
      summary: "Bronze provides foundational compliance coverage using Intelleges' proprietary protocol templates. Ideal for small organizations managing 1–2 compliance cycles per year and comfortable managing supplier outreach manually."
    },
    {
      name: "Silver",
      subtitle: "Professional Appearance + Editable Templates",
      description: "For teams requiring customization and brand alignment",
      price: "$1,500",
      period: "per user / year",
      users: "Includes 25 users",
      color: "from-slate-400/20 to-slate-300/10",
      borderColor: "border-slate-400/30",
      features: [
        { text: "Everything in Bronze PLUS:", included: true, bold: true },
        { text: "Editable templates", included: true },
        { text: "Custom branding (logos, headers, formatting)", included: true },
        { text: "Basic automated reminders", included: true },
        { text: "Up to 3 partner types", included: true },
        { text: "Email support", included: true },
        { text: "Supplier portal", included: false },
        { text: "ERP/eSRS automation", included: false }
      ],
      summary: "Silver introduces editable templates and custom branding, giving teams a polished, professional experience without committing to full automation."
    },
    {
      name: "Gold",
      subtitle: "Enterprise Automation + Supplier Portal + Z-Code Integration",
      description: "For enterprises requiring automation, dashboards, and operational discipline",
      price: "$2,800",
      period: "per user / year",
      users: "Includes 50 users",
      color: "from-yellow-600/20 to-yellow-500/10",
      borderColor: "border-yellow-600/30",
      popular: true,
      features: [
        { text: "Everything in Silver PLUS:", included: true, bold: true },
        { text: "Supplier Portal (full dashboard)", included: true },
        { text: "Website integration", included: true },
        { text: "Advanced reminders + routing", included: true },
        { text: "ERP + eSRS automation via Z-Code", included: true },
        { text: "SME support", included: true },
        { text: "Buyer & compliance personnel training", included: true },
        { text: "Phone support", included: true },
        { text: "API access", included: true },
        { text: "Optional SSO", included: true }
      ],
      summary: "Gold elevates Intelleges to enterprise infrastructure. This tier includes automation, supplier portal dashboards, routing workflows, and Z-Code ERP/eSRS automation."
    },
    {
      name: "Platinum",
      subtitle: "Strategic Co-Managed Operations + SRM + Audit Support",
      description: "For organizations needing Intelleges as a full strategic partner",
      price: "$4,000",
      period: "per user / year",
      users: "Includes 75 users",
      color: "from-emerald-600/20 to-emerald-500/10",
      borderColor: "border-emerald-600/30",
      features: [
        { text: "Everything in Gold PLUS:", included: true, bold: true },
        { text: "Intelleges SRM (Supplier Relationship Management CRM)", included: true },
        { text: "Call center integration", included: true },
        { text: "Full audit support (prep + live + defense)", included: true },
        { text: "Senior management access", included: true },
        { text: "Structural template customization", included: true },
        { text: "Concierge supplier operations", included: true },
        { text: "Unlimited integrations", included: true },
        { text: "Weekly strategic meetings", included: true }
      ],
      summary: "Platinum transforms Intelleges into your co-managed compliance operation. Includes SRM, call center integration, audit support, senior leadership access, and unlimited integrations."
    }
  ];

  const addOnCategories = [
    {
      title: "Core Add-Ons",
      items: [
        "SSO (Single Sign-On) – SAML, OAuth, Active Directory",
        "API Access – REST API for integrations and automation",
        "Custom Domain – Fully white-labeled experience",
        "Branding Package – Full color palette, typography, and custom PDFs"
      ]
    },
    {
      title: "Advanced Compliance Add-Ons",
      items: [
        "Regulatory Change Tracker (Premium) – Daily updates covering Executive Orders, FAR/DFARS, BAA, USMCA, ITAR/EAR, ESG, eSRS",
        "Custom Protocol Engineering – Intelleges builds regulatory or internal protocols to your exact specification"
      ]
    },
    {
      title: "Automation Add-Ons",
      items: [
        "Advanced Workflow Routing",
        "Smart Reminders + Escalation Tree",
        "Z-Code ERP & eSRS Automation (Gold/Platinum included)"
      ]
    },
    {
      title: "Supplier-Side Add-Ons",
      items: [
        "Supplier Portal Pro – Supplier dashboards, document vault, multi-user collaboration",
        "Supplier Identity Verification (KYC/KYB) – OFAC, SAM.gov, denied party screening",
        "Supplier Outreach Concierge – Intelleges manages all supplier follow-ups"
      ]
    },
    {
      title: "Risk & Intelligence Add-Ons",
      items: [
        "Risk Scoring Engine – Composite supplier scores (regulatory, financial, ops, geopolitical, ESG)",
        "Predictive Analytics (AI) – Probability of non-compliance, delivery failures, certification lapses",
        "Sub-Tier Visibility Module – Map multi-tier supplier networks"
      ]
    },
    {
      title: "SRM / CRM Add-Ons",
      items: [
        "Intelleges SRM (CRM) – Supplier profiles, timelines, contracts, interactions",
        "Supplier Scorecards – Custom quality, delivery, and compliance scoring"
      ]
    },
    {
      title: "Integration Add-Ons",
      items: [
        "ERP Integrations – SAP, Oracle, NetSuite, Microsoft Dynamics, Infor",
        "Procurement Integrations – Ariba, Coupa, Ivalua, Jaggaer, Workday",
        "SCIM Provisioning – Automated user lifecycle management"
      ]
    },
    {
      title: "Support & Premium Services",
      items: [
        "Dedicated Customer Success Manager",
        "24/7 Premium Support",
        "Custom Training Packages"
      ]
    },
    {
      title: "Audit Add-Ons",
      items: [
        "Internal Audit Preparation",
        "Live Audit Support",
        "Post-Audit Defense"
      ]
    },
    {
      title: "Regional & Due Diligence Add-Ons",
      items: [
        "Regional Environmental Scan Protocols",
        "Due Diligence Package (Enhanced)",
        "Global Supplier Transition Toolkit"
      ]
    }
  ];

  const comparisonFeatures = [
    { name: "Pricing per user/year", bronze: "$800", silver: "$1,500", gold: "$2,800", platinum: "$4,000" },
    { name: "Included Users", bronze: "10", silver: "25", gold: "50", platinum: "75" },
    { name: "All Intelleges Templates", bronze: true, silver: true, gold: true, platinum: true },
    { name: "Edit Templates", bronze: false, silver: true, gold: true, platinum: true },
    { name: "Branding", bronze: false, silver: true, gold: false, platinum: true },
    { name: "Structural Customization", bronze: false, silver: false, gold: false, platinum: true },
    { name: "Partner Types", bronze: "1", silver: "3", gold: "Unlimited", platinum: "Unlimited" },
    { name: "Supplier Portal", bronze: false, silver: false, gold: true, platinum: true },
    { name: "Website Integration", bronze: false, silver: false, gold: true, platinum: true },
    { name: "ERP/eSRS via Spreadsheets", bronze: true, silver: true, gold: false, platinum: false },
    { name: "Z-Code ERP + eSRS Automation", bronze: false, silver: false, gold: true, platinum: true },
    { name: "Basic Reminders", bronze: false, silver: true, gold: true, platinum: true },
    { name: "Advanced Routing", bronze: false, silver: false, gold: true, platinum: true },
    { name: "API Access", bronze: "Add-On", silver: "Add-On", gold: true, platinum: true },
    { name: "SSO", bronze: false, silver: "Add-On", gold: true, platinum: true },
    { name: "SME Support", bronze: false, silver: false, gold: true, platinum: true },
    { name: "Buyer + Compliance Training", bronze: false, silver: false, gold: true, platinum: true },
    { name: "Audit Support", bronze: false, silver: false, gold: false, platinum: true },
    { name: "Call Center Integration", bronze: false, silver: false, gold: false, platinum: true },
    { name: "Intelleges SRM", bronze: false, silver: false, gold: false, platinum: true },
    { name: "Support Level", bronze: "Email", silver: "Email", gold: "Phone", platinum: "Executive" },
    { name: "Strategic Meetings", bronze: false, silver: false, gold: "Monthly", platinum: "Weekly" },
    { name: "Program Management", bronze: "Self", silver: "Self", gold: "Semi-Managed", platinum: "Fully Managed" }
  ];

  const faqs = [
    {
      question: "Who should choose Bronze?",
      answer: "Organizations that want foundational compliance, have small supplier networks, prefer running outreach manually, and want a low-cost, credible starting point."
    },
    {
      question: "Who should choose Silver?",
      answer: "Organizations that need editable, branded templates, require professional presentation, have multiple departments involved, and still manage supplier follow-ups manually."
    },
    {
      question: "Who should choose Gold?",
      answer: "Organizations that need automation, want supplier dashboards, must integrate ERP/eSRS, want SME guidance, and need buyer/compliance training."
    },
    {
      question: "Who should choose Platinum?",
      answer: "Organizations that require SRM + call center integration, face recurring audits, want a co-managed compliance operation, have large global supplier networks, and need structural template changes."
    }
  ];

  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
      );
    }
    return <span className="text-base font-light">{value}</span>;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Pricing" 
        description="A compliance platform built for organizations at every level of maturity — from basic coverage to fully co-managed supplier compliance operations."
      />
      
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Pricing & Plans
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              A compliance platform built for organizations at every level of maturity — from basic coverage to fully co-managed supplier compliance operations.
            </p>
            <p className="text-base text-muted-foreground font-light">
              Choose the plan that matches your operational complexity, supplier volume, and compliance maturity.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-lg border ${plan.borderColor} bg-gradient-to-br ${plan.color} backdrop-blur-sm flex flex-col`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-normal">
                    Most Popular
                  </div>
                )}
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-2xl font-normal">{plan.name}</h3>
                    <p className="text-base text-muted-foreground font-light">{plan.subtitle}</p>
                  </div>
                  <p className="text-base font-light leading-relaxed">{plan.description}</p>
                  <div className="pt-4 border-t border-border/20">
                    <div className="text-4xl font-light">{plan.price}</div>
                    <div className="text-base text-muted-foreground font-light">{plan.period}</div>
                    <div className="text-sm font-normal mt-2">{plan.users}</div>
                  </div>
                  <div className="space-y-2 pt-4">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/30 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-base font-light ${feature.bold ? 'font-normal' : ''}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border/20">
                    <p className="text-base font-light text-muted-foreground leading-relaxed">
                      {plan.summary}
                    </p>
                  </div>
                </div>
                <Link href="/contact" className="mt-6">
                  <Button className="w-full rounded-full font-light">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons Library */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                Add-Ons Library
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                Enhance any plan with optional add-ons to meet your specific regulatory, operational, or strategic needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {addOnCategories.map((category, i) => (
                <div key={i} className="p-6 rounded-lg border border-border/40 bg-background space-y-4">
                  <div className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-normal">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, j) => (
                      <li key={j} className="text-base font-light text-muted-foreground leading-relaxed pl-7 relative">
                        <span className="absolute left-0 top-1.5 h-1 w-1 rounded-full bg-primary"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              Full Comparison
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left p-4 font-normal text-sm">Feature</th>
                    <th className="text-center p-4 font-normal text-sm">Bronze</th>
                    <th className="text-center p-4 font-normal text-sm">Silver</th>
                    <th className="text-center p-4 font-normal text-sm">Gold</th>
                    <th className="text-center p-4 font-normal text-sm">Platinum</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <tr key={i} className="border-b border-border/20 hover:bg-background/50 transition-colors">
                      <td className="p-4 text-base font-light">{feature.name}</td>
                      <td className="p-4 text-center">{renderValue(feature.bronze)}</td>
                      <td className="p-4 text-center">{renderValue(feature.silver)}</td>
                      <td className="p-4 text-center">{renderValue(feature.gold)}</td>
                      <td className="p-4 text-center">{renderValue(feature.platinum)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-light text-center tracking-tight">
              Which Plan Should I Choose?
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-lg border border-border/40 bg-background space-y-3">
                  <h3 className="text-lg font-normal">{faq.question}</h3>
                  <p className="text-base text-muted-foreground font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              These plans <strong className="font-normal">include</strong> users — they do not require minimums. Contact us to discuss your specific needs and explore add-ons.
            </p>
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8 font-light">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
