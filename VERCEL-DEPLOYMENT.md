# Vercel Deployment Guide

This guide will help you deploy your HVAC template to Vercel as a live demo.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- This repository pushed to GitHub

## Step 1: Push to GitHub

If you haven't already:

```bash
cd /Users/slbergeron/blueoutbound/hvac-template

# Initialize git if needed
git init

# Add all files
git add .

# Commit
git commit -m "Add HVAC template demo - GreenBreeze HVAC"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /Users/slbergeron/blueoutbound/hvac-template
vercel
```

## Step 3: Configure Environment Variables (Optional)

The template works without environment variables, but for full functionality:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables (all optional):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_WEBHOOK_URL=https://your-n8n-instance.com/webhook/xxxxx
```

4. Click "Save"
5. Redeploy the project

## Step 4: Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `greenbreezehvac.getmywebsite.io`)
3. Follow Vercel's DNS configuration instructions
4. Wait for DNS propagation (usually 5-30 minutes)

## What Gets Deployed

✅ Full Next.js website
✅ Static pages (optimized for speed)
✅ Emerald green theme (GreenBreeze HVAC branding)
✅ Template preview banner at bottom
✅ All components and features
✅ Responsive mobile/tablet/desktop design

## Demo Features

The deployed site includes:
- **Business:** GreenBreeze HVAC (Chicago, IL)
- **Color Scheme:** Emerald Green (#10b981)
- **Banner:** Fixed bottom banner with CTA to getmywebsite.io
- **All Sections:** Hero, Services, Pricing, Why Choose Us, FAQ, Contact
- **Assessment Quiz:** /assessment route (works without Supabase)
- **Admin Dashboard:** /admin route with 12 example leads (no login required for demo)
  - Professional TanStack Table with sorting, filtering, and pagination
  - Dynamic dates relative to current day (2 hours ago, 1 day ago, etc.)
  - Call Now & Email Now buttons for each lead
  - "View More" button to expand row and see full details
  - Expandable row shows: contact info, message, and lead metadata
  - Status tracking (New, Contacted, Qualified)
  - Urgency levels (High, Medium, Low)
  - Column visibility controls
  - Row selection with checkboxes
  - CSV export functionality

## Build Status

✅ Production build tested and passing
✅ TypeScript validation passing
✅ All routes compile successfully
✅ No critical warnings

## Performance

Expected Lighthouse scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Troubleshooting

### Build Fails

If the build fails:
1. Check the Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Verify Node version (should use latest LTS)

### Environment Variables Not Working

1. Ensure variables start with `NEXT_PUBLIC_`
2. Redeploy after adding variables
3. Check Vercel logs for errors

### Demo vs Production

The demo site uses mock data for the admin dashboard. In production:
- Contact forms save to Supabase database
- Admin dashboard shows real customer leads
- Assessment quiz saves customer responses
- Optional: Add Tier 2 webhooks for SMS/email notifications

The demo works perfectly without Supabase - it's configured with 12 realistic example leads.

## Live Demo URL

After deployment, Vercel will provide:
- **Production URL:** `https://your-project.vercel.app`
- **Custom Domain:** `https://greenbreezehvac.getmywebsite.io` (if configured)

## Next Steps

1. Test the deployed site thoroughly
2. Share the URL as a live demo
3. Use it to show prospects what their site could look like
4. Customize `config/template-data.json` for different demos

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Repository Issues:** https://github.com/YOUR_REPO/issues

---

**Deployed by:** LemonBrand + Press X to Market
**Template:** Website-First ($249 HVAC Template)
