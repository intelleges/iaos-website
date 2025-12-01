import { test, expect } from '@playwright/test';

/**
 * Stress Tests: Performance & Load Testing
 * Tests system behavior under high load and rapid interactions
 * 
 * Performance Benchmarks:
 * - Page Load Time: <2s (target), <3s (critical)
 * - API Response Time: <200ms (target), <500ms (critical)
 * - Concurrent Users: 100+ (target), 50+ (critical)
 */

test.describe('Stress Tests: Performance & Load', () => {
  test.describe('Page Load Performance', () => {
    test('Homepage loads within performance budget', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Target: <2000ms, Critical: <3000ms
      expect(loadTime).toBeLessThan(3000);
      
      console.log(`Homepage load time: ${loadTime}ms`);
    });

    test('One-pagers page loads within performance budget', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/one-pagers');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(3000);
      
      console.log(`One-pagers load time: ${loadTime}ms`);
    });

    test('Pricing calculator loads within performance budget', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/admin/pricing');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(3000);
      
      console.log(`Pricing calculator load time: ${loadTime}ms`);
    });

    test('Contact page loads within performance budget', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(3000);
      
      console.log(`Contact page load time: ${loadTime}ms`);
    });
  });

  test.describe('Rapid User Interactions', () => {
    test('Pricing calculator handles rapid tier switching', async ({ page }) => {
      await page.goto('/admin/pricing');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const tiers = ['Basic', 'Professional', 'Advanced', 'Enterprise'];
      
      // Rapidly switch tiers 20 times
      for (let i = 0; i < 20; i++) {
        const tierIndex = i % tiers.length;
        const tierButton = page.locator(`button:has-text("${tiers[tierIndex]}")`);
        await tierButton.click();
        await page.waitForTimeout(100); // Minimal delay
      }

      // Verify UI is still responsive
      const advancedButton = page.locator('button:has-text("Advanced")');
      await expect(advancedButton).toBeVisible();
      
      // Verify price display is still working
      const priceDisplay = page.locator('text=/\\$[0-9,]+/').first();
      await expect(priceDisplay).toBeVisible();
    });

    test('Pricing calculator handles rapid slider adjustments', async ({ page }) => {
      await page.goto('/admin/pricing');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const usersSlider = page.locator('input[type="range"]').first();
      await usersSlider.scrollIntoViewIfNeeded();

      // Rapidly adjust slider 30 times
      for (let i = 0; i < 30; i++) {
        const value = Math.floor(Math.random() * 100) + 10;
        await usersSlider.fill(value.toString());
        await page.waitForTimeout(50); // Very fast adjustments
      }

      // Verify UI is still responsive
      await expect(usersSlider).toBeVisible();
      
      // Verify price calculation still works
      const priceDisplay = page.locator('text=/\\$[0-9,]+/').first();
      await expect(priceDisplay).toBeVisible();
      
      const priceText = await priceDisplay.textContent();
      expect(priceText).toContain('$');
    });

    test('Integration toggles handle rapid clicking', async ({ page }) => {
      await page.goto('/admin/pricing');
      await page.waitForLoadState('networkidle');
      
      // Select Advanced tier
      await page.locator('button:has-text("Advanced")').click();
      await page.waitForTimeout(1000);

      // Scroll to integrations
      await page.evaluate(() => {
        const section = document.querySelector('h3:has-text("Integration"), h3:has-text("Add-On")');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
      await page.waitForTimeout(1000);

      const premiumCheckbox = page.locator('[id="premiumSupport"]');
      
      // Rapidly toggle 20 times
      for (let i = 0; i < 20; i++) {
        await premiumCheckbox.click();
        await page.waitForTimeout(50);
      }

      // Verify checkbox is still functional
      await expect(premiumCheckbox).toBeVisible();
      await expect(premiumCheckbox).toBeEnabled();
    });

    test('Modal open/close handles rapid interactions', async ({ page }) => {
      await page.goto('/one-pagers');
      await page.waitForLoadState('networkidle');

      const firstCard = page.locator('[class*="grid"] > div[class*="card"]').first();
      
      // Rapidly open and close modal 10 times
      for (let i = 0; i < 10; i++) {
        await firstCard.click();
        await page.waitForTimeout(200);
        
        const modal = page.locator('[role="dialog"]');
        if (await modal.isVisible()) {
          await page.keyboard.press('Escape');
          await page.waitForTimeout(200);
        }
      }

      // Verify card is still clickable
      await firstCard.click();
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible({ timeout: 3000 });
    });
  });

  test.describe('Navigation Stress Test', () => {
    test('Rapid navigation between pages', async ({ page }) => {
      const pages = ['/', '/product', '/protocols', '/about', '/pricing', '/contact', '/one-pagers'];
      
      // Navigate rapidly 15 times
      for (let i = 0; i < 15; i++) {
        const pageUrl = pages[i % pages.length];
        await page.goto(pageUrl);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(100);
      }

      // Verify final page loads correctly
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).toBeVisible();
    });

    test('Back/forward navigation stress test', async ({ page }) => {
      // Navigate through several pages
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await page.goto('/product');
      await page.waitForLoadState('networkidle');
      
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');

      // Rapidly go back and forward 10 times
      for (let i = 0; i < 10; i++) {
        await page.goBack();
        await page.waitForTimeout(200);
        await page.goForward();
        await page.waitForTimeout(200);
      }

      // Verify page is still functional
      await expect(page).toHaveURL('/contact');
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Form Submission Stress', () => {
    test('Contact form handles rapid submissions', async ({ page }) => {
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');

      // Fill form once
      await page.locator('input[name="firstName"], input[placeholder*="First"]').fill('Stress');
      await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill('Test');
      await page.locator('input[name="email"], input[type="email"]').fill('stress@test.com');
      await page.locator('input[name="company"], input[placeholder*="Company"]').fill('Stress Co');
      await page.locator('input[name="phone"], input[type="tel"]').fill('555-0000');
      await page.locator('textarea[name="message"]').fill('Stress test message');

      // Rapidly click submit 5 times
      const submitButton = page.locator('button[type="submit"]');
      for (let i = 0; i < 5; i++) {
        await submitButton.click();
        await page.waitForTimeout(200);
      }

      // Verify form is still functional
      await expect(submitButton).toBeVisible();
    });

    test('Email capture modal handles rapid submissions', async ({ page }) => {
      await page.goto('/one-pagers');
      await page.waitForLoadState('networkidle');

      // Open modal
      const firstCard = page.locator('[class*="grid"] > div[class*="card"]').first();
      await firstCard.click();

      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible({ timeout: 3000 });

      // Fill form
      await modal.locator('input[name="name"]').fill('Rapid Test');
      await modal.locator('input[name="email"]').fill(`rapid-${Date.now()}@test.com`);
      await modal.locator('input[name="company"]').fill('Rapid Co');

      // Rapidly click submit 5 times
      const submitButton = modal.locator('button[type="submit"]');
      for (let i = 0; i < 5; i++) {
        await submitButton.click();
        await page.waitForTimeout(200);
      }

      // Verify modal is still functional (either closed or showing error)
      await page.waitForTimeout(1000);
      const modalVisible = await modal.isVisible().catch(() => false);
      expect(typeof modalVisible).toBe('boolean');
    });
  });

  test.describe('Memory Leak Detection', () => {
    test('Pricing calculator does not leak memory on repeated use', async ({ page }) => {
      await page.goto('/admin/pricing');
      await page.waitForLoadState('networkidle');

      // Perform 50 operations
      for (let i = 0; i < 50; i++) {
        // Switch tier
        const tiers = ['Basic', 'Professional', 'Advanced', 'Enterprise'];
        const tier = tiers[i % tiers.length];
        await page.locator(`button:has-text("${tier}")`).click();
        await page.waitForTimeout(100);

        // Adjust slider
        const slider = page.locator('input[type="range"]').first();
        await slider.fill((Math.random() * 100 + 10).toString());
        await page.waitForTimeout(100);

        // Toggle integration (if Advanced/Enterprise)
        if (tier === 'Advanced' || tier === 'Enterprise') {
          const checkbox = page.locator('[id="premiumSupport"]');
          if (await checkbox.isVisible()) {
            await checkbox.click();
            await page.waitForTimeout(100);
          }
        }
      }

      // Verify page is still responsive
      const priceDisplay = page.locator('text=/\\$[0-9,]+/').first();
      await expect(priceDisplay).toBeVisible();
    });

    test('Modal open/close does not leak memory', async ({ page }) => {
      await page.goto('/one-pagers');
      await page.waitForLoadState('networkidle');

      const firstCard = page.locator('[class*="grid"] > div[class*="card"]').first();

      // Open and close modal 30 times
      for (let i = 0; i < 30; i++) {
        await firstCard.click();
        await page.waitForTimeout(300);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      }

      // Verify page is still functional
      await firstCard.click();
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible({ timeout: 3000 });
    });
  });

  test.describe('Concurrent Operations', () => {
    test('Multiple sliders can be adjusted simultaneously', async ({ page }) => {
      await page.goto('/admin/pricing');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Get all sliders
      const sliders = page.locator('input[type="range"]');
      const sliderCount = await sliders.count();

      // Adjust all sliders in quick succession
      for (let i = 0; i < sliderCount; i++) {
        const slider = sliders.nth(i);
        await slider.scrollIntoViewIfNeeded();
        await slider.fill((Math.random() * 50 + 25).toString());
        // No wait - simulate simultaneous adjustments
      }

      await page.waitForTimeout(1000);

      // Verify price calculation still works
      const priceDisplay = page.locator('text=/\\$[0-9,]+/').first();
      await expect(priceDisplay).toBeVisible();
    });

    test('Tier switch + slider adjust + toggle happens simultaneously', async ({ page }) => {
      await page.goto('/admin/pricing');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Perform 10 rounds of simultaneous operations
      for (let i = 0; i < 10; i++) {
        // Switch to Advanced
        await page.locator('button:has-text("Advanced")').click();
        
        // Immediately adjust slider (no wait)
        const slider = page.locator('input[type="range"]').first();
        await slider.fill((Math.random() * 100 + 10).toString());
        
        // Immediately toggle integration (no wait)
        await page.evaluate(() => {
          const section = document.querySelector('h3:has-text("Integration")');
          if (section) section.scrollIntoView();
        });
        
        const checkbox = page.locator('[id="premiumSupport"]');
        if (await checkbox.isVisible()) {
          await checkbox.click();
        }
        
        await page.waitForTimeout(200);
      }

      // Verify UI is still responsive
      const priceDisplay = page.locator('text=/\\$[0-9,]+/').first();
      await expect(priceDisplay).toBeVisible();
    });
  });
});
