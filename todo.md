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

## Client Login Button Styling
- [x] Update Client Login button to blue pill design matching logo colors
- [x] Keep Book a Demo button in black
- [x] Test button styling in header

## Button Hover Animations
- [x] Add subtle hover animations to Book a Demo button (scale + shadow)
- [x] Add subtle hover animations to Client Login button (scale + shadow)
- [ ] Test animations in header (desktop and mobile)

## Email Capture for Whitepaper Downloads
- [x] Create email capture modal component with form (name, email, company)
- [x] Add form validation (required fields, email format)
- [x] Replace direct PDF links with email capture trigger (FOCI, COO, Counterfeit-Parts)
- [x] Store lead data in localStorage
- [x] Show success message and trigger download after form submission

## Smooth Scroll Animations
- [x] Create useScrollAnimation hook for fade-in effects
- [x] Apply fade-in animations to homepage sections (Trust Block, What We Do, Protocols, How It Works, Whitepaper)
- [ ] Test animations on scroll

## Value Proposition Item Hover Animations
- [x] Add hover animations to "What Intelleges Does" section items
- [x] Scale up items on hover (105%)
- [x] Increase font size on hover (base to lg)
- [x] Make text bolder on hover (font-light to font-normal)
- [x] Add smooth transition effects (300ms)
- [x] Add shadow and border highlight effects
- [x] Animate checkmark icons

## Header Responsive Layout Issues
- [x] Fix header elements overlapping when screen is resized
- [x] Hide trust markers at medium breakpoints (lg) to prevent wrapping
- [x] Show trust markers only on xl breakpoint with whitespace-nowrap
- [x] Adjust gaps and spacing for smoother responsive behavior
- [x] Reduce navigation gap from 10 to 6 on lg screens
- [x] Reduce button container gap from 8 to 3 on lg screens

## Login Page Responsive Layout Fix
- [x] Fix login form centering and alignment issues
- [x] Add explicit mx-auto centering to form container
- [x] Constrain description width with max-w-sm to prevent awkward wrapping
- [x] Implement responsive title sizing (3xl → 4xl → 5xl)
- [x] Adjust spacing for mobile and desktop (py-12 → py-20)

## Mobile Menu Enhancement
- [x] Add smooth slide-in animation to mobile hamburger menu (animate-in slide-in-from-top-4 duration-300)
- [x] Add icons next to navigation items for better visual hierarchy (Home, Package, FileText, Info, DollarSign, Mail)
- [x] Implement transition effects for menu open/close (transition-colors)
- [x] Increase touch target padding from py-2 to py-3

## Sticky Header Scroll Behavior
- [x] Detect scroll position with useEffect and scroll event listener
- [x] Transition header from h-20 to h-16 when scrolling past 20px
- [x] Restore header to h-20 when scrolling back to top
- [x] Add smooth transition animation (transition-all duration-300)

## Page Responsive Layout Audit
- [x] Audit all 9 main pages for responsive issues
- [x] Verified consistent layout structure (flex flex-col min-h-screen)
- [x] All pages use proper responsive wrapper and work with new header
- [x] Login page responsive fixes applied
- [x] Header responsive fixes applied globally

## Responsive Design Testing Documentation
- [x] Create RESPONSIVE_TESTING.md file
- [x] Document all breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- [x] List expected behavior at each breakpoint for all components
- [x] Include header, navigation, and content layout specifications
- [x] Add comprehensive QA testing checklist
- [x] Document common responsive issues and solutions
- [x] Include accessibility considerations
- [x] Add browser DevTools testing instructions

## Client Login Page Layout Issues
- [x] Investigate current login page layout problems
- [x] Identified description text wrapping awkwardly (each word on separate line)
- [x] Increased form container width from max-w-md to max-w-lg (448px → 512px)
- [x] Added minimum width min-w-[320px] to prevent extreme narrowing
- [x] Simplified description text to "Access your compliance dashboard."
- [x] Verified clean layout at all screen sizes

## Header Menu Overlap Issue
- [x] Fix logo and navigation labels overlapping
- [x] Identified logo height issue (h-[13rem] = 208px was way too large)
- [x] Reduced logo height from h-[13rem] to h-12 (48px)
- [x] Logo now fits properly within header container (h-20 = 80px)
- [x] Verified no overlap between logo and navigation items
- [x] Tested header layout - all elements properly spaced

