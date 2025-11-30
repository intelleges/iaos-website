import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  keywords?: string;
  schema?: 'organization' | 'product' | 'breadcrumbs';
}

export default function SEO({ 
  title, 
  description, 
  canonical,
  ogImage = "https://intelleges.com/og-image.jpg",
  type = 'website',
  keywords,
  schema
}: SEOProps) {
  const siteTitle = "Intelleges - Federal Compliance Management System";
  const fullTitle = title === "Home" ? siteTitle : `${title} | Intelleges`;
  const siteUrl = "https://intelleges.com";
  const currentUrl = canonical || siteUrl;

  // Organization Schema (for all pages)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Intelleges",
    "url": siteUrl,
    "logo": `${siteUrl}/logos/intelleges-logo.svg`,
    "description": "Enterprise compliance automation platform for aerospace, defense, and regulated industries.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-917-818-0225",
      "contactType": "Sales",
      "email": "info@intelleges.com"
    },
    "sameAs": [
      "https://www.linkedin.com/company/intelleges"
    ]
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Intelleges",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Product Schema (for product pages)
  const productSchema = schema === 'product' ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Intelleges Federal Compliance Management System",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "127"
    },
    "operatingSystem": "Web-based"
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Intelleges" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@intelleges" />
      <meta name="twitter:creator" content="@intelleges" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Intelleges" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data - Organization (Always Include) */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* Structured Data - Product (Conditional) */}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
    </Helmet>
  );
}
