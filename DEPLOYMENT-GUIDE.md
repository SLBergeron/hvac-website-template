# HVAC Template Deployment Guide

This guide covers deploying the HVAC website template with the 3-tier contact form system.

## Overview

The template includes:
- **Tier 1 ($249)**: Static website + form storage in Supabase + admin dashboard
- **Tier 2 ($99/mo)**: Above + instant SMS/email notifications via n8n webhook
- **Tier 3 ($499/mo)**: Above + full automation suite (Express Core)

---

## 1. Supabase Setup (Required for ALL Tiers)

### Create Supabase Project

1. Go to https://supabase.com and create a free account
2. Create a new project:
   - Project name: `hvac-leads-production` (or customer-specific name)
   - Database password: Generate a strong password and save it
   - Region: Choose closest to your target customers
3. Wait for project to initialize (~2 minutes)

### Create Database Table

1. In Supabase dashboard, go to **SQL Editor**
2. Run this SQL to create the form submissions table:

```sql
-- Create form_submissions table
CREATE TABLE form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  business_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Create index for faster queries by business name
CREATE INDEX idx_business_name ON form_submissions(business_name);
CREATE INDEX idx_created_at ON form_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON form_submissions
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading by business name (for admin dashboard)
CREATE POLICY "Allow select all" ON form_submissions
  FOR SELECT
  USING (true);
```

3. Click **Run** to execute the SQL

### Get Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)
3. Save these for the next step

---

## 2. Environment Variables

Create a `.env.local` file in the project root with these variables:

```bash
# Supabase Configuration (Required for ALL tiers)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin Dashboard Password
NEXT_PUBLIC_ADMIN_PASSWORD=secure-password-here

# n8n Webhook (Only for Tier 2+ customers)
# Leave empty for Tier 1
NEXT_PUBLIC_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/xxxxx
```

### Security Notes

- **Never commit `.env.local` to git** (already in `.gitignore`)
- Use different passwords for each customer
- Generate webhook URLs per customer in n8n

---

## 3. Configure Customer Data

Edit `/config/template-data.json`:

```json
{
  "business": {
    "name": "Customer Business Name",
    "type": "HVAC",
    "tagline": "Tagline here",
    ...
  },
  "contact": {
    "phone": "(555) 123-4567",
    "email": "customer@email.com",
    ...
  },
  "admin": {
    "password": "match-env-variable",
    "note": "Set NEXT_PUBLIC_ADMIN_PASSWORD environment variable"
  },
  "integrations": {
    "webhookUrl": null,  // For Tier 1, leave null
    "note": "For Tier 2+: n8n webhook URL"
  }
}
```

For Tier 2+ customers, set `webhookUrl` to their n8n webhook endpoint.

---

## 4. Local Testing

Test the setup locally before deploying:

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Visit http://localhost:3000
```

### Test Contact Form

1. Go to homepage and scroll to contact form
2. Fill out form and submit
3. Check Supabase dashboard → **Table Editor** → `form_submissions`
4. You should see the new submission

### Test Admin Dashboard

1. Go to http://localhost:3000/admin
2. Enter the admin password (from NEXT_PUBLIC_ADMIN_PASSWORD)
3. You should see the form submission(s)
4. Test "Export CSV" button

---

## 5. Cloudflare Pages Deployment

### Initial Setup

1. Push code to GitHub repository
2. Go to https://dash.cloudflare.com
3. Navigate to **Workers & Pages** → **Create Application** → **Pages**
4. Connect your GitHub repository
5. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (or subdirectory if needed)

### Environment Variables in Cloudflare

1. In Cloudflare Pages project, go to **Settings** → **Environment variables**
2. Add these variables for **Production**:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_ADMIN_PASSWORD = secure-password-here
```

3. For Tier 2+ customers, also add:
```
NEXT_PUBLIC_WEBHOOK_URL = https://n8n.yourdomain.com/webhook/xxxxx
```

4. **Important**: Redeploy after adding environment variables

### Custom Domain

1. In Cloudflare Pages project, go to **Custom domains**
2. Add customer's domain (e.g., `phoenixcomfort.com`)
3. Follow DNS configuration instructions
4. SSL certificate is automatic and free

---

## 6. Tier 2 Setup (n8n Webhook)

For customers upgrading to Tier 2 ($99/mo):

### n8n Workflow Setup

1. In n8n, create new workflow: "Lead Notifications - [Customer Name]"
2. Add **Webhook** trigger node:
   - Method: POST
   - Path: `/webhook/customer-slug`
   - Authentication: None (webhook URL acts as secret)
