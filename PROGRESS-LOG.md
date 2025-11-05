# HVAC Template Adaptation - Progress Log

## November 3, 2025 - Session 1: Core Libraries & Foundation

### Overview
Started adapting the existing web agency portfolio template into a standardized HVAC/Plumbing/Electrician website template for the $249 Website-First campaign.

**Goal:** Maximum templated copy, 30-minute deployment per customer, variable substitution only (no AI generation needed for $249 tier).

---

## ✅ Completed Work

### 1. Variable Substitution System (`lib/variables.ts`)

**Purpose:** Handle all dynamic content replacement from onboarding data

**Features Implemented:**
- TypeScript interfaces for BusinessData and ColorScheme
- `substituteVariables()` - Replace template variables like {{BUSINESS_NAME}}, {{PHONE}}, etc.
- Phone number formatting:
  - Display format: "(773) 555-1234"
  - Tel link format: "+17735551234"
- `createSlug()` - Generate URL-safe slugs for subdomains
- `generateSEOMetadata()` - Auto-generate title tags, meta descriptions, canonical URLs
- `generateStructuredData()` - Create schema.org LocalBusiness JSON-LD for AI agent search
- `generateAboutContent()` - Generic about section template
- `getColorScheme()` - Get color scheme (custom or default by business type)
- `generateColorSchemeCSS()` - Generate CSS variables for colors

