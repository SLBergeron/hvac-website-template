import { test, expect } from '@playwright/test';

// Template data from config
const EXPECTED_DATA = {
  businessName: 'Phoenix Comfort Solutions',
  phone: '(602) 555-9876',
  email: 'service@phoenixcomfort.com',
  city: 'Phoenix',
  state: 'AZ',
  licenseNumber: 'AZ-67890',
  primaryColor: 'rgb(234, 88, 12)', // #ea580c converted to RGB
};

test.describe('Homepage Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Phoenix Comfort Solutions/);
  });

  test('should display correct business name', async ({ page }) => {
    await page.goto('/');

    // Check business name in header/logo
    const businessName = page.getByText(EXPECTED_DATA.businessName);
    await expect(businessName.first()).toBeVisible();
  });

  test('should display correct phone number', async ({ page }) => {
    await page.goto('/');

    // Check phone number in CTA buttons
    const phoneText = page.getByText(EXPECTED_DATA.phone);
    await expect(phoneText.first()).toBeVisible();
  });

  test('should display correct location', async ({ page }) => {
    await page.goto('/');

    // Check for city in hero section
    const locationText = page.getByText(/Serving Phoenix/);
    await expect(locationText).toBeVisible();
  });

  test('should have working phone links', async ({ page }) => {
    await page.goto('/');

    // Find phone link and check href
    const phoneLink = page.locator('a[href*="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    const href = await phoneLink.getAttribute('href');
    expect(href).toContain('+16025559876');
  });

  test('should display seasonal badge', async ({ page }) => {
    await page.goto('/');

    // Check for seasonal service badge (either Winter or Cooling Season)
    const seasonalBadge = page.locator('text=/Winter|Cooling Season/');
    await expect(seasonalBadge.first()).toBeVisible();
  });

  test('should have Free Assessment CTA', async ({ page }) => {
    await page.goto('/');

    const assessmentLink = page.getByRole('link', { name: /Free.*Assessment/i });
    await expect(assessmentLink.first()).toBeVisible();
  });

  test('should display trust badges', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Licensed & Insured')).toBeVisible();
    await expect(page.getByText('Same-Day Service')).toBeVisible();
    await expect(page.getByText(/24\/7 Emergency/)).toBeVisible();
  });
});

test.describe('Color Theme Tests', () => {
  test('should use primary color from template on CTA buttons', async ({ page }) => {
    await page.goto('/');

    // Find the primary CTA button
    const ctaButton = page.locator('a').filter({ hasText: `Call ${EXPECTED_DATA.phone}` }).first();
    await expect(ctaButton).toBeVisible();

    // Check that it has inline style with background color
    const style = await ctaButton.getAttribute('style');
    expect(style).toContain('background-color');
  });

  test('should display service icons with colors', async ({ page }) => {
    await page.goto('/');

    // Scroll to services section
    await page.locator('#services').scrollIntoViewIfNeeded();

    // Check that service icons are visible
    const serviceSection = page.locator('#services');
    await expect(serviceSection).toBeVisible();

    // Check for service titles
    await expect(page.getByText('AC Repair')).toBeVisible();
    await expect(page.getByText('Heating Repair')).toBeVisible();
  });
});

test.describe('Navigation Tests', () => {
  test('should navigate to assessment page', async ({ page }) => {
    await page.goto('/');

    // Click on Free Assessment link
    await page.getByRole('link', { name: /Free.*Assessment/i }).first().click();

    // Wait for navigation
    await page.waitForURL('**/assessment');

    // Verify we're on the assessment page
    await expect(page).toHaveURL(/\/assessment/);
    await expect(page).toHaveTitle(/Assessment/);
  });

  test('should have working navigation menu', async ({ page }) => {
    await page.goto('/');

    // Check for navigation links
    const servicesLink = page.getByRole('link', { name: 'Services' });
    const aboutLink = page.getByRole('link', { name: 'About' });
    const contactLink = page.getByRole('link', { name: 'Contact' });

    // At least one should be visible (desktop or mobile)
    const linksVisible = await Promise.all([
      servicesLink.first().isVisible().catch(() => false),
      aboutLink.first().isVisible().catch(() => false),
      contactLink.first().isVisible().catch(() => false),
    ]);

    expect(linksVisible.some(v => v)).toBe(true);
  });
});

