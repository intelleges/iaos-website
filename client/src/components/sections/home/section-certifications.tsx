import { Shield } from "lucide-react";

const certifications = [
  "SOC 2 Type II",
  "ISO 27001",
  "CMMC Level 2 Ready",
  "NIST 800-171",
  "GDPR Compliant",
  "ITAR Compliant"
];

export default function SectionCertifications() {
  return (
    <section className="container py-24 border-t border-border/40">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600">
          <Shield className="h-8 w-8" />
        </div>
        
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-6 text-foreground">
          Enterprise-grade security.
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed">
          Your data is protected by the highest standards of security and compliance. 
          We are built to serve the most demanding industries.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-muted/30 text-sm font-medium text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              {cert}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
