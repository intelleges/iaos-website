import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * REQUEST ACCESS gate — live FCMS-backed (INT-WWW-GATE-FCMS-01).
 *
 * S1 CAPTURE  → FCMS gate.requestAccess (creates partner/engagement/code,
 *               emails the code — short email for documents/trial, full
 *               template invitation for demo)
 * S2 REDEEM   → FCMS supplier.validateAccessCode (existing public procedure)
 * S3 DELIVER  → document: real PDF link / action: continue handoff
 *
 * The website never writes FCMS tables directly and holds no parallel
 * access-code system; both calls go to public FCMS tRPC procedures.
 */
export interface RequestAccessGateProps {
  selection: string;
  mode: "document" | "action";
  /** FCMS request mode — documents email a short code; demo sends the full
   *  invitation; trial is the placeholder path. */
  requestMode: "document" | "demo" | "trial";
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

const FCMS_URL = (import.meta as any).env?.VITE_FCMS_URL || "https://app.intelleges.com";

/** Minimal tRPC-over-HTTP client (superjson envelope) for the two public
 *  gate procedures — no FCMS types or sessions on the website. */
async function fcmsMutate(procedure: string, input: unknown): Promise<any> {
  const res = await fetch(`${FCMS_URL}/api/trpc/${procedure}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ json: input }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || body?.error) {
    const message =
      body?.error?.json?.message || `Request failed (HTTP ${res.status})`;
    throw new Error(message);
  }
  return body?.result?.data?.json;
}

export default function RequestAccessGate({
  selection,
  mode,
  requestMode,
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
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const docHref = downloadHref ?? "#";
  const actionHref = continueHref ?? "#";
  const isExternal = (href: string) => /^https?:\/\//.test(href);

  const startOver = () => {
    setState("capture");
    setEmail("");
    setCode("");
    setEmailError("");
    setCodeError("");
    setNotice("");
    setBusy(false);
  };

  // S1 submit: live FCMS request — partner/engagement/code created, code emailed.
  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setEmailError("Please enter a valid business email address");
      return;
    }
    setEmailError("");
    setBusy(true);
    try {
      await fcmsMutate("gate.requestAccess", {
        email: email.trim(),
        assetKey: selection,
        mode: requestMode,
      });
      setNotice("");
      setState("redeem");
    } catch (err: any) {
      setEmailError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  // Resend: same FCMS call (server voids the old code, throttles 60s / 5 per hour).
  const handleResend = async () => {
    setBusy(true);
    setCodeError("");
    try {
      await fcmsMutate("gate.requestAccess", {
        email: email.trim(),
        assetKey: selection,
        mode: requestMode,
      });
      setNotice("A new code has been sent.");
    } catch (err: any) {
      setNotice(err?.message || "Could not resend the code. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  // S2 verify: existing public FCMS procedure — wrong/expired codes rejected server-side.
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setCodeError("Please enter your access code");
      return;
    }
    setBusy(true);
    try {
      await fcmsMutate("supplier.validateAccessCode", { accessCode: code.trim() });
      setCodeError("");
      setState("deliver");
    } catch (err: any) {
      setCodeError(err?.message || "Invalid code");
    } finally {
      setBusy(false);
    }
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
          <Button type="submit" className="w-full rounded-full tracking-wide" size="lg" disabled={busy}>
            {busy ? "SENDING..." : "REQUEST ACCESS"}
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
          <Button type="submit" className="w-full rounded-full tracking-wide" size="lg" disabled={busy}>
            {busy ? "VERIFYING..." : "VERIFY"}
          </Button>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm">
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground underline underline-offset-2 disabled:opacity-50"
              onClick={handleResend}
              disabled={busy}
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
          {notice && (
            <p className="text-xs text-muted-foreground text-center mt-2">{notice}</p>
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