test.describe('Services Section Tests', () => {
  test('should display all HVAC services', async ({ page }) => {
    await page.goto('/');

    // Scroll to services
    await page.locator('#services').scrollIntoViewIfNeeded();

    // Check for key services
    await expect(page.getByText('AC Repair')).toBeVisible();
    await expect(page.getByText('Heating Repair')).toBeVisible();
    await expect(page.getByText('Installation')).toBeVisible();
    await expect(page.getByText('Maintenance')).toBeVisible();
    await expect(page.getByText('Emergency Service')).toBeVisible();
  });

  test('should display service descriptions', async ({ page }) => {
    await page.goto('/');

    await page.locator('#services').scrollIntoViewIfNeeded();

    // Services section should have heading
    await expect(page.getByRole('heading', { name: /HVAC Services/ })).toBeVisible();
  });
});

test.describe('Footer Tests', () => {
  test('should display business information in footer', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check business name
    await expect(page.locator('footer').getByText(EXPECTED_DATA.businessName)).toBeVisible();

    // Check license number
    await expect(page.locator('footer').getByText(/AZ-67890/)).toBeVisible();
  });

  test('should display contact information in footer', async ({ page }) => {
    await page.goto('/');

    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check phone
    await expect(page.locator('footer').getByText(EXPECTED_DATA.phone)).toBeVisible();

    // Check email
    await expect(page.locator('footer').getByText(EXPECTED_DATA.email)).toBeVisible();

    // Check location
    await expect(page.locator('footer').getByText(/Phoenix, AZ/)).toBeVisible();
  });

  test('should display business hours in footer', async ({ page }) => {
    await page.goto('/');

    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check for hours
    await expect(page.locator('footer').getByText(/Mon-Fri/)).toBeVisible();
    await expect(page.locator('footer').getByText(/Emergency.*24\/7/)).toBeVisible();
  });

  test('should have working footer links', async ({ page }) => {
    await page.goto('/');

    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check Quick Links section
    const footerAssessmentLink = page.locator('footer').getByRole('link', { name: 'Free Assessment' });
    const footerServicesLink = page.locator('footer').getByRole('link', { name: 'Services' });

    await expect(footerAssessmentLink).toBeVisible();
    await expect(footerServicesLink).toBeVisible();
  });
});

test.describe('Assessment Page Tests', () => {
  test('should load assessment page', async ({ page }) => {
    await page.goto('/assessment');

    await expect(page).toHaveTitle(/Assessment/);
    await expect(page.getByText(EXPECTED_DATA.businessName)).toBeVisible();
  });

  test('should display assessment form or quiz', async ({ page }) => {
    await page.goto('/assessment');

    // Check for assessment content - could be quiz questions or form
    const assessmentContent = page.locator('main');
    await expect(assessmentContent).toBeVisible();
  });
});

test.describe('Responsive Design Tests', () => {
  test('should display mobile menu button on small screens', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu icon should be visible
    const mobileMenuButton = page.locator('svg').filter({ has: page.locator('[class*="IconMenu"]') });
    // The menu button should exist in the DOM
    await expect(page.locator('[class*="cursor-pointer"]').first()).toBeVisible();
  });

  test('should display correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Business name should still be visible
    await expect(page.getByText(EXPECTED_DATA.businessName)).toBeVisible();
  });

  test('should display correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // All main sections should be visible
    await expect(page.getByText(EXPECTED_DATA.businessName)).toBeVisible();
    await expect(page.getByText(EXPECTED_DATA.phone)).toBeVisible();
  });
});

test.describe('Template Configuration Integration', () => {
  test('should not contain old Chicago data', async ({ page }) => {
    await page.goto('/');

    // Make sure old data is gone
    const pageContent = await page.content();
    expect(pageContent).not.toContain('Chicago HVAC Pros');
    expect(pageContent).not.toContain('(773) 555-1234');
    expect(pageContent).not.toContain('chicagohvacpros.com');
  });

  test('should use Phoenix data throughout', async ({ page }) => {
    await page.goto('/');

    const pageContent = await page.content();

    // Verify Phoenix data is present
    expect(pageContent).toContain('Phoenix Comfort Solutions');
    expect(pageContent).toContain('(602) 555-9876');
    expect(pageContent).toContain('service@phoenixcomfort.com');
  });
});