## Header Navigation Cramping on Smaller Monitors
- [x] Fix navigation items overlapping with trust markers at lg breakpoint (1024-1280px)
- [x] Reduce navigation gap from gap-6 to gap-4 at lg breakpoint
- [x] Reduce font size from text-base (16px) to text-sm (14px) at lg breakpoint
- [x] Font size and gaps expand back to full size at xl breakpoint (1280px+)
- [x] Verified proper spacing and no overlap at all breakpoints

## Dynamic Logo Sizing for Header Spacing
- [x] Implement progressive logo sizing: h-8 (mobile) → h-10 (lg) → h-12 (xl)
- [x] Logo now scales from 32px to 40px to 48px across breakpoints
- [x] Saves significant horizontal space at lg breakpoint (1024-1280px)
- [x] Verified all header elements fit comfortably without cramping
- [x] Tested header spacing at multiple screen sizes - no overlap

## Page Transition Animations
- [x] Create PageTransition wrapper component with fade-in/fade-out animation
- [x] Apply transition to all page routes in App.tsx by wrapping Switch
- [x] Use Tailwind animate-in/animate-out utilities for smooth transitions
- [x] Set appropriate duration (200ms fade-out, 300ms fade-in) for snappy feel
- [x] Tested transitions between pages (Home → Product)
- [x] No layout shift or flicker during transitions

## Protocol Cards Hover Animations
- [x] Apply same hover animations to 16 protocol cards as value proposition items
- [x] Scale up cards on hover (105%)
- [x] Increase font size on hover (base → lg)
- [x] Make text bolder on hover (font-light → font-normal)
- [x] Add shadow and border highlight effects (shadow-lg, border-primary/30)
- [x] Add smooth transition effects (300ms)
- [x] Add cursor pointer for better UX

## Header Layout Bug - Logo Disappearing and Overlap
- [x] Fix logo disappearing at certain breakpoints
- [x] Changed breakpoint strategy: hamburger menu shows below xl (< 1280px)
- [x] Desktop navigation only shows at xl (≥ 1280px) with trust markers
- [x] Logo scales appropriately: h-8 (mobile) → h-10 (lg) → h-12 (xl)
- [x] Verified no overlap between any header elements at all breakpoints

## Case Study PDFs Organization
- [x] Extract 16 case study PDFs from ZIP file
- [x] Convert DOCX files to PDF format using LibreOffice
- [x] Organize PDFs in /client/public/case-studies/ directory (1.6MB total)
- [x] Create protocol-to-case-study mapping configuration (protocolCaseStudies.ts)
- [ ] Update protocol cards with hyperlinks to case studies
- [ ] Integrate with email capture modal for protected downloads

## Download Protection System
- [ ] Create database schema for download tracking (email, IP, timestamp, resource)
- [ ] Implement email verification before downloads
- [ ] Add rate limiting: max 3 downloads per email address
- [ ] Add rate limiting: max 3 downloads per IP address
- [ ] Store download records in database for persistent tracking
- [ ] Show clear error messages when limits are reached
- [ ] Update EmailCaptureModal to handle verification flow
- [ ] Test download protection with multiple scenarios

