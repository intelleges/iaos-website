import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEO from "@/components/seo";
import { AlertCircle, Loader2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "wouter";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await recaptchaRef.current?.executeAsync();
      
      if (!recaptchaToken) {
        setError("Security verification failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple authentication check
      if (email === "john@intelleges.com" && password === "012463.xX") {
        // Redirect to Railway dashboard
        window.location.href = "https://iaos-compliance-platform-production.up.railway.app/";
      } else {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    } finally {
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Client Login" 
        description="Access your Intelleges compliance management dashboard."
      />
      
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Client Login
            </h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Access your compliance workflows and dashboards.
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-light">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-lg font-light"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-light">
                    Password
                  </Label>
                  <button
                    type="button"
                    className="text-base text-muted-foreground hover:text-foreground transition-colors font-light"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-lg font-light"
                />
              </div>

              {/* Hidden reCAPTCHA */}
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              />

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive font-light">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-full font-light"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-border/40" />
              <span className="text-base text-muted-foreground font-light">OR</span>
              <div className="flex-1 h-px bg-border/40" />
            </div>

            {/* SSO Options */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-full font-light"
                onClick={() => alert("Google SSO coming soon")}
              >
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-full font-light"
                onClick={() => alert("Microsoft SSO coming soon")}
              >
                <svg className="mr-3 h-5 w-5" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M0 0h11v11H0z"/>
                  <path fill="#81bc06" d="M12 0h11v11H12z"/>
                  <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                  <path fill="#ffba08" d="M12 12h11v11H12z"/>
                </svg>
                Continue with Microsoft
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-4">
            <p className="text-base text-muted-foreground font-light">
              Need help?{" "}
              <Link href="/contact" className="text-foreground hover:underline">
                Contact Support
              </Link>
            </p>
            <p className="text-base text-muted-foreground font-light">
              Protected by reCAPTCHA and Cloudflare
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
