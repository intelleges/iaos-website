import React from "react";

const tiers = [
  {
    name: "Bronze",
    tagline: "Essential Coverage",
    description: "For small teams starting their compliance journey",
    price: "$800",
    per: "per user / year",
    users: "Includes 10 users",
    featured: false,
    badge: null,
    highlights: [
      "Access to all Intelleges protocol templates (read-only)",
      "1 protocol, 1 touchpoint",
      "Manual ERP / eSRS via spreadsheets",
      "Email support",
      "Online manuals + YouTube training",
    ],
    limitations: [
      "No supplier portal",
      "No template editing or branding",
      "No automation",
    ],
  },
  {
    name: "Silver",
    tagline: "Professional Appearance + Editable Templates",
    description: "For teams requiring customization and brand alignment",
    price: "$1,500",
    per: "per user / year",
    users: "Includes 25 users",
    featured: false,
    badge: null,
    highlights: [
      "Everything in Bronze PLUS:",
      "Editable templates",
      "Custom branding (logos, headers, formatting)",
      "Basic automated reminders",
      "Up to 3 partner types",
      "Supplier portal",
      "ERP / eSRS automation",
    ],
    limitations: [],
  },
  {
    name: "Gold",
    tagline: "Enterprise Automation + Supplier Portal + Z-Code Integration",
    description: "For enterprises requiring automation, dashboards, and operational discipline",
    price: "$2,800",
    per: "per user / year",
    users: "Includes 50 users",
    featured: true,
    badge: "Most Popular",
    highlights: [
      "Everything in Silver PLUS:",
      "Supplier Portal (full dashboard)",
      "Website integration",
      "Advanced reminders + routing",
      "ERP + eSRS automation via Z-Code",
      "SME support",
      "Buyer & compliance personnel training",
      "Phone support",
      "API access",
      "Optional SSO",
    ],
    limitations: [],
  },
  {
    name: "Platinum",
    tagline: "Strategic Co-Managed Operations + SRM + Audit Support",
    description: "For organizations needing Intelleges as a full strategic partner",
    price: "$4,000",
    per: "per user / year",
    users: "Includes 75 users",
    featured: false,
    badge: null,
    highlights: [
      "Everything in Gold PLUS:",
      "Intelleges SRM (Supplier Relationship Management CRM)",
      "Call center integration",
      "Full audit support (prep + live + defense)",
      "Senior management access",
      "Structural template customization",
      "Concierge supplier operations",
      "Unlimited integrations",
      "Weekly strategic meetings",
    ],
    limitations: [],
  },
];

export default function PricingSection() {
  return (
    <section className="w-full bg-[#F7F9FA] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111]">
            Plans & Pricing
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[#444444]">
            Choose the level of automation and strategic support your compliance
            program needs. All plans are built on the same Intelleges
            protocols and templates used by leading enterprises.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier) => {
            const isFeatured = tier.featured;

            return (
              <div
                key={tier.name}
                className={[
                  "relative flex h-full flex-col rounded-2xl border bg-white p-7 sm:p-8",
                  "shadow-sm",
                  isFeatured
                    ? "border-[2px] border-[#C9A635] shadow-lg"
                    : "border-[#E0E0E0]",
                ].join(" ")}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-4 inline-flex items-center rounded-full bg-[#0A3A67] px-3 py-1 text-xs font-medium text-white">
                    {tier.badge}
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-[#111111]">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#444444]">
                    {tier.tagline}
                  </p>
                </div>

                <p className="text-sm text-[#666666]">{tier.description}</p>

                <div className="mt-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-[#111111]">
                      {tier.price}
                    </span>
                    <span className="text-sm text-[#444444]">{tier.per}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[#444444]">
                    {tier.users}
                  </p>
                </div>

                <ul className="mt-6 space-y-2 text-sm leading-relaxed text-[#333333]">
                  {tier.highlights.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#0A3A67]" />
                      <span>{item}</span>
                    </li>
                  ))}

                  {tier.limitations.length > 0 && (
                    <li className="pt-2 text-sm text-[#777777]">
                      {tier.limitations.map((lim, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#D0D0D0]" />
                          <span>{lim}</span>
                        </div>
                      ))}
                    </li>
                  )}
                </ul>

                {/* CTA area */}
                <div className="mt-8 pt-4 border-t border-[#E5E7EB]">
                  <a
                    href={`/contact?plan=${encodeURIComponent(tier.name)}`}
                    className={[
                      "inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                      isFeatured
                        ? "bg-[#0A3A67] text-white hover:bg-[#0C4474]"
                        : "border border-[#0A3A67] text-[#0A3A67] hover:bg-[#EEF3F7]",
                    ].join(" ")}
                  >
                    Talk to Sales
                  </a>
                  <p className="mt-2 text-xs text-[#777777]">
                    Pricing shown is indicative. Final fees depend on scope and
                    deployment.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
