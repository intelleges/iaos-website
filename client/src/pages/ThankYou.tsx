import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Calendar, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import { InlineWidget } from "react-calendly";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Thank You for Downloading
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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

      {/* Calendly Section */}
      <section className="py-16 bg-blue-50">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-light">Schedule Your Free Consultation</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're happy to spend <strong>30 minutes with you free of charge</strong> answering any question you or your team might have about federal compliance, supplier management, or how Intelleges can streamline your operations.
            </p>
          </div>

          <Card className="border-2 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <InlineWidget
                url="https://calendly.com/intelleges/discovery-call"
                styles={{
                  height: "700px",
                  minWidth: "100%",
                }}
              />
            </CardContent>
          </Card>
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
