import { SimpleModal } from "./SimpleModal";
import { useEffect } from "react";

interface DownloadLimitReachedModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  documentTitle?: string;
}

export function DownloadLimitReachedModal({ 
  isOpen, 
  onClose, 
  email, 
  firstName, 
  lastName, 
  company,
  documentTitle 
}: DownloadLimitReachedModalProps) {
  // Build Calendly URL with pre-filled parameters
  const buildCalendlyUrl = () => {
    const baseUrl = "https://calendly.com/intelleges/demo";
    const params = new URLSearchParams();
    
    // Add user data as query parameters for Calendly pre-fill
    if (email) params.append('email', email);
    if (firstName) params.append('first_name', firstName);
    if (lastName) params.append('last_name', lastName);
    if (company) params.append('a1', company); // Custom question answer
    if (documentTitle) params.append('a2', `Requested: ${documentTitle}`); // Custom question answer
    
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };
  
  const calendlyUrl = buildCalendlyUrl();
  
  // Track modal appearance with GA4
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download_limit_reached', {
        event_category: 'engagement',
        event_label: documentTitle || 'unknown',
        user_email: email || 'unknown',
        user_company: company || 'unknown',
      });
      console.log('[Analytics] download_limit_reached event fired');
    }
  }, [isOpen, email, company, documentTitle]);

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#0A3A67]/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#0A3A67]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-light text-center mb-4 text-[#0A3A67]">
          Download Limit Reached
        </h2>

        {/* Message */}
        <p className="text-base text-gray-700 text-center mb-6 leading-relaxed">
          You've reached your download limit of <strong>3 documents</strong>.
        </p>

        <p className="text-base text-gray-700 text-center mb-8 leading-relaxed">
          To access more resources and discuss your compliance needs with our subject matter experts,
          please schedule a meeting with our team.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-6">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#0A3A67] text-white px-8 py-3 rounded-full font-medium text-base hover:bg-[#0A3A67]/90 transition-colors"
            onClick={() => {
              // Track Calendly click with GA4
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'calendly_click_from_limit_modal', {
                  event_category: 'conversion',
                  event_label: documentTitle || 'unknown',
                  user_email: email || 'unknown',
                  user_company: company || 'unknown',
                  calendly_url: calendlyUrl,
                });
                console.log('[Analytics] calendly_click_from_limit_modal event fired');
              }
            }}
          >
            Schedule a Meeting
          </a>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-600 text-center">
          Our team is ready to provide you with personalized guidance and additional resources
          tailored to your organization's needs.
        </p>

        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Close
          </button>
        </div>
      </div>
    </SimpleModal>
  );
}
