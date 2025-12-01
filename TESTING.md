# Automated Testing Guide

This document describes the automated testing setup for the Intelleges marketing site, specifically focusing on the pricing calculator integration toggle verification.

---

## Overview

The project uses **Playwright** for end-to-end (E2E) testing to ensure the pricing calculator UI behaves correctly across all subscription tiers. The test suite automatically verifies that integration toggles (ERP, eSRS, Premium Support) are properly enabled or disabled based on tier selection.

---

## Test Coverage

### Pricing Calculator Integration Toggles

**Test File:** `tests/pricing-calculator.spec.ts`

**Total Test Cases:** 9

#### Test Suites:

1. **Basic Tier ($25,000)**
   - ✅ Verifies ERP and eSRS integrations are disabled
   - ✅ Verifies Premium Support is enabled
   - ✅ Confirms restriction messages display correctly

2. **Professional Tier ($60,000)**
   - ✅ Verifies ERP and eSRS integrations are disabled
   - ✅ Verifies Premium Support is enabled
   - ✅ Confirms restriction messages display correctly

3. **Advanced Tier ($100,000)**
   - ✅ Verifies all three integrations are enabled
   - ✅ Tests that all integrations can be toggled on/off
   - ✅ Confirms no restriction messages appear

4. **Enterprise Tier ($150,000)**
   - ✅ Verifies all three integrations are enabled
   - ✅ Tests that all integrations can be toggled on/off
   - ✅ Confirms no restriction messages appear

5. **Tier Switching**
   - ✅ Verifies integration states update correctly when switching between tiers
   - ✅ Tests transitions: Basic → Advanced → Professional → Enterprise

6. **Visual Verification**
   - ✅ Confirms restriction messages appear for disabled integrations
   - ✅ Confirms restriction messages do NOT appear for enabled integrations

---

## Running Tests

### Prerequisites

- Node.js 22.x or higher
- pnpm package manager
- Playwright browsers installed (handled automatically)

### Installation

Tests are already set up! Playwright and its dependencies were installed during project initialization.

If you need to reinstall:

```bash
pnpm add -D @playwright/test playwright
pnpm exec playwright install chromium
```

### Running Tests

#### Run all E2E tests:

```bash
pnpm test:e2e
```

#### Run tests in UI mode (interactive):

```bash
pnpm test:e2e:ui
```

#### View last test report:

```bash
pnpm test:e2e:report
```

#### Run specific test file:

```bash
pnpm exec playwright test tests/pricing-calculator.spec.ts
```

#### Run tests in headed mode (see browser):

```bash
pnpm exec playwright test --headed
```

#### Run tests in debug mode:

```bash
pnpm exec playwright test --debug
```

---

## Test Results

### Latest Run (December 1, 2025)

```
Running 9 tests using 3 workers

✅ [1/9] Basic Tier - should disable ERP and eSRS integrations, but enable Premium Support
✅ [2/9] Professional Tier - should disable ERP and eSRS integrations, but enable Premium Support
✅ [3/9] Advanced Tier - should enable all three integrations
✅ [4/9] Advanced Tier - should allow toggling all integrations
✅ [5/9] Enterprise Tier - should enable all three integrations
✅ [6/9] Enterprise Tier - should allow toggling all integrations
✅ [7/9] Tier Switching - should correctly update integration states when switching between tiers
✅ [8/9] Visual Verification - should display restriction messages for disabled integrations
✅ [9/9] Visual Verification - should not display restriction messages for enabled integrations

9 passed (14.3s)
```

**Status:** ✅ ALL TESTS PASSING

---

## Configuration

### Playwright Configuration

**File:** `playwright.config.ts`

Key settings:
- **Test directory:** `./tests`
- **Base URL:** `http://localhost:3000`
- **Browser:** Chromium (Desktop Chrome)
- **Parallel execution:** Enabled (3 workers)
- **Screenshots:** Captured on failure
- **Traces:** Captured on retry
- **Dev server:** Automatically started before tests

---

