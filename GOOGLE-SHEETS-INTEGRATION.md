# Google Sheets Integration for Tier 1 Customers

## Overview

This feature gives Tier 1 customers automatic access to their leads in a Google Sheet they own. Every form submission automatically adds a new row to their sheet.

## Benefits

**For Customers:**
- No technical knowledge required
- Access leads from phone, tablet, computer
- Can share sheet with employees
- Can use formulas, filters, charts
- True "local copy" they control
- Works offline (Google Sheets syncs)

**For You:**
- Differentiates Tier 1 from free solutions
- Doesn't cannibalize Tier 2 upsell (instant notifications still valuable)
- $0 cost (Google Sheets API is free within limits)
- Easy to set up per customer

## Cost Analysis

**Google Sheets API Limits (Free Tier):**
- 60 requests/minute per user
- 300 requests/minute per project
- Each form submission = 1 API call
- **Max capacity:** ~18,000 submissions/hour (way more than needed)

**Cost:** $0 for typical usage

## How It Works

### Architecture

```
Customer submits form
    ↓
POST /api/contact (Cloudflare Function)
    ↓
Spam checks
    ↓
Save to Supabase ✅
    ↓
Add to Google Sheet ✅ (Tier 1+)
    ↓
Trigger webhook ✅ (Tier 2+ only)
    ↓
Return success
```

### Setup Per Customer

1. **Create Google Sheet Template:**
   - Make a template sheet with headers
   - Set proper column widths, formatting
   - Share with customer (they become owner)

2. **Get Sheet Credentials:**
   - Customer's Sheet ID (from URL)
   - Service account key (for API access)

3. **Add to Environment Variables:**
```bash
GOOGLE_SHEET_ID=1abc...xyz  # From sheet URL
GOOGLE_SERVICE_ACCOUNT_EMAIL=sheets@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

## Implementation

### Step 1: Install Dependencies

```bash
npm install googleapis
```

### Step 2: Create Google Sheets Helper

Create `/lib/google-sheets.ts`:

```typescript
import { google } from 'googleapis';

interface LeadData {
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  businessName: string;
}

export async function appendToSheet(lead: LeadData, sheetId: string) {
  try {
    // Authenticate with service account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Append row to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Leads!A:E',  // Append to "Leads" tab
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          lead.timestamp,
          lead.name,
          lead.phone,
          lead.email,
          lead.message,
        ]],
      },
    });

    return { success: true, updates: response.data.updates };
  } catch (error) {
    console.error('Google Sheets error:', error);
    // Don't fail the entire request if Sheets fails
    return { success: false, error };
  }
}
```

### Step 3: Update Contact Form Handler

Modify `/functions/api/contact.ts`:

```typescript
// Add after Supabase insert (line ~151)

// --- GOOGLE SHEETS (TIER 1+) ---
if (env.GOOGLE_SHEET_ID && env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
  try {
    await appendToSheet({
      timestamp: new Date().toLocaleString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      businessName: formData.businessName,
    }, env.GOOGLE_SHEET_ID);
  } catch (sheetError) {
    // Log but don't fail - data is already in Supabase
    console.error('Failed to update Google Sheet:', sheetError);
  }
}
```

## Customer Onboarding

**What you give them:**

1. **Google Sheet Link:**
   ```
   Your leads: https://docs.google.com/spreadsheets/d/abc123xyz

   Bookmark this page. Every form submission appears here automatically.
   ```

2. **Mobile Access Instructions:**
   ```
   Download Google Sheets app:
   - iPhone: https://apps.apple.com/us/app/google-sheets/...
   - Android: https://play.google.com/store/apps/details?id=com.google.android.apps.docs.editors.sheets

   Sign in and find "My Leads" in your sheets.
   ```

3. **Sharing Instructions:**
   ```
   To share with employees:
   1. Click "Share" in top-right
   2. Add their email
   3. Choose "Editor" or "Viewer"
   ```

## Upsell Path (Critical)

### In Admin Portal

Add banner at top of `/app/admin/page.tsx`:

```typescript
<div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
  <div className="flex">
    <div className="flex-shrink-0">
      <IconAlertCircle className="h-5 w-5 text-yellow-400" />
    </div>
    <div className="ml-3">
      <p className="text-sm text-yellow-700 dark:text-yellow-200">
        <strong>Never miss a lead.</strong> Upgrade to instant SMS + email notifications
        for just $99/month. Get texted the second a lead comes in.
      </p>
      <p className="mt-2">
        <a
          href="mailto:your@email.com?subject=Upgrade to Tier 2 Notifications"
          className="text-sm font-medium text-yellow-700 underline hover:text-yellow-600"
        >
          Learn more →
        </a>
      </p>
    </div>
  </div>
