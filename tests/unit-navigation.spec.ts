import { test, expect } from '@playwright/test';

/**
 * Unit Tests: Navigation & Header Components
 * Tests all clickable elements in global navigation and footer
 */

test.describe('Global Navigation & Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Header Navigation', () => {
    test('Logo click navigates to homepage', async ({ page }) => {
      // Navigate away first
      await page.goto('/about');
      
      // Click logo
      await page.click('a[href="/"]');
      
      // Verify we're on homepage
      await expect(page).toHaveURL('/');
    });

    test('Product menu navigates to /product', async ({ page }) => {
      await page.click('a[href="/product"]');
      await expect(page).toHaveURL('/product');
    });

    test('Protocols menu navigates to /protocols', async ({ page }) => {
      await page.click('a[href="/protocols"]');
      await expect(page).toHaveURL('/protocols');
    });

    test('About menu navigates to /about', async ({ page }) => {
      await page.click('a[href="/about"]');
      await expect(page).toHaveURL('/about');
    });

    test('Pricing menu navigates to /pricing', async ({ page }) => {
      await page.click('a[href="/pricing"]');
      await expect(page).toHaveURL('/pricing');
    });

    test('Contact menu navigates to /contact', async ({ page }) => {
      await page.click('a[href="/contact"]');
      await expect(page).toHaveURL('/contact');
    });

    test('Client Login button opens OAuth portal', async ({ page }) => {
      // Get the OAuth portal URL from env or use expected pattern
      const clientLoginLink = page.locator('a:has-text("Client Login")').first();
      
      // Verify link exists and has href
      await expect(clientLoginLink).toBeVisible();
      const href = await clientLoginLink.getAttribute('href');
      expect(href).toBeTruthy();
      
      // Verify it's an external OAuth URL (not internal route)
      expect(href).toMatch(/^https?:\/\//);
    });

    test('Book a Demo button navigates to /contact', async ({ page }) => {
      const bookDemoButton = page.locator('a:has-text("Book a Demo")').first();
      await bookDemoButton.click();
      await expect(page).toHaveURL('/contact');
    });
  });

  test.describe('Footer Navigation', () => {
    test.beforeEach(async ({ page }) => {
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
    });

    test('Footer Product links navigate correctly', async ({ page }) => {
      const footer = page.locator('footer');
      
      // Test Overview link
      await footer.locator('a[href="/product"]').click();
      await expect(page).toHaveURL('/product');
      
      await page.goBack();
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Test Protocols link
      await footer.locator('a[href="/protocols"]').click();
      await expect(page).toHaveURL('/protocols');
      
      await page.goBack();
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Test Pricing link
      await footer.locator('a[href="/pricing"]').click();
      await expect(page).toHaveURL('/pricing');
    });

    test('Footer Company links navigate correctly', async ({ page }) => {
      const footer = page.locator('footer');
      
      // Test About link
      await footer.locator('a[href="/about"]').click();
      await expect(page).toHaveURL('/about');
      
      await page.goBack();
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Test Contact link
      await footer.locator('a[href="/contact"]').click();
      await expect(page).toHaveURL('/contact');
    });

    test('Footer phone number link initiates call', async ({ page }) => {
      const footer = page.locator('footer');
      const phoneLink = footer.locator('a[href*="tel:"]');
      
      await expect(phoneLink).toBeVisible();
      const href = await phoneLink.getAttribute('href');
      expect(href).toMatch(/^tel:\+?[\d-]+$/);
    });

    test('Footer Resources links navigate correctly', async ({ page }) => {
      const footer = page.locator('footer');
      
      // Test Case Studies link
      await footer.locator('a[href="/case-studies"]').click();
      await expect(page).toHaveURL('/case-studies');
      
      await page.goBack();
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Test Resources/One-Pagers link
      await footer.locator('a[href="/resources"], a[href="/one-pagers"]').first().click();
      await expect(page).toHaveURL(/\/(resources|one-pagers)/);
    });

    test('Footer Legal links navigate correctly', async ({ page }) => {
      const footer = page.locator('footer');
      
      // Test Security link
      const securityLink = footer.locator('a[href="/security"]');
      if (await securityLink.count() > 0) {
        await securityLink.click();
        await expect(page).toHaveURL('/security');
        await page.goBack();
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      }
      
      // Test Privacy link
      const privacyLink = footer.locator('a[href="/privacy"]');
      if (await privacyLink.count() > 0) {
        await privacyLink.click();
        await expect(page).toHaveURL('/privacy');
        await page.goBack();
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      }
      
      // Test Terms link
      const termsLink = footer.locator('a[href="/terms"]');
      if (await termsLink.count() > 0) {
        await termsLink.click();
        await expect(page).toHaveURL('/terms');
      }
    });

    test('Footer Client Login navigates to OAuth portal', async ({ page }) => {
      const footer = page.locator('footer');
      const clientLoginLink = footer.locator('a:has-text("Client Login")');
      
      await expect(clientLoginLink).toBeVisible();
      const href = await clientLoginLink.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    });
  });
});
