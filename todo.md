# Project TODO

## Completed Features
- [x] Simplified homepage with 5-step process infographic as hero content
- [x] Updated headline: "Intelleges makes data & document collection simple. Easy. A no-brainer."
- [x] Updated subheadline emphasizing automatic information collection
- [x] Minimal navigation with Home, Pricing, Contact, and Client Login
- [x] Trust markers in header (ISO 27001 Certified, Battelle Supplier of the Year)
- [x] Logo sized at h-[13rem] for visibility
- [x] Simplified footer with essential links only
- [x] Simplified Pricing page with two tiers (Starter and Enterprise)
- [x] Contact page with Calendly integration
- [x] Scandinavian/Japanese minimal design aesthetic maintained
- [x] "Book a Demo" CTA button throughout site
- [x] "Watch 2-Minute Overview" secondary CTA on homepage

## Future Enhancements
- [ ] Add video content for "Watch 2-Minute Overview" button
- [ ] Additional case studies or testimonials (if needed)
- [ ] Blog or resources section (if needed)

## New Features - Client Login Page
- [x] Create branded client login page matching marketing site aesthetic
- [x] Implement authentication with john@intelleges.com / 012463.xX
- [x] Add reCAPTCHA integration for security
- [x] Add Cloudflare verification notice
- [x] Redirect to Railway dashboard after successful login
- [x] Update navigation to link to new login page
- [x] Add SSO buttons for Google, Microsoft, and Okta
- [x] Add dark blue gradient background matching mockup
- [x] Add "Supplier Help" and "Contact Support" links

## Login Page Redesign
- [x] Redesign login page to match homepage minimal aesthetic
- [x] Remove duplicate logo (keep only header logo)
- [x] Use light background matching homepage
- [x] Simplify to text-focused design
- [x] Maintain Scandinavian/Japanese minimal style

## Logo Consistency Fixes
- [x] Remove logo from footer completely
- [x] Ensure logo size is h-[13rem] consistently across all pages

## Homepage Rebuild with New Content
- [x] Rebuild hero section with updated messaging
- [x] Add Trust Block section (25 years of expertise)
- [x] Add What Intelleges Does section (value props)
- [x] Add Protocols section (Intelleges wheel)
- [x] Add How Intelleges Works section (6-step process)
- [x] Add Whitepaper CTA section
- [x] Maintain Scandinavian/Japanese minimal aesthetic

## New Pages Creation
- [x] Create Protocols page with detailed protocol categories
- [x] Create About page with 25 years history and mission
- [x] Create Product page with platform capabilities
- [x] Create Supplier Onboarding page with supplier experience
- [x] Update navigation to include new pages
- [x] Update footer with expanded navigation structure

## Client Logo Showcase
- [x] Search for client company logos
- [x] Add logo grid to Trust Block section on homepage
- [x] Ensure logos are grayscale/minimal to match aesthetic

## Interactive Protocol Demos
- [x] Create protocol demo component with modal/dialog
- [x] Add sample Annual Reps & Certs questionnaire flow
- [x] Add sample ITAR/EAR compliance questionnaire
- [x] Add sample ESG questionnaire
- [x] Show validation rules and required fields
- [x] Display PDF output preview
- [x] Add interactive elements (form fields, skip logic demo)

## Pricing Page Update
- [x] Rebuild pricing page with 4-tier structure (Bronze, Silver, Gold, Platinum)
- [x] Add comprehensive comparison table
- [x] Add FAQ section for plan selection
- [x] Add comprehensive Add-Ons Library (10 categories)
- [x] Maintain minimal aesthetic

