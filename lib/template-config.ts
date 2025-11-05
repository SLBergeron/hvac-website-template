/**
 * Template Configuration
 *
 * Central configuration system for the HVAC template.
 * All business data, colors, and settings are stored in config/template-data.json
 * and accessed through this typed interface.
 *
 * Usage:
 * import { getTemplateData, getBusinessInfo, getColors } from '@/lib/template-config';
 *
 * const config = getTemplateData();
 * const businessName = config.business.name;
 *
 * // Or use helper functions
 * const business = getBusinessInfo();
 * const colors = getColors();
 */

import templateData from '@/config/template-data.json';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TemplateData {
  business: {
    name: string;
    type: string;
    tagline: string;
    description: string;
    yearEstablished: string;
    licenseNumber: string;
  };
  contact: {
    phone: string;
    phoneRaw: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      stateCode: string;
      zip: string;
      full: string;
    };
  };
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
    emergency: string;
    formatted: string;
  };
  services: Array<{
    name: string;
    slug: string;
    description: string;
  }>;
  theme: {
    colors: {
      primary: {
        main: string;
        hover: string;
        light: string;
        dark: string;
      };
      secondary: {
        main: string;
        hover: string;
        light: string;
        dark: string;
      };
      accent: {
        cold: {
          main: string;
          light: string;
          dark: string;
        };
        hot: {
          main: string;
          light: string;
          dark: string;
        };
      };
      success: string;
      warning: string;
      danger: string;
      info: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    yelp: string;
    google: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    domain: string;
  };
  features: {
    assessment: {
      enabled: boolean;
      webhookUrl: string | null;
    };
    tier2Notifications: {
      enabled: boolean;
      monthlyCost: number;
    };
    tier3Automation: {
      enabled: boolean;
      setupCost: number;
      monthlyCost: number;
    };
  };
}

// ============================================================================
// MAIN GETTER
// ============================================================================

/**
 * Get the complete template configuration
 */
export function getTemplateData(): TemplateData {
  return templateData as TemplateData;
}

// ============================================================================
// CONVENIENCE GETTERS
// ============================================================================

/**
 * Get business information
 */
export function getBusinessInfo() {
  return templateData.business;
}

/**
 * Get contact information
 */
export function getContactInfo() {
  return templateData.contact;
}

/**
 * Get business hours
 */
export function getHours() {
  return templateData.hours;
}

/**
 * Get services list
 */
export function getServices() {
  return templateData.services;
}

/**
 * Get theme colors
 */
export function getColors() {
  return templateData.theme.colors;
}

/**
 * Get primary color (most commonly used)
 */
export function getPrimaryColor() {
  return templateData.theme.colors.primary.main;
}

/**
 * Get primary hover color
 */
export function getPrimaryHoverColor() {
  return templateData.theme.colors.primary.hover;
}

/**
 * Get primary light color
 */
export function getPrimaryLightColor() {
  return templateData.theme.colors.primary.light;
}

/**
 * Get primary dark color
 */
export function getPrimaryDarkColor() {
  return templateData.theme.colors.primary.dark;
}

/**
 * Get accent cold colors (for winter/heating)
 */
export function getAccentColdColors() {
  return templateData.theme.colors.accent.cold;
}

/**
 * Get accent hot colors (for summer/cooling)
 */
export function getAccentHotColors() {
  return templateData.theme.colors.accent.hot;
}

/**
 * Get success color
 */
export function getSuccessColor() {
  return templateData.theme.colors.success;
}

/**
 * Get social media links
 */
export function getSocialLinks() {
  return templateData.social;
}

/**
 * Get SEO metadata
 */
export function getSEO() {
  return templateData.seo;
}

/**
 * Get feature flags
 */
export function getFeatures() {
  return templateData.features;
}

// ============================================================================
// FORMATTED DATA HELPERS
// ============================================================================

/**
 * Get formatted phone number for display
 */
export function getFormattedPhone() {
  return templateData.contact.phone;
}

/**
 * Get phone number for tel: links
 */
export function getPhoneLink() {
  return `tel:${templateData.contact.phoneRaw}`;
}

/**
 * Get email link
 */
export function getEmailLink() {
  return `mailto:${templateData.contact.email}`;
}

/**
 * Get full business name with location
 */
export function getFullBusinessName() {
  return `${templateData.business.name} - ${templateData.contact.address.city}, ${templateData.contact.address.stateCode}`;
}

/**
 * Get business type for seasonal hero logic
 */
export function getBusinessType(): 'HVAC' | 'Plumbing' | 'Electrician' | 'Other' {
  const type = templateData.business.type;
  if (type === 'HVAC' || type === 'Plumbing' || type === 'Electrician') {
    return type;
  }
  return 'Other';
}

/**
 * Get state code for seasonal hero logic
 */
export function getStateCode() {
  return templateData.contact.address.stateCode;
}

/**
 * Get webhook URL for assessment form (Tier 2 feature)
 */
export function getWebhookUrl() {
  return templateData.features.assessment.webhookUrl;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  getTemplateData,
  getBusinessInfo,
  getContactInfo,
  getHours,
  getServices,
  getColors,
  getPrimaryColor,
  getPrimaryHoverColor,
  getPrimaryLightColor,
  getPrimaryDarkColor,
  getAccentColdColors,
  getAccentHotColors,
  getSuccessColor,
  getSocialLinks,
  getSEO,
  getFeatures,
  getFormattedPhone,
  getPhoneLink,
  getEmailLink,
  getFullBusinessName,
  getBusinessType,
  getStateCode,
};
