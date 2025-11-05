import { test, expect } from '@playwright/test';

test.describe('Theme Toggle Debug', () => {
  test('should analyze theme toggle visibility', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take a full page screenshot
    await page.screenshot({ path: 'test-results/navbar-full.png', fullPage: false });

    // Check if ThemeToggle button exists in DOM
    const themeToggleButtons = page.locator('button[aria-label="Toggle theme"]');
    const count = await themeToggleButtons.count();
    console.log(`Found ${count} theme toggle buttons in DOM`);

    // Get all instances and their visibility
    for (let i = 0; i < count; i++) {
      const button = themeToggleButtons.nth(i);
      const isVisible = await button.isVisible();
      const boundingBox = await button.boundingBox();
      console.log(`Button ${i}: visible=${isVisible}, boundingBox=`, boundingBox);
    }

    // Check desktop navbar area
    const desktopNav = page.locator('.hidden.lg\\:flex');
    const desktopNavVisible = await desktopNav.isVisible();
    console.log(`Desktop nav visible: ${desktopNavVisible}`);

    // Check mobile nav area
    const mobileNav = page.locator('.flex.items-center.gap-3.lg\\:hidden');
    const mobileNavVisible = await mobileNav.isVisible();
    console.log(`Mobile nav visible: ${mobileNavVisible}`);

    // Take screenshot of just the navbar area
    const navbar = page.locator('.relative.z-\\[60\\]').first();
    await navbar.screenshot({ path: 'test-results/navbar-only.png' });

    // Check viewport size
    const viewportSize = page.viewportSize();
    console.log('Viewport size:', viewportSize);

    // Get computed styles of the theme toggle
    if (count > 0) {
      const styles = await themeToggleButtons.first().evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          display: computed.display,
          visibility: computed.visibility,
          opacity: computed.opacity,
          position: computed.position,
          width: computed.width,
          height: computed.height,
          zIndex: computed.zIndex,
        };
      });
      console.log('Theme toggle computed styles:', styles);
    }

    // Check if icons are loading
    const moonIcon = page.locator('svg').filter({ hasText: /moon/i });
    const sunIcon = page.locator('svg').filter({ hasText: /sun/i });
    console.log(`Moon icon count: ${await moonIcon.count()}`);
    console.log(`Sun icon count: ${await sunIcon.count()}`);

    // Try to find any button with the theme toggle classes
    const buttonsByClass = page.locator('button.rounded-lg.p-2\\.5');
    console.log(`Buttons with theme toggle classes: ${await buttonsByClass.count()}`);

    // Get navbar HTML for inspection
    const navbarHTML = await navbar.innerHTML();
    console.log('Navbar HTML snippet (first 500 chars):', navbarHTML.substring(0, 500));
  });

  test('should test theme toggle on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take screenshot
    await page.screenshot({ path: 'test-results/navbar-mobile.png', fullPage: false });

    // Check mobile nav visibility
    const mobileNavArea = page.locator('.flex.items-center.gap-3.lg\\:hidden');
    const isVisible = await mobileNavArea.isVisible();
    console.log(`Mobile nav area visible: ${isVisible}`);

    // Check for theme toggle in mobile
    const themeToggle = page.locator('button[aria-label="Toggle theme"]').first();
    const toggleVisible = await themeToggle.isVisible();
    console.log(`Theme toggle visible on mobile: ${toggleVisible}`);

    if (toggleVisible) {
      const boundingBox = await themeToggle.boundingBox();
      console.log('Theme toggle bounding box:', boundingBox);
    }
  });
});