3. Add **Function** node to format message:
```javascript
const data = $input.first().json;
return [{
  json: {
    customerName: data.customerName,
    phone: data.customerPhone,
    email: data.customerEmail,
    message: data.message,
    time: data.submittedAt
  }
}];
```
4. Add **Send SMS** node (Twilio/Telnyx):
   - To: Customer's phone number
   - Message: `New lead: ${customerName} - ${phone}`
5. Add **Send Email** node:
   - To: Customer's email
   - Subject: "New Lead from Website"
   - Body: Include all lead details
6. Test workflow with sample data
7. Copy webhook URL and add to customer's environment variables

### Update Customer Config

1. Add webhook URL to `.env.local`:
```bash
NEXT_PUBLIC_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/customer-slug
```

2. Update `template-data.json`:
```json
"integrations": {
  "webhookUrl": "https://n8n.yourdomain.com/webhook/customer-slug"
}
```

3. Redeploy to Cloudflare Pages

---

## 7. Admin Dashboard Access

Give customers these credentials:

**Dashboard URL**: `https://customer-domain.com/admin`
**Password**: `[their-admin-password]`

Features:
- View all form submissions in chronological order
- Click phone numbers to call
- Click emails to send email
- Export all leads to CSV
- Refresh to see new submissions

---

## 8. Spam Protection

The template includes built-in spam protection (no paid APIs):

1. **Honeypot field**: Hidden field that bots fill
2. **Time validation**: Rejects submissions under 2 seconds
3. **Rate limiting**: Max 3 submissions per hour per IP
4. **Email validation**: Basic regex check

These should catch 95%+ of spam without any additional cost.

---

## 9. Troubleshooting

### Form not submitting

- Check browser console for errors
- Verify Supabase credentials in environment variables
- Check Supabase dashboard → **Logs** for insert errors
- Ensure RLS policies are correct

### Admin dashboard login failing

- Verify `NEXT_PUBLIC_ADMIN_PASSWORD` matches between env and attempt
- Check browser console for errors
- Try clearing browser cache/localStorage

### Webhook not firing (Tier 2+)

- Test webhook URL directly with curl:
```bash
curl -X POST https://n8n.yourdomain.com/webhook/xxxxx \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test","customerPhone":"555-1234"}'
```
- Check n8n workflow execution logs
- Verify webhook URL in environment variables
- Remember: Webhook failures don't block form submission (data still saved to Supabase)

### getColors error on homepage

If you see `ReferenceError: getColors is not defined`:
- This is a Next.js cache issue
- Run: `rm -rf .next && npm run dev`
- Or redeploy to Cloudflare Pages (fresh build)

---

## 10. Maintenance

### Supabase Free Tier Limits

- **Database size**: 500 MB (≈50,000 form submissions)
- **Bandwidth**: 2 GB/month
- **Rows**: No limit

For most customers, free tier is sufficient. If they hit limits, upgrade to Supabase Pro ($25/mo).

### Backup Leads

Customers can export CSV from admin dashboard regularly. Consider setting up automated backups:

1. Create n8n workflow to pull from Supabase weekly
2. Email CSV to customer
3. Store in Google Drive/Dropbox

---

## 11. Pricing Tiers Summary

### Tier 1 - $249 One-Time
**What's Included**:
- Static website deployed to Cloudflare Pages
- Contact form with spam protection
- All leads stored in Supabase
- Admin dashboard to view/export leads
- Custom domain setup

**Setup Time**: 40-60 minutes

### Tier 2 - $99/Month
**What's Included**:
- Everything in Tier 1
- Instant SMS notification on new lead
- Email notification on new lead
- n8n webhook integration

**Setup Time**: +20 minutes (webhook configuration)

### Tier 3 - $1,500 Setup + $499/Month
**What's Included**:
- Everything in Tier 2
- Full automation suite (Express Core)
- Jobs Ledger (Google Sheets CRM)
- Automated follow-ups
- 20+ Qualified Booked Jobs guarantee

**Setup Time**: 4-6 hours (full automation build)

---

## Support

For issues or questions:
- Check Supabase dashboard logs
- Test n8n webhooks independently
- Review browser console errors
- Verify all environment variables are set correctly

**Common Issues**:
1. Missing environment variables → Check Cloudflare Pages settings
2. Supabase connection errors → Verify project URL and anon key
3. Admin login issues → Check password in env matches attempt
4. Webhook not firing → Test webhook URL independently with curl
