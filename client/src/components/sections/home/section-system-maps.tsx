import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Using the uploaded diagrams
const diagrams = [
  {
    id: "wheel",
    title: "The Wheel",
    description: "Core operational cycle",
    src: "/pasted_file_0PTgIm_image.png",
    alt: "Intelleges Wheel Diagram",
    hotspots: [
      { x: 50, y: 20, label: "Strategy", description: "Defining compliance goals and risk tolerance" },
      { x: 80, y: 50, label: "Execution", description: "Implementing controls across the supply chain" },
      { x: 50, y: 80, label: "Monitoring", description: "Real-time tracking of supplier performance" },
      { x: 20, y: 50, label: "Optimization", description: "Continuous improvement based on data" }
    ]
  },
  {
    id: "risk",
    title: "Risk Protocols",
    description: "Multi-layer defense strategy",
    src: "/pasted_file_4wm7DP_image.png",
    alt: "Risk Protocols Diagram",
    hotspots: [
      { x: 30, y: 30, label: "Identification", description: "Detecting potential threats early" },
      { x: 70, y: 30, label: "Assessment", description: "Quantifying impact and probability" },
      { x: 50, y: 70, label: "Mitigation", description: "Automated response workflows" }
    ]
  },
  {
    id: "requirements",
    title: "Universal Requirements",
    description: "Standardized compliance engine",
    src: "/pasted_file_5taXaG_image.png",
    alt: "Universal Requirements Diagram",
    hotspots: [
      { x: 25, y: 40, label: "Federal", description: "FAR/DFARS, CMMC, ITAR requirements" },
      { x: 75, y: 40, label: "Industry", description: "ISO, AS9100, NIST standards" },
      { x: 50, y: 60, label: "Internal", description: "Company-specific policies and mandates" }
    ]
  },
  {
    id: "operational",
    title: "Operational Map",
    description: "End-to-end workflow",
    src: "/pasted_file_8aoPq6_image.png",
    alt: "Operational Map Diagram",
    hotspots: [
      { x: 15, y: 50, label: "Onboarding", description: "Supplier registration and vetting" },
      { x: 50, y: 50, label: "Management", description: "Ongoing performance and compliance tracking" },
      { x: 85, y: 50, label: "Audit", description: "Reporting and evidence collection" }
    ]
  }
];

export default function SectionSystemMaps() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section className="container py-24">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-4 text-foreground">
          Visualizing the ecosystem.
        </h2>
        <p className="text-lg text-muted-foreground">
          Our architecture is designed to handle the most complex compliance scenarios with clarity and precision.
          Click on any diagram to explore the details.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {diagrams.map((diagram) => (
          <Dialog key={diagram.id}>
            <DialogTrigger asChild>
              <Card className="group cursor-pointer overflow-hidden border-border/60 transition-all hover:border-border hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs">
                      Loading...
                    </div>
                    <img 
                      src={diagram.src} 
                      alt={diagram.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                        e.currentTarget.parentElement!.innerHTML = '<span class="text-muted-foreground text-sm">Diagram Preview</span>';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ZoomIn className="text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium leading-none mb-1">{diagram.title}</h3>
                    <p className="text-xs text-muted-foreground">{diagram.description}</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-background/95 backdrop-blur-sm border-none h-[85vh]">
              <div className="relative w-full h-full flex flex-col">
                <div className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur-sm p-2 rounded-md border shadow-sm">
                  <h3 className="font-semibold text-lg">{diagram.title}</h3>
                  <p className="text-sm text-muted-foreground">{diagram.description}</p>
                </div>
                
                <div className="relative flex-1 w-full h-full bg-muted/10 flex items-center justify-center overflow-hidden">
                  <div className="relative max-w-full max-h-full p-8">
                    <img 
                      src={diagram.src} 
                      alt={diagram.alt}
                      className="max-w-full max-h-[75vh] object-contain rounded-md shadow-2xl"
                    />
                    
                    {/* Interactive Hotspots Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <TooltipProvider delayDuration={0}>
                        {diagram.hotspots.map((hotspot, index) => (
                          <Tooltip key={index}>
                            <TooltipTrigger asChild>
                              <button
                                className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-125 transition-transform cursor-pointer pointer-events-auto animate-pulse hover:animate-none z-10"
                                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                                onClick={() => setActiveHotspot(`${diagram.id}-${index}`)}
                              >
                                <Info className="w-3 h-3" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs p-3">
                              <p className="font-semibold text-sm mb-1">{hotspot.label}</p>
                              <p className="text-xs text-muted-foreground">{hotspot.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t bg-background/50 backdrop-blur-sm flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    <Info className="inline-block w-4 h-4 mr-2 text-emerald-500" />
                    Hover over the pulsing dots to explore key process steps.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => document.querySelector('[data-state="open"]')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}>
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
