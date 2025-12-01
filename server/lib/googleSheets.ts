import { google } from 'googleapis';
import { ENV as env } from '../_core/env';

/**
 * Google Sheets API Helper
 * 
 * Automatically syncs lead capture data to a Google Sheet for easy access and reporting.
 * 
 * Setup Instructions:
 * 1. Create Google Cloud project at https://console.cloud.google.com
 * 2. Enable Google Sheets API
 * 3. Create service account and download JSON credentials
 * 4. Add credentials to environment variables (see below)
 * 5. Create Google Sheet and share with service account email
 * 6. Add sheet ID to environment variables
 */

// Environment variables needed:
// GOOGLE_SHEETS_PRIVATE_KEY - Service account private key (from JSON credentials)
// GOOGLE_SHEETS_CLIENT_EMAIL - Service account email (from JSON credentials)
// GOOGLE_SHEETS_SPREADSHEET_ID - ID of the Google Sheet (from URL)

interface LeadData {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  documentTitle: string;
  documentType: string;
  downloadDate: Date;
  downloadCount: number;
}

/**
 * Initialize Google Sheets API client with service account authentication
 */
function getGoogleSheetsClient() {
  // Check if credentials are configured
  if (!env.GOOGLE_SHEETS_PRIVATE_KEY || !env.GOOGLE_SHEETS_CLIENT_EMAIL) {
    console.warn('[Google Sheets] Credentials not configured. Skipping sync.');
    return null;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix escaped newlines
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('[Google Sheets] Failed to initialize client:', error);
    return null;
  }
}

/**
 * Append lead data to Google Sheet
 * 
 * @param leadData - Lead capture data to sync
 * @returns Success boolean
 */
export async function syncLeadToGoogleSheets(leadData: LeadData): Promise<boolean> {
  const sheets = getGoogleSheetsClient();
  
  if (!sheets) {
    // Credentials not configured - skip sync silently
    return false;
  }

  if (!env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    console.warn('[Google Sheets] Spreadsheet ID not configured. Skipping sync.');
    return false;
  }

  try {
    // Format data as row
    const row = [
      leadData.email,
      leadData.firstName,
      leadData.lastName,
      leadData.company || '',
      leadData.phone || '',
      leadData.documentTitle,
      leadData.documentType,
      leadData.downloadDate.toISOString(),
      leadData.downloadCount.toString(),
    ];

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A:I', // Append to columns A through I
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    console.log(`[Google Sheets] ✓ Synced lead: ${leadData.email} → ${leadData.documentTitle}`);
    return true;
  } catch (error) {
    console.error('[Google Sheets] Failed to sync lead:', error);
    return false;
  }
}

/**
 * Initialize Google Sheet with header row
 * 
 * Call this once to set up the sheet with proper column headers.
 * Run manually: `node -e "require('./server/lib/googleSheets').initializeSheet()"`
 */
export async function initializeSheet(): Promise<boolean> {
  const sheets = getGoogleSheetsClient();
  
  if (!sheets || !env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    console.error('[Google Sheets] Cannot initialize - credentials not configured');
    return false;
  }

  try {
    // Check if sheet already has headers
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A1:I1',
    });

    if (response.data.values && response.data.values.length > 0) {
      console.log('[Google Sheets] Sheet already initialized with headers');
      return true;
    }

    // Add header row
    const headers = [
      'Email',
      'First Name',
      'Last Name',
      'Company',
      'Phone',
      'Document Title',
      'Document Type',
      'Download Date',
      'Download Count',
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A1:I1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [headers],
      },
    });

    // Format header row (bold, background color)
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: env.GOOGLE_SHEETS_SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.04,
                    green: 0.23,
                    blue: 0.40,
                  },
                  textFormat: {
                    foregroundColor: {
                      red: 1.0,
                      green: 1.0,
                      blue: 1.0,
                    },
                    bold: true,
                  },
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)',
            },
          },
        ],
      },
    });

    console.log('[Google Sheets] ✓ Sheet initialized with headers');
    return true;
  } catch (error) {
    console.error('[Google Sheets] Failed to initialize sheet:', error);
    return false;
  }
}
