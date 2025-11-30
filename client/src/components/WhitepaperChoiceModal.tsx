import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Calendar } from "lucide-react";

type WhitepaperChoiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onChooseExecutiveSummary: () => void;
  onChooseFullWhitepaper: () => void;
};

export function WhitepaperChoiceModal({
  isOpen,
  onClose,
  onChooseExecutiveSummary,
  onChooseFullWhitepaper,
}: WhitepaperChoiceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: '672px' }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Choose Your Download</DialogTitle>
          <DialogDescription className="text-base">
            Select the version that best fits your needs
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Executive Summary Option */}
          <div className="flex flex-col gap-4 p-6 rounded-lg border border-border/40 bg-background hover:border-primary/30 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-normal">Executive Summary</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Quick 2-page overview of the key findings and recommendations. Perfect for busy executives.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 font-light">
                  <li>• 2-page PDF</li>
                  <li>• Key insights and ROI data</li>
                  <li>• Instant download</li>
                </ul>
              </div>
            </div>
            <Button 
              onClick={onChooseExecutiveSummary}
              variant="outline"
              className="w-full rounded-full font-light"
            >
              <FileText className="mr-2 h-4 w-4" />
              Download Executive Summary
            </Button>
          </div>

          {/* Full Whitepaper Option */}
          <div className="flex flex-col gap-4 p-6 rounded-lg border-2 border-primary/30 bg-primary/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-normal">Full Whitepaper</h3>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-normal">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Complete 18-page analysis with case studies, implementation frameworks, and cost-benefit models.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 font-light">
                  <li>• 18-page comprehensive guide</li>
                  <li>• Real-world case studies</li>
                  <li>• Implementation roadmap</li>
                  <li>• Includes 15-minute consultation</li>
                </ul>
              </div>
            </div>
            <Button 
              onClick={onChooseFullWhitepaper}
              className="w-full rounded-full font-light"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Demo & Get Full Whitepaper
            </Button>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground font-light">
          Both options are completely free. No credit card required.
        </div>
      </DialogContent>
    </Dialog>
  );
}
