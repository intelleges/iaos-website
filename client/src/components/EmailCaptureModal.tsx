import { useState } from "react";
import { SimpleModal } from "./SimpleModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Check, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  resourceTitle: string;
  documentType: 'capability' | 'protocol' | 'whitepaper' | 'case_study' | string;
  onLimitReached?: () => void;
  isCaseStudy?: boolean;
  onCaseStudySubmit?: (email: string, name: string) => void;
}

export default function EmailCaptureModal({ 
  isOpen, 
  onClose, 
  downloadUrl, 
  resourceTitle,
  documentType = 'capability',
  onLimitReached,
  isCaseStudy = false,
  onCaseStudySubmit
}: EmailCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // TRPC hooks
  const utils = trpc.useUtils();
  const recordDownloadMutation = trpc.documentDownloads.recordDownload.useMutation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[EmailCaptureModal] Form submitted');

    if (!validateForm()) {
      console.log('[EmailCaptureModal] Form validation failed');
      return;
    }
    console.log('[EmailCaptureModal] Form validation passed');

    setIsSubmitting(true);
    console.log('[EmailCaptureModal] isSubmitting set to true');

    try {
      // Case Study Flow: Redirect to Calendly without download
      if (isCaseStudy && onCaseStudySubmit) {
        // Record interest in database (no download limit check for case studies)
        await recordDownloadMutation.mutateAsync({
          email: formData.email,
          name: formData.name,
          company: formData.company || undefined,
          documentTitle: resourceTitle,
          documentUrl: '', // No download URL for case studies
          documentType: 'case_study',
        });

        // Send follow-up email about case study after discovery call
        toast.success("Redirecting to schedule your discovery call...");
        
        setIsSubmitting(false);
        
        // Call parent handler to redirect to Calendly
        onCaseStudySubmit(formData.email, formData.name);
        
        // Reset form
        setFormData({ name: "", email: "", company: "" });
        return;
      }

      // Regular Document Download Flow
      // Check download limit first
      console.log('[EmailCaptureModal] About to call checkLimit query');
      const utils = trpc.useUtils();
      const limitCheck = await utils.documentDownloads.checkLimit.fetch({
        email: formData.email,
      });
      console.log('[EmailCaptureModal] checkLimit result:', limitCheck);

      if (limitCheck.limitReached) {
        console.log('[EmailCaptureModal] Limit reached, showing limit modal');
        // Close email capture modal and show limit reached modal
        onClose();
        if (onLimitReached) {
          onLimitReached();
        }
        return;
      }

      // Record the download
      console.log('[EmailCaptureModal] About to call recordDownload mutation with:', {
        email: formData.email,
        name: formData.name,
        company: formData.company || undefined,
        documentTitle: resourceTitle,
        documentUrl: downloadUrl,
        documentType: documentType as 'capability' | 'protocol' | 'whitepaper' | 'case_study',
      });
      
      await recordDownloadMutation.mutateAsync({
        email: formData.email,
        name: formData.name,
        company: formData.company || undefined,
        documentTitle: resourceTitle,
        documentUrl: downloadUrl,
        documentType: documentType as 'capability' | 'protocol' | 'whitepaper' | 'case_study',
      });

      // Trigger the actual file download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = downloadUrl.split("/").pop() || "download.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Show success toast
      toast.success(`Download started! Check your email in 2 hours for a follow-up message.`);

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ name: "", email: "", company: "" });
      }, 2000);

    } catch (error: any) {
      console.error("[EmailCaptureModal] Download error:", error);
      console.error("[EmailCaptureModal] Error details:", {
        message: error.message,
        data: error.data,
        shape: error.shape,
      });
      toast.error(error.message || "An error occurred. Please try again.");
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
    <SimpleModal isOpen={isOpen} onClose={onClose} maxWidth="28rem">
        {!isSubmitted ? (
          <>
            <div className="p-6 border-b">
              <h2 className="text-2xl font-light mb-2">
                {isCaseStudy ? `Schedule Discovery Call` : `Download ${resourceTitle}`}
              </h2>
              <p className="text-base text-muted-foreground">
                {isCaseStudy 
                  ? `Provide your information to schedule a discovery call. We'll share the full case study during your meeting.`
                  : `Please provide your information to access this resource. We'll send you a copy and keep you updated on compliance best practices.`
                }
              </p>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`text-base ${errors.name ? "border-red-500" : ""}`}
                    placeholder="John Smith"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`text-base ${errors.email ? "border-red-500" : ""}`}
                    placeholder="john@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-base">
                    Company Name *
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    className={`text-base ${errors.company ? "border-red-500" : ""}`}
                    placeholder="Acme Corporation"
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? "company-error" : undefined}
                  />
                  {errors.company && (
                    <p id="company-error" className="text-sm text-red-500">
                      {errors.company}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full text-base font-light transition-all duration-300 hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      {isCaseStudy ? (
                        <>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Discovery Call
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download Document
                        </>
                      )}
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By downloading, you agree to receive occasional updates from Intelleges about compliance solutions.
                </p>
              </form>
          </div>
          </>

        ) : (
          <div className="p-6 py-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-light">Download Started!</h2>
            <p className="text-base text-muted-foreground">
              Your document is downloading now. Check your email in 2 hours for a personalized follow-up.
            </p>
          </div>
        )}
    </SimpleModal>
  );
}
