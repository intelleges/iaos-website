import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capabilityDownloads, type CapabilityKey } from "@/config/downloadMappings";

type CapabilityCardProps = {
  capabilityKey: CapabilityKey;
  onGatedDownload?: (pdf: string, capabilityKey: string) => void;
};

export function CapabilityCard({
  capabilityKey,
  onGatedDownload,
}: CapabilityCardProps) {
  const config = capabilityDownloads[capabilityKey];
  const { title, filename, tooltip, gating } = config;
  const pdf = `/pdfs/${filename}`;

  const handleClick = () => {
    if (gating === "public") {
      // Public download - open PDF directly
      window.open(pdf, "_blank");
    } else if (gating === "email") {
      // Email-gated download - trigger email capture modal
      if (onGatedDownload) {
        onGatedDownload(pdf, capabilityKey);
      } else {
        // Fallback: navigate to download page
        window.location.href = `/downloads/${capabilityKey}`;
      }
    } else if (gating === "calendly") {
      // Calendly-gated download - open Calendly modal
      // TODO: Implement Calendly modal integration
      console.log("Calendly gating not yet implemented for:", capabilityKey);
      window.location.href = `/schedule-demo?download=${capabilityKey}`;
    }
  };

  const card = (
    <button
      type="button"
      className="
        group flex w-full items-center justify-start
        rounded-3xl border border-border/40 bg-background
        px-8 py-6 text-left shadow-sm transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/30
        hover:scale-105
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-primary
        cursor-pointer
      "
      onClick={handleClick}
    >
      <span className="mr-3 text-lg text-primary">✓</span>
      <div className="flex flex-col gap-1">
        <span className="text-base font-light transition-all duration-300 group-hover:text-lg group-hover:font-normal">
          {title}
        </span>
      </div>
    </button>
  );

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          {card}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
