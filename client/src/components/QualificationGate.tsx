import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QualificationGateProps {
  /**
   * Calendly URL to show if qualified
   */
  calendlyUrl?: string;
  
  /**
   * Optional pre-filled data (e.g., from personalized landing page)
   */
  prefillData?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
  };
  
  /**
   * Custom messaging
   */
  title?: string;
  description?: string;
}

export default function QualificationGate({
  calendlyUrl = "https://calendly.com/intelleges/demo",
  prefillData,
  title = "Schedule a Meeting",
  description = "Please provide your information to check availability",
}: QualificationGateProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: prefillData ? `${prefillData.firstName || ""} ${prefillData.lastName || ""}`.trim() : "",
    email: prefillData?.email || "",
    company: prefillData?.company || "",
    title: "",
  });
  
  const [qualificationResult, setQualificationResult] = useState<{
    qualified: boolean;
    score: number;
    reasons: string[];
    explanation: string;
  } | null>(null);

  const qualifyMutation = trpc.qualification.qualifyLead.useMutation({
    onSuccess: (data) => {
      setQualificationResult(data);
      
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', data.qualified ? 'qualification_passed' : 'qualification_failed', {
          event_category: 'lead_qualification',
          event_label: formData.company,
          score: data.score,
        });
        console.log(`[Analytics] qualification_${data.qualified ? 'passed' : 'failed'} event fired`);
      }
      
      if (data.qualified) {
        toast({
          title: "Qualified!",
          description: "Loading your meeting scheduler...",
        });
      } else {
        toast({
          title: "Thank you for your interest",
          description: "Our team will review your information and reach out if there's a fit.",
          variant: "default",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Track qualification attempt
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'qualification_attempt', {
        event_category: 'lead_qualification',
        event_label: formData.company,
      });
      console.log('[Analytics] qualification_attempt event fired');
    }

    qualifyMutation.mutate({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      title: formData.title || undefined,
    });
  };

  const buildCalendlyUrl = () => {
    const params = new URLSearchParams();
    if (formData.email) params.append('email', formData.email);
    if (formData.name) params.append('name', formData.name);
    if (formData.company) params.append('a1', formData.company);
    if (formData.title) params.append('a2', formData.title);
    return `${calendlyUrl}?${params.toString()}`;
  };

  // Show Calendly widget if qualified
  if (qualificationResult?.qualified) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">You're Qualified!</CardTitle>
              <CardDescription>Select a time that works best for you</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Score: {qualificationResult.score}/100
            </p>
            
            {/* Calendly Inline Widget */}
            <div 
              className="calendly-inline-widget" 
              data-url={buildCalendlyUrl()}
              style={{ minWidth: '320px', height: '700px' }}
            />
            
            {/* Load Calendly widget script */}
            <script 
              type="text/javascript" 
              src="https://assets.calendly.com/assets/external/widget.js" 
              async
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show "we'll reach out" message if disqualified
  if (qualificationResult && !qualificationResult.qualified) {
    return (
      <Card className="border-2 border-border">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <XCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">Thank You for Your Interest</CardTitle>
              <CardDescription>Our team is reviewing your information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-relaxed">
            We appreciate you taking the time to learn about Intelleges. Our team will review your information and reach out if there's a potential fit for our compliance solutions.
          </p>
          
          <p className="text-sm text-muted-foreground">
            In the meantime, feel free to explore our <a href="/resources" className="text-primary underline">resources</a> and <a href="/case-studies" className="text-primary underline">case studies</a> to learn more about how we help aerospace and defense organizations achieve compliance excellence.
          </p>

          {import.meta.env.DEV && (
            <details className="mt-4 p-4 bg-muted rounded-lg text-xs">
              <summary className="cursor-pointer font-medium">Debug Info (Dev Only)</summary>
              <pre className="mt-2 whitespace-pre-wrap">
                {JSON.stringify(qualificationResult, null, 2)}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    );
  }

  // Show qualification form
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={qualifyMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Business Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={qualifyMutation.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Please use your corporate email address
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              type="text"
              placeholder="Acme Aerospace"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              disabled={qualifyMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Job Title (Optional)</Label>
            <Input
              id="title"
              type="text"
              placeholder="VP of Procurement"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={qualifyMutation.isPending}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={qualifyMutation.isPending}
          >
            {qualifyMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking Availability...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Continue to Scheduling
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
