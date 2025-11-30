import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Calendar, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center w-full">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6 w-full">
              Thank You for Downloading
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto px-4" style={{display: 'block', width: '100%', maxWidth: '42rem'}}>
              Your Executive Summary has been sent to your email and should arrive within the next few minutes.
            </p>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">What's Next?</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="flex justify-center">
                  <Download className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-normal">1. Review the Summary</h3>
                <p className="text-base text-muted-foreground">
                  Get familiar with Intelleges's approach to federal compliance automation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="flex justify-center">
                  <Calendar className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-normal">2. Book a Discovery Call</h3>
                <p className="text-base text-muted-foreground">
                  Schedule a personalized demo to see how Intelleges fits your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-normal">3. Get Started</h3>
                <p className="text-base text-muted-foreground">
                  Receive your customized implementation plan and onboarding timeline.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-semibold mb-4">
              <CheckCircle2 className="h-4 w-4" />
              Battelle Supplier of the Year
            </div>
            <h2 className="text-3xl font-light mb-4">Trusted by Leading Research Organizations</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Intelleges has been recognized for delivering exceptional value in supply chain compliance and procurement automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Testimonial 1 - Ed McFarland */}
            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="text-4xl text-primary/20">"</div>
                <p className="text-lg leading-relaxed">
                  Thanks to their support, we have been able to transform our supply chain, reduce costs and improve our processes. We look forward to expanding our relationship with Intelleges and continuing to use their platform to drive transformation in our overall procurement process.
                </p>
                <div className="pt-4 border-t">
                  <p className="font-semibold">Ed McFarland</p>
                  <p className="text-base text-muted-foreground">Vice President of Contracts, Procurement & Small Business Programs</p>
                  <p className="text-base text-primary font-semibold mt-1">Battelle</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 - John Betancourt */}
            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="text-4xl text-primary/20">"</div>
                <p className="text-lg leading-relaxed">
                  What's great about working with Battelle is that our strategies and values are aligned. When they work on critical projects that impact national security, it's awesome that we can be a reliable, trusted and helpful partner.
                </p>
                <div className="pt-4 border-t">
                  <p className="font-semibold">John Betancourt</p>
                  <p className="text-base text-muted-foreground">CEO & Founder</p>
                  <p className="text-base text-primary font-semibold mt-1">Intelleges</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Achievements */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-center mb-6">Proven Results with Battelle</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <p className="text-base text-muted-foreground">Reduction in manual data collection time</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">Q1 2023</div>
                <p className="text-base text-muted-foreground">Critical microchips delivered in record time</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-base text-muted-foreground">Compliance with FAR requirements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="py-16 bg-blue-50">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-8 w-full">
            <h2 className="text-3xl font-light mb-4 w-full">Schedule Your Free Consultation</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto px-4" style={{display: 'block', width: '100%', maxWidth: '48rem'}}>
              We're happy to spend <strong>30 minutes with you free of charge</strong> answering any question you or your team might have about federal compliance, supplier management, or how Intelleges can streamline your operations.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto"
              asChild
            >
              <a
                href="https://calendly.com/intelleges/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Your Free 30-Minute Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-8">Trusted by Industry Leaders</h2>
          
          {/* Client Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 opacity-60">
            <img 
              src="/client-logos/honeywell-logo.png" 
              alt="Honeywell" 
              className="h-12 object-contain"
            />
            <img 
              src="/client-logos/battelle-logo.png" 
              alt="Battelle" 
              className="h-12 object-contain"
            />
            <img 
              src="/client-logos/dod-logo.png" 
              alt="Department of Defense" 
              className="h-12 object-contain"
            />
            <img 
              src="/client-logos/celestica-logo.png" 
              alt="Celestica" 
              className="h-12 object-contain"
            />
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-light text-primary mb-2">25+</div>
              <div className="text-base text-muted-foreground">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-light text-primary mb-2">10,000+</div>
              <div className="text-base text-muted-foreground">Suppliers Onboarded</div>
            </div>
            <div>
              <div className="text-4xl font-light text-primary mb-2">95%</div>
              <div className="text-base text-muted-foreground">Time Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-8">Prefer to Reach Out Directly?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-normal mb-2">Call Us</h3>
                    <p className="text-base text-muted-foreground mb-2">
                      Speak with a compliance expert
                    </p>
                    <a 
                      href="tel:+19178180225" 
                      className="text-base text-primary hover:underline"
                    >
                      (917) 818-0225
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-normal mb-2">Email Us</h3>
                    <p className="text-base text-muted-foreground mb-2">
                      Get a response within 24 hours
                    </p>
                    <a 
                      href="mailto:info@intelleges.com" 
                      className="text-base text-primary hover:underline"
                    >
                      info@intelleges.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Back to Resources */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Link href="/resources">
            <Button variant="ghost" className="text-base">
              ← Back to Resource Library
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
