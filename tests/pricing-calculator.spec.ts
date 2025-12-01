import { test, expect } from '@playwright/test';

/**
 * Pricing Calculator Integration Toggle Tests
 * 
 * Verifies that integration toggles (ERP, eSRS, Premium Support) are correctly
 * enabled/disabled based on the selected subscription tier.
 * 
 * Requirements:
 * - Basic & Professional: Only Premium Support enabled (ERP/eSRS disabled)
 * - Advanced & Enterprise: All three integrations enabled
 */

test.describe('Pricing Calculator - Integration Toggles', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the pricing calculator page
    await page.goto('/admin/pricing');
    
    // Wait for the page to load
    await expect(page.locator('h1')).toContainText('Pricing Calculator');
  });

  test.describe('Basic Tier ($25,000)', () => {
    test('should disable ERP and eSRS integrations, but enable Premium Support', async ({ page }) => {
      // Click on Basic tier
      await page.getByRole('button', { name: /Basic.*\$25,000/ }).click();
      
      // Wait for tier to be selected
      await page.waitForTimeout(1000);
      
      // Scroll to integrations section
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Verify ERP Integration is disabled (using label's for attribute to find checkbox)
      const erpLabel = page.locator('label[for="erpIntegration"]');
      await expect(erpLabel).toBeVisible();
      const erpCheckbox = page.locator('[id="erpIntegration"]');
      await expect(erpCheckbox).toBeDisabled();
      await expect(page.getByText('Available for Advanced and Enterprise tiers only').first()).toBeVisible();
      
      // Verify eSRS Support is disabled
      const esrsLabel = page.locator('label[for="esrsSupport"]');
      await expect(esrsLabel).toBeVisible();
      const esrsCheckbox = page.locator('[id="esrsSupport"]');
      await expect(esrsCheckbox).toBeDisabled();
      await expect(page.getByText('Available for Advanced and Enterprise tiers only').nth(1)).toBeVisible();
      
      // Verify Premium Support is enabled
      const premiumLabel = page.locator('label[for="supportPremium"]');
      await expect(premiumLabel).toBeVisible();
      const premiumCheckbox = page.locator('[id="supportPremium"]');
      await expect(premiumCheckbox).toBeEnabled();
      await expect(page.getByText('24/7 priority support with dedicated account manager')).toBeVisible();
    });
  });

  test.describe('Professional Tier ($60,000)', () => {
    test('should disable ERP and eSRS integrations, but enable Premium Support', async ({ page }) => {
      // Click on Professional tier
      await page.getByRole('button', { name: /Professional.*\$60,000/ }).click();
      
      // Wait for tier to be selected
      await page.waitForTimeout(1000);
      
      // Scroll to integrations section
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Verify ERP Integration is disabled
      const erpCheckbox = page.locator('[id="erpIntegration"]');
      await expect(erpCheckbox).toBeDisabled();
      await expect(page.getByText('Available for Advanced and Enterprise tiers only').first()).toBeVisible();
      
      // Verify eSRS Support is disabled
      const esrsCheckbox = page.locator('[id="esrsSupport"]');
      await expect(esrsCheckbox).toBeDisabled();
      await expect(page.getByText('Available for Advanced and Enterprise tiers only').nth(1)).toBeVisible();
      
      // Verify Premium Support is enabled
      const premiumCheckbox = page.locator('[id="supportPremium"]');
      await expect(premiumCheckbox).toBeEnabled();
      await expect(page.getByText('24/7 priority support with dedicated account manager')).toBeVisible();
    });
  });

  test.describe('Advanced Tier ($100,000)', () => {
    test('should enable all three integrations', async ({ page }) => {
      // Click on Advanced tier
      await page.getByRole('button', { name: /Advanced.*\$100,000/ }).click();
      
      // Wait for tier to be selected
      await page.waitForTimeout(1000);
      
      // Scroll to integrations section
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Verify ERP Integration is enabled
      const erpCheckbox = page.locator('[id="erpIntegration"]');
      await expect(erpCheckbox).toBeEnabled();
      await expect(page.getByText('Seamless integration with your ERP system')).toBeVisible();
      
      // Verify eSRS Support is enabled
      const esrsCheckbox = page.locator('[id="esrsSupport"]');
      await expect(esrsCheckbox).toBeEnabled();
      await expect(page.getByText('European Sustainability Reporting Standards support')).toBeVisible();
      
      // Verify Premium Support is enabled
      const premiumCheckbox = page.locator('[id="supportPremium"]');
      await expect(premiumCheckbox).toBeEnabled();
      await expect(page.getByText('24/7 priority support with dedicated account manager')).toBeVisible();
    });

    test('should allow toggling all integrations', async ({ page }) => {
      await page.getByRole('button', { name: /Advanced.*\$100,000/ }).click();
      await page.waitForTimeout(1000);
      
      // Scroll to integrations section
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Test ERP Integration toggle
      const erpCheckbox = page.locator('[id="erpIntegration"]');
      await erpCheckbox.click();
      await expect(erpCheckbox).toHaveAttribute('data-state', 'checked');
      await erpCheckbox.click();
      await expect(erpCheckbox).toHaveAttribute('data-state', 'unchecked');
      
      // Test eSRS Support toggle
      const esrsCheckbox = page.locator('[id="esrsSupport"]');
      await esrsCheckbox.click();
      await expect(esrsCheckbox).toHaveAttribute('data-state', 'checked');
      await esrsCheckbox.click();
      await expect(esrsCheckbox).toHaveAttribute('data-state', 'unchecked');
      
      // Test Premium Support toggle
      const premiumCheckbox = page.locator('[id="supportPremium"]');
      await premiumCheckbox.click();
      await expect(premiumCheckbox).toHaveAttribute('data-state', 'checked');
      await premiumCheckbox.click();
      await expect(premiumCheckbox).toHaveAttribute('data-state', 'unchecked');
    });
  });

  test.describe('Enterprise Tier ($150,000)', () => {
    test('should enable all three integrations', async ({ page }) => {
      // Click on Enterprise tier
      await page.getByRole('button', { name: /Enterprise.*\$150,000/ }).click();
      
      // Wait for tier to be selected
      await page.waitForTimeout(1000);
      
      // Scroll to integrations section
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Verify ERP Integration is enabled
      const erpCheckbox = page.locator('[id="erpIntegration"]');
      await expect(erpCheckbox).toBeEnabled();
      await expect(page.getByText('Seamless integration with your ERP system')).toBeVisible();
      
      // Verify eSRS Support is enabled
      const esrsCheckbox = page.locator('[id="esrsSupport"]');
      await expect(esrsCheckbox).toBeEnabled();
      await expect(page.getByText('European Sustainability Reporting Standards support')).toBeVisible();
      
      // Verify Premium Support is enabled
      const premiumCheckbox = page.locator('[id="supportPremium"]');
      await expect(premiumCheckbox).toBeEnabled();
      await expect(page.getByText('24/7 priority support with dedicated account manager')).toBeVisible();
    });

    test('should allow toggling all integrations', async ({ page }) => {
      await page.getByRole('button', { name: /Enterprise.*\$150,000/ }).click();
      await page.waitForTimeout(1000);
      
      // Scroll to integrations section
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Test ERP Integration toggle
      const erpCheckbox = page.locator('[id="erpIntegration"]');
      await erpCheckbox.click();
      await expect(erpCheckbox).toHaveAttribute('data-state', 'checked');
      await erpCheckbox.click();
      await expect(erpCheckbox).toHaveAttribute('data-state', 'unchecked');
      
      // Test eSRS Support toggle
      const esrsCheckbox = page.locator('[id="esrsSupport"]');
      await esrsCheckbox.click();
      await expect(esrsCheckbox).toHaveAttribute('data-state', 'checked');
      await esrsCheckbox.click();
      await expect(esrsCheckbox).toHaveAttribute('data-state', 'unchecked');
      
      // Test Premium Support toggle
      const premiumCheckbox = page.locator('[id="supportPremium"]');
      await premiumCheckbox.click();
      await expect(premiumCheckbox).toHaveAttribute('data-state', 'checked');
      await premiumCheckbox.click();
      await expect(premiumCheckbox).toHaveAttribute('data-state', 'unchecked');
    });
  });

  test.describe('Tier Switching', () => {
    test('should correctly update integration states when switching between tiers', async ({ page }) => {
      // Start with Basic tier
      await page.getByRole('button', { name: /Basic.*\$25,000/ }).click();
      await page.waitForTimeout(1000);
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Verify ERP is disabled
      let erpCheckbox = page.locator('[id="erpIntegration"]');
      await expect(erpCheckbox).toBeDisabled();
      
      // Switch to Advanced tier
      await page.getByRole('button', { name: /Advanced.*\$100,000/ }).click();
      await page.waitForTimeout(1000);
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Verify ERP is now enabled
      erpCheckbox = page.locator('[id="erpIntegration"]');
      await expect(erpCheckbox).toBeEnabled();
      
      // Switch back to Professional tier
      await page.getByRole('button', { name: /Professional.*\$60,000/ }).click();
      await page.waitForTimeout(1000);
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Verify ERP is disabled again
      erpCheckbox = page.locator('[id="erpIntegration"]');
      await expect(erpCheckbox).toBeDisabled();
      
      // Switch to Enterprise tier
      await page.getByRole('button', { name: /Enterprise.*\$150,000/ }).click();
      await page.waitForTimeout(1000);
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Verify all integrations are enabled
      erpCheckbox = page.locator('[id="erpIntegration"]');
      const esrsCheckbox = page.locator('[id="esrsSupport"]');
      const premiumCheckbox = page.locator('[id="supportPremium"]');
      
      await expect(erpCheckbox).toBeEnabled();
      await expect(esrsCheckbox).toBeEnabled();
      await expect(premiumCheckbox).toBeEnabled();
    });
  });

  test.describe('Visual Verification', () => {
    test('should display restriction messages for disabled integrations', async ({ page }) => {
      await page.getByRole('button', { name: /Basic.*\$25,000/ }).click();
      await page.waitForTimeout(1000);
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Count how many times the restriction message appears (should be 2: ERP and eSRS)
      const restrictionMessages = page.getByText('Available for Advanced and Enterprise tiers only');
      await expect(restrictionMessages).toHaveCount(2);
    });

    test('should not display restriction messages for enabled integrations', async ({ page }) => {
      await page.getByRole('button', { name: /Advanced.*\$100,000/ }).click();
      await page.waitForTimeout(1000);
      await page.locator('text=Add-On Integrations').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Restriction message should not appear
      const restrictionMessages = page.getByText('Available for Advanced and Enterprise tiers only');
      await expect(restrictionMessages).toHaveCount(0);
    });
  });
});
