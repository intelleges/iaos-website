import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

// Using the uploaded diagrams
const diagrams = [
  {
    title: "The Wheel",
    description: "Core operational cycle",
    src: "/pasted_file_0PTgIm_image.png",
    alt: "Intelleges Wheel Diagram"
  },
  {
    title: "Risk Protocols",
    description: "Multi-layer defense strategy",
    src: "/pasted_file_4wm7DP_image.png",
    alt: "Risk Protocols Diagram"
  },
  {
    title: "Universal Requirements",
    description: "Standardized compliance engine",
    src: "/pasted_file_5taXaG_image.png",
    alt: "Universal Requirements Diagram"
  },
  {
    title: "Operational Map",
    description: "End-to-end workflow",
    src: "/pasted_file_8aoPq6_image.png",
    alt: "Operational Map Diagram"
  }
];

export default function SectionSystemMaps() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-4 text-foreground">
          Visualizing the ecosystem.
        </h2>
        <p className="text-lg text-muted-foreground">
          Our architecture is designed to handle the most complex compliance scenarios with clarity and precision.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {diagrams.map((diagram) => (
          <Dialog key={diagram.title}>
            <DialogTrigger asChild>
              <Card className="group cursor-pointer overflow-hidden border-border/60 transition-all hover:border-border hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {/* In a real app, we would use Next.js Image, but here we use standard img tag for simplicity in this environment */}
                    {/* Using a placeholder if image doesn't load, but pointing to the correct path */}
                    <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs">
                      Loading...
                    </div>
                    <img 
                      src={diagram.src} 
                      alt={diagram.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback if image is not found
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
            <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-background/95 backdrop-blur-sm border-none">
              <div className="relative w-full h-[80vh] flex items-center justify-center p-4">
                <img 
                  src={diagram.src} 
                  alt={diagram.alt}
                  className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
