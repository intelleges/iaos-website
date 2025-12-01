# Google Sheets Integration Setup Guide
**Intelleges Marketing Website**  
**Version:** 1.0  
**Last Updated:** November 30, 2025

---

## Overview

This guide explains how to set up automatic synchronization of lead capture data to Google Sheets. Every time a user downloads a document from the website, their information is automatically written to a Google Sheet in real-time.

**What Gets Synced:**
- Email address
- First name
- Last name
- Company name
- Phone number
- Document title downloaded
- Document type (capability, protocol, whitepaper, case_study)
- Download date and time
- Download count (1, 2, or 3)

**Benefits:**
- ✅ Easy access to lead data without database queries
- ✅ Share with sales team via Google Sheets permissions
- ✅ Export to CSV for CRM import
- ✅ Create charts and pivot tables for reporting
- ✅ Real-time updates as leads come in
- ✅ No manual data entry required

---

## Prerequisites

- Google account with access to Google Cloud Console
- Access to the Intelleges marketing website server environment variables
- Basic understanding of service accounts and API authentication

---

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **Select a project** → **New Project**
3. Enter project name: **Intelleges Lead Tracking**
4. Click **Create**
5. Wait for project creation (30 seconds)

---

## Step 2: Enable Google Sheets API

1. In Google Cloud Console, select your new project
2. Navigate to **APIs & Services** → **Library**
3. Search for **Google Sheets API**
4. Click **Google Sheets API** in results
5. Click **Enable** button
6. Wait for API to be enabled (10 seconds)

---

## Step 3: Create Service Account

A service account is a special Google account that your application uses to access Google Sheets on your behalf.

1. Navigate to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in service account details:
   - **Service account name:** intelleges-sheets-sync
   - **Service account ID:** intelleges-sheets-sync (auto-filled)
   - **Description:** Syncs lead data to Google Sheets
4. Click **Create and Continue**
5. Skip **Grant this service account access to project** (click Continue)
6. Skip **Grant users access to this service account** (click Done)

---

## Step 4: Generate Service Account Key

1. On the **Credentials** page, find your new service account in the list
2. Click the service account email (e.g., `intelleges-sheets-sync@...iam.gserviceaccount.com`)
3. Go to the **Keys** tab
4. Click **Add Key** → **Create new key**
5. Select **JSON** format
6. Click **Create**
7. A JSON file will download automatically - **SAVE THIS FILE SECURELY**

**⚠️ Security Warning:** This JSON file contains credentials that allow access to your Google Sheets. Never commit it to version control or share it publicly.

---

## Step 5: Extract Credentials from JSON

Open the downloaded JSON file. You'll see something like this:

```json
{
  "type": "service_account",
  "project_id": "intelleges-lead-tracking-xxxxx",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n",
  "client_email": "intelleges-sheets-sync@intelleges-lead-tracking-xxxxx.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

You need two values:
1. **`client_email`** - The service account email address
2. **`private_key`** - The private key (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)

---

## Step 6: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **Blank** to create a new spreadsheet
3. Rename it to **Intelleges Lead Tracking**
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123xyz456_SPREADSHEET_ID_HERE/edit
                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ```

