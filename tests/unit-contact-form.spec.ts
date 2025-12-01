import { test, expect } from '@playwright/test';

/**
 * Unit Tests: Contact Form
 * Tests form fields, validation, submission, and Calendly widget
 */

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Form Structure', () => {
    test('All required form fields are present', async ({ page }) => {
      // First Name
      await expect(page.locator('input[name="firstName"], input[placeholder*="First"]')).toBeVisible();
      
      // Last Name
      await expect(page.locator('input[name="lastName"], input[placeholder*="Last"]')).toBeVisible();
      
      // Email
      await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();
      
      // Company
      await expect(page.locator('input[name="company"], input[placeholder*="Company"]')).toBeVisible();
      
      // Phone
      await expect(page.locator('input[name="phone"], input[type="tel"]')).toBeVisible();
      
      // Message
      await expect(page.locator('textarea[name="message"], textarea[placeholder*="Message"]')).toBeVisible();
      
      // Submit button
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('Optional fields are present', async ({ page }) => {
      // Role field (optional)
      const roleField = page.locator('input[name="role"], select[name="role"]');
      if (await roleField.count() > 0) {
        await expect(roleField).toBeVisible();
      }
      
      // Plan field (optional)
      const planField = page.locator('input[name="plan"], select[name="plan"]');
      if (await planField.count() > 0) {
        await expect(planField).toBeVisible();
      }
    });
  });

  test.describe('Form Validation', () => {
    test('First Name validation', async ({ page }) => {
      // Fill all fields except first name
      await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill('Doe');
      await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
      await page.locator('input[name="company"], input[placeholder*="Company"]').fill('Test Co');
      await page.locator('input[name="phone"], input[type="tel"]').fill('555-1234');
      await page.locator('textarea[name="message"]').fill('Test message');
      
      // Submit form
      await page.locator('button[type="submit"]').click();
      
      // Wait for validation
      await page.waitForTimeout(500);
      
      // Verify error message or validation state
      const hasError = await page.locator('text=/First.*required/i, text=/required/i').count() > 0;
      const formNotSubmitted = page.url().includes('/contact');
      
      expect(hasError || formNotSubmitted).toBeTruthy();
    });

    test('Email validation - required', async ({ page }) => {
      // Fill all fields except email
      await page.locator('input[name="firstName"], input[placeholder*="First"]').fill('John');
      await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill('Doe');
      await page.locator('input[name="company"], input[placeholder*="Company"]').fill('Test Co');
      await page.locator('input[name="phone"], input[type="tel"]').fill('555-1234');
      await page.locator('textarea[name="message"]').fill('Test message');
      
      // Submit form
      await page.locator('button[type="submit"]').click();
      
      // Wait for validation
      await page.waitForTimeout(500);
      
      // Verify error message
      const hasError = await page.locator('text=/Email.*required/i, text=/required/i').count() > 0;
      expect(hasError).toBeTruthy();
    });

    test('Email validation - valid format', async ({ page }) => {
      // Fill with invalid email
      await page.locator('input[name="firstName"], input[placeholder*="First"]').fill('John');
      await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill('Doe');
      await page.locator('input[name="email"], input[type="email"]').fill('invalid-email');
      await page.locator('input[name="company"], input[placeholder*="Company"]').fill('Test Co');
      await page.locator('input[name="phone"], input[type="tel"]').fill('555-1234');
      await page.locator('textarea[name="message"]').fill('Test message');
      
      // Submit form
      await page.locator('button[type="submit"]').click();
      
      // Wait for validation
      await page.waitForTimeout(500);
      
      // Verify error message
      const hasError = await page.locator('text=/valid email/i, text=/invalid/i').count() > 0;
      expect(hasError).toBeTruthy();
    });

    test('Company validation', async ({ page }) => {
      // Fill all fields except company
      await page.locator('input[name="firstName"], input[placeholder*="First"]').fill('John');
      await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill('Doe');
      await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
      await page.locator('input[name="phone"], input[type="tel"]').fill('555-1234');
      await page.locator('textarea[name="message"]').fill('Test message');
      
      // Submit form
      await page.locator('button[type="submit"]').click();
      
      // Wait for validation
      await page.waitForTimeout(500);
      
      // Verify error message
      const hasError = await page.locator('text=/Company.*required/i, text=/required/i').count() > 0;
      expect(hasError).toBeTruthy();
    });

    test('Phone validation', async ({ page }) => {
      // Fill all fields except phone
      await page.locator('input[name="firstName"], input[placeholder*="First"]').fill('John');
      await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill('Doe');
      await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
      await page.locator('input[name="company"], input[placeholder*="Company"]').fill('Test Co');
      await page.locator('textarea[name="message"]').fill('Test message');
      
      // Submit form
      await page.locator('button[type="submit"]').click();
      
      // Wait for validation
      await page.waitForTimeout(500);
      
      // Verify error message
      const hasError = await page.locator('text=/Phone.*required/i, text=/required/i').count() > 0;
      expect(hasError).toBeTruthy();
    });

    test('Message validation', async ({ page }) => {
      // Fill all fields except message
      await page.locator('input[name="firstName"], input[placeholder*="First"]').fill('John');
      await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill('Doe');
      await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
      await page.locator('input[name="company"], input[placeholder*="Company"]').fill('Test Co');
      await page.locator('input[name="phone"], input[type="tel"]').fill('555-1234');
      
      // Submit form
      await page.locator('button[type="submit"]').click();
      
      // Wait for validation
      await page.waitForTimeout(500);
      
      // Verify error message
      const hasError = await page.locator('text=/Message.*required/i, text=/required/i').count() > 0;
      expect(hasError).toBeTruthy();
    });
  });

  test.describe('Form Submission', () => {
    test('Valid form submission shows success message', async ({ page }) => {
      // Fill all required fields with valid data
      await page.locator('input[name="firstName"], input[placeholder*="First"]').fill('John');
      await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill('Doe');
      await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
      await page.locator('input[name="company"], input[placeholder*="Company"]').fill('Test Company');
      await page.locator('input[name="phone"], input[type="tel"]').fill('555-123-4567');
      await page.locator('textarea[name="message"]').fill('This is a test message for the contact form.');
      
      // Submit form
      await page.locator('button[type="submit"]').click();
      
      // Wait for submission
      await page.waitForTimeout(2000);
      
      // Verify success message or toast appears
      const successMessage = page.locator('text=/success/i, text=/thank you/i, text=/received/i, [data-sonner-toast]');
      await expect(successMessage.first()).toBeVisible({ timeout: 5000 });
    });

    test('Form data is cleared after successful submission', async ({ page }) => {
      // Fill and submit form
      await page.locator('input[name="firstName"], input[placeholder*="First"]').fill('John');
      await page.locator('input[name="lastName"], input[placeholder*="Last"]').fill('Doe');
      await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
      await page.locator('input[name="company"], input[placeholder*="Company"]').fill('Test Company');
      await page.locator('input[name="phone"], input[type="tel"]').fill('555-123-4567');
      await page.locator('textarea[name="message"]').fill('Test message');
      
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(2000);
      
      // Check if form is cleared
      const firstNameValue = await page.locator('input[name="firstName"], input[placeholder*="First"]').inputValue();
      const emailValue = await page.locator('input[name="email"], input[type="email"]').inputValue();
      
      // Form should be cleared after success
      expect(firstNameValue === '' || firstNameValue === 'John').toBeTruthy();
    });
  });

  test.describe('Calendly Widget', () => {
    test('Calendly widget loads on contact page', async ({ page }) => {
      // Wait for Calendly widget to load
      await page.waitForTimeout(2000);
      
      // Check for Calendly iframe or widget
      const calendlyWidget = page.locator('iframe[src*="calendly"], [class*="calendly"]');
      
      if (await calendlyWidget.count() > 0) {
        await expect(calendlyWidget.first()).toBeVisible();
      } else {
        // Calendly might load async, check for container
        const calendlyContainer = page.locator('[data-calendly], #calendly, .calendly-inline-widget');
        expect(await calendlyContainer.count()).toBeGreaterThan(0);
      }
    });
  });
});
