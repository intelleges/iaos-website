import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, AlertCircle, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { InlineWidget } from "react-calendly";

export default function Contact() {
  const [, setLocation] = useLocation();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    plan: "",
    message: "",
  });
  
  // Read plan parameter from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get('plan');
    if (planParam) {
      setFormData(prev => ({
        ...prev,
        plan: planParam,
        message: `I'm interested in the ${planParam} plan. `
      }));
    }
  }, []);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        role: "",
        plan: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Contact Us - Book a Demo" 
        description="Schedule a personalized demo of Intelleges compliance management platform. See how we simplify data and document collection for enterprise compliance."
      />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              Ready to transform your compliance and supplier management? Our team is here to help you navigate the complexities of federal requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 border-b border-border/20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-1" />
              <div>
                <div className="text-base font-normal mb-1">Phone</div>
                <a href="tel:+19178180225" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  +1-917-818-0225
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-1" />
              <div>
                <div className="text-base font-normal mb-1">Email</div>
                <a href="mailto:contact@intelleges.com" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  contact@intelleges.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
              <div>
                <div className="text-base font-normal mb-1">US Headquarters</div>
                <p className="text-base text-muted-foreground">
                  3755 River Road<br />
                  Lumberville, PA 18933
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
              <div>
                <div className="text-base font-normal mb-1">Global Office</div>
                <p className="text-base text-muted-foreground">
                  Zapopan, Jalisco<br />
                  Mexico
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-12">
                <TabsTrigger value="schedule" className="text-base">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule a Demo
                </TabsTrigger>
                <TabsTrigger value="form" className="text-base">
                  <Mail className="h-4 w-4 mr-2" />
                  Send a Message
                </TabsTrigger>
              </TabsList>
              
              {/* Calendly Tab */}
              <TabsContent value="schedule">
                <Card className="border-border/60 shadow-sm overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl font-light">Book a 30-Minute Demo</CardTitle>
                    <CardDescription className="text-base">
                      Schedule a call with our compliance experts to see how Intelleges can streamline your workflows.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[700px] w-full">
                      <InlineWidget 
                        url="https://calendly.com/intelleges/intelleges-introduction" 
                        styles={{ height: '100%', width: '100%' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Contact Form Tab */}
              <TabsContent value="form">
                <Card className="border-border/60 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-light">Send Us a Message</CardTitle>
                    <CardDescription className="text-base">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      {/* Success Message */}
                      {submitStatus === "success" && (
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-base text-green-800 font-normal">Thank you for your interest!</p>
                            <p className="text-base text-green-700 mt-1">We've received your message and will contact you within 24 hours.</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Error Message */}
                      {submitStatus === "error" && (
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <p className="text-base text-red-800">
                            Something went wrong. Please try again or contact us directly at contact@intelleges.com
                          </p>
                        </div>
                      )}
                      
                      {/* Name Fields */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-base font-normal">
                            First Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                            className={`text-base ${errors.firstName ? "border-destructive" : ""}`}
                            aria-required="true"
                            aria-invalid={!!errors.firstName}
                            aria-describedby={errors.firstName ? "firstName-error" : undefined}
                          />
                          {errors.firstName && (
                            <p id="firstName-error" className="text-base text-destructive" role="alert">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-base font-normal">
                            Last Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            className={`text-base ${errors.lastName ? "border-destructive" : ""}`}
                            aria-required="true"
                            aria-invalid={!!errors.lastName}
                            aria-describedby={errors.lastName ? "lastName-error" : undefined}
                          />
                          {errors.lastName && (
                            <p id="lastName-error" className="text-base text-destructive" role="alert">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-normal">
                          Work Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className={`text-base ${errors.email ? "border-destructive" : ""}`}
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-base text-destructive" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      
                      {/* Company and Phone */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-base font-normal">
                            Company <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            className={`text-base ${errors.company ? "border-destructive" : ""}`}
                            aria-required="true"
                            aria-invalid={!!errors.company}
                            aria-describedby={errors.company ? "company-error" : undefined}
                          />
                          {errors.company && (
                            <p id="company-error" className="text-base text-destructive" role="alert">
                              {errors.company}
                            </p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-base font-normal">
                            Phone Number <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className={`text-base ${errors.phone ? "border-destructive" : ""}`}
                            aria-required="true"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                          />
                          {errors.phone && (
                            <p id="phone-error" className="text-base text-destructive" role="alert">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Role */}
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-base font-normal">
                          Your Role
                        </Label>
                        <Input
                          id="role"
                          type="text"
                          placeholder="e.g., Compliance Manager, Procurement Director"
                          value={formData.role}
                          onChange={(e) => handleChange("role", e.target.value)}
                          className="text-base"
                        />
                      </div>
                      
                      {/* Plan (pre-filled from pricing page) */}
                      {formData.plan && (
                        <div className="space-y-2">
                          <Label htmlFor="plan" className="text-base font-normal">
                            Interested Plan
                          </Label>
                          <Input
                            id="plan"
                            type="text"
                            value={formData.plan}
                            onChange={(e) => handleChange("plan", e.target.value)}
                            className="text-base bg-muted/50"
                            readOnly
                          />
                          <p className="text-sm text-muted-foreground">Selected from pricing page</p>
                        </div>
                      )}
                      
                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-base font-normal">
                          Tell us about your compliance needs
                        </Label>
                        <Textarea
                          id="message"
                          rows={5}
                          placeholder="What compliance protocols are you managing? How many suppliers? Any specific challenges?"
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          className="text-base resize-none"
                        />
                      </div>
                      
                      {/* Submit Button */}
                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full md:w-auto rounded-full px-12 font-light text-base"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Send Message"}
                        </Button>
                        <p className="text-base text-muted-foreground font-light mt-4">
                          By submitting this form, you agree to be contacted by Intelleges regarding our compliance management platform.
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
