import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, FileText, Lock, Zap } from "lucide-react";

export default function SectionFeatures() {
  return (
    <section className="container py-24 bg-muted/30">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
        <div className="order-2 lg:order-1 relative aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl bg-background border border-border/60 overflow-hidden p-8">
          {/* Abstract UI representation */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
          
          <div className="relative z-10 space-y-6 h-full flex flex-col justify-center">
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Supplier Audit Report</div>
                    <div className="text-xs text-muted-foreground">Generated 2 mins ago</div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium">
                  Compliant
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-muted"></div>
                <div className="h-2 w-full rounded-full bg-muted"></div>
                <div className="h-2 w-2/3 rounded-full bg-muted"></div>
              </div>
            </div>
            
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm translate-x-8 opacity-90">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Security Alert</div>
                    <div className="text-xs text-muted-foreground">Detected in supply chain</div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-medium">
                  High Risk
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-muted"></div>
                <div className="h-2 w-3/4 rounded-full bg-muted"></div>
              </div>
            </div>
            
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm -translate-x-4 opacity-80">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Performance Score</div>
                    <div className="text-xs text-muted-foreground">Quarterly review</div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium">
                  98/100
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-muted"></div>
                <div className="h-2 w-1/2 rounded-full bg-muted"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-6 text-foreground">
            Everything you need to manage your supply chain.
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            From onboarding to ongoing monitoring, Intelleges provides a complete toolkit for modern procurement teams.
          </p>
          
          <div className="space-y-8 mb-10">
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                <span className="text-xs font-bold">1</span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Centralized Data</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Stop chasing emails and spreadsheets. All your supplier data lives in one secure, accessible location.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                <span className="text-xs font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Automated Workflows</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Set it and forget it. Our system handles reminders, expirations, and routine checks automatically.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                <span className="text-xs font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Actionable Intelligence</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Don't just collect data—use it. Our analytics help you make better sourcing decisions faster.
                </p>
              </div>
            </div>
          </div>
          
          <Link href="/features">
            <Button variant="outline" className="group">
              Explore all features
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