**Color Scheme System:**
- Mostly neutral colors (gray/zinc) for base design
- Configurable accent colors per business type:
  - **HVAC:** Blue (#3B82F6) + Orange (#F97316)
  - **Plumbing:** Sky (#0EA5E9) + Teal (#14B8A6)
  - **Electrician:** Yellow (#EAB308) + Violet (#8B5CF6)
  - **Other:** Gray (#6B7280) + Blue (#3B82F6)
- Premium upsell: Custom colors via online portal

**About Section Template:**
```
{{BUSINESS_NAME}} serves {{CITY}} and the surrounding area with quality {{BUSINESS_TYPE}} service.

We're committed to:
✓ Fast, reliable service
✓ Fair pricing
✓ Quality workmanship

Call {{PHONE}} today for a free quote.
```

---

### 2. Seasonal Hero Logic (`lib/seasonal-hero.ts`)

**Purpose:** Auto-rotate hero content based on location and season

**Features Implemented:**
- Geographic detection (northern vs southern states)
- Seasonal rotation logic:
  - **Northern states:** Cold season (Nov-Apr) / Hot season (May-Oct)
  - **Southern states:** Hot season year-round
- Business-type-specific content
- Test helpers for validation

**Hero Versions:**

**HVAC (Cold Season - Nov-Apr, Northern states):**
- Headline: "Stay Warm This Winter"
- Subheadline: "Fast, Reliable HVAC Service"

**HVAC (Hot Season - May-Oct, Northern states OR year-round Southern):**
- Headline: "Keep Your Home Comfortable"
- Subheadline: "Fast, Reliable HVAC Service"

**Plumbing (Less seasonal):**
- Cold: "Plumbing Problems? We Fix Them Fast" / "Burst Pipes, Leaks, and Emergency Repairs"
- Hot: "Plumbing Problems? We Fix Them Fast" / "Repairs, Installations, and Emergency Service"

**Electrician (Not seasonal):**
- "Electrical Problems? We Fix Them Fast" / "Repairs, Installations, and Emergency Service"

**Why 2 Versions:**
- Seasonal urgency drives action (winter = heating emergencies, summer = cooling emergencies)
- HVAC is inherently seasonal but full-service (heating AND cooling)
- Still 100% templated (no custom copy per business)

---

### 3. Service Descriptions Library (`lib/service-descriptions.ts`)

**Purpose:** Standard, pre-written copy for all services

**Features Implemented:**
- Service description interfaces (id, title, description, icon)
- Three complete service libraries:
  - HVAC_SERVICES
  - PLUMBING_SERVICES
  - ELECTRICIAN_SERVICES
- `getServiceDescriptions()` - Look up descriptions for selected services
- `getOtherServiceDescription()` - Handle custom "Other" field
- `validateServices()` - Ensure all services have descriptions
- Icon mapping reference

**HVAC Services (Standard Copy):**
- **AC Repair:** "Keep your air conditioning running smoothly. Fast repairs when you need them most."
- **Heating Repair:** "Stay warm all winter. We fix heating problems fast."
- **Installation:** "New system? We install it right. Energy-efficient options available."
- **Maintenance:** "Regular tune-ups keep your system running longer and save you money."
- **Emergency Service:** "Available 24/7 for urgent repairs. We're here when you need us."

**Plumbing Services:**
- Drain Cleaning, Water Heater Service, Leak Repair, Emergency Service, Repiping

**Electrician Services:**
- Panel Upgrades, Electrical Repair, New Installation, Emergency Service, EV Charger Installation

**Copy Guidelines:**
- 3rd grade reading level
- Short sentences (10-15 words max)
- Simple words (no jargon)
- Active voice
- Benefit-first

---

### 4. ContactForm Component (`components/ContactForm.tsx`)

**Purpose:** Replace portfolio section with conversion-optimized contact form

**Features Implemented:**
- Clean, simple form (4 fields):
  - Name (text)
  - Phone (tel)
  - Email (email)
  - Message (textarea)
- Form validation (required fields)
- n8n webhook integration (for Tier 2 customers with $99/mo notifications)
- Success/error states with user feedback
- Mobile-optimized (large inputs, touch-friendly)
- Click-to-call phone link in header

**Design:**
- Large, easy-to-tap inputs (48px minimum touch target)
- Clear labels above inputs
- Big submit button
- Success message: "Message sent! We'll get back to you soon."
- Error fallback: "Please try calling us instead."
- Footer text: "We respond fast. Most calls returned same day."

---

### 5. About Component (`components/About.tsx`)

**Purpose:** Generic about section for $249 tier

**Features Implemented:**
- Uses `generateAboutContent()` from variables.ts
- Displays business hours in styled box
- Clean, centered layout
- Generic but professional copy

**Design Decisions:**
- **$249 tier:** Generic template (what we built)
- **Premium upsell:** Custom content via online portal (future feature)
- Simple, trustworthy, no fake claims ("20 years experience", etc.)

---

## 📋 Design Decisions Made

### 1. Color Scheme Strategy
**Decision:** Variable-based, mostly neutral, configurable
- Base design uses neutral grays/zinc (works for everyone)
- Accent colors default by business type (subtle branding)
- Premium upsell: Custom colors via online portal
- Easy to change without redesigning entire site

### 2. Testimonials Section
**Decision:** Removed entirely
- Generic testimonials feel fake
- Real testimonials = premium upsell (future)
- Cleaner, simpler site without them
- Still converts well with strong CTA + form

### 3. About Section
**Decision:** Generic template for $249 tier
- Professional but standardized copy
- No specific claims we can't back up
- Premium upsell: Custom about content via online portal

### 4. Copy Strategy
**Decision:** 3rd grade reading level, conversion-optimized
- Short sentences, simple words
- Active voice ("We fix it fast")
- Benefit-first ("Save money" not "Cost-effective")
- No jargon, no marketing speak

### 5. Deployment Strategy
**Decision:** Maximum templated copy, minimal customization
- $249 tier = template + variable substitution only
- No AI generation needed (faster, cheaper, more reliable)
- Custom content = premium upsell
- Target: 30-minute deployment per customer

---

## 📁 Files Created

```
hvac-template/
├── lib/
│   ├── variables.ts                    ✅ Variable substitution system (312 lines)
│   ├── seasonal-hero.ts                ✅ Seasonal hero logic (220 lines)
│   └── service-descriptions.ts         ✅ Service descriptions library (205 lines)
├── components/
│   ├── ContactForm.tsx                 ✅ Contact form with n8n webhook (140 lines)
│   └── About.tsx                       ✅ Generic about section (30 lines)
└── TEMPLATE-ADAPTATION-PROGRESS.md     ✅ Detailed adaptation guide
```

**Total New Code:** ~900 lines of TypeScript/React

---

## 🚧 Next Steps (Not Yet Started)

### Component Adaptation (Estimated: 2-3 hours)

1. **Simplify Navigation (`components/Navbar.tsx`)**
   - Remove: Work, Packages, Templates, Blog
   - Keep: Services, About, Contact (3 items)
   - Add: Phone number prominent in header

2. **Update Hero (`components/Hero.tsx`)**
   - Integrate seasonal hero logic
   - Use `getCompleteHeroContent()` from seasonal-hero.ts
   - Variable substitution for business name, phone, city

3. **Update Services (`components/Services.tsx`)**
   - Loop through selected services
   - Use descriptions from service-descriptions.ts
   - Render service cards dynamically

4. **Update Main Page (`app/page.tsx`)**
   - Remove: Products/portfolio section
   - Add: About component
   - Add: ContactForm component
   - Single-page layout: Hero → Services → About → Contact → Footer

5. **Add Structured Data (`app/layout.tsx`)**
   - Inject schema.org JSON-LD in <head>
   - Use `generateStructuredData()` from variables.ts
   - Enables AI agent search (ChatGPT, Perplexity, Google)

6. **Update Footer (`components/Footer.tsx`)**
   - Add business hours
   - Add business address/location
   - Remove agency-specific links

7. **Remove Unused Pages**
   - Delete: `/app/work/`, `/app/packages/`, `/app/templates/`, `/app/blog/`
   - Keep: `/app/privacy/`, `/app/terms/` (generic legal pages)

### Testing & Deployment

8. **Create Example Configuration**
   - `config/example-business-data.json`
   - Sample HVAC, Plumbing, Electrician data
   - Use for testing deployment

9. **Test Deployment Workflow**
   - Clone template
   - Update business data
   - Build site (`npm run build`)
   - Deploy to test subdomain
   - Verify: Mobile view, form submission, SEO metadata

10. **Document Deployment Process**
   - Step-by-step guide
   - Screenshot examples
   - Troubleshooting common issues
   - Target: 30-minute deployment

---

## 🎯 Goals & Success Criteria

### Technical Goals
- ✅ Maximum templated copy (achieved)
- ✅ Variable substitution system (achieved)
- ✅ 3rd grade reading level copy (achieved)
- ✅ Configurable color scheme (achieved)
- ⏳ 30-minute deployment target (testing pending)
- ⏳ Mobile-first responsive design (verify during testing)
- ⏳ SEO + AI agent optimized (structured data ready, needs integration)

### Business Goals
- ✅ $249 tier uses only template content (achieved)
- ✅ Premium upsell path defined (custom colors, about, testimonials)
- ⏳ Scalable deployment process (testing pending)
- ⏳ Works for HVAC, Plumbing, Electrician (verify during testing)

---

## 📝 Notes & Observations

### What Worked Well
- TypeScript interfaces make variable substitution type-safe
- Seasonal hero logic is elegant and maintainable
- Service descriptions library scales across all niches
- Color scheme system is flexible for future customization

### Key Insights
- HVAC in northern states = FULL SERVICE (heating AND cooling)
  - Geographic variation is about messaging emphasis, not service limitation
  - November: Lead with heating urgency ("Stay warm this winter")
  - July: Lead with cooling urgency ("Keep your home comfortable")
  - Services list always shows both: AC Repair, Heating Repair, etc.

- "Other" field in services is important
  - HVAC businesses offer more than 5 checkbox services
  - Ductwork, thermostats, air quality, humidifiers, etc.
  - Generic description: "We also offer {{OTHER_SERVICES_TEXT}}."

- Color scheme flexibility matters
  - Future online portal can let customers change colors
  - Premium upsell opportunity
  - Base design must work with any accent color

### Technical Decisions
- Used TypeScript for type safety
- Functional approach (pure functions, no side effects)
- Tailwind CSS for styling (existing template framework)
- React components (client components for forms, server components where possible)
- No external dependencies added (lean, fast)

---

## 🔄 Version History

### v0.1.0 - November 3, 2025 (Current)
- Initial foundation: Core libraries and components
- Variable substitution system
- Seasonal hero logic
- Service descriptions library
- ContactForm component
- About component
- Color scheme system
- Documentation

### v0.2.0 - Planned
- Component adaptations (navigation, hero, services, layout)
- Structured data integration
- Testing with dummy data
- Deployment workflow

### v1.0.0 - Target
- Production-ready template
- Full documentation
- Tested deployment process
- Ready for Wednesday Nov 6 launch

---

## 📞 Questions for Next Session

1. **Navigation:** Keep anchor links (Services, About, Contact) or separate pages?
2. **Photos:** Stock photos, placeholder images, or no images in template?
3. **CTA buttons:** One primary CTA (Call) or two (Call + Form)?
4. **Hours display:** Show in hero, footer, or about section (or all three)?
5. **Emergency service badge:** If "Emergency Service" checked, show "24/7 Available" badge?

---

## 🔗 Related Documentation

- **Campaign Strategy:** `/03-campaign-strategy/sms-campaign.md`
- **Onboarding Flow:** `/03-campaign-strategy/onboarding-flow-4-screens.md`
- **Service Offering:** `/01-project-scope/service-offering-website-first.md`
- **Project Context:** `/CLAUDE.md`
- **Detailed Progress:** `/hvac-template/TEMPLATE-ADAPTATION-PROGRESS.md`

---

**Status:** Foundation complete, ready for component adaptation phase.

**Next Work Session:** Continue with navigation simplification and hero component integration.
