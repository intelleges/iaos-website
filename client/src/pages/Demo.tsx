import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Demo redirect page
 * Redirects to /contact page to maintain compatibility with PDF links
 * that reference www.intelleges.com/demo
 */
export default function Demo() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to contact page
    setLocation("/contact");
  }, [setLocation]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-600">Redirecting to demo booking...</p>
    </div>
  );
}
