import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Google Analytics Measurement ID
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function GoogleAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Only load in production
    if (import.meta.env.DEV || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location,
    });

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll(`script[src*="googletagmanager"]`);
      scripts.forEach(script => script.remove());
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location,
      });
    }
  }, [location]);

  return null;
}

export default GoogleAnalytics;
