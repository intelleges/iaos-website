import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * REQUEST ACCESS gate — front-end-only UI component. All submit/verify MOCKED:
 * no backend, no API, no DB, zero network calls. Three states in one card.
 *
 * S1 CAPTURE → S2 REDEEM (test code 012345; anything else = error state)
 * → S3 DELIVER (document: download link / action: continue handoff)
 */
export interface RequestAccessGateProps {
  selection: string;
  mode: "document" | "action";
  /** S3 document payoff target — real PDF path when it exists in the repo,
   *  placeholder "#" otherwise. */
  downloadHref?: string;
  /** S3 action payoff — handoff destination, label, and note. */
  continueHref?: string;
  continueLabel?: string;
  continueNote?: string;
}

type GateState = "capture" | "redeem" | "deliver";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TEST MODE: the one accepted access code — makes both the success path
// (012345) and the failure path (anything else → "Invalid code") testable.
const TEST_ACCESS_CODE = "012345";

export default function RequestAccessGate({
  selection,
  mode,
  downloadHref,
  continueHref,
  continueLabel,
  continueNote,
}: RequestAccessGateProps) {
  const [state, setState] = useState<GateState>("capture");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [resent, setResent] = useState(false);

  const docHref = downloadHref ?? "#";
  const actionHref = continueHref ?? "#";
  const isExternal = (href: string) => /^https?:\/\//.test(href);

  const startOver = () => {
    setState("capture");
    setEmail("");
    setCode("");
    setEmailError("");
    setCodeError("");
    setResent(false);
  };

  // S1 submit (mock): validate email format → S2
  const handleCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setEmailError("Please enter a valid business email address");
      return;
    }
    setEmailError("");
    setState("redeem");
  };

  // S2 submit (mock): TEST_ACCESS_CODE → S3; anything else → error state
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setCodeError("Please enter your access code");
      return;
    }
    if (code.trim() !== TEST_ACCESS_CODE) {
      setCodeError("Invalid code");
      return;
    }
    setCodeError("");
    setState("deliver");
  };

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-2xl p-8">
      {/* Header — constant across all three states */}
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-4">
        Request Access:{" "}
        <span className="font-bold text-brand-blue">{selection}</span>
      </p>

      {state === "capture" && (
        <form onSubmit={handleCapture} noValidate>
          <div className="mb-6 space-y-2">
            <label htmlFor={`gate-email-${selection}`} className="block text-sm font-semibold">
              Business Email <span className="text-red-500">*</span>
            </label>
            <Input
              id={`gate-email-${selection}`}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              className={emailError ? "border-red-500" : ""}
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>
          <Button type="submit" className="w-full rounded-full tracking-wide" size="lg">
            REQUEST ACCESS
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Access instructions will be sent to your email address.
          </p>
        </form>
      )}

      {state === "redeem" && (
        <form onSubmit={handleVerify} noValidate>
          <p className="text-sm font-semibold tracking-[0.12em] uppercase mb-4">
            Access Code Sent
          </p>
          <div className="mb-6 space-y-2">
            <label htmlFor={`gate-code-${selection}`} className="block text-sm font-semibold">
              Access Code <span className="text-red-500">*</span>
            </label>
            <Input
              id={`gate-code-${selection}`}
              type="text"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => { setCode(e.target.value); setCodeError(""); }}
              className={codeError ? "border-red-500" : ""}
            />
            {codeError && <p className="text-sm text-red-500">{codeError}</p>}
          </div>
          <Button type="submit" className="w-full rounded-full tracking-wide" size="lg">
            VERIFY
          </Button>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm">
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground underline underline-offset-2"
              onClick={() => setResent(true)}
            >
              Resend
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground underline underline-offset-2"
              onClick={startOver}
            >
              Start over
            </button>
          </div>
          {resent && (
            <p className="text-xs text-muted-foreground text-center mt-2">Code re-sent.</p>
          )}
        </form>
      )}

      {state === "deliver" && (
        <div>
          <p className="text-sm font-semibold tracking-[0.12em] uppercase mb-4">
            Access Granted
          </p>
          {mode === "document" ? (
            <a
              href={docHref}
              {...(docHref !== "#" ? { target: "_blank", rel: "noopener noreferrer", download: true } : {})}
              className="block text-brand-blue font-medium underline underline-offset-2 hover:opacity-80"
            >
              Click Link for Secure Download
            </a>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {continueNote ?? "Continue to complete a short questionnaire."}
              </p>
              <a
                href={actionHref}
                {...(isExternal(actionHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="block"
              >
                <Button className="w-full rounded-full tracking-wide" size="lg">
                  {(continueLabel ?? "Continue").toUpperCase()}
                </Button>
              </a>
            </>
          )}
          <div className="text-center mt-4">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
              onClick={startOver}
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
