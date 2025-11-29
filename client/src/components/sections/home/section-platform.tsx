import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users, BarChart3, Globe } from "lucide-react";

export default function SectionPlatform() {
  return (
    <section className="container py-24 bg-muted/30">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-4 text-foreground">
          Built for the modern supply chain.
        </h2>
        <p className="text-lg text-muted-foreground">
          A comprehensive suite of tools designed to handle the complexity of federal compliance and global sourcing.
        </p>
      </div>

      <Tabs defaultValue="compliance" className="mx-auto max-w-5xl">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/50 rounded-full">
            <TabsTrigger value="compliance" className="rounded-full py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Compliance</TabsTrigger>
            <TabsTrigger value="sourcing" className="rounded-full py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Sourcing</TabsTrigger>
            <TabsTrigger value="risk" className="rounded-full py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Risk</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-full py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Analytics</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="compliance" className="mt-0">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-medium mb-4">Automated Compliance Engine</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Streamline evidence collection and validation. Our system automatically tracks expiration dates, sends reminders, and flags non-compliant suppliers before they become a liability.
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Automated document verification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Regulatory framework mapping (CMMC, ISO, NIST)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Audit-ready history logs
                  </li>
                </ul>
              </div>
              <div className="bg-muted/50 min-h-[300px] relative">
                {/* Placeholder for UI screenshot */}
                <div className="absolute inset-4 rounded-lg bg-background shadow-sm border border-border/40 p-4">
                  <div className="flex items-center justify-between mb-4 border-b border-border/40 pb-2">
                    <div className="h-2 w-24 rounded-full bg-muted"></div>
                    <div className="h-2 w-8 rounded-full bg-emerald-500/20"></div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-muted/50 shrink-0"></div>
                        <div className="space-y-1 flex-1">
                          <div className="h-2 w-full rounded-full bg-muted/30"></div>
                          <div className="h-2 w-2/3 rounded-full bg-muted/20"></div>
                        </div>
                        <div className="h-4 w-12 rounded-full bg-emerald-500/10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sourcing" className="mt-0">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-medium mb-4">Global Sourcing Network</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Access a pre-vetted network of suppliers across North America and Latin America. Find the right partners based on capabilities, capacity, and compliance status.
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                    Nearshoring opportunities database
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                    Capability matching algorithm
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                    Direct supplier communication
                  </li>
                </ul>
              </div>
              <div className="bg-muted/50 min-h-[300px] relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                  <Globe className="h-32 w-32" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="mt-0">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-medium mb-4">Risk Management</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Identify and mitigate supply chain risks before they impact your operations. Monitor financial health, geopolitical stability, and operational performance.
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                    Real-time risk scoring
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                    Supply chain mapping
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                    Contingency planning tools
                  </li>
                </ul>
              </div>
              <div className="bg-muted/50 min-h-[300px] relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                  <ShieldCheck className="h-32 w-32" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-medium mb-4">Advanced Analytics</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Turn data into actionable insights. Visualize spend, performance, and compliance trends across your entire supply base.
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                    Customizable dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                    Predictive analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                    Exportable reports
                  </li>
                </ul>
              </div>
              <div className="bg-muted/50 min-h-[300px] relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                  <BarChart3 className="h-32 w-32" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
