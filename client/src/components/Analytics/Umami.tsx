import { useEffect } from 'react';

export function UmamiAnalytics() {
  useEffect(() => {
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

    // Only inject script if both env vars are set
    if (endpoint && websiteId) {
      const script = document.createElement('script');
      script.defer = true;
      script.src = `${endpoint}/umami`;
      script.setAttribute('data-website-id', websiteId);
      document.body.appendChild(script);

      return () => {
        // Cleanup on unmount
        const existingScript = document.querySelector(`script[data-website-id="${websiteId}"]`);
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }
  }, []);

  return null;
}