</div>
```

### In Google Sheet

Add a note at the top of the sheet:

```
⚠️ IMPORTANT: This sheet updates within 1-2 minutes of submission.
For INSTANT text message alerts (perfect for emergency calls), upgrade to our $99/mo plan.
Contact: your@email.com
```

## Tier Differentiation (Crystal Clear)

### Tier 1 - $249 One-Time
**Lead Access:**
- ✅ Google Sheet (updates within 1-2 minutes)
- ✅ Admin portal (check anytime)
- ✅ CSV export (download for backup)

**Good for:** Planned maintenance, general inquiries, non-urgent leads

### Tier 2 - $99/Month
**Lead Access:**
- ✅ Everything in Tier 1
- ✅ **INSTANT SMS to your phone** (within seconds)
- ✅ **INSTANT Email notification**

**Good for:** Emergency calls, time-sensitive leads, competitive markets

**The upsell pitch:**
> "Right now, you check your Google Sheet or admin portal whenever you want. But what about the 2 AM furnace emergency that goes to your competitor because they respond in 3 minutes and you don't see it until morning? For $99/month, get texted instantly so you never miss another $2,000 emergency call."

## Alternative: Daily Email Digest

If Google Sheets feels too complex, offer a simpler option:

**Daily Email Digest (via n8n cron):**

```
Subject: Your Daily Leads - Phoenix Comfort Solutions

You received 3 leads today:

1. John Smith - (555) 123-4567 - john@example.com
   "Need AC repair ASAP"
   Submitted: Today at 10:30 AM

2. Sarah Jones - (555) 987-6543 - sarah@example.com
   "Furnace making strange noise"
   Submitted: Today at 2:15 PM

3. Mike Davis - (555) 456-7890 - mike@example.com
   "Quote for new HVAC system"
   Submitted: Today at 4:45 PM

---
View all leads: https://yoursite.com/admin
Upgrade to instant notifications: mailto:your@email.com
```

**Implementation:**
- n8n workflow with cron trigger (daily at 8 AM)
- Query Supabase for yesterday's leads
- Format and send email
- Cost: $0 (self-hosted n8n)

**Downside:** Only daily updates, less "real-time" feeling

## Recommended Tier 1 Package

**Give customers ALL of these:**

1. **Google Sheet** (primary access - easy, mobile-friendly)
2. **Admin Portal** (with upsell banner - drive upgrades)
3. **CSV Export** (backup/advanced users)
4. **Optional: Daily Email Digest** (convenience, keeps you top-of-mind)

**Cost:** $0 additional (Google Sheets API free, n8n already running)

**Value:** Customers feel like they're getting a complete solution, not a "check back later" system

**Upsell remains strong:** The difference between "check your sheet/email every hour" vs "get texted instantly" is compelling for service businesses with emergency calls.

## Setup Checklist Per Customer

- [ ] Create Google Sheet from template
- [ ] Set customer as owner
- [ ] Get Sheet ID from URL
- [ ] Add Sheet ID to Cloudflare env variables
- [ ] Configure service account (one-time, reuse for all customers)
- [ ] Test form submission → Sheet update
- [ ] Send customer their sheet link + mobile app instructions
- [ ] Add note about Tier 2 upgrade in sheet

**Time:** 5-10 minutes per customer (after initial setup)
