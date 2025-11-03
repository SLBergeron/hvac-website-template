/**
 * Seasonal Hero Logic
 *
 * Determines which hero version to show based on:
 * - Current month
 * - Business location (state)
 *
 * HVAC is inherently seasonal:
 * - Winter: "Stay warm" messaging (heating urgency)
 * - Summer: "Keep cool" messaging (cooling urgency)
 */

// ============================================================================
// TYPES
// ============================================================================

export type HeroVersion = 'cold' | 'hot';

export interface HeroContent {
  version: HeroVersion;
  headline: string;
  subheadline: string;
}

// ============================================================================
// GEOGRAPHIC DATA
// ============================================================================

/**
 * Northern states with cold winters
 * These rotate between cold/hot seasons
 */
const NORTHERN_STATES = [
  'AK', // Alaska
  'CT', // Connecticut
  'IL', // Illinois
  'IN', // Indiana
  'IA', // Iowa
  'ME', // Maine
  'MA', // Massachusetts
  'MI', // Michigan
  'MN', // Minnesota
  'NH', // New Hampshire
  'NJ', // New Jersey
  'NY', // New York
  'ND', // North Dakota
  'OH', // Ohio
  'PA', // Pennsylvania
  'RI', // Rhode Island
  'SD', // South Dakota
  'VT', // Vermont
  'WI', // Wisconsin
  'WY', // Wyoming
  'MT', // Montana
  'ID', // Idaho
  'WA', // Washington
  'OR', // Oregon
  'NE', // Nebraska
  'KS', // Kansas
  'MO', // Missouri
  'CO', // Colorado
  'UT', // Utah
];

/**
 * Southern/warm states
 * These use "hot" season year-round or nearly year-round
 */
const SOUTHERN_STATES = [
  'AL', // Alabama
  'AZ', // Arizona
  'AR', // Arkansas
  'CA', // California
  'FL', // Florida
  'GA', // Georgia
  'HI', // Hawaii
  'LA', // Louisiana
  'MS', // Mississippi
  'NV', // Nevada
  'NM', // New Mexico
  'NC', // North Carolina
  'OK', // Oklahoma
  'SC', // South Carolina
  'TN', // Tennessee
  'TX', // Texas
];

// ============================================================================
// SEASON DETECTION
// ============================================================================

/**
 * Determine which hero version to show
 *
 * Logic:
 * - Northern states: Cold season (Nov-Apr), Hot season (May-Oct)
 * - Southern states: Hot season year-round
 * - Other states: Use hot season (safer default)
 */
export function getHeroVersion(
  state: string,
  month?: number // 0-11, optional (defaults to current month)
): HeroVersion {
  const currentMonth = month !== undefined ? month : new Date().getMonth();

  // Check if northern state
  if (NORTHERN_STATES.includes(state.toUpperCase())) {
    // Cold season: November (10) through April (3)
    // Months: 10, 11, 0, 1, 2, 3
    const isColdSeason = currentMonth >= 10 || currentMonth <= 3;
    return isColdSeason ? 'cold' : 'hot';
  }

  // Southern states or unknown: hot season year-round
  return 'hot';
}

// ============================================================================
// HERO CONTENT
// ============================================================================

/**
 * Get hero content based on business type and season
 */
export function getHeroContent(
  businessType: string,
  heroVersion: HeroVersion
): HeroContent {
  // HVAC-specific content
  if (businessType === 'HVAC') {
    if (heroVersion === 'cold') {
      return {
        version: 'cold',
        headline: 'Stay Warm This Winter',
        subheadline: 'Fast, Reliable HVAC Service',
      };
    } else {
      return {
        version: 'hot',
        headline: 'Keep Your Home Comfortable',
        subheadline: 'Fast, Reliable HVAC Service',
      };
    }
  }

  // Plumbing - less seasonal, but still use urgency
  if (businessType === 'Plumbing') {
    if (heroVersion === 'cold') {
      return {
        version: 'cold',
        headline: 'Plumbing Problems? We Fix Them Fast',
        subheadline: 'Burst Pipes, Leaks, and Emergency Repairs',
      };
    } else {
      return {
        version: 'hot',
        headline: 'Plumbing Problems? We Fix Them Fast',
        subheadline: 'Repairs, Installations, and Emergency Service',
      };
    }
  }

  // Electrician - not very seasonal
  if (businessType === 'Electrician') {
    return {
      version: heroVersion,
      headline: 'Electrical Problems? We Fix Them Fast',
      subheadline: 'Repairs, Installations, and Emergency Service',
    };
  }

  // Generic fallback for "Other"
  return {
    version: heroVersion,
    headline: 'Fast, Reliable Service',
    subheadline: 'Professional Service You Can Trust',
  };
}

/**
 * Get complete hero content with all variables
 */
export function getCompleteHeroContent(
  businessType: string,
  state: string,
  month?: number
): HeroContent {
  const heroVersion = getHeroVersion(state, month);
  return getHeroContent(businessType, heroVersion);
}

// ============================================================================
// TESTING HELPERS
// ============================================================================

/**
 * Test hero version for different months and states
 * Useful for deployment testing
 */
export function testHeroVersions() {
  const testCases = [
    { state: 'IL', month: 0, expected: 'cold' }, // January in Illinois
    { state: 'IL', month: 6, expected: 'hot' }, // July in Illinois
    { state: 'FL', month: 0, expected: 'hot' }, // January in Florida
    { state: 'FL', month: 6, expected: 'hot' }, // July in Florida
    { state: 'NY', month: 11, expected: 'cold' }, // December in New York
    { state: 'CA', month: 11, expected: 'hot' }, // December in California
  ];

  console.log('Hero Version Test Results:');
  testCases.forEach(({ state, month, expected }) => {
    const actual = getHeroVersion(state, month);
    const pass = actual === expected ? '✓' : '✗';
    console.log(`${pass} ${state} in month ${month}: ${actual} (expected ${expected})`);
  });
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  getHeroVersion,
  getHeroContent,
  getCompleteHeroContent,
  testHeroVersions,
};
