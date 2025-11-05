/**
 * Variable Substitution System for HVAC Template
 *
 * Handles all dynamic content replacement from onboarding data
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ColorScheme {
  primary: string; // Main brand color (hex)
  secondary: string; // Accent color (hex)
  // Neutral colors stay the same for everyone
}

export interface BusinessData {
  // Screen 1: Basic Info
  businessName: string;
  phone: string;
  businessType: 'HVAC' | 'Plumbing' | 'Electrician' | 'Other';
  city: string;
  state: string;

  // Screen 2: Hours & Services
  hours: string;
  services: string[]; // Checked services from onboarding
  otherServices?: string; // Optional "Other" field

  // Screen 3: Domain
  domain: string;

  // Optional customization (premium upsell, future online portal)
  colorScheme?: ColorScheme;

  // System generated
  year?: number;
  heroVersion?: 'cold' | 'hot';
}

export interface ServiceDescription {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ============================================================================
// VARIABLE SUBSTITUTION
// ============================================================================

/**
 * Replace template variables with actual business data
 */
export function substituteVariables(
  template: string,
  data: BusinessData
): string {
  return template
    .replace(/\{\{BUSINESS_NAME\}\}/g, data.businessName)
    .replace(/\{\{PHONE\}\}/g, formatPhone(data.phone))
    .replace(/\{\{BUSINESS_TYPE\}\}/g, data.businessType)
    .replace(/\{\{CITY\}\}/g, data.city)
    .replace(/\{\{STATE\}\}/g, data.state)
    .replace(/\{\{HOURS\}\}/g, data.hours)
    .replace(/\{\{DOMAIN\}\}/g, data.domain)
    .replace(/\{\{YEAR\}\}/g, (data.year || new Date().getFullYear()).toString())
    .replace(/\{\{OTHER_SERVICES\}\}/g, data.otherServices || '');
}

// ============================================================================
// FORMATTING HELPERS
// ============================================================================

/**
 * Format phone number for display
 * Input: "(773) 555-1234" or "7735551234"
 * Output: "(773) 555-1234"
 */
export function formatPhone(phone: string): string {
  // Handle undefined or null
  if (!phone) return '';

  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  // Return as-is if not 10 digits
  return phone;
}

/**
 * Format phone number for tel: link
 * Input: "(773) 555-1234"
 * Output: "+17735551234"
 */
export function formatPhoneForLink(phone: string): string {
  // Handle undefined or null
  if (!phone) return '';

  const digits = phone.replace(/\D/g, '');
  return `+1${digits}`;
}

/**
 * Create URL-safe slug from business name
 * Input: "Joe's HVAC & Air"
 * Output: "joes-hvac-air"
 */
export function createSlug(businessName: string): string {
  return businessName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .trim();
}

// ============================================================================
// SEO METADATA GENERATION
// ============================================================================

export interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
}

/**
 * Generate SEO metadata for the site
 */
export function generateSEOMetadata(data: BusinessData): SEOMetadata {
  const title = `${data.businessName} - ${data.businessType} Service in ${data.city}, ${data.state}`;

  const description = `Fast, reliable ${data.businessType} service in ${data.city}. Call ${formatPhone(data.phone)} for ${data.services.slice(0, 3).join(', ').toLowerCase()}${data.services.length > 3 ? ', and more' : ''}. Available now.`;

  const canonical = `https://${data.domain}`;

  return { title, description, canonical };
}

// ============================================================================
// STRUCTURED DATA (Schema.org)
// ============================================================================

export interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  telephone: string;
  address: {
    '@type': string;
    addressLocality: string;
    addressRegion: string;
  };
  openingHours?: string;
  priceRange: string;
  areaServed: {
    '@type': string;
    name: string;
  };
}

/**
 * Generate structured data for AI agent search and SEO
 */
