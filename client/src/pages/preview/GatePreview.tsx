import RequestAccessGate from "@/components/RequestAccessGate";

/**
 * Scratch preview fixture for the REQUEST ACCESS gate UI — manual click-through.
 * Two instances: document mode and action mode. UI only, all mocked.
 */
export default function GatePreview() {
  return (
    <div className="min-h-screen bg-primary py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground/70">
              Fixture 1 — document
            </p>
            <RequestAccessGate selection="Executive Briefings" mode="document" />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground/70">
              Fixture 2 — action
            </p>
            <RequestAccessGate selection="Book a Demo" mode="action" />
          </div>
        </div>
      </div>
    </div>
  );
}
