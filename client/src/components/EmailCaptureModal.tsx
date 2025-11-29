import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Check, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  resourceTitle: string;
  buttonText?: string; // Optional custom button text
  resourceType?: 'case-study' | 'service-overview'; // Type of resource
}

export default function EmailCaptureModal({ 
  isOpen, 
  onClose, 
  downloadUrl, 
  resourceTitle,
  buttonText,
  resourceType = 'case-study'
}: EmailCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);

  const validateDownloadQuery = trpc.downloads.validate.useQuery(
    { email: formData.email, resource: resourceTitle },
    { enabled: false } // Don't auto-fetch, we'll trigger manually
  );
  const recordDownloadMutation = trpc.downloads.record.useMutation();
  const submitLeadMutation = trpc.leads.submit.useMutation();

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

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setRateLimitError(null);

    try {
      // Step 1: Check if user can download (rate limit validation)
      const validationResult = await validateDownloadQuery.refetch();

      if (!validationResult.data?.allowed) {
        setRateLimitError(
          "You seem interested in our products. It is best for you to set up a meeting with one of our sales people to ensure that we can fully address your questions and help you with additional downloads."
        );
        setIsSubmitting(false);
        return;
      }

      // Step 2: Submit lead information and send email
      const leadResult = await submitLeadMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        resource: resourceTitle,
        caseStudyFilename: downloadUrl.split('/').pop() || '',
      });

      // Step 3: Record the download
      await recordDownloadMutation.mutateAsync({
        email: formData.email,
        resource: resourceTitle,
      });

      // Step 4: Trigger the actual file download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = downloadUrl.split("/").pop() || "download.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ name: "", email: "", company: "" });
        setRateLimitError(null);
      }, 2000);

    } catch (error: any) {
      console.error("Download error:", error);
      setRateLimitError(
        error.message || "An error occurred. Please try again or contact support."
      );
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    // Clear rate limit error when user changes email
    if (field === "email" && rateLimitError) {
      setRateLimitError(null);
    }
  };

  const handleScheduleMeeting = () => {
    window.location.href = '/contact';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-light">{resourceTitle}</DialogTitle>
              <DialogDescription className="text-base">
                Please provide your information to access this resource. We'll send you a copy and keep you updated on compliance best practices.
              </DialogDescription>
            </DialogHeader>

            {rateLimitError && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-[#0A3A67] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-base text-gray-800 font-normal leading-relaxed">{rateLimitError}</p>
                  </div>
                </div>
                <Button
                  onClick={handleScheduleMeeting}
                  className="w-full rounded-full text-base font-light transition-all duration-300 hover:scale-105 bg-[#0A3A67] hover:bg-[#0A3A67]/90"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Meeting
                </Button>
              </div>
            )}

            {!rateLimitError && (
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
                      <Download className="mr-2 h-4 w-4" />
                      {buttonText || (resourceType === 'service-overview' ? 'Download Service Overview' : 'Download Case Study')}
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By downloading, you agree to receive occasional updates from Intelleges about compliance solutions.
                </p>
              </form>
            )}
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-light">Success!</DialogTitle>
            <DialogDescription className="text-base space-y-2">
              <p>Your {resourceType === 'service-overview' ? 'service overview' : 'case study'} is downloading now. Check your downloads folder.</p>
              <p className="text-green-600 font-medium">📧 We've also sent a copy to your email!</p>
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
