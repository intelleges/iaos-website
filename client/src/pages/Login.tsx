import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/seo";
import { AlertCircle, Loader2, Shield } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

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
      // Get reCAPTCHA token (using test site key for now)
      const recaptchaToken = await recaptchaRef.current?.executeAsync();
      
      if (!recaptchaToken) {
        setError("reCAPTCHA verification failed. Please try again.");
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

  const handleSSOLogin = (provider: string) => {
    // Placeholder for SSO integration
    console.log(`SSO login with ${provider}`);
    alert(`${provider} SSO integration coming soon`);
  };

  return (
    <>
      <SEO 
        title="Secure Login" 
        description="Access your Intelleges compliance workflows, templates, dashboards, and supplier analytics."
      />
      
      {/* Full-screen gradient background */}
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1929] via-[#0d2847] to-[#1a3a52]" />
        
        {/* Login Card */}
        <div className="relative w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-[#0d2847]/80 backdrop-blur-sm p-12 space-y-8">
            
            {/* Logo & Brand */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="Intelleges" 
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-bold text-white tracking-wider">
                  INTELLEGES
                </span>
              </div>
              
              <div className="text-center space-y-3">
                <h1 className="text-3xl font-semibold text-white">
                  Intelleges Secure Login
                </h1>
                <p className="text-base text-white/70 leading-relaxed">
                  Access your compliance workflows,<br />
                  templates, dashboards, and supplier analytics.
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 rounded-lg bg-white text-black placeholder:text-gray-500 border-0 text-base"
              />

              {/* Password */}
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-lg bg-white text-black placeholder:text-gray-500 border-0 text-base pr-32"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-700 hover:text-gray-900 font-normal"
                >
                  Forgot password?
                </button>
              </div>

              {/* Hidden reCAPTCHA v3 */}
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Google's test key
              />

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-lg bg-[#1976d2] hover:bg-[#1565c0] text-white text-base font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </form>

            {/* SSO Divider */}
            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-sm text-white/60 font-normal">SSO</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            {/* SSO Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleSSOLogin("Google")}
                className="w-full h-12 rounded-lg bg-white hover:bg-gray-50 text-black font-normal text-base flex items-center justify-center gap-3 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>

              <button
                type="button"
                onClick={() => handleSSOLogin("Microsoft")}
                className="w-full h-12 rounded-lg bg-white hover:bg-gray-50 text-black font-normal text-base flex items-center justify-center gap-3 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M0 0h11v11H0z"/>
                  <path fill="#81bc06" d="M12 0h11v11H12z"/>
                  <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                  <path fill="#ffba08" d="M12 12h11v11H12z"/>
                </svg>
                Sign in with Microsoft
              </button>

              <button
                type="button"
                onClick={() => handleSSOLogin("Okta")}
                className="w-full h-12 rounded-lg bg-white hover:bg-gray-50 text-black font-normal text-base flex items-center justify-center gap-3 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#007dc1">
                  <path d="M11.997 0C5.383 0 0 5.383 0 12s5.383 12 11.997 12C18.616 24 24 18.617 24 12S18.616 0 11.997 0zm0 18.004c-3.308 0-6.002-2.694-6.002-6.004 0-3.31 2.694-6.004 6.002-6.004 3.31 0 6.005 2.694 6.005 6.004 0 3.31-2.695 6.004-6.005 6.004z"/>
                </svg>
                Sign in with Okta
              </button>
            </div>

            {/* Bottom Links */}
            <div className="flex items-center justify-center gap-8 pt-4">
              <button
                type="button"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Supplier Help
              </button>
              <button
                type="button"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Contact Support
              </button>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-white/50 pt-2">
              <Shield className="h-4 w-4" />
              <span>Protected by reCAPTCHA & Cloudflare</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
