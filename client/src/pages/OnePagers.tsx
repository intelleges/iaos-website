import SEO from "@/components/seo";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { serviceDownloads } from "@/config/downloadMappings";
import { downloadFromS3 } from "@/lib/s3Downloads";
import EmailCaptureModal from "@/components/EmailCaptureModal";

type ServiceKey = keyof typeof serviceDownloads;

export default function OnePagers() {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    s3Key: string;
    serviceKey: string;
    title: string;
  } | null>(null);

  const handleServiceClick = async (serviceKey: ServiceKey) => {
    const config = serviceDownloads[serviceKey];

    if (config.gating === "public") {
      // Public download - open CDN URL directly
      window.open(config.cdnUrl, "_blank");
    } else if (config.gating === "email") {
      // Email-gated download - trigger email capture modal
      setSelectedService({ s3Key: config.cdnUrl, serviceKey, title: config.title });
      setEmailModalOpen(true);
    }
  };



  const services = Object.entries(serviceDownloads) as [ServiceKey, typeof serviceDownloads[ServiceKey]][];

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Service One-Pagers" 
        description="Download comprehensive one-page overviews of Intelleges compliance services including Reps & Certs, Export Control, Cybersecurity, and more."
      />
      
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Service One-Pagers
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              Quick overviews of our compliance services
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto pt-4">
              Download concise one-page summaries of each Intelleges service. Perfect for sharing with stakeholders or evaluating which solutions fit your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(([key, config]) => (
                <TooltipProvider key={key} delayDuration={150}>
                  <Tooltip>
                    <TooltipTrigger asChild>
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
                        onClick={() => handleServiceClick(key)}
                      >
                        <span className="mr-3 text-lg text-primary">📄</span>
                        <div className="flex flex-col gap-1">
                          <span className="text-base font-light transition-all duration-300 group-hover:text-lg group-hover:font-normal">
                            {config.title}
                          </span>
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{config.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            <div className="text-center mt-12 space-y-2">
              <p className="text-base text-muted-foreground font-light">
                All one-pagers are free to download. Simply provide your email to access.
              </p>
              <p className="text-sm text-muted-foreground font-light">
                Need more detailed information? Check out our <a href="/case-studies" className="text-primary hover:underline">case studies</a> or <a href="/resources" className="text-primary hover:underline">whitepapers</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>

    {/* Email Capture Modal - rendered outside flex container */}
    {selectedService && (
      <EmailCaptureModal
        isOpen={emailModalOpen}
        onClose={() => {
          setEmailModalOpen(false);
          setSelectedService(null);
        }}
        downloadUrl={selectedService.s3Key}
        resourceTitle={selectedService.title}
      />
    )}
    </>
  );
}
