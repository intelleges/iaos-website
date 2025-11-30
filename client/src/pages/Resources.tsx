import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, CheckSquare, FileBarChart, Shield } from "lucide-react";

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

export default function Resources() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="text-4xl font-medium tracking-tight mb-4">Resource Library</h1>
        <p className="text-lg text-muted-foreground">
          Expert insights, guides, and tools to help you navigate the complex landscape of federal compliance and supply chain management.
        </p>
      </div>

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
              <Button variant="ghost" size="sm" className="gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
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
    </div>
  );
}
