// client/src/components/ProposalModal.tsx
// ============================================================================
// ENTERPRISE CONFIGURATOR — Proposal Modal (WIRED TO BACKEND)
// INT.DOC.91 v1.1
//
// REPLACES the placeholder ProposalModal that uses console.log.
// Now calls configurator.submitProposal tRPC mutation.
//
// CHANGE FROM ORIGINAL:
//   - handleSubmit calls trpc.configurator.submitProposal.mutate()
//   - Success state shows confirmation message
//   - Error state shows retry option
// ============================================================================

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc"; // adjust import path to match your project

interface ProposalModalProps {
  open: boolean;
  onClose: () => void;
  configuration: {
    tier: string;
    users: number;
    suppliers: number;
    groups: number;
    protocols: string[];
    multiJurisdiction: boolean;
  };
}

type ModalState = "form" | "submitting" | "success" | "error";

export function ProposalModal({
  open,
  onClose,
  configuration,
}: ProposalModalProps) {
  const [modalState, setModalState] = useState<ModalState>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "",
    phone: "",
  });

  const submitMutation = trpc.configurator.submitProposal.useMutation({
    onSuccess: (data) => {
      console.log("Proposal submitted:", data);
      setModalState("success");
    },
    onError: (error) => {
      console.error("Proposal submission failed:", error);
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
      setModalState("error");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalState("submitting");

    submitMutation.mutate({
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      role: formData.role,
      phone: formData.phone || undefined,
      configuration,
    });
  };

  const handleClose = () => {
    // Reset state when closing
    setModalState("form");
    setErrorMessage("");
    setFormData({
      fullName: "",
      email: "",
      company: "",
      role: "",
      phone: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {/* ====== SUCCESS STATE ====== */}
        {modalState === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Proposal Submitted
              </DialogTitle>
              <DialogDescription>
                We've sent a detailed proposal to{" "}
                <strong>{formData.email}</strong>. Check your inbox for the
                confirmation email with your proposal PDF attached.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-lg bg-green-50 border border-green-200 p-4 my-4">
              <p className="text-sm text-green-800">
                <strong>What happens next:</strong>
              </p>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• Review the proposal PDF in your email</li>
                <li>
                  • An Intelleges representative will follow up within 24 hours
                </li>
                <li>
                  • Once terms are confirmed, your enterprise will be
                  provisioned within 24 hours of payment
                </li>
              </ul>
            </div>

            <DialogFooter>
              <Button onClick={handleClose}>Close</Button>
            </DialogFooter>
          </>
        )}

        {/* ====== ERROR STATE ====== */}
        {modalState === "error" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Submission Failed
              </DialogTitle>
              <DialogDescription>{errorMessage}</DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setModalState("form");
                  setErrorMessage("");
                }}
              >
                Try Again
              </Button>
            </DialogFooter>
          </>
        )}

        {/* ====== FORM STATE ====== */}
        {(modalState === "form" || modalState === "submitting") && (
          <>
            <DialogHeader>
              <DialogTitle>Request Proposal</DialogTitle>
              <DialogDescription>
                Fill out your information and we'll send you a detailed proposal
                for the {configuration.tier} tier.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    required
                    disabled={modalState === "submitting"}
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    disabled={modalState === "submitting"}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john.doe@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    required
                    disabled={modalState === "submitting"}
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Acme Corporation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    required
                    disabled={modalState === "submitting"}
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="executive">
                        Executive / C-Level
                      </SelectItem>
                      <SelectItem value="director">Director</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="specialist">
                        Compliance Specialist
                      </SelectItem>
                      <SelectItem value="procurement">
                        Procurement / Supply Chain
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    disabled={modalState === "submitting"}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="rounded-lg bg-muted p-3 text-sm">
                  <div className="font-semibold mb-2">Your Configuration:</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Tier: {configuration.tier}</li>
                    <li>• Users: {configuration.users.toLocaleString()}</li>
                    <li>
                      • Suppliers:{" "}
                      {configuration.suppliers === -1
                        ? "Unlimited"
                        : configuration.suppliers.toLocaleString()}
                    </li>
                    <li>
                      • Groups:{" "}
                      {configuration.groups === -1
                        ? "Unlimited"
                        : configuration.groups.toLocaleString()}
                    </li>
                    <li>
                      • Protocols: {configuration.protocols.length} selected
                    </li>
                    {configuration.multiJurisdiction && (
                      <li>• Multi-jurisdiction enabled</li>
                    )}
                  </ul>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={modalState === "submitting"}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={modalState === "submitting"}>
                  {modalState === "submitting" && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {modalState === "submitting"
                    ? "Submitting..."
                    : "Submit Request"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