5. **Share the sheet with the service account:**
   - Click **Share** button (top right)
   - Paste the service account email (from Step 5)
   - Set permission to **Editor**
   - Uncheck **Notify people** (it's a bot account)
   - Click **Share**

**Important:** The service account needs Editor access to write data to the sheet.

---

## Step 7: Add Environment Variables

Add these three environment variables to your server:

### Option A: Using Manus UI (Recommended)

1. Open the Manus project dashboard
2. Navigate to **Settings** → **Secrets**
3. Add three new secrets:

| Key | Value | Description |
|-----|-------|-------------|
| `GOOGLE_SHEETS_CLIENT_EMAIL` | `intelleges-sheets-sync@...iam.gserviceaccount.com` | Service account email from JSON |
| `GOOGLE_SHEETS_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\n...` | Private key from JSON (entire value including BEGIN/END lines) |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | `1ABC123xyz456...` | Spreadsheet ID from URL |

**⚠️ Important:** For `GOOGLE_SHEETS_PRIVATE_KEY`, copy the entire private key value including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines. The newlines (`\n`) should be preserved as literal `\n` characters.

### Option B: Using .env File (Local Development)

Create or edit `.env` file in project root:

```bash
GOOGLE_SHEETS_CLIENT_EMAIL=intelleges-sheets-sync@intelleges-lead-tracking-xxxxx.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=1ABC123xyz456_SPREADSHEET_ID_HERE
```

**⚠️ Important:** Wrap the private key in double quotes and keep the `\n` characters as-is.

---

## Step 8: Initialize Sheet with Headers

Run this command to set up the header row in your Google Sheet:

```bash
cd /home/ubuntu/intelleges-marketing-site
node -e "require('./server/lib/googleSheets').initializeSheet()"
```

This will:
- Add column headers: Email, First Name, Last Name, Company, Phone, Document Title, Document Type, Download Date, Download Count
- Format the header row with blue background and white text
- Make the sheet ready to receive data

**Expected Output:**
```
[Google Sheets] ✓ Sheet initialized with headers
```

If you see an error, check that:
- Environment variables are set correctly
- Service account has Editor access to the sheet
- Google Sheets API is enabled in your project

---

## Step 9: Test the Integration

### Manual Test

1. Open your website in a browser
2. Click on any protocol card or capability item to trigger download
3. Fill in the email capture form with test data:
   - **Email:** test@example.com
   - **First Name:** Test
   - **Last Name:** User
   - **Company:** Test Company
   - **Phone:** 555-1234 (optional)
4. Submit the form
5. Check your Google Sheet - you should see a new row with the test data

### Check Server Logs

Look for this log message in your server console:

```
[Google Sheets] ✓ Synced lead: test@example.com → [Document Title]
```

If you see this, the integration is working correctly!

### Troubleshooting

**Error: "Credentials not configured"**
- Check that all three environment variables are set
- Restart your server after adding environment variables

**Error: "Cannot initialize - credentials not configured"**
- Verify `GOOGLE_SHEETS_CLIENT_EMAIL` and `GOOGLE_SHEETS_PRIVATE_KEY` are set correctly
- Check that private key includes `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

**Error: "The caller does not have permission"**
- Verify you shared the Google Sheet with the service account email
- Check that service account has **Editor** permission (not Viewer)

**Error: "Unable to parse range"**
- Verify `GOOGLE_SHEETS_SPREADSHEET_ID` is correct
- Check that the sheet name is "Sheet1" (default) or update the code

**No data appearing in sheet:**
- Check server logs for error messages
- Verify the sheet is shared with the service account
- Try running the initialization command again

---

## Step 10: Verify Data Flow

After setting up, verify the complete data flow:

1. **User downloads document** → Form submission
2. **Server receives request** → `documentDownloads.recordDownload` mutation
3. **Database write** → Record saved to `documentDownloads` table
4. **Google Sheets sync** → Row appended to Google Sheet
5. **Email scheduling** → Follow-up email scheduled (if not suppressed)

Check each step:
- ✅ Database: Query `documentDownloads` table to verify record
- ✅ Google Sheets: Check sheet for new row
- ✅ Server logs: Look for sync confirmation message

---

## Usage and Maintenance

### Accessing Lead Data

**View in Google Sheets:**
1. Open the Google Sheet in your browser
2. All lead data is visible in real-time
3. Use filters, sorting, and search to find specific leads

**Export to CSV:**
1. In Google Sheets, go to **File** → **Download** → **Comma Separated Values (.csv)**
2. Import CSV into your CRM or email marketing tool

**Share with Team:**
1. Click **Share** button in Google Sheet
2. Add team members' email addresses
3. Set appropriate permissions (Viewer or Editor)

### Data Privacy

- The Google Sheet contains personally identifiable information (PII)
- Only share with authorized team members
- Set appropriate access controls
- Consider adding a data retention policy
- Comply with GDPR, CCPA, and other privacy regulations

### Monitoring

The integration logs all sync operations:

**Successful sync:**
```
[Google Sheets] ✓ Synced lead: user@example.com → Document Title
```

**Failed sync (non-critical):**
```
[Google Sheets] Sync failed (non-critical): Error message
```

Failed syncs don't block the download process - the lead data is still saved to the database.

### Backup and Recovery

**Automatic Backups:**
- Google Sheets automatically saves version history
- Access via **File** → **Version history** → **See version history**

**Manual Backup:**
1. Download sheet as CSV or Excel file
2. Store backup in secure location
3. Schedule regular backups (weekly recommended)

---

## Advanced Configuration

### Multiple Sheets

To sync to multiple sheets (e.g., one per document type):

1. Create additional sheets in the same spreadsheet
2. Modify `syncLeadToGoogleSheets` function to route by document type
3. Update range parameter: `Sheet1!A:I` → `Protocols!A:I`

### Custom Columns

To add custom columns (e.g., UTM parameters, referrer):

1. Update `LeadData` interface in `server/lib/googleSheets.ts`
2. Add columns to header row in `initializeSheet` function
3. Add values to row array in `syncLeadToGoogleSheets` function
4. Update range parameter: `A:I` → `A:K` (for 11 columns)

### Conditional Sync

To sync only certain document types:

```typescript
// In server/routers.ts, add condition before sync
if (input.documentType === 'whitepaper') {
  syncLeadToGoogleSheets({...}).catch(err => {...});
}
```

---

## Security Best Practices

1. **Never commit credentials to version control**
   - Add `.env` to `.gitignore`
   - Use environment variables for all secrets
   - Rotate service account keys annually

2. **Limit service account permissions**
   - Only grant access to specific spreadsheet
   - Use Editor permission (not Owner)
   - Monitor service account activity

3. **Secure the Google Sheet**
   - Don't make the sheet publicly accessible
   - Use "Anyone with the link" only if necessary
   - Review sharing permissions regularly

4. **Monitor for abuse**
   - Check for unusual sync patterns
   - Set up alerts for failed syncs
   - Review sheet access logs

---

## Troubleshooting Guide

### Common Issues

**Issue: "Module not found: googleapis"**
- **Solution:** Run `pnpm add googleapis` to install the package

**Issue: "Private key is invalid"**
- **Solution:** Check that newlines are preserved as `\n` characters, not actual line breaks
- **Solution:** Wrap private key in double quotes in .env file

**Issue: "Spreadsheet not found"**
- **Solution:** Verify spreadsheet ID is correct (from URL)
- **Solution:** Check that service account has access to the sheet

**Issue: "Quota exceeded"**
- **Solution:** Google Sheets API has rate limits (60 requests per minute per user)
- **Solution:** Implement batching if you have high traffic

**Issue: "Data not appearing immediately"**
- **Solution:** Refresh the Google Sheet (Ctrl+R or Cmd+R)
- **Solution:** Check that sync is not failing silently (check server logs)

### Debug Mode

To enable verbose logging:

```typescript
// In server/lib/googleSheets.ts
console.log('[Google Sheets] Attempting sync:', leadData);
console.log('[Google Sheets] Using spreadsheet ID:', env.GOOGLE_SHEETS_SPREADSHEET_ID);
```

---

## FAQ

**Q: Is the sync real-time?**  
A: Yes, data is written to Google Sheets immediately after the download is recorded in the database (within 1-2 seconds).

**Q: What happens if Google Sheets is down?**  
A: The sync fails gracefully and logs an error. The lead data is still saved to the database, so no data is lost. You can manually export from the database later.

**Q: Can I sync historical data?**  
A: Yes, you can write a script to query the `documentDownloads` table and call `syncLeadToGoogleSheets` for each record.

**Q: How many rows can Google Sheets handle?**  
A: Google Sheets supports up to 10 million cells. With 9 columns, that's approximately 1.1 million rows. If you exceed this, consider archiving old data or using multiple sheets.

**Q: Can I customize the sheet format?**  
A: Yes, modify the `initializeSheet` function to change colors, fonts, column widths, etc. See [Google Sheets API documentation](https://developers.google.com/sheets/api/guides/formats) for formatting options.

**Q: Does this work with Google Workspace (G Suite)?**  
A: Yes, the integration works with both personal Google accounts and Google Workspace accounts.

**Q: Can multiple people edit the sheet simultaneously?**  
A: Yes, Google Sheets supports real-time collaboration. Multiple team members can view and edit the sheet at the same time.

**Q: How do I remove the integration?**  
A: Simply delete the three environment variables (`GOOGLE_SHEETS_*`). The sync will stop automatically, and the code will skip the Google Sheets calls.

---

## Support

If you encounter issues not covered in this guide:

1. Check server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with the manual test procedure in Step 9
4. Review Google Cloud Console for API errors
5. Contact the development team for assistance

---

**Document Version:** 1.0  
**Last Updated:** November 30, 2025  
**Next Review:** January 1, 2026  
**Owner:** Manus (CTO)

**"Order enables excellence."** 📊
