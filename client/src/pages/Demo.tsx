import SEO from "@/components/seo";
import QualificationGate from "@/components/QualificationGate";

/**
 * Demo booking page with lead qualification
 * Only qualified leads (score ≥60) can access Calendly
 */
export default function Demo() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Schedule a Demo"
        description="Book a personalized demo to see how Intelleges streamlines compliance operations for aerospace and defense organizations"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Schedule Your Demo
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
              See how Intelleges eliminates email chains, spreadsheets, and manual follow-ups with a unified compliance platform
            </p>
          </div>
        </div>
      </section>

      {/* Qualification Gate Section */}
      <section className="py-16">
        <div className="container max-w-2xl">
          <QualificationGate
            title="Schedule a Meeting"
            description="Please provide your information so we can prepare a personalized demo"
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-light text-center mb-12">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-light text-primary">1</span>
              </div>
              <h3 className="text-xl font-light">Personalized Walkthrough</h3>
              <p className="text-muted-foreground">
                We'll tailor the demo to your specific compliance challenges and regulatory requirements
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-light text-primary">2</span>
              </div>
              <h3 className="text-xl font-light">Live Q&A</h3>
              <p className="text-muted-foreground">
                Ask our compliance experts anything about supplier data collection, validation, and audit readiness
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-light text-primary">3</span>
              </div>
              <h3 className="text-xl font-light">Custom Roadmap</h3>
              <p className="text-muted-foreground">
                Leave with a clear implementation plan and timeline for your organization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <p className="text-sm text-muted-foreground mb-6">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="text-2xl font-light text-muted-foreground">Honeywell</div>
            <div className="text-2xl font-light text-muted-foreground">Battelle</div>
            <div className="text-2xl font-light text-muted-foreground">Department of Defense</div>
          </div>
          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-light text-primary">ISO 27001</p>
              <p className="text-sm text-muted-foreground">Certified</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light text-primary">2024</p>
              <p className="text-sm text-muted-foreground">Battelle Supplier of the Year</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
