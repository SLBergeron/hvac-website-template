# HVAC Template Build Session - November 3, 2025

## Session Objective
Transform portfolio template into consumer psychology-driven HVAC website template for $249 Website-First campaign.

## Key Accomplishments

### 1. Hero & Navigation
- **Installed**: New hero with images grid (`components/HeroWithGrid.tsx`)
- **Features**: Navbar overlayed on hero, seasonal messaging integration, trust badges, mobile nav
- **Removed**: Old separate navbar from layout
- **Tech**: Framer Motion, Tabler Icons, seasonal-hero.ts integration

### 2. Services Section
- **Updated**: `components/Services.tsx` with HVAC-specific content
- **Copy**: "Our HVAC Services" with benefit-focused descriptions
- **Icons**: AC (snowflake), Heating (flame), Installation (tool), Maintenance (checkbox), Emergency (alert)
- **Source**: Uses `lib/service-descriptions.ts` library

### 3. Consumer Psychology Sections (NEW)

#### shadcn/ui Setup
- Configured dark mode (`darkMode: ["class"]` in Tailwind)
- Created `components/ui/`: card.tsx, badge.tsx, separator.tsx, accordion.tsx
- Added CSS variables for light/dark themes in `globals.css`
- Installed: `class-variance-authority`, `@radix-ui/react-accordion`

#### New Components Created
**PricingTransparency** (`components/PricingTransparency.tsx`)
- Addresses cost anxiety (#1 consumer fear)
- Card layout, 3-step process, generic price ranges
- Props: `businessType`

**WhyChooseUs** (`components/WhyChooseUs.tsx`)
- Trust building with 4 reasons + icons
- License/insurance badges
- Generic anecdotal customer quotes (NOT fake testimonials)
- Props: `licenseNumber` (optional)

**WhatToExpect** (`components/WhatToExpect.tsx`)
- 5-step timeline with icons and separators
- Reduces process anxiety
- Props: `businessType`

**FAQ** (`components/FAQ.tsx`)
- Accordion component for expandable Q&A
- 5 honest questions including "Do I really need a tune-up?" (huge trust signal)
- Props: `phone`, `city`, `businessType`

### 4. Page Structure (Psychology-Driven Order)
```
Hero (panic relief, seasonal)
  ↓
PricingTransparency (cost anxiety)
  ↓
WhyChooseUs (trust gap)
  ↓
WhatToExpect (process clarity)
  ↓
Services (NOW they care)
  ↓
FAQ (final objections)
  ↓
About (human connection)
  ↓
Contact (easy action)
```

### 5. Dark Mode Implementation
- System preference detection via `prefers-color-scheme`
- Inline script in layout (no flash)
- All components updated to use theme variables
- Updated: Services, About, ContactForm with `text-foreground`, `bg-card`, etc.

### 6. Files Modified
```
app/layout.tsx - Added dark mode script, removed old navbar
app/page.tsx - New section structure with DEMO_DATA
app/globals.css - Added CSS variables for themes
tailwind.config.js - Dark mode config, accordion animations
components/HeroWithGrid.tsx - Created
components/Services.tsx - Updated with HVAC content
components/About.tsx - Updated for dark mode
components/ContactForm.tsx - Updated for dark mode
components/PricingTransparency.tsx - Created
components/WhyChooseUs.tsx - Created
components/WhatToExpect.tsx - Created
components/FAQ.tsx - Created
components/ui/*.tsx - Created (card, badge, separator, accordion)
```

## Template Features

### 100% Templated
- All content uses variables (businessType, phone, city, etc.)
- No hardcoded business-specific content
- Generic anecdotal quotes only (no fake testimonials)

### Consumer Psychology Applied
- **Pricing transparency first** - addresses biggest fear
- **Trust signals** - specific, verifiable (license numbers, badges)
- **Process clarity** - 5 steps, no mystery
- **Honest trade-offs** - "Most people skip tune-ups" builds trust
- **Specific timelines** - "30 minutes away", "4-6 hours"

### Technical
- Light/dark mode (system responsive)
- Mobile responsive
- shadcn/ui components
- 3rd grade reading level
- Sales letter tone (conversational, direct)

## Still TODO (Optional)
- Update Footer with service areas auto-generation
- Add structured data (schema.org JSON-LD)
- Create example business data config file
- Remove unused pages (blog, packages, templates, work)

## Key Design Decisions

1. **No fake testimonials** - Generic anecdotal quotes instead ("I knew what I was paying")
2. **Honest about tune-ups** - Builds more trust than overselling
3. **Specific prices** - "$150-500" not "affordable"
4. **Clear process** - Reduces anxiety about unknown
5. **Dark mode** - System preference, not toggle

## Dependencies Added
- class-variance-authority (for Badge variants)
- @radix-ui/react-accordion (for FAQ)

## Dev Server
Running at: http://localhost:3000

## Next Steps
- Test with actual business data
- Verify mobile responsiveness
- Add remaining sections (Footer updates)
- Document deployment process
