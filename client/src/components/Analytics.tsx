import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Google Analytics 4
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function Analytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page views on route change
    if (window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location,
      });
    }
  }, [location]);

  return null;
}

// Conversion tracking functions
export const trackConversion = {
  leadFormSubmitted: (data: { email: string; name: string; company: string }) => {
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'engagement',
        event_label: 'contact_form_submission',
        value: data,
      });
    }
  },

  emailCaptureCompleted: (data: { email: string; documentTitle: string }) => {
    if (window.gtag) {
      window.gtag('event', 'email_capture', {
        event_category: 'engagement',
        event_label: 'document_download_email',
        document_title: data.documentTitle,
      });
    }
  },

  calendlyOpened: (data: { source: string }) => {
    if (window.gtag) {
      window.gtag('event', 'calendly_opened', {
        event_category: 'engagement',
        event_label: 'calendly_link_clicked',
        source: data.source,
      });
    }
  },

  calendlyBooked: (data: { email: string; meetingType: string }) => {
    if (window.gtag) {
      window.gtag('event', 'calendly_booked', {
        event_category: 'conversion',
        event_label: 'meeting_scheduled',
        meeting_type: data.meetingType,
      });
    }
  },

  pdfViewed: (data: { documentTitle: string }) => {
    if (window.gtag) {
      window.gtag('event', 'pdf_view', {
        event_category: 'engagement',
        event_label: 'document_viewed',
        document_title: data.documentTitle,
      });
    }
  },
};

// LinkedIn Insight Tag
export function LinkedInInsightTag() {
  useEffect(() => {
    // LinkedIn Insight Tag script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      _linkedin_partner_id = "XXXXXX";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    `;
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.async = true;
    script2.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        alt=""
        src="https://px.ads.linkedin.com/collect/?pid=XXXXXX&fmt=gif"
      />
    </noscript>
  );
}

// Apollo.io Visitor Tracking
export function ApolloTracking() {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(){
        var t = document.createElement('script');
        t.type = 'text/javascript';
        t.async = true;
        t.src = 'https://apollo.io/track.js?key=YOUR_APOLLO_KEY';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(t, s);
      })();
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
