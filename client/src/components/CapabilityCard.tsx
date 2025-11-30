import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CapabilityCardProps = {
  title: string;
  description?: string;
  downloadSlug?: string; // e.g. "collect-supplier-data"
};

export function CapabilityCard({
  title,
  description,
  downloadSlug,
}: CapabilityCardProps) {
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
      onClick={() => {
        if (!downloadSlug) return;
        // Trigger download flow - navigate to downloads page or open modal
        window.location.href = `/downloads/${downloadSlug}`;
      }}
    >
      <span className="mr-3 text-lg text-primary">✓</span>
      <div className="flex flex-col gap-1">
        <span className="text-base font-light transition-all duration-300 group-hover:text-lg group-hover:font-normal">
          {title}
        </span>
        {description && (
          <span className="text-sm text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    </button>
  );

  if (!downloadSlug) return card;

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          {card}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            Click to download the related PDF case study.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
