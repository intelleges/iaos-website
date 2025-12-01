import { useState } from "react";
import { SimpleModal } from "./SimpleModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Check, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  resourceTitle: string;
  documentType: 'capability' | 'protocol' | 'whitepaper' | 'case_study' | string;
  onLimitReached?: (userData: { email: string; firstName: string; lastName: string; company: string; documentTitle: string }) => void;
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
  const queryClient = useQueryClient();
  const utils = trpc.useUtils();
  const recordDownloadMutation = trpc.documentDownloads.recordDownload.useMutation();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company || undefined,
          documentTitle: resourceTitle,
          documentUrl: '', // No download URL for case studies
          documentType: 'case_study',
        });

        // Send follow-up email about case study after discovery call
        toast.success("Redirecting to schedule your discovery call...");
        
        setIsSubmitting(false);
        
        // Call parent handler to redirect to Calendly
        onCaseStudySubmit(formData.email, `${formData.firstName} ${formData.lastName}`);
        
        // Reset form
        setFormData({ firstName: "", lastName: "", email: "", company: "" });
        return;
      }

      // Regular Document Download Flow
      // Check if email is suppressed first
      console.log('[EmailCaptureModal] Checking email suppression status');
      const suppressionCheck = await utils.emailSuppression.checkEmailSuppression.fetch({
        email: formData.email,
      });
      console.log('[EmailCaptureModal] Suppression check result:', suppressionCheck);

      if (suppressionCheck.isSuppressed) {
        console.log('[EmailCaptureModal] Email is suppressed:', suppressionCheck.reason);
        toast.error(
          `This email address cannot receive communications (reason: ${suppressionCheck.reason}). ` +
          `Please contact sales@intelleges.com if you believe this is an error.`
        );
        setIsSubmitting(false);
        return;
      }

      // Check download limit
      console.log('[EmailCaptureModal] About to call checkLimit query');
      const limitCheck = await utils.documentDownloads.checkLimit.fetch({
        email: formData.email,
      });
      console.log('[EmailCaptureModal] checkLimit result:', limitCheck);

      if (limitCheck.limitReached) {
        console.log('[EmailCaptureModal] Limit reached, showing limit modal');
        // Close email capture modal and show limit reached modal with user data
        onClose();
        if (onLimitReached) {
          onLimitReached({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            company: formData.company,
            documentTitle: resourceTitle,
          });
        }
        return;
      }

      // Record the download
      console.log('[EmailCaptureModal] About to call recordDownload mutation with:', {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company || undefined,
        documentTitle: resourceTitle,
        documentUrl: downloadUrl,
        documentType: documentType as 'capability' | 'protocol' | 'whitepaper' | 'case_study',
      });
      
      await recordDownloadMutation.mutateAsync({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
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
        setFormData({ firstName: "", lastName: "", email: "", company: "" });
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className={`text-base ${errors.firstName ? "border-red-500" : ""}`}
                      placeholder="John"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-base">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className={`text-base ${errors.lastName ? "border-red-500" : ""}`}
                      placeholder="Smith"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
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
