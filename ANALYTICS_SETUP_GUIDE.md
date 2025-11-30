# Analytics Infrastructure Setup Guide

## Overview
This guide documents the analytics infrastructure for the Intelleges marketing website, including Google Analytics 4, Google Tag Manager, LinkedIn Insight Tag, and Apollo.io visitor tracking.

---

## 1. Google Analytics 4 (GA4)

### Setup Instructions

1. **Create GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create new property: "Intelleges Marketing Website"
   - Get Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add to `client/index.html`**

Add this code in the `<head>` section BEFORE the closing `</head>` tag:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

3. **Replace Placeholder**
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID

---

## 2. Google Tag Manager (GTM)

### Setup Instructions

1. **Create GTM Container**
   - Go to [Google Tag Manager](https://tagmanager.google.com)
   - Create new container: "Intelleges Website"
   - Container type: Web
   - Get Container ID (format: `GTM-XXXXXXX`)

2. **Add to `client/index.html`**

**In `<head>` section (as high as possible):**

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

**Immediately after opening `<body>` tag:**

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

3. **Configure GTM Tags**

Create these tags in GTM:

**Tag 1: GA4 Configuration**
- Type: Google Analytics: GA4 Configuration
- Measurement ID: `G-XXXXXXXXXX`
- Trigger: All Pages

**Tag 2: Lead Form Submission**
- Type: Google Analytics: GA4 Event
- Event Name: `generate_lead`
- Trigger: Custom Event - `leadFormSubmitted`

**Tag 3: Email Capture**
- Type: Google Analytics: GA4 Event
- Event Name: `email_capture`
- Trigger: Custom Event - `emailCaptureCompleted`

**Tag 4: Calendly Opened**
- Type: Google Analytics: GA4 Event
- Event Name: `calendly_opened`
- Trigger: Custom Event - `calendlyOpened`

**Tag 5: Calendly Booked**
- Type: Google Analytics: GA4 Event
- Event Name: `calendly_booked`
- Trigger: Custom Event - `calendlyBooked`

**Tag 6: PDF Viewed**
- Type: Google Analytics: GA4 Event
- Event Name: `pdf_view`
- Trigger: Custom Event - `pdfViewed`

---

## 3. LinkedIn Insight Tag

### Setup Instructions

1. **Get LinkedIn Partner ID**
   - Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager)
   - Navigate to Account Assets → Insight Tag
   - Copy your Partner ID (6-digit number)

2. **Add to `client/index.html`**

Add this code before the closing `</head>` tag:

```html
<!-- LinkedIn Insight Tag -->
<script type="text/javascript">
_linkedin_partner_id = "XXXXXX";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script><script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=XXXXXX&fmt=gif" />
</noscript>
<!-- End LinkedIn Insight Tag -->
```

3. **Replace Placeholder**
   - Replace `XXXXXX` with your actual Partner ID

---

## 4. Apollo.io Visitor Tracking

### Setup Instructions

