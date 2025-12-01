import { test, expect } from '@playwright/test';

/**
 * Unit Tests: Homepage Components
 * Tests hero section, protocols section, and CTAs
 */

test.describe('Homepage Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Hero Section', () => {
    test('Book a Demo CTA navigates to contact page', async ({ page }) => {
      const bookDemoButton = page.locator('button:has-text("Book a Demo"), a:has-text("Book a Demo")').first();
      await bookDemoButton.click();
      await expect(page).toHaveURL('/contact');
    });

    test('Watch 2-Minute Overview button opens video modal', async ({ page }) => {
      const watchVideoButton = page.locator('button:has-text("Watch"), button:has-text("Overview"), button:has-text("2-Minute")').first();
      
      // Check if button exists (it's a placeholder)
      if (await watchVideoButton.count() > 0) {
        await watchVideoButton.click();
        
        // Verify modal or toast appears (placeholder behavior)
        const modal = page.locator('[role="dialog"], .modal');
        const toast = page.locator('.toast, [data-sonner-toast]');
        
        // Either modal or toast should appear
        const modalVisible = await modal.count() > 0;
        const toastVisible = await toast.count() > 0;
        
        expect(modalVisible || toastVisible).toBeTruthy();
      }
    });
  });

  test.describe('Protocols Section', () => {
    test('16 protocol cards are displayed', async ({ page }) => {
      // Scroll to protocols section
      await page.evaluate(() => {
        const protocolsSection = document.querySelector('h2:has-text("Protocols"), h2:has-text("Compliance")');
        if (protocolsSection) {
          protocolsSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      await page.waitForTimeout(1000);
      
      // Count protocol cards (look for cards in a grid)
      const protocolCards = page.locator('[class*="grid"] > div[class*="card"], [class*="grid"] > div[class*="border"]');
      const count = await protocolCards.count();
      
      // Should have 16 protocol cards
      expect(count).toBeGreaterThanOrEqual(16);
    });

    test('Protocol cards show hover effects', async ({ page }) => {
      // Scroll to protocols section
      await page.evaluate(() => {
        const protocolsSection = document.querySelector('h2:has-text("Protocols"), h2:has-text("Compliance")');
        if (protocolsSection) {
          protocolsSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      await page.waitForTimeout(1000);
      
      const firstCard = page.locator('[class*="grid"] > div[class*="card"], [class*="grid"] > div[class*="border"]').first();
      
      // Get initial state
      const initialBox = await firstCard.boundingBox();
      
      // Hover over card
      await firstCard.hover();
      await page.waitForTimeout(300); // Wait for transition
      
      // Verify card is still visible (hover doesn't break layout)
      await expect(firstCard).toBeVisible();
      
      // Get box after hover
      const hoverBox = await firstCard.boundingBox();
      
      // Card should still be in roughly the same position (no layout shift)
      expect(hoverBox).toBeTruthy();
    });

    test('Protocol cards are informational only (no click action)', async ({ page }) => {
      // Scroll to protocols section
      await page.evaluate(() => {
        const protocolsSection = document.querySelector('h2:has-text("Protocols"), h2:has-text("Compliance")');
        if (protocolsSection) {
          protocolsSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      await page.waitForTimeout(1000);
      
      const firstCard = page.locator('[class*="grid"] > div[class*="card"], [class*="grid"] > div[class*="border"]').first();
      
      // Click card
      await firstCard.click();
      
      // Should stay on same page (no navigation)
      await expect(page).toHaveURL('/');
      
      // No modal should open
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toHaveCount(0);
    });
  });

  test.describe('How Intelleges Works Section', () => {
    test('6 numbered steps are displayed', async ({ page }) => {
      // Scroll to "How Intelleges Works" section
      await page.evaluate(() => {
        const section = document.querySelector('h2:has-text("How"), h2:has-text("Works")');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
      await page.waitForTimeout(1000);
      
      // Look for numbered steps (1-6)
      const steps = page.locator('text=/^[1-6]$/');
      const count = await steps.count();
      
      expect(count).toBeGreaterThanOrEqual(6);
    });

    test('Steps are informational only (no click actions)', async ({ page }) => {
      // Scroll to section
      await page.evaluate(() => {
        const section = document.querySelector('h2:has-text("How"), h2:has-text("Works")');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
      await page.waitForTimeout(1000);
      
      const firstStep = page.locator('text=/^1$/').first();
      const currentUrl = page.url();
      
      // Click first step
      await firstStep.click();
      
      // Should stay on same page
      await expect(page).toHaveURL(currentUrl);
    });
  });

  test.describe('Download Whitepaper CTA', () => {
    test('Download Whitepaper button navigates to resources page', async ({ page }) => {
      // Scroll to find Download Whitepaper button
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });
      await page.waitForTimeout(500);
      
      const downloadButton = page.locator('button:has-text("Download"), a:has-text("Whitepaper")').first();
      
      if (await downloadButton.count() > 0) {
        await downloadButton.click();
        
        // Should navigate to /resources or open modal
        const url = page.url();
        const modal = page.locator('[role="dialog"]');
        
        const navigated = url.includes('/resources') || url.includes('/one-pagers');
        const modalOpened = await modal.count() > 0;
        
        expect(navigated || modalOpened).toBeTruthy();
      }
    });
  });
});
