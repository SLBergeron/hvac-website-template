# HVAC Template Adaptation Progress

**Last Updated:** November 3, 2025
**Status:** Core libraries completed, component adaptation in progress

---

## What We're Building

Transforming the existing web agency portfolio template into a **standardized HVAC/Plumbing/Electrician website template** for the $79 Website-First campaign.

**Strategy:**
- Maximum templated copy (same for everyone)
- Variable substitution only: {{BUSINESS_NAME}}, {{PHONE}}, etc.
- 30-minute deployment per customer
- Custom content = premium upsell (not $79 tier)

---

## ✅ Completed: Core Libraries

### 1. Variable Substitution System (`/lib/variables.ts`)

**Purpose:** Handle all dynamic content replacement from onboarding data

**Features:**
- Type-safe business data interface
- Variable substitution function (`substituteVariables()`)
- Phone number formatting (display + tel: link)
- Slug generation for subdomains
- SEO metadata generation (title, description, canonical)
- Structured data generation (schema.org LocalBusiness)

**Usage Example:**
```typescript
import { substituteVariables, generateSEOMetadata } from '@/lib/variables';

const businessData = {
  businessName: "Joe's HVAC",
  phone: "7735551234",
  businessType: "HVAC",
  city: "Chicago",
  state: "IL",
  hours: "Mon-Fri 8am-5pm",
  services: ["AC Repair", "Heating Repair", "Installation"],
  domain: "joes-hvac.bestpro.work"
};

// Replace variables in template
const heroText = substituteVariables(
  "{{BUSINESS_NAME}} - {{CITY}}'s Trusted {{BUSINESS_TYPE}} Experts",
  businessData
);
// Result: "Joe's HVAC - Chicago's Trusted HVAC Experts"

// Generate SEO metadata
const seo = generateSEOMetadata(businessData);
// Result: { title: "Joe's HVAC - HVAC Service in Chicago, IL", description: "...", canonical: "..." }
```

---

### 2. Seasonal Hero Logic (`/lib/seasonal-hero.ts`)

**Purpose:** Determine which hero version to show based on location and time of year

**Features:**
- Geographic detection (northern vs southern states)
- Seasonal rotation (cold season Nov-Apr, hot season May-Oct)
- Business-type-specific hero content
- Test helpers for validation

**Logic:**
- **Northern states (IL, NY, MI, etc.):** Cold season (Nov-Apr) → "Stay Warm This Winter"
- **Northern states:** Hot season (May-Oct) → "Keep Your Home Comfortable"
- **Southern states (FL, TX, AZ, etc.):** Hot season year-round → "Keep Your Home Comfortable"

**Usage Example:**
```typescript
import { getCompleteHeroContent } from '@/lib/seasonal-hero';

const heroContent = getCompleteHeroContent('HVAC', 'IL'); // Illinois in current month
// November result: { version: 'cold', headline: 'Stay Warm This Winter', subheadline: 'Fast, Reliable HVAC Service' }

// July result: { version: 'hot', headline: 'Keep Your Home Comfortable', subheadline: 'Fast, Reliable HVAC Service' }
```

**Why 2 Versions:**
- Seasonal urgency drives action ("Winter's coming" = emergency calls)
- HVAC is inherently seasonal (heating in winter, cooling in summer)
- Works for both markets without custom copy
- Still 100% templated (no AI generation needed)

---

### 3. Service Descriptions Library (`/lib/service-descriptions.ts`)

**Purpose:** Standard copy for all services across all niches

**Features:**
- Pre-written service descriptions (3rd grade reading level)
- Icon mappings for each service
- Business-type-specific service libraries (HVAC, Plumbing, Electrician)
- Validation helpers

**Service Libraries:**

**HVAC Services:**
- AC Repair → "Keep your air conditioning running smoothly. Fast repairs when you need them most."
- Heating Repair → "Stay warm all winter. We fix heating problems fast."
- Installation → "New system? We install it right. Energy-efficient options available."
- Maintenance → "Regular tune-ups keep your system running longer and save you money."
- Emergency Service → "Available 24/7 for urgent repairs. We're here when you need us."

**Plumbing Services:**
- Drain Cleaning, Water Heater Service, Leak Repair, Emergency Service, Repiping

**Electrician Services:**
- Panel Upgrades, Electrical Repair, New Installation, Emergency Service, EV Charger Installation

**Usage Example:**
```typescript
import { getServiceDescriptions } from '@/lib/service-descriptions';

const businessData = {
  businessType: 'HVAC',
  services: ['AC Repair', 'Heating Repair', 'Emergency Service']
};

const serviceCards = getServiceDescriptions(
  businessData.businessType,
  businessData.services
);

// Result: Array of { id, title, description, icon } for each service
// Loop through to render service cards
```

---

## 🚧 Next Steps: Component Adaptation

### 4. Simplify Navigation (Pending)

**Current:** Work | Services | Packages | Templates | Blog (5 items)
**Target:** Services | About | Contact (3 items)

