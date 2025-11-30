import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FlowCardProps {
  label: string;
  subtitle: string;
  content: {
    intro: string;
    description: string;
    result: string;
  };
}

export default function FlowCard({ label, subtitle, content }: FlowCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative w-32 h-32 md:w-40 md:h-40 rounded-lg border-2 border-primary/20 bg-primary/5 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/40 hover:bg-primary/10 cursor-pointer"
      >
        <span className="text-2xl md:text-3xl font-light transition-all duration-300 group-hover:font-normal">
          {label}
        </span>
        <span className="absolute -bottom-8 text-sm text-muted-foreground font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {subtitle}
        </span>
        <ChevronDown 
          className={`absolute -bottom-12 w-5 h-5 text-muted-foreground transition-all duration-300 ${
            isExpanded ? 'rotate-180 opacity-100' : 'opacity-0 group-hover:opacity-50'
          }`}
        />
      </button>
      
      {/* Expanded Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100 mt-16' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="w-64 md:w-80 bg-card border border-border rounded-lg p-6 shadow-lg space-y-4">
          <p className="text-base font-normal italic text-foreground">
            {content.intro}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content.description}
          </p>
          <p className="text-sm font-medium text-primary">
            {content.result}
          </p>
        </div>
      </div>
    </div>
  );
}
