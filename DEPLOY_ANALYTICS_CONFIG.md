# Analytics Configuration - Ready to Deploy

**Quick deployment guide for adding your tracking IDs**

---

## Step 1: Get Your Tracking IDs

### Google Analytics 4 (GA4)
1. Go to https://analytics.google.com/
2. Create property → Copy **Measurement ID** (format: `G-XXXXXXXXXX`)

### Google Tag Manager (GTM)
1. Go to https://tagmanager.google.com/
2. Create container → Copy **Container ID** (format: `GTM-XXXXXXX`)

### LinkedIn Insight Tag
1. Go to https://www.linkedin.com/campaignmanager/
2. Account Assets → Insight Tag → Copy **Partner ID** (format: `1234567`)

### Apollo.io Tracking
1. Go to https://app.apollo.io/
2. Settings → Integrations → Website Visitor Tracking → Copy **Tracking ID**

---

## Step 2: Add Environment Variables

Add these to your production environment (Railway, Vercel, etc.):

```bash
# Replace with your actual IDs
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GTM_CONTAINER_ID=GTM-XXXXXXX
VITE_LINKEDIN_PARTNER_ID=1234567
VITE_APOLLO_TRACKING_ID=apollo_XXXXXXXXXXXX
```

---

## Step 3: Deploy

The analytics code is already integrated in:
- `client/index.html` (GTM script)
- `client/src/lib/analytics.ts` (tracking functions)
- All pages already call tracking functions

Just add the environment variables and redeploy!

---

## Step 4: Verify

After deployment:
1. Open your site
2. Check browser console for analytics initialization
3. Verify in GA4 Realtime report
4. Check GTM Preview mode

---

## Conversion Events Already Configured

These events are already being tracked:
- `lead_form_submit` - Contact form submissions
- `email_capture` - Email capture modal submissions
- `calendly_opened` - Calendly modal opened
- `calendly_booked` - Calendly meeting booked
- `pdf_download` - Document downloads

---

## GTM Container Setup (Optional)

If you want to configure GTM tags manually:

1. Log in to GTM
2. Add GA4 Configuration Tag:
   - Tag type: Google Analytics: GA4 Configuration
   - Measurement ID: Your GA4 ID
   - Trigger: All Pages

3. Add Event Tags for each conversion:
   - Tag type: Google Analytics: GA4 Event
   - Event name: `lead_form_submit`, `email_capture`, etc.
   - Trigger: Custom Event with same name

4. Publish container

---

## Already Implemented

✅ GTM script in `<head>` and `<body>`  
✅ GA4 tracking functions  
✅ LinkedIn Insight Tag  
✅ Apollo.io tracking  
✅ Conversion event tracking  
✅ Page view tracking  
✅ User interaction tracking  

**You only need to add the tracking IDs!**
