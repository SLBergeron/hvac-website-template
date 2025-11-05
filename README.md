# HVAC Website Template - Live Demo

This is a live demonstration of our $249 website template for home services businesses (HVAC, Plumbing, Electrician).

**Current Demo:** GreenBreeze HVAC - Chicago, IL

## Features

- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Fast Loading**: Optimized for speed and SEO
- **Professional Layout**: Psychology-driven section order for maximum conversions
- **Contact Forms**: Lead capture with Supabase integration
- **Service Pages**: Showcase your services professionally
- **Dark/Light Mode**: Modern UI with theme support
- **Template Preview Banner**: Shows visitors this is a customizable template

## What's Included (Tier 1 - $249)

✅ Professional website design
✅ Mobile-responsive layout
✅ Contact form with lead capture
✅ Service showcase sections
✅ About section
✅ FAQ section
✅ Lead management dashboard
✅ Fast hosting on Cloudflare Pages
✅ Custom domain setup
✅ 48-hour delivery

### Demo Features

- **Live Demo:** See the site at your deployed URL
- **Admin Dashboard:** Visit `/admin` to see 12 example leads with:
  - Professional data table with sorting, filtering, and pagination
  - Dynamic dates relative to current day (shows realistic timestamps)
  - Call Now & Email Now buttons for instant contact
  - "View More" button to expand row and see full lead details
  - Contact information, message, and lead metadata
  - CSV export functionality
- **Template Banner:** Bottom banner shows this is a customizable template

## Upgrade Options

### Tier 2: Lead Notifications ($99/month)
- SMS + Email alerts for every form submission
- Never miss a lead
- Instant notifications 24/7

### Tier 3: Full Automation Suite ($1,500 setup + $499/month)
- Automated follow-up sequences
- 20+ qualified job guarantee
- Jobs ledger tracking
- Complete business automation

## Get Your Website

👉 **[Visit getmywebsite.io](https://getmywebsite.io)** to get started

---

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy" button above
2. Connect your GitHub account
3. Vercel will automatically deploy your site
4. (Optional) Add environment variables for lead capture functionality

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Customization

All business data is centralized in `/config/template-data.json`:

```json
{
  "business": {
    "name": "Your Business Name",
    "type": "HVAC",
    "city": "Your City"
  },
  "theme": {
    "colors": {
      "primary": {
        "main": "#10b981"
      }
    }
  }
}
```

Simply edit this file to customize for any home services business.

## Environment Variables (Optional for Demo)

**The demo works perfectly without any environment variables!**

For production sites with real lead capture, add these in Vercel:

```bash
# Supabase (production only - for real lead storage)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# n8n webhook (Tier 2+ customers only)
NEXT_PUBLIC_WEBHOOK_URL=your_webhook_url
```

**Demo vs Production:**
- **Demo:** Uses 12 mock leads for the admin dashboard
- **Production:** Saves real customer leads to Supabase database

## Technical Stack

- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (optional)
- Vercel Analytics

---

**Built by LemonBrand + Press X to Market**
Website-First: Professional websites for no-website businesses