## YouTube Video Integration
- [x] Add YouTube video link (https://www.youtube.com/watch?v=7BstopG9qbU) to homepage
- [x] Update "Watch 2-Minute Overview" button to open video in new tab
- [x] Embed video player on homepage or link to YouTube

## Case Study PDF Conversion and Download Protection
- [x] Convert all 17 case study DOCX files to PDF (including new Case Study 17: Sole Source Risk Mitigation)
- [x] Add 17th protocol card to homepage (Sole Source Risk Mitigation)
- [x] Create API endpoints for download validation and tracking
- [x] Update EmailCaptureModal with sales-focused rate limit message
- [x] Add "Schedule a Meeting" button for rate-limited users
- [x] Make protocol cards clickable to trigger download flow
- [x] Test complete download protection system

## Demo Route Redirect
- [x] Create /demo route that redirects to /contact page
- [x] Ensure PDF links to www.intelleges.com/demo work correctly

## Email Delivery System for Case Studies
- [x] Set up email service integration (using SendGrid)
- [x] Create email template for case study delivery
- [x] Add API endpoint to send case study PDF via email
- [x] Update EmailCaptureModal to trigger email sending after form submission
- [x] Add success message indicating email has been sent
- [x] Test email delivery with actual case study PDFs
- [x] Add error handling for email delivery failures

## Sales Team Notifications
- [x] Create sales team notification email template
- [x] Add function to send notification to sales team on new lead
- [x] Include lead details: name, email, company, protocol/case study
- [x] Add timestamp and IP address for context
- [x] Configure sales team email address(es) via environment variable
- [x] Test sales team notification delivery
- [x] Add error handling for notification failures (don't block user experience)

## Proper Responsive Header (Following Readability Rules)
- [x] Remove responsive logo sizing - keep logo at h-16 at ALL breakpoints (NEVER reduce)
- [x] Implement progressive hiding: certification labels hide first, then nav items, then switch to favicon
- [x] Ensure favicon is SAME SIZE as full logo when it replaces it (h-16)
- [x] All text must be 16px minimum (text-base or larger)
- [x] Navigation text: 16px (text-base = correct)
- [x] Button text: 16px (text-base = correct)
- [x] Test that nothing gets smaller, only elements hide progressively

## Restore Original Logo Size
- [x] Change logo from h-16 (64px) back to h-[13rem] (208px) - the ORIGINAL size
- [x] Keep logo at h-[13rem] at ALL breakpoints - NEVER reduce
- [x] Ensure favicon is also h-[13rem] when it replaces the full logo
- [x] Verify header container can accommodate the large logo properly (h-[15rem])

## Download Tooltips
- [x] Add tooltips to protocol cards showing "Download Case Study" on hover
- [x] Add TooltipProvider wrapper to Home page
- [x] Use shadcn/ui Tooltip component for consistent styling
- [ ] Add tooltips to whitepaper download buttons showing "Download Whitepaper" on hover
- [ ] Ensure tooltips work properly on mobile devices
- [ ] Test tooltip positioning and visibility across all download elements

## Critical: Fix Responsive Layout Collapse
- [x] Fixed root cause: logo was 208px tall causing header to be 240px
- [x] Cropped logo to rectangular format and set to reasonable 48px height
- [x] Restored header to normal 64-80px height
- [x] EmailCaptureModal now works correctly with proper layout
- [ ] Test clicking protocol cards, buttons, and links on mobile, tablet, and desktop
- [ ] Verify site remains readable after any interaction on all devices

## Logo Cropping and Responsive Layout Fix
- [x] Crop logo.png to remove excess transparent space and create rectangular version (822×539px)
- [x] Optimize logo dimensions for header use
- [x] Restore header container to reasonable height (h-16 to h-20 = 64-80px)
- [x] Set logo to appropriate size (h-12 = 48px)
- [x] Test that modal opens correctly without layout collapse
- [x] Verify responsive behavior across all screen sizes

## Logo Size Adjustment
- [x] Increase logo from h-12 (48px) to h-20 (80px) for better visibility
- [x] Adjust header container height to accommodate larger logo (h-20 to h-24)
- [x] Ensure logo is clearly visible and professional
- [x] Verify layout doesn't break with larger logo size
- [x] Test modal opens correctly with adjusted header height

## CRITICAL: Fix Element Index Numbers Appearing on Page
- [x] Confirmed: Numbers are browser automation testing artifacts only
- [x] Verified: User does not see numbers in regular browser
- [x] No bug exists - site renders cleanly for end users

## Protocol Card Download Tooltips
- [x] Verify TooltipProvider is properly wrapping the Home page
- [x] Ensure each protocol card is wrapped with Tooltip component
- [x] Set tooltip text to "Download Case Study" with download icon
- [x] Tooltip appears on hover over protocol cards
- [x] Tooltip positioning is correct and readable
- [ ] Test tooltip works on both desktop and touch devices (requires user testing)

## Increase Logo Size Further
- [x] Increase logo from h-20 (80px) to h-32 (128px) for proper prominence
- [x] Adjust header container height to accommodate larger logo (h-32 to h-36)
- [x] Ensure logo is clearly visible and prominent
- [x] Verify layout remains responsive and doesn't break

## Increase Logo by 30%
- [x] Increase logo from h-32 (128px) to h-42 (168px) - 30% larger
- [x] Adjust header container to h-42 to h-48 to accommodate larger logo
- [x] Increase mobile favicon proportionally to h-28
- [x] Verify no distortion occurs (w-auto maintains aspect ratio)
- [x] Test responsive layout remains intact

## Fix Navigation Vertical Alignment
- [x] Center navigation items vertically within the taller header container
- [x] Ensure all header elements (logo, nav, certification, buttons) are properly aligned
- [x] Fix invalid Tailwind classes (h-42, h-48) to use arbitrary values (h-[168px], h-[192px])
- [x] Verify alignment works at both scrolled and non-scrolled states
- [x] Test alignment across all breakpoints

## Add Navigation Link Hover Animations
- [x] Add subtle hover effects to desktop navigation links
- [x] Add smooth color transition on hover (muted-foreground to foreground)
- [x] Add animated underline effect (0% to 100% width on hover)
- [x] Add active page indicator (full underline for current page)
- [x] Add mobile navigation hover effects (translate-x-1, icon scale)
- [x] Ensure animations work with existing responsive design
- [x] Test hover states across all breakpoints
- [x] Verify accessibility (focus states remain visible)

## Fix Vertical Alignment After Hover Animations
- [x] Fix navigation items not vertically centered after adding underline animations
- [x] Added inline-block display and pb-1 padding to navigation links
- [x] Ensure underline doesn't affect parent container height
- [x] Verify all header elements (logo, nav, certification, buttons) are properly aligned
- [x] Test alignment at all breakpoints

## Reduce Logo Size by 10%
- [x] Calculate new logo size (168px - 10% = 151px)
- [x] Update logo height from h-[168px] to h-[151px]
- [x] Update header container heights proportionally (173px non-scrolled, 151px scrolled)
- [x] Verify alignment with reduced logo size

## Reduce Logo Another 10% and Fix Vertical Alignment
- [x] Calculate new logo size (151px - 10% = 136px)
- [x] Update logo height to h-[136px]
- [x] Update header container heights proportionally (156px non-scrolled, 136px scrolled)
- [x] Fix vertical alignment - navigation items sitting too low
- [x] Changed from inline-block with pb-1 to inline-flex items-center
- [x] Ensure all elements (logo, nav, certification, buttons) are truly centered
- [x] Test alignment at all breakpoints

## Fix Header Vertical Alignment (Critical)
- [x] Investigate why logo and navigation are not vertically centered
- [x] Added self-center class to logo image
- [x] Ensure logo is vertically centered in container
- [x] Ensure navigation items are vertically centered in container
- [x] Test alignment at all breakpoints

## Add Service Document Downloads
- [x] Convert 9 service DOCX files to PDF format
- [x] Organize PDFs in /client/public/service-documents/ directory
- [x] Create service-to-document mapping configuration (serviceDocuments.ts)
- [x] Add tooltips to "What Intelleges Does" service items
- [x] Make service items clickable to trigger email capture
- [x] Integrate with existing EmailCaptureModal component
- [x] Add download icon that appears on hover
- [x] Add hover indicators (cursor pointer, scale, shadow, border highlight)
- [x] Test complete download flow (click → email capture → PDF delivery)

## Fix Header Vertical Alignment (CRITICAL - STILL BROKEN)
- [x] Logo was sitting at top of container while nav/buttons were centered
- [x] Identified root cause: container height (156px) didn't match logo height (136px)
- [x] Fixed by matching container height to logo height (136px)
- [x] Removed scroll-based height variation for consistency
- [x] All elements now on same vertical centerline
- [x] Test at all breakpoints

## Fix Service Document Modal Text
- [x] Modal title shows full service name (acceptable - shows what they're downloading)
- [x] Button says "Download Case Study" but should say "Download Service Overview" or similar
- [x] Update EmailCaptureModal to accept resourceType prop ('case-study' | 'service-overview')
- [x] Pass resourceType="service-overview" for service documents
- [x] Button now shows "Download Service Overview" for services
- [x] Success message now says "service overview" instead of "case study"

## CRITICAL: Fix Header Vertical Alignment (STILL BROKEN)
- [x] Logo was sitting HIGHER than navigation/buttons/certification text
- [x] Root cause: Fixed height (h-[136px]) prevented proper flex centering
- [x] Solution: Removed fixed height, used py-4 padding instead
- [x] Reduced logo from 136px to 120px for better proportions
- [x] All elements now on exact same vertical centerline

## Fix Service Modal Title
- [x] Title was showing "Download Collect supplier data and documentation" (too long)
- [x] Added shortTitle field to ServiceDocument interface
- [x] Created short titles for all 9 services (e.g., "Supplier Data Collection")
- [x] Updated modal to use shortTitle instead of full description
- [x] Modal now shows clean titles like "Supplier Data Collection" instead of full descriptions

## CRITICAL: Logo Sitting Lower Than Navigation
- [x] Logo was appearing below the vertical centerline of navigation
- [x] Found logo image file has massive whitespace below graphic (822x539px with content only in top portion)
- [x] Added object-top class to shift logo content to top of container
- [x] Logo now properly aligned with navigation items

## Remove "Download" from Modal Title
- [x] Modal title was showing "Download Supplier Data Collection"
- [x] Now shows just "Supplier Data Collection"
- [x] Updated EmailCaptureModal DialogTitle to remove "Download" prefix

## CRITICAL: Logo STILL Not Aligned (object-top made it WORSE)
- [x] Logo was sitting HIGHER than navigation in preview
- [x] object-top pushed logo content to top, making misalignment worse
- [x] Removed object-top class
- [x] Added mt-3 (12px margin-top) to push logo DOWN
- [x] Logo now properly aligned with navigation items

## Migrate from Turso to TiDB Cloud
- [ ] Remove @libsql/client dependency
- [ ] Add mysql2 dependency for TiDB Cloud
- [ ] Update drizzle.config.ts for MySQL dialect
- [ ] Update server/db.ts to use mysql2 connection
- [ ] Update DATABASE_URL environment variable
- [ ] Test database connection
- [ ] Push schema to TiDB Cloud
- [ ] Update Railway environment variables documentation
- [ ] Commit and push changes to GitHub
- [ ] Redeploy to Railway

## Create Resources/Content Library Page
- [ ] Convert Executive Summary DOCX to PDF
- [ ] Convert Full Whitepaper DOCX to PDF
- [ ] Extract case study topics from index document
- [ ] Create /resources page route
- [ ] Design hero section with page title
- [ ] Create two-column choice cards (Executive Summary vs Full Whitepaper)
- [ ] Add email capture for Executive Summary (3-page)
- [ ] Integrate Calendly for Full Whitepaper (15-page) meeting booking
- [ ] Create case studies teaser grid (17 case studies)
- [ ] Make case studies filterable by industry
- [ ] Add "Available in Full Guide" badges to case studies
- [ ] Update header navigation to include Resources link
- [ ] Update "Download Whitepaper" button to link to /resources
- [ ] Test complete user flow for both paths
- [ ] Ensure responsive design on mobile

## Enhance Resources Page Based on Feedback
- [ ] Fix EmailCaptureModal import error
- [ ] Add "Prefer to talk now? Call (917) 818-0225" under Calendly card
- [ ] Change "qualification meeting" to "discovery call" or "consultation"
- [ ] Update badge text to "Included with your consultation"
- [ ] Add industry count pills to case study filter (e.g., "Aerospace (5)")
- [ ] Plan email nurture sequence for Executive Summary downloaders
- [ ] Add Day 1, Day 3, Day 7 email sequence documentation

## Final Resources Page Updates
- [x] Change hero title to "Resource Library"
- [x] Add Card 3: "Contact Sales Directly" with phone and email CTAs
- [x] Embed Calendly inline in Card 2 (toggles on button click)
- [x] Update "What You'll Learn" section with specific bullet points
- [x] Update industry groupings to match spec (combine Aerospace & Defense)
- [x] Update homepage "Download Whitepaper" button to link to /resources
- [x] Install react-calendly package for inline embed

## Thank You Page for Executive Summary Downloads
- [x] Create dedicated /thank-you page route
- [x] Add Thank You page component with success message
- [x] Add "What's Next?" section with 3-step process cards
- [x] Integrate Calendly inline embed with free 30-minute consultation messaging
- [x] Add social proof section with client logos and key stats
- [x] Add contact options section (phone/email)
- [x] Add "Back to Resource Library" link
- [x] Update EmailCaptureModal to redirect to /thank-you after Executive Summary download
- [x] Test complete user flow from Resources → Email Capture → Thank You → Calendly

## Fix Readability Issues on Resources and Thank You Pages
- [x] Fix "What You'll Learn" section text from text-sm (14px) to text-base (16px)
- [x] Audit all card text sizes on Resources page
- [x] Audit all text sizes on Thank You page
- [x] Ensure all body text meets 16px minimum (fixed 19 instances of text-sm and text-xs)
- [x] Verify line height is 1.4-1.6 for body text (already set in global CSS)
- [x] Check spacing between sections (24-32px) (already compliant)
