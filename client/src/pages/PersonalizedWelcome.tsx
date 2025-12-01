import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Calendar, ArrowRight, CheckCircle2, FileText, Shield, TrendingUp } from "lucide-react";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  documentTitle: string;
  documentType: 'capability' | 'protocol' | 'whitepaper' | 'case_study';
  documentUrl?: string;
}

interface RelatedResource {
  title: string;
  type: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

export default function PersonalizedWelcome() {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [relatedResources, setRelatedResources] = useState<RelatedResource[]>([]);

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const firstName = params.get('firstName') || params.get('name')?.split(' ')[0] || '';
    const lastName = params.get('lastName') || params.get('name')?.split(' ').slice(1).join(' ') || '';
    const documentTitle = params.get('documentTitle') || params.get('document') || '';
    const documentType = (params.get('documentType') || params.get('type') || 'whitepaper') as UserData['documentType'];
    const documentUrl = params.get('documentUrl') || params.get('url') || '';

    if (email && documentTitle) {
      setUserData({
        email,
        firstName,
        lastName,
        documentTitle,
        documentType,
        documentUrl,
      });

      // Generate related resources based on document type
      setRelatedResources(getRelatedResources(documentType, documentTitle));

      // Track page view
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'personalized_landing_page_view', {
          event_category: 'engagement',
          event_label: documentTitle,
          document_type: documentType,
          user_email: email,
        });
        console.log('[Analytics] personalized_landing_page_view event fired');
      }
    }
  }, []);

  const getRelatedResources = (docType: string, docTitle: string): RelatedResource[] => {
    // Recommendation engine based on document type and content
    const allResources: Record<string, RelatedResource[]> = {
      'capability': [
        {
          title: 'Country of Origin (COO) Compliance Case Study',
          type: 'Case Study',
          description: 'See how Honeywell eliminated hundreds of spreadsheets with part-level COO traceability',
          url: '/case-studies/coo-compliance',
          icon: <Shield className="h-6 w-6 text-primary" />,
        },
        {
          title: 'Unified Counterfeit-Parts Standards Integration',
          type: 'Whitepaper',
          description: 'Learn how to harmonize AS5553, AS6081, AS6174, and DoD standards into one workflow',
          url: '/resources',
          icon: <FileText className="h-6 w-6 text-primary" />,
        },
        {
          title: 'FOCI Compliance Verification',
          type: 'Case Study',
          description: 'Discover our integrated technology, expertise, and call center approach to FOCI audits',
          url: '/case-studies/foci',
          icon: <Shield className="h-6 w-6 text-primary" />,
        },
      ],
      'protocol': [
        {
          title: 'Reps & Certs Service One-Pager',
          type: 'One-Pager',
          description: 'Quick overview of our automated representations and certifications management',
          url: '/one-pagers',
          icon: <FileText className="h-6 w-6 text-primary" />,
        },
        {
          title: 'Export Control Compliance',
          type: 'One-Pager',
          description: 'Streamline ITAR, EAR, and OFAC compliance with automated workflows',
          url: '/one-pagers',
          icon: <Shield className="h-6 w-6 text-primary" />,
        },
        {
          title: 'Country of Origin Compliance Whitepaper',
          type: 'Whitepaper',
          description: 'Deep dive into BAA/TAA compliance and part-level traceability',
          url: '/resources',
          icon: <FileText className="h-6 w-6 text-primary" />,
        },
      ],
      'whitepaper': [
        {
          title: 'Schedule a Compliance Assessment',
          type: 'Demo',
          description: 'Get a personalized walkthrough of how Intelleges can solve your compliance challenges',
          url: '#schedule-demo',
          icon: <Calendar className="h-6 w-6 text-primary" />,
        },
        {
          title: 'Counterfeit Parts Prevention Case Study',
          type: 'Case Study',
          description: 'See how we unified 6+ standards to eliminate supplier fatigue',
          url: '/case-studies/counterfeit-parts',
          icon: <Shield className="h-6 w-6 text-primary" />,
        },
        {
          title: 'All Service One-Pagers',
          type: 'Resource Library',
          description: 'Browse quick overviews of all Intelleges compliance services',
          url: '/one-pagers',
          icon: <FileText className="h-6 w-6 text-primary" />,
        },
      ],
      'case_study': [
        {
          title: 'Related Whitepapers',
          type: 'Resource Library',
          description: 'Explore in-depth compliance guides and best practices',
          url: '/resources',
          icon: <FileText className="h-6 w-6 text-primary" />,
        },
        {
          title: 'Schedule a Discovery Call',
          type: 'Demo',
          description: 'Discuss how we can replicate similar results for your organization',
          url: '#schedule-demo',
          icon: <Calendar className="h-6 w-6 text-primary" />,
        },
        {
          title: 'More Case Studies',
          type: 'Case Studies',
          description: 'See how other aerospace and defense leaders achieve compliance',
          url: '/case-studies',
          icon: <TrendingUp className="h-6 w-6 text-primary" />,
        },
      ],
    };

    return allResources[docType] || allResources['whitepaper'];
  };

  const buildCalendlyUrl = () => {
    if (!userData) return 'https://calendly.com/intelleges/demo';
    
    const baseUrl = process.env.CALENDLY_URL || 'https://calendly.com/intelleges/demo';
    const params = new URLSearchParams();
    
    if (userData.email) params.append('email', userData.email);
    if (userData.firstName && userData.lastName) {
      params.append('name', `${userData.firstName} ${userData.lastName}`);
    }
    params.append('a1', userData.documentTitle);
    params.append('a2', 'Personalized Welcome Page');
    
    return `${baseUrl}?${params.toString()}`;
  };

  const handleResourceClick = (resource: RelatedResource) => {
    // Track resource click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resource_recommendation_click', {
        event_category: 'engagement',
        event_label: resource.title,
        resource_type: resource.type,
        source_document: userData?.documentTitle,
      });
      console.log('[Analytics] resource_recommendation_click event fired');
    }

    if (resource.url === '#schedule-demo') {
      window.open(buildCalendlyUrl(), '_blank');
    } else {
      setLocation(resource.url);
    }
  };

  const handleScheduleDemo = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'demo_scheduled_from_welcome_page', {
        event_category: 'conversion',
        event_label: userData?.documentTitle,
        document_type: userData?.documentType,
      });
      console.log('[Analytics] demo_scheduled_from_welcome_page event fired');
    }
    window.open(buildCalendlyUrl(), '_blank');
  };

  if (!userData) {
    return (
      <div className="flex flex-col min-h-screen">
        <SEO 
          title="Welcome to Intelleges"
          description="Your personalized compliance resource center"
        />
        <section className="py-32">
          <div className="container text-center">
            <h1 className="text-4xl font-light mb-6">Welcome to Intelleges</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Loading your personalized experience...
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title={`Welcome Back, ${userData.firstName}!`}
        description={`Your personalized compliance resources based on ${userData.documentTitle}`}
      />

      {/* Hero Section with Personalized Greeting */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Welcome Back, {userData.firstName}!
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              Thank you for downloading <span className="text-foreground font-normal">{userData.documentTitle}</span>
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto pt-4">
              We've curated additional resources based on your interests to help you achieve compliance excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Document Recap Section */}
      <section className="py-16 border-y border-border/20">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-light mb-8 text-center">Your Downloaded Document</h2>
          <Card className="border-2 border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-light mb-2">{userData.documentTitle}</h3>
                  <p className="text-base text-muted-foreground">
                    {userData.documentType === 'capability' && 'Service Overview'}
                    {userData.documentType === 'protocol' && 'Compliance Protocol'}
                    {userData.documentType === 'whitepaper' && 'In-Depth Guide'}
                    {userData.documentType === 'case_study' && 'Customer Success Story'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Downloaded and saved to your email</span>
              </div>
              {userData.documentUrl && (
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => window.open(userData.documentUrl, '_blank')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Again
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-24 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4">Recommended for You</h2>
            <p className="text-xl text-muted-foreground font-light">
              Continue your compliance journey with these curated resources
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedResources.map((resource, index) => (
              <Card 
                key={index}
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/40"
                onClick={() => handleResourceClick(resource)}
              >
                <CardHeader>
                  <div className="mb-4">
                    {resource.icon}
                  </div>
                  <h3 className="text-xl font-light mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {resource.type}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-muted/20">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-light">Ready to Take the Next Step?</h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Schedule a personalized demo to see how Intelleges can streamline your compliance operations and eliminate manual processes.
              </p>
              <Button 
                size="lg"
                className="text-lg px-8 py-6 rounded-full"
                onClick={handleScheduleDemo}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Your Demo
              </Button>
              <p className="text-sm text-muted-foreground">
                30-minute consultation • No commitment required
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-light mb-8 text-center">Your Compliance Journey</h2>
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-3">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium text-center">Downloaded Resource</p>
            </div>
            <div className="h-0.5 bg-primary flex-1 mx-4" />
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-3">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium text-center">Exploring Solutions</p>
            </div>
            <div className="h-0.5 bg-border flex-1 mx-4" />
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full border-2 border-border bg-background flex items-center justify-center mb-3">
                <span className="text-lg font-light text-muted-foreground">3</span>
              </div>
              <p className="text-sm font-medium text-center text-muted-foreground">Schedule Demo</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