export function generateStructuredData(data: BusinessData): StructuredData {
  // Determine schema type based on business type
  let schemaType = 'LocalBusiness';
  if (data.businessType === 'HVAC') {
    schemaType = 'HVACBusiness';
  } else if (data.businessType === 'Plumbing') {
    schemaType = 'Plumber';
  } else if (data.businessType === 'Electrician') {
    schemaType = 'Electrician';
  }

  // Convert hours to structured format (if standard format)
  // "Mon-Fri 8am-5pm" → "Mo-Fr 08:00-17:00"
  const openingHours = formatHoursForSchema(data.hours);

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: data.businessName,
    telephone: formatPhone(data.phone),
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.city,
      addressRegion: data.state,
    },
    ...(openingHours && { openingHours }),
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: data.city,
    },
  };
}

/**
 * Convert human-readable hours to schema.org format
 * "Mon-Fri 8am-5pm" → "Mo-Fr 08:00-17:00"
 */
function formatHoursForSchema(hours: string): string | undefined {
  // Only handle standard formats for now
  const patterns = [
    { input: /Mon-Fri (\d+)am-(\d+)pm/i, output: (h1: string, h2: string) => `Mo-Fr ${h1.padStart(2, '0')}:00-${(parseInt(h2) + 12).toString().padStart(2, '0')}:00` },
    { input: /Mon-Fri (\d+)am-(\d+)am/i, output: (h1: string, h2: string) => `Mo-Fr ${h1.padStart(2, '0')}:00-${h2.padStart(2, '0')}:00` },
  ];

  for (const pattern of patterns) {
    const match = hours.match(pattern.input);
    if (match) {
      return pattern.output(match[1], match[2]);
    }
  }

  // If "24/7 Emergency Service" or custom format, return undefined
  return undefined;
}

// ============================================================================
// ABOUT SECTION (GENERIC TEMPLATE)
// ============================================================================

/**
 * Generate generic about section content
 * $249 tier = generic template
 * Premium upsell = custom content via online portal
 */
export function generateAboutContent(data: BusinessData): string {
  return `${data.businessName} serves ${data.city} and the surrounding area with quality ${data.businessType} service.

We're committed to:
✓ Fast, reliable service
✓ Fair pricing
✓ Quality workmanship

Call ${formatPhone(data.phone)} today for a free quote.`;
}

// ============================================================================
// COLOR SCHEME DEFAULTS
// ============================================================================

/**
 * Default color schemes by business type
 * Neutral colors (gray/zinc) are the default for $249 tier
 * Custom colors = premium upsell via online portal
 */
export const DEFAULT_COLOR_SCHEMES: Record<string, ColorScheme> = {
  HVAC: {
    primary: '#3B82F6', // Blue-500 (trust, professional)
    secondary: '#F97316', // Orange-500 (energy, warmth)
  },
  Plumbing: {
    primary: '#0EA5E9', // Sky-500 (water, clean)
    secondary: '#14B8A6', // Teal-500 (fresh, reliable)
  },
  Electrician: {
    primary: '#EAB308', // Yellow-500 (electricity, energy)
    secondary: '#8B5CF6', // Violet-500 (power, modern)
  },
  Other: {
    primary: '#6B7280', // Gray-500 (neutral)
    secondary: '#3B82F6', // Blue-500 (generic accent)
  },
};

/**
 * Get color scheme for a business
 * Returns custom colors if set, otherwise default for business type
 */
export function getColorScheme(data: BusinessData): ColorScheme {
  // If custom color scheme is set (premium upsell), use it
  if (data.colorScheme) {
    return data.colorScheme;
  }

  // Otherwise use default for business type
  return (
    DEFAULT_COLOR_SCHEMES[data.businessType] || DEFAULT_COLOR_SCHEMES.Other
  );
}

/**
 * Generate CSS variables for color scheme
 * Use this to inject custom properties into the page
 */
export function generateColorSchemeCSS(colorScheme: ColorScheme): string {
  return `
    :root {
      --color-primary: ${colorScheme.primary};
      --color-secondary: ${colorScheme.secondary};
    }
  `.trim();
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  substituteVariables,
  formatPhone,
  formatPhoneForLink,
  createSlug,
  generateSEOMetadata,
  generateStructuredData,
  generateAboutContent,
  getColorScheme,
  generateColorSchemeCSS,
};