**Changes:**
- Remove: `/app/work/`, `/app/packages/`, `/app/templates/`, `/app/blog/`
- Update: `components/Navbar.tsx` → 3 items, phone number prominent
- Keep: Anchor links to sections on same page

---

### 5. Replace Portfolio with Contact Form (Pending)

**Current:** Products/work showcase section
**Target:** Contact form with n8n webhook integration

**Components to Build:**
- `components/ContactForm.tsx` → Simple 4-field form
- Form validation (client-side)
- n8n webhook submission
- Success message

**Form Fields:**
- Name (text)
- Phone (tel)
- Email (email)
- Message (textarea)

---

### 6. Add Structured Data (Pending)

**Implementation:**
- Use `generateStructuredData()` from `/lib/variables.ts`
- Inject JSON-LD script in `<head>` of layout
- Enables AI agent search (ChatGPT, Perplexity, Google SGE)

**Benefits:**
- Better SEO (Google understands business type, location, hours)
- AI agents can extract and recommend business correctly
- Rich snippets in search results

---

### 7. Update Color Scheme (Pending)

**Current:** Purple/pink gradients (agency branding)
**Target:** Blue/orange OR neutral gray

**Suggested HVAC Colors:**
- Primary: #2563EB (blue - trust, professional)
- Secondary: #F97316 (orange - energy, warmth)
- Neutral: Gray/black for text

**OR keep neutral:**
- Use existing gray/zinc colors
- Let photos/icons provide color accents
- More versatile across niches

---

## Deployment Workflow (30-Minute Target)

Once component adaptation is complete:

```bash
# 1. Clone template (2 min)
git clone hvac-template customer-site

# 2. Update business data (8 min)
# Edit config/business-data.json with onboarding data

# 3. Build site (3 min)
npm run build

# 4. Deploy to Cloudflare Pages (5 min)
# Push to GitHub → Cloudflare auto-deploys

# 5. Configure subdomain (5 min)
# Point businessname.bestpro.work to Cloudflare

# 6. Test (5 min)
# Mobile view, form submission, click-to-call

# 7. Notify customer (2 min)
# SMS: "Your site is live! https://businessname.bestpro.work"
```

**Total: 30 minutes**

---

## Testing Plan

### Unit Tests
- Variable substitution edge cases
- Seasonal hero logic for all states/months
- Service description lookups

### Integration Tests
- Full page rendering with real onboarding data
- Form submission → n8n webhook
- Mobile responsiveness
- SEO metadata generation

### Manual QA
- Deploy with 3 test businesses (HVAC, Plumbing, Electrician)
- Test in different seasons (mock month)
- Test in different locations (IL vs FL)
- Verify structured data with Google Rich Results Test

---

## Files Created So Far

```
hvac-template/
├── lib/
│   ├── variables.ts                    ✅ Variable substitution system
│   ├── seasonal-hero.ts                ✅ Seasonal hero logic
│   └── service-descriptions.ts         ✅ Service descriptions library
└── TEMPLATE-ADAPTATION-PROGRESS.md     ✅ This file
```

**Next files to modify:**
- `components/Navbar.tsx` (simplify navigation)
- `components/Hero.tsx` (seasonal hero integration)
- `components/Services.tsx` (service card rendering)
- `components/ContactForm.tsx` (new component)
- `app/page.tsx` (single-page layout)
- `app/layout.tsx` (structured data injection)

---

## Key Design Principles

1. **3rd Grade Reading Level:**
   - Short sentences (10-15 words max)
   - Simple words (avoid jargon)
   - Active voice ("We fix it fast" not "Problems will be resolved")
   - Benefit-first ("Save money" not "Cost-effective")

2. **Conversion-Optimized:**
   - Clear CTAs ("Call Now", "Get Free Quote")
   - Phone number always visible
   - Simple form (4 fields max)
   - Social proof (generic testimonials)

3. **Mobile-First:**
   - Large touch targets (48px minimum)
   - Click-to-call phone links
   - Big, readable text
   - Fast load time (<2 seconds)

4. **SEO + AI Agent Search:**
   - Structured data (schema.org)
   - Clear business info in first 100 words
   - Service list in clean format
   - Keywords: business name, city, services

---

## Questions for Next Session

1. **Color scheme:** Blue/orange OR neutral gray?
2. **Testimonials:** Include generic testimonials OR remove section?
3. **About section:** Keep brief template OR remove entirely?
4. **Photos:** Stock photos OR placeholder images?
5. **Domain strategy:** Deploy to bestpro.work immediately OR wait for full setup?

---

## Related Documentation

- Campaign strategy: `/03-campaign-strategy/sms-campaign.md`
- Onboarding flow: `/03-campaign-strategy/onboarding-flow-4-screens.md`
- Service offering: `/01-project-scope/service-offering-website-first.md`
- CLAUDE.md: Project context and collaboration guidelines
