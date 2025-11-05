# Template Configuration System

This directory contains the centralized configuration for the HVAC template.

## Overview

All business data, contact information, colors, and settings are stored in **`template-data.json`** and accessed throughout the application via the typed utility functions in `lib/template-config.ts`.

## Quick Start

### 1. Update Business Data

Edit `config/template-data.json` with your business information:

```json
{
  "business": {
    "name": "Your HVAC Company",
    "type": "HVAC",
    "licenseNumber": "YOUR-LICENSE"
  },
  "contact": {
    "phone": "(555) 123-4567",
    "phoneRaw": "+15551234567",
    "email": "info@yourbusiness.com",
    "address": {
      "city": "Your City",
      "stateCode": "NY"
    }
  }
}
```

### 2. Use in Components

Import the helper functions in any component:

```typescript
import {
  getBusinessInfo,
  getContactInfo,
  getFormattedPhone,
  getPhoneLink,
  getColors
} from '@/lib/template-config';

export function YourComponent() {
  const business = getBusinessInfo();
  const phone = getFormattedPhone();
  const phoneLink = getPhoneLink();

  return (
    <div>
      <h1>{business.name}</h1>
      <a href={phoneLink}>{phone}</a>
    </div>
  );
}
```

## Configuration Sections

### Business Information
- Company name
- Business type (HVAC, Plumbing, Electrician)
- Tagline
- Description
- License number
- Year established

### Contact Information
- Phone number (formatted and raw)
- Email address
- Physical address
- City, state, zip code

### Business Hours
- Weekday hours
- Saturday hours
- Sunday hours
- Emergency availability

### Services
- Service name
- Service slug (URL-friendly)
- Service description

### Theme Colors
- Primary colors (main, hover, light, dark)
- Secondary colors
- Seasonal accent colors (cold/hot)
- Utility colors (success, warning, danger, info)

### Social Media
- Facebook, Twitter, Instagram
- LinkedIn, Yelp, Google

### SEO Settings
- Default page title
- Default meta description
- Keywords
- Domain name

### Feature Flags
- Assessment page toggle
- Tier 2 notifications (monthly cost)
- Tier 3 automation (setup + monthly cost)

## Available Helper Functions

### Main Getter
- `getTemplateData()` - Get complete configuration

### Section Getters
- `getBusinessInfo()` - Get business information
- `getContactInfo()` - Get contact details
- `getHours()` - Get business hours
- `getServices()` - Get services list
- `getColors()` - Get theme colors
- `getSocialLinks()` - Get social media URLs
- `getSEO()` - Get SEO metadata
- `getFeatures()` - Get feature flags

### Formatted Data
- `getFormattedPhone()` - Get display phone number
- `getPhoneLink()` - Get `tel:` link
- `getEmailLink()` - Get `mailto:` link
- `getFullBusinessName()` - Get business name with location
- `getBusinessType()` - Get business type for seasonal logic
- `getStateCode()` - Get state code for seasonal logic
- `getPrimaryColor()` - Get primary brand color

## Color System

The theme colors are defined in the JSON and can be accessed via `getColors()`:

```typescript
const colors = getColors();

// Primary brand color
colors.primary.main   // #2563eb (blue-600)
colors.primary.hover  // #1d4ed8 (blue-700)
colors.primary.light  // #dbeafe (blue-50)
colors.primary.dark   // #1e3a8a (blue-900)

// Seasonal accent colors
colors.accent.cold.main  // Winter theme color
colors.accent.hot.main   // Summer theme color
```

## Deployment Checklist

Before deploying for a customer, update:

1. **Business Information**
   - [ ] Business name
   - [ ] License number
   - [ ] Year established

2. **Contact Details**
   - [ ] Phone number (both formatted and raw)
   - [ ] Email address
   - [ ] Physical address

3. **Location**
   - [ ] City
   - [ ] State code (for seasonal logic)
   - [ ] Zip code

4. **Hours of Operation**
   - [ ] Weekday hours
   - [ ] Weekend hours
   - [ ] Emergency availability

5. **Services**
   - [ ] Update service names and descriptions

6. **SEO**
   - [ ] Page title
   - [ ] Meta description
   - [ ] Domain name

7. **Feature Flags**
   - [ ] Enable/disable assessment page
   - [ ] Configure tier pricing

8. **Optional**
   - [ ] Social media links
   - [ ] Custom brand colors

## Best Practices

1. **Always use the helper functions** - Never hardcode business data in components
2. **Type safety** - The TypeScript interfaces ensure data consistency
3. **Single source of truth** - All data comes from `template-data.json`
4. **Easy updates** - Change data in one place, updates everywhere
5. **Deployment ready** - Simply update JSON file for new customers

## Examples

### Get Business Name
```typescript
const { name } = getBusinessInfo();
```

### Create Phone Link
```typescript
<a href={getPhoneLink()}>{getFormattedPhone()}</a>
```

### Use Theme Colors
```typescript
const { primary } = getColors();
<button style={{ backgroundColor: primary.main }}>
  Call Now
</button>
```

### Check Feature Flags
```typescript
const { assessment } = getFeatures();
if (assessment.enabled) {
  // Show assessment page
}
```

## Migration Guide

To migrate existing hardcoded data:

1. Find all instances of hardcoded business data (search for `DEMO_DATA`, hardcoded phone numbers, etc.)
2. Import the appropriate helper function
3. Replace hardcoded values with function calls
4. Test thoroughly

Example migration:
```typescript
// Before
const phone = "(773) 555-1234";

// After
import { getFormattedPhone } from '@/lib/template-config';
const phone = getFormattedPhone();
```
