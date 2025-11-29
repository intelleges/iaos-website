import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Intelleges Federal Compliance Management System
          </div>
          
          <h1 className="mb-8 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            Data is Power. <br className="hidden sm:block" />
            <span className="text-muted-foreground">Information driving the future.</span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            A universal engine for supplier management, compliance automation, and nearshoring intelligence for healthcare, aerospace, and national labs.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="h-12 rounded-full px-8 text-base">
                Start conversation
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="h-12 rounded-full px-8 text-base bg-transparent border-border/60 hover:bg-secondary/50">
                View pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Abstract background element */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-[0.03] bg-gradient-to-tr from-foreground to-transparent rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
