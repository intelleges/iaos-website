import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ProtocolCardProps = {
  title: string;
  onClick: () => void;
};

export function ProtocolCard({ title, onClick }: ProtocolCardProps) {
  const tooltip = `Click to download the ${title} case study`;

  const card = (
    <button
      type="button"
      className="
        p-4 rounded-lg border border-border/40 bg-background 
        transition-all duration-300 
        hover:scale-105 hover:shadow-lg hover:border-primary/30 
        cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
        w-full text-left
      "
      onClick={onClick}
    >
      <p className="text-base font-light transition-all duration-300 hover:text-lg hover:font-normal">
        {title}
      </p>
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
