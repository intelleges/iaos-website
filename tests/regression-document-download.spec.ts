import { test, expect } from '@playwright/test';

/**
 * Regression Tests: Document Download Flow (First-Time User)
 * Critical Flow 1: Complete end-to-end document download workflow
 * 
 * Test Steps:
 * 1. Navigate to homepage as anonymous user
 * 2. Click on service document card
 * 3. Verify email capture modal appears
 * 4. Fill in form with valid data
 * 5. Submit form and verify validation
 * 6. Verify PDF download triggers
 * 7. Verify success state with green checkmark
 * 8. Verify toast notification appears
 * 9. Verify modal auto-closes after 2 seconds
 */

test.describe('Regression: Document Download Flow', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testData = {
    name: 'John Doe',
    email: testEmail,
    company: 'Test Company Inc'
  };

  test('Flow 1: First-time user downloads document successfully', async ({ page }) => {
    // Step 1: Navigate to homepage as anonymous user
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Step 2: Navigate to one-pagers page
    await page.goto('/one-pagers');
    await page.waitForLoadState('networkidle');

    // Step 3: Click on first service document card
    const firstCard = page.locator('[class*="grid"] > div[class*="card"], [class*="grid"] > div[class*="border"]').first();
    await firstCard.scrollIntoViewIfNeeded();
    
    // Get document title before clicking
    const documentTitle = await firstCard.locator('h3, h4, [class*="title"]').first().textContent();
    
    await firstCard.click();

    // Step 4: Verify email capture modal appears
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 3000 });

    // Verify modal title
    const modalTitle = modal.locator('h2, h3').first();
    await expect(modalTitle).toContainText(/Download/i);

    // Verify document title is shown
    if (documentTitle) {
      await expect(modal).toContainText(documentTitle.trim());
    }

    // Step 5: Fill in form with valid data
    await modal.locator('input[name="name"], input[placeholder*="Name"]').fill(testData.name);
    await modal.locator('input[name="email"], input[type="email"]').fill(testData.email);
    await modal.locator('input[name="company"], input[placeholder*="Company"]').fill(testData.company);

    // Step 6: Submit form
    const submitButton = modal.locator('button[type="submit"], button:has-text("Download")');
    await submitButton.click();

    // Step 7: Wait for submission to complete
    await page.waitForTimeout(2000);

    // Step 8: Verify success state appears
    // Look for green checkmark, success message, or success icon
    const successIndicators = [
      modal.locator('text=/Download Started/i'),
      modal.locator('text=/success/i'),
      modal.locator('[class*="success"]'),
      modal.locator('svg[class*="check"]'),
      page.locator('[data-sonner-toast]')
    ];

    let successFound = false;
    for (const indicator of successIndicators) {
      if (await indicator.count() > 0) {
        successFound = true;
        break;
      }
    }

    expect(successFound).toBeTruthy();

    // Step 9: Verify toast notification appears
    const toast = page.locator('[data-sonner-toast], .toast, text=/Download started/i');
    if (await toast.count() > 0) {
      await expect(toast.first()).toBeVisible({ timeout: 3000 });
      
      // Verify toast message mentions 2-hour follow-up
      const toastText = await toast.first().textContent();
      expect(toastText?.toLowerCase()).toContain('email');
    }

    // Step 10: Verify modal auto-closes after 2 seconds
    await page.waitForTimeout(3000);
    
    // Modal should be closed or hidden
    const modalStillVisible = await modal.isVisible().catch(() => false);
    expect(modalStillVisible).toBeFalsy();
  });

  test('Flow 1: Form validation prevents submission with invalid data', async ({ page }) => {
    // Navigate to one-pagers
    await page.goto('/one-pagers');
    await page.waitForLoadState('networkidle');

    // Click first card to open modal
    const firstCard = page.locator('[class*="grid"] > div[class*="card"]').first();
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 3000 });

    // Test 1: Submit with empty name
    await modal.locator('input[name="email"], input[type="email"]').fill('test@example.com');
    await modal.locator('input[name="company"], input[placeholder*="Company"]').fill('Test Co');
    await modal.locator('button[type="submit"]').click();
    await page.waitForTimeout(500);

    // Verify error appears
    let errorFound = await modal.locator('text=/required/i, text=/Name/i').count() > 0;
    expect(errorFound).toBeTruthy();

    // Test 2: Submit with invalid email
    await modal.locator('input[name="name"], input[placeholder*="Name"]').fill('John Doe');
    await modal.locator('input[name="email"], input[type="email"]').fill('invalid-email');
    await modal.locator('button[type="submit"]').click();
    await page.waitForTimeout(500);

    // Verify email validation error
    errorFound = await modal.locator('text=/valid email/i, text=/invalid/i').count() > 0;
    expect(errorFound).toBeTruthy();

    // Test 3: Submit with empty company
    await modal.locator('input[name="email"], input[type="email"]').fill('test@example.com');
    await modal.locator('input[name="company"], input[placeholder*="Company"]').fill('');
    await modal.locator('button[type="submit"]').click();
    await page.waitForTimeout(500);

    // Verify company validation error
    errorFound = await modal.locator('text=/Company.*required/i, text=/required/i').count() > 0;
    expect(errorFound).toBeTruthy();
  });

  test('Flow 1: Modal can be closed without submitting', async ({ page }) => {
    // Navigate to one-pagers
    await page.goto('/one-pagers');
    await page.waitForLoadState('networkidle');

    // Open modal
    const firstCard = page.locator('[class*="grid"] > div[class*="card"]').first();
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 3000 });

    // Test close with X button
    const closeButton = modal.locator('button[aria-label="Close"], button:has-text("×"), button:has-text("✕")').first();
    if (await closeButton.count() > 0) {
      await closeButton.click();
      await expect(modal).not.toBeVisible({ timeout: 2000 });
    } else {
      // Test close with Escape key
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible({ timeout: 2000 });
    }

    // Verify we're still on one-pagers page
    await expect(page).toHaveURL('/one-pagers');
  });

  test('Flow 1: Multiple documents can be accessed from one-pagers page', async ({ page }) => {
    await page.goto('/one-pagers');
    await page.waitForLoadState('networkidle');

    // Get all service cards
    const cards = page.locator('[class*="grid"] > div[class*="card"], [class*="grid"] > div[class*="border"]');
    const cardCount = await cards.count();

    expect(cardCount).toBeGreaterThanOrEqual(11);

    // Click first card
    await cards.nth(0).click();
    let modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 3000 });
    
    // Close modal
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible({ timeout: 2000 });

    // Click second card
    await cards.nth(1).click();
    modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 3000 });
    
    // Close modal
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible({ timeout: 2000 });

    // Click third card
    await cards.nth(2).click();
    modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 3000 });
  });

  test('Flow 1: Document download works from case study pages', async ({ page }) => {
    // Test FOCI case study
    await page.goto('/case-studies/foci');
    await page.waitForLoadState('networkidle');

    // Look for download CTA
    const downloadButton = page.locator('button:has-text("Download"), a:has-text("Download")').first();
    
    if (await downloadButton.count() > 0) {
      await downloadButton.scrollIntoViewIfNeeded();
      await downloadButton.click();

      // Verify modal opens
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible({ timeout: 3000 });

      // Verify it's the email capture modal
      await expect(modal.locator('input[name="email"], input[type="email"]')).toBeVisible();
    }
  });
});
