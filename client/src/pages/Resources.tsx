import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, CheckSquare, FileBarChart, Shield, TrendingUp, Map } from "lucide-react";
import { serviceDownloads } from "@/config/downloadMappings";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import { DownloadLimitReachedModal } from "@/components/DownloadLimitReachedModal";

const resources = [
  {
    id: "cmmc-guide",
    title: "CMMC 2.0 Readiness Guide",
    type: "Checklist",
    description: "A comprehensive step-by-step checklist to prepare your organization for the upcoming CMMC 2.0 implementation and assessment.",
    icon: CheckSquare,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    size: "2.4 MB"
  },
  {
    id: "supply-chain-risk",
    title: "The Future of Supply Chain Risk",
    type: "Whitepaper",
    description: "In-depth analysis of emerging threats in the aerospace and defense supply chain, and strategies to mitigate them using data intelligence.",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    size: "4.1 MB"
  },
  {
    id: "platform-overview",
    title: "Intelleges Platform Datasheet",
    type: "Datasheet",
    description: "Technical specifications and feature breakdown of the Intelleges Federal Compliance Management System.",
    icon: Shield,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    size: "1.8 MB"
  },
  {
    id: "audit-prep",
    title: "Audit Preparation Handbook",
    type: "Guide",
    description: "Best practices for organizing evidence and documentation to streamline federal compliance audits and reduce onsite time.",
    icon: FileBarChart,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    size: "3.2 MB"
  }
];

const featuredDocuments = [
  {
    key: "compliance-maturity-model",
    icon: TrendingUp,
    color: "text-indigo-600",
    bgColor: "bg-indigo-600/10",
    borderColor: "border-indigo-600/20",
  },
  {
    key: "current-compliance-landscape",
    icon: Map,
    color: "text-violet-600",
    bgColor: "bg-violet-600/10",
    borderColor: "border-violet-600/20",
  }
] as const;

export default function Resources() {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const handleFeaturedDownload = (docKey: typeof featuredDocuments[number]["key"]) => {
    const config = serviceDownloads[docKey];
    setSelectedDocument({
      url: config.cdnUrl,
      title: config.title,
    });
    setEmailModalOpen(true);
  };

  return (
    <div className="container py-24">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="text-4xl font-medium tracking-tight mb-4">Resource Library</h1>
        <p className="text-lg text-muted-foreground">
          Expert insights, guides, and tools to help you navigate the complex landscape of federal compliance and supply chain management.
        </p>
      </div>

      {/* Featured Strategic Documents */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 text-sm font-normal px-4 py-1.5">
            Strategic Resources
          </Badge>
          <h2 className="text-3xl font-medium tracking-tight mb-3">
            Featured Compliance Frameworks
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Essential strategic documents for assessing and improving your organization's compliance posture
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {featuredDocuments.map((doc) => {
            const config = serviceDownloads[doc.key];
            return (
              <Card 
                key={doc.key} 
                className={`flex flex-col border-2 ${doc.borderColor} bg-gradient-to-br from-background to-muted/20 transition-all hover:shadow-xl hover:scale-[1.02] group cursor-pointer`}
                onClick={() => handleFeaturedDownload(doc.key)}
              >
                <CardHeader className="flex-row gap-4 items-start space-y-0 pb-3">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${doc.bgColor} ring-2 ring-offset-2 ring-offset-background ${doc.borderColor.replace('border-', 'ring-')}`}>
                    <doc.icon className={`w-7 h-7 ${doc.color}`} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Badge variant="secondary" className="font-normal text-xs">
                      One-Pager
                    </Badge>
                    <CardTitle className="text-xl leading-tight group-hover:text-indigo-600 transition-colors">
                      {config.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pt-2">
                  <CardDescription className="text-base leading-relaxed">
                    {config.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="border-t bg-muted/30 pt-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-medium">PDF • Free Download</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`gap-2 ${doc.color} hover:bg-opacity-10 transition-all group-hover:translate-x-1`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFeaturedDownload(doc.key);
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="relative mb-16">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-sm text-muted-foreground">Additional Resources</span>
        </div>
      </div>

      {/* Existing Resources Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.id} className="flex flex-col border-border/60 transition-all hover:border-border hover:shadow-md group">
            <CardHeader className="flex-row gap-4 items-start space-y-0 pb-2">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${resource.bgColor}`}>
                <resource.icon className={`w-6 h-6 ${resource.color}`} />
              </div>
              <div className="space-y-1">
                <Badge variant="outline" className="mb-2 font-normal text-muted-foreground">
                  {resource.type}
                </Badge>
                <CardTitle className="text-xl leading-tight group-hover:text-emerald-600 transition-colors">
                  {resource.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pt-4">
              <CardDescription className="text-base">
                {resource.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 pt-4 flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-medium">PDF • {resource.size}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                onClick={() => {
                  // Map resource.id to serviceDownloads key
                  const downloadKey = resource.id === 'cmmc-guide' ? 'cybersecurity' : 
                                     resource.id === 'supply-chain-risk' ? 'supplier-risk' :
                                     resource.id === 'platform-overview' ? 'reps-certs-service' :
                                     resource.id === 'audit-prep' ? 'quality-systems-service' :
                                     resource.id === 'compliance-roadmap' ? 'compliance-maturity-model' :
                                     resource.id === 'vendor-management' ? 'current-compliance-landscape' : null;
                  
                  const downloadConfig = downloadKey ? serviceDownloads[downloadKey as keyof typeof serviceDownloads] : null;
                  
                  setSelectedDocument({
                    url: downloadConfig?.cdnUrl || `https://files.manuscdn.com/placeholder-${resource.id}.pdf`,
                    title: resource.title,
                  });
                  setEmailModalOpen(true);
                }}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-24 rounded-2xl bg-muted/50 p-8 md:p-12 text-center border border-border/60">
        <h3 className="text-2xl font-medium mb-4">Need something specific?</h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our team of compliance experts is constantly developing new resources. 
          Contact us if you need guidance on a specific regulation or standard.
        </p>
        <Button variant="outline" className="rounded-full px-8">
          Contact Support
        </Button>
      </div>

      {/* Email Capture Modal */}
      {selectedDocument && (
        <EmailCaptureModal
          isOpen={emailModalOpen}
          onClose={() => {
            setEmailModalOpen(false);
            setSelectedDocument(null);
          }}
          downloadUrl={selectedDocument.url}
          resourceTitle={selectedDocument.title}
          documentType="whitepaper"
          onLimitReached={() => {
            setLimitModalOpen(true);
          }}
        />
      )}

      {/* Download Limit Reached Modal */}
      <DownloadLimitReachedModal
        isOpen={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
      />
    </div>
  );
}
