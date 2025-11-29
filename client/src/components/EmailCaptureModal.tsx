import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Check } from "lucide-react";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  resourceTitle: string;
}

export default function EmailCaptureModal({ isOpen, onClose, downloadUrl, resourceTitle }: EmailCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Store lead data in localStorage (backend integration can be added later)
    const leadData = {
      ...formData,
      resource: resourceTitle,
      timestamp: new Date().toISOString(),
    };

    const existingLeads = JSON.parse(localStorage.getItem("whitepaper_leads") || "[]");
    existingLeads.push(leadData);
    localStorage.setItem("whitepaper_leads", JSON.stringify(existingLeads));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Trigger download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = downloadUrl.split("/").pop() || "download.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close modal after 2 seconds
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "" });
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-light">Download {resourceTitle}</DialogTitle>
              <DialogDescription className="text-base">
                Please provide your information to access this resource. We'll send you a copy and keep you updated on compliance best practices.
              </DialogDescription>
            </DialogHeader>

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
                    Download Whitepaper
                  </>
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                By downloading, you agree to receive occasional updates from Intelleges about compliance solutions.
              </p>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-light">Download Started!</DialogTitle>
            <DialogDescription className="text-base">
              Your whitepaper is downloading now. Check your downloads folder.
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