1. **Get Apollo Tracking Key**
   - Log in to [Apollo.io](https://apollo.io)
   - Navigate to Settings → Integrations → Website Tracking
   - Copy your tracking key

2. **Add to `client/index.html`**

Add this code before the closing `</body>` tag:

```html
<!-- Apollo.io Visitor Tracking -->
<script>
(function(){
  var t = document.createElement('script');
  t.type = 'text/javascript';
  t.async = true;
  t.src = 'https://apollo.io/track.js?key=YOUR_APOLLO_KEY';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(t, s);
})();
</script>
<!-- End Apollo.io Tracking -->
```

3. **Replace Placeholder**
   - Replace `YOUR_APOLLO_KEY` with your actual Apollo tracking key

---

## 5. Conversion Goals Setup

### GA4 Conversion Events

Configure these as conversions in GA4:

1. **generate_lead**
   - Event: `generate_lead`
   - Description: User submits contact form
   - Value: High

2. **email_capture**
   - Event: `email_capture`
   - Description: User provides email for document download
   - Value: Medium

3. **calendly_opened**
   - Event: `calendly_opened`
   - Description: User clicks Calendly link
   - Value: Medium

4. **calendly_booked**
   - Event: `calendly_booked`
   - Description: User schedules meeting via Calendly
   - Value: Very High

5. **pdf_view**
   - Event: `pdf_view`
   - Description: User views/downloads PDF document
   - Value: Low

### How to Mark as Conversions

1. Go to GA4 → Admin → Events
2. Find each event in the list
3. Toggle "Mark as conversion"

---

## 6. Implementation in Code

### Using Conversion Tracking

Import and use the tracking functions in your components:

```typescript
import { trackConversion } from '@/components/Analytics';

// Example: Track contact form submission
trackConversion.leadFormSubmitted({
  email: 'user@example.com',
  name: 'John Doe',
  company: 'Acme Corp'
});

// Example: Track email capture
trackConversion.emailCaptureCompleted({
  email: 'user@example.com',
  documentTitle: 'CMMC Compliance Guide'
});

// Example: Track Calendly opened
trackConversion.calendlyOpened({
  source: 'case_study_cta'
});

// Example: Track Calendly booking
trackConversion.calendlyBooked({
  email: 'user@example.com',
  meetingType: 'discovery_call'
});

// Example: Track PDF view
trackConversion.pdfViewed({
  documentTitle: 'Buy American Compliance Service'
});
```

### Add Analytics to App.tsx

```typescript
import { Analytics, LinkedInInsightTag, ApolloTracking } from '@/components/Analytics';

function App() {
  return (
    <>
      <Analytics />
      <LinkedInInsightTag />
      <ApolloTracking />
      {/* Rest of your app */}
    </>
  );
}
```

---

## 7. Testing Analytics

### Test in Development

1. **Install Google Tag Assistant**
   - Chrome Extension: [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)

2. **Enable Debug Mode**
   ```javascript
   gtag('config', 'G-XXXXXXXXXX', {
     debug_mode: true
   });
   ```

3. **Check Real-Time Reports**
   - GA4 → Reports → Realtime
   - Should see your test events appear within seconds

### Test Conversions

1. Submit contact form → Check for `generate_lead` event
2. Download document → Check for `email_capture` event
3. Click Calendly link → Check for `calendly_opened` event
4. Complete Calendly booking → Check for `calendly_booked` event
5. View PDF → Check for `pdf_view` event

---

## 8. Privacy & Compliance

### GDPR Compliance

Add cookie consent banner (recommended: [CookieYes](https://www.cookieyes.com/))

### Privacy Policy

Update privacy policy to include:
- Google Analytics data collection
- LinkedIn Insight Tag
- Apollo.io tracking
- Cookie usage
- User rights (opt-out, data deletion)

---

## 9. Monitoring & Reporting

### Key Metrics to Track

1. **Traffic Metrics**
   - Page views
   - Unique visitors
   - Bounce rate
   - Session duration

2. **Engagement Metrics**
   - Email captures per page
   - Document downloads
   - Calendly link clicks
   - Form submissions

3. **Conversion Metrics**
   - Lead form conversion rate
   - Email capture rate
   - Calendly booking rate
   - Cost per lead (if running ads)

### Recommended Dashboards

1. **Overview Dashboard**
   - Total visitors
   - Total conversions
   - Conversion rate
   - Top pages

2. **Lead Generation Dashboard**
   - Contact form submissions
   - Email captures
   - Calendly bookings
   - Lead sources

3. **Content Performance Dashboard**
   - Most downloaded documents
   - Most viewed pages
   - Time on page
   - Exit rates

---

## 10. Troubleshooting

### Common Issues

**Issue: Events not firing**
- Check browser console for errors
- Verify `window.gtag` is defined
- Check GTM preview mode

**Issue: Duplicate events**
- Ensure GTM and direct GA4 aren't both installed
- Check for multiple tracking codes

**Issue: LinkedIn tag not working**
- Verify Partner ID is correct
- Check browser ad blockers
- Use LinkedIn Tag Helper extension

---

## Summary Checklist

- [ ] Create GA4 property and get Measurement ID
- [ ] Create GTM container and get Container ID
- [ ] Add GA4 script to `client/index.html`
- [ ] Add GTM scripts to `client/index.html`
- [ ] Configure GTM tags for all conversion events
- [ ] Get LinkedIn Partner ID and add Insight Tag
- [ ] Get Apollo tracking key and add script
- [ ] Import Analytics components in App.tsx
- [ ] Add conversion tracking calls in relevant components
- [ ] Mark events as conversions in GA4
- [ ] Test all conversion events
- [ ] Set up real-time monitoring
- [ ] Create dashboards for key metrics
- [ ] Update privacy policy
- [ ] Add cookie consent banner

---

**Last Updated:** November 30, 2025