## Readability & Accessibility Implementation
- [x] Update global CSS with minimum font sizes (17-18px body, 28-32px section headers, 40-48px page titles)
- [x] Set proper line height (1.5-1.6 for body, 1.15-1.25 for headings)
- [x] Ensure max content width of 700px for readable line length
- [x] Update color system with WCAG-compliant colors (#0A3A67 primary, #111/#222 text)
- [x] Fix text contrast to meet 4.5:1 minimum ratio
- [x] Update all button sizes to 44px minimum height with 17px text
- [x] Add proper spacing (32px above headers, 16px below, 24px between sections)
- [x] Fix all pages for 16px minimum text (Home, Footer)
- [x] Fix header and footer text sizes to 16px minimum
- [ ] Review and ensure short paragraphs (3-5 lines max) across all pages

## Tailwind Config & CSS Variables System
- [x] Create comprehensive CSS variables enforcing readability rules
- [x] Add custom font size scale (16px, 17px, 22px, 28px, 40px, 48px)
- [x] Add custom spacing scale (8px, 16px, 24px, 32px, 48px, 64px)
- [x] Add WCAG-compliant color variables
- [x] Set minimum button height to 44px
- [x] Add max-width utilities for readable content (700px)
- [x] Fix Pricing page for 16px minimum font size
- [x] Fix Protocols page for 16px minimum font size (already compliant)
- [x] Fix About page for 16px minimum font size (already compliant)
- [x] Fix Product page for 16px minimum font size (already compliant)
- [x] Fix Login page for 16px minimum font size
- [x] Fix SupplierOnboarding page (already compliant)

## Trust Marker Styling
- [x] Update header trust markers to use Intelleges blue color for emphasis

## Contact Form Development
- [x] Create Contact page with demo request form
- [x] Add form fields (name, email, company, phone, message)
- [x] Implement client-side validation
- [x] Add accessibility labels and ARIA attributes
- [x] Add success/error states
- [x] Integrated with existing Calendly widget (two-tab interface)
- [ ] Connect form to backend or email service (TODO: API endpoint needed)
- [ ] Update "Book a Demo" buttons to link to /contact

## Client Logo Sizing Fix
- [x] Increase client logos to match Intelleges logo size (h-[13rem])
- [x] Arrange all logos on one line with flexbox
- [x] Reduced to 4 logos (Honeywell, Battelle, Celestica, BD) for better fit

## Client Logo Size Adjustment
- [x] Verify Intelleges logo size in header (h-[13rem])
- [x] Adjusted client logos to h-16 for proper proportion
- [x] Ensure all logos fit on one horizontal line

## Client Logo Carousel & CTA Improvements
- [x] Search for and add more client logos (DOD, Con Edison, MSK)
- [x] Create animated auto-scrolling carousel for client logos
- [x] Link all "Book a Demo" buttons to /contact page (already linked)
- [x] Make trust markers bolder and more prominent in header

## Logo Carousel Pause-on-Hover
- [x] Add pause-on-hover functionality to logo carousel
- [x] Resume animation when mouse leaves

## Case Study Pages
- [x] Create Honeywell Aerospace case study page (Reference/Shadow system)
- [x] Create Battelle case study page (Microchip sourcing)
- [x] Create DOD case study page (zCode CMMC implementation)
- [x] Update Case Studies index page with real client stories
- [x] Add routes for case study pages in App.tsx

## Scroll Animations
- [ ] Create scroll animation component/hook
- [ ] Add fade-in animations to homepage sections
- [ ] Add slide-up animations for key content blocks
- [ ] Implement intersection observer for performance

## Logo Click-Through Links
- [x] Make client logos in carousel clickable
- [x] Link logos to their respective case study pages
- [x] Add hover effects to indicate clickability

## FOCI Case Study
- [x] Create FOCI case study page showcasing integrated verification system
- [x] Add FOCI case study to Case Studies index page (featured first)
- [x] Add route for FOCI case study in App.tsx

## Federal Capability Statement Download
- [x] Copy PDF to public directory
- [x] Add download button to FOCI case study page
- [x] Test download functionality

## Additional Case Studies
- [x] Create COO Compliance case study page (Part-Number Level Traceability)
- [x] Create Counterfeit-Parts Standards case study page (Unified Questionnaire System)
- [x] Add both case studies to Case Studies index page
- [x] Add routes for new case studies in App.tsx
- [x] Add Counterfeit Parts whitepaper PDF download to case study page

## COO Compliance Whitepaper Download
- [x] Copy COO whitepaper PDF to public documents directory
- [x] Add download button to COO Compliance case study page
- [x] Test download functionality
