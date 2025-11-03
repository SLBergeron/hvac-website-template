/**
 * Service Descriptions Library
 *
 * Standard, templated copy for all services across all niches.
 * 3rd grade reading level, conversion-optimized, clear and simple.
 *
 * Each service has:
 * - id: Matches the checkbox value from onboarding
 * - title: Service name (displayed as heading)
 * - description: Short, benefit-focused copy
 * - icon: Icon identifier (maps to your component library)
 */

// ============================================================================
// TYPES
// ============================================================================

export interface ServiceDescription {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon identifier from your library
}

// ============================================================================
// HVAC SERVICES
// ============================================================================

export const HVAC_SERVICES: Record<string, ServiceDescription> = {
  'AC Repair': {
    id: 'ac-repair',
    title: 'AC Repair',
    description:
      'Keep your air conditioning running smoothly. Fast repairs when you need them most.',
    icon: 'snowflake', // Cold/AC icon
  },
  'Heating Repair': {
    id: 'heating-repair',
    title: 'Heating Repair',
    description: 'Stay warm all winter. We fix heating problems fast.',
    icon: 'flame', // Heat/furnace icon
  },
  Installation: {
    id: 'installation',
    title: 'Installation',
    description:
      'New system? We install it right. Energy-efficient options available.',
    icon: 'tools', // Installation/tools icon
  },
  Maintenance: {
    id: 'maintenance',
    title: 'Maintenance',
    description:
      'Regular tune-ups keep your system running longer and save you money.',
    icon: 'checkmark', // Checkmark/maintenance icon
  },
  'Emergency Service': {
    id: 'emergency-service',
    title: 'Emergency Service',
    description:
      "Available 24/7 for urgent repairs. We're here when you need us.",
    icon: 'alert', // Alert/emergency icon
  },
};

// ============================================================================
// PLUMBING SERVICES
// ============================================================================

export const PLUMBING_SERVICES: Record<string, ServiceDescription> = {
  'Drain Cleaning': {
    id: 'drain-cleaning',
    title: 'Drain Cleaning',
    description: 'Clogged drains? We clear them fast. No mess, no stress.',
    icon: 'water', // Water/drain icon
  },
  'Water Heater Service': {
    id: 'water-heater',
    title: 'Water Heater Service',
    description: 'Hot water when you need it. Repairs and replacements.',
    icon: 'flame', // Heat/water heater icon
  },
  'Leak Repair': {
    id: 'leak-repair',
    title: 'Leak Repair',
    description:
      'Stop water damage before it starts. Fast leak detection and repair.',
    icon: 'droplet', // Water droplet icon
  },
  'Emergency Service': {
    id: 'emergency-service',
    title: 'Emergency Service',
    description:
      "Burst pipes? We're available 24/7 for plumbing emergencies.",
    icon: 'alert', // Alert/emergency icon
  },
  Repiping: {
    id: 'repiping',
    title: 'Repiping',
    description: 'Old pipes causing problems? We replace them right.',
    icon: 'tools', // Tools/installation icon
  },
};

// ============================================================================
// ELECTRICIAN SERVICES
// ============================================================================

export const ELECTRICIAN_SERVICES: Record<string, ServiceDescription> = {
  'Panel Upgrades': {
    id: 'panel-upgrades',
    title: 'Panel Upgrades',
    description: 'More power for your home. Safe, modern electrical panels.',
    icon: 'lightning', // Electrical/lightning icon
  },
  'Electrical Repair': {
    id: 'electrical-repair',
    title: 'Electrical Repair',
    description: 'Lights out? Outlets not working? We fix it fast.',
    icon: 'tools', // Tools/repair icon
  },
  'New Installation': {
    id: 'new-installation',
    title: 'New Installation',
    description:
      'Adding new circuits, outlets, or fixtures. Done right.',
    icon: 'plus', // Plus/add icon
  },
  'Emergency Service': {
    id: 'emergency-service',
    title: 'Emergency Service',
    description:
      "Power problems? We're available 24/7 for electrical emergencies.",
    icon: 'alert', // Alert/emergency icon
  },
  'EV Charger Installation': {
    id: 'ev-charger',
    title: 'EV Charger Installation',
    description: 'Charge your electric car at home. Fast, safe installation.',
    icon: 'plug', // Plug/charger icon
  },
};

// ============================================================================
// SERVICE LOOKUP
// ============================================================================

/**
 * Get service descriptions based on business type and selected services
 */
export function getServiceDescriptions(
  businessType: string,
  selectedServices: string[]
): ServiceDescription[] {
  // Select the appropriate service library
  let serviceLibrary: Record<string, ServiceDescription>;

  switch (businessType) {
    case 'HVAC':
      serviceLibrary = HVAC_SERVICES;
      break;
    case 'Plumbing':
      serviceLibrary = PLUMBING_SERVICES;
      break;
    case 'Electrician':
      serviceLibrary = ELECTRICIAN_SERVICES;
      break;
    default:
      // For "Other" business types, use generic services
      serviceLibrary = {};
  }

  // Map selected services to descriptions
  return selectedServices
    .map((serviceName) => serviceLibrary[serviceName])
    .filter(Boolean); // Remove any services not found in library
}

/**
 * Get a generic service description for "Other" field
 */
export function getOtherServiceDescription(
  otherServicesText: string
): ServiceDescription {
  return {
    id: 'other',
    title: 'Additional Services',
    description: `We also offer ${otherServicesText.toLowerCase()}.`,
    icon: 'dots', // Dots/more icon
  };
}

// ============================================================================
// ICON MAPPING
// ============================================================================

/**
 * Map icon identifiers to actual icon components
 * This is a reference for the frontend implementation
 */
export const ICON_MAP = {
  snowflake: 'Snowflake icon (AC/cooling)',
  flame: 'Flame icon (heating)',
  tools: 'Tools icon (installation/repair)',
  checkmark: 'Checkmark icon (maintenance)',
  alert: 'Alert/bell icon (emergency)',
  water: 'Water drop icon (plumbing)',
  droplet: 'Droplet icon (leak)',
  lightning: 'Lightning bolt icon (electrical)',
  plus: 'Plus icon (new installation)',
  plug: 'Plug icon (EV charger)',
  dots: 'Three dots icon (more/other)',
};

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate that all selected services have descriptions
 */
export function validateServices(
  businessType: string,
  selectedServices: string[]
): { valid: boolean; missing: string[] } {
  const descriptions = getServiceDescriptions(businessType, selectedServices);

  const missing = selectedServices.filter(
    (service) => !descriptions.find((d) => d.title === service)
  );

  return {
    valid: missing.length === 0,
    missing,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  HVAC_SERVICES,
  PLUMBING_SERVICES,
  ELECTRICIAN_SERVICES,
  getServiceDescriptions,
  getOtherServiceDescription,
  validateServices,
};