## Writing New Tests

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to page before each test
    await page.goto('/your-page');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    await page.locator('button').click();
    
    // Act
    await page.fill('input', 'value');
    
    // Assert
    await expect(page.locator('result')).toBeVisible();
  });
});
```

### Best Practices

1. **Use semantic selectors:** Prefer `getByRole`, `getByLabel`, `getByText` over CSS selectors
2. **Wait for elements:** Use `await expect(...).toBeVisible()` instead of manual timeouts
3. **Test user flows:** Focus on real user interactions, not implementation details
4. **Keep tests independent:** Each test should be able to run in isolation
5. **Use descriptive names:** Test names should clearly describe what they verify

### Radix UI Components

For Radix UI components (like checkboxes), use attribute selectors:

```typescript
// ✅ Correct for Radix UI Checkbox
const checkbox = page.locator('[id="myCheckbox"]');
await expect(checkbox).toBeEnabled();
await expect(checkbox).toHaveAttribute('data-state', 'checked');

// ❌ Incorrect (won't work with Radix UI)
const checkbox = page.locator('input#myCheckbox');
```

---

## Continuous Integration

### GitHub Actions (Future)

To run tests in CI/CD:

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 22
      - run: pnpm install
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Troubleshooting

### Tests Failing Locally

1. **Ensure dev server is running:**
   ```bash
   pnpm dev
   ```

2. **Clear test artifacts:**
   ```bash
   rm -rf test-results/ playwright-report/
   ```

3. **Update Playwright browsers:**
   ```bash
   pnpm exec playwright install chromium
   ```

### Debugging Failed Tests

1. **Run in headed mode to see browser:**
   ```bash
   pnpm exec playwright test --headed
   ```

2. **Use debug mode with step-through:**
   ```bash
   pnpm exec playwright test --debug
   ```

3. **Check screenshots in `test-results/` directory**

4. **View HTML report:**
   ```bash
   pnpm test:e2e:report
   ```

### Common Issues

**Issue:** "element(s) not found"
- **Solution:** Add `await page.waitForTimeout(500)` or use `await expect(...).toBeVisible()`

**Issue:** "Test timeout exceeded"
- **Solution:** Increase timeout in `playwright.config.ts` or specific test

**Issue:** "Browser not found"
- **Solution:** Run `pnpm exec playwright install chromium`

---

## Maintenance

### When to Update Tests

- ✅ When adding new features to the pricing calculator
- ✅ When changing tier definitions or pricing
- ✅ When modifying integration toggle behavior
- ✅ When updating UI components that affect user interactions

### Test Review Checklist

Before deploying changes:

1. ✅ All tests pass locally
2. ✅ New features have corresponding tests
3. ✅ Test names are descriptive and accurate
4. ✅ No flaky tests (tests that randomly fail/pass)
5. ✅ Test coverage includes edge cases

---

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Testing Library Principles](https://testing-library.com/docs/guiding-principles/)

---

**Last Updated:** December 1, 2025  
**Maintained By:** Intelleges Development Team


---

## CI/CD Integration

### GitHub Actions Workflow

The Playwright tests run automatically in GitHub Actions on every push and pull request to `main` and `develop` branches.

**Workflow file:** `.github/workflows/playwright-tests.yml`

**Status badge:**
```markdown
![Playwright Tests](https://github.com/YOUR_ORG/intelleges-marketing-site/actions/workflows/playwright-tests.yml/badge.svg)
```

### Workflow Features

✅ **Automatic triggers:** Runs on push/PR to main and develop branches  
✅ **Dependency caching:** pnpm store and Playwright browsers cached for 60-70% faster runs  
✅ **Artifact uploads:** Test reports (30 days) and failure screenshots (7 days)  
✅ **PR comments:** Automatic test result summaries on pull requests  
✅ **Parallel execution:** Tests run in parallel for faster feedback

### Expected CI Runtime

- **First run (no cache):** ~2-3 minutes
- **Subsequent runs (with cache):** ~30-45 seconds

### Viewing CI Test Results

1. **In GitHub Actions:**
   - Go to **Actions** tab in your repository
   - Click on a workflow run
   - View test output in **Run Playwright tests** step
   - Download artifacts (reports/screenshots)

2. **In Pull Requests:**
   - Automatic comment with test results summary
   - Links to full HTML report
   - Screenshots of failures (if any)

3. **Locally:**
   - Run the same tests: `pnpm test:e2e`
   - View reports: `pnpm test:e2e:report`

### Branch Protection

To enforce tests before merging:

1. Go to **Settings** → **Branches** in GitHub
2. Add rule for `main` branch:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date
   - Select: **Run E2E Tests**

This ensures no code can be merged if tests fail.

See [CI_CD.md](./CI_CD.md) for comprehensive CI/CD documentation.
