# CI/CD Pipeline Documentation

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Intelleges marketing site.

---

## Overview

The project uses **GitHub Actions** to automatically run tests and quality checks on every code change. This ensures that bugs are caught early and the codebase remains stable.

---

## Workflows

### 1. Playwright E2E Tests

**File:** `.github/workflows/playwright-tests.yml`

**Status Badge:**
```markdown
![Playwright Tests](https://github.com/YOUR_ORG/intelleges-marketing-site/actions/workflows/playwright-tests.yml/badge.svg)
```

#### Triggers

The workflow runs automatically on:
- **Push** to `main` or `develop` branches
- **Pull requests** targeting `main` or `develop` branches

#### What It Does

1. **Checks out code** from the repository
2. **Sets up Node.js 22** and **pnpm 10**
3. **Caches dependencies** (pnpm store and Playwright browsers) for faster runs
4. **Installs project dependencies** with `pnpm install --frozen-lockfile`
5. **Installs Playwright browsers** (Chromium)
6. **Runs all E2E tests** with `pnpm test:e2e`
7. **Uploads test artifacts:**
   - HTML test reports (kept for 30 days)
   - Failure screenshots (kept for 7 days)
8. **Comments on PRs** with test results summary

#### Performance Optimizations

- **pnpm store caching:** Reduces dependency installation time from ~60s to ~10s
- **Playwright browser caching:** Reduces browser installation time from ~30s to ~5s
- **Parallel test execution:** Tests run in parallel using 3 workers
- **Smart caching:** Cache keys based on `pnpm-lock.yaml` hash

#### Expected Runtime

- **First run (no cache):** ~2-3 minutes
- **Subsequent runs (with cache):** ~30-45 seconds

---

## Viewing Test Results

### In GitHub Actions UI

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Click on a workflow run to see details
4. View the **Run Playwright tests** step for test output
5. Download artifacts (reports/screenshots) from the **Artifacts** section

### In Pull Requests

When tests run on a pull request, a comment is automatically added with:
- ✅ Number of tests passed
- ❌ Number of tests failed
- 📊 Link to full HTML report
- 🖼️ Screenshots of failures (if any)

### Locally

You can always run the same tests locally:

```bash
# Run all tests
pnpm test:e2e

# Run tests in UI mode (interactive)
pnpm test:e2e:ui

# View last test report
pnpm test:e2e:report
```

---

## Workflow Configuration

### Environment Variables

The workflow sets `CI=true` which:
- Disables interactive prompts
- Uses CI-optimized retry logic (2 retries on failure)
- Runs tests in parallel with 1 worker (to avoid resource contention)

### Timeout

- **Workflow timeout:** 60 minutes (entire job)
- **Test timeout:** 30 seconds per test (configurable in `playwright.config.ts`)

### Artifacts

| Artifact | Retention | When Uploaded | Contents |
|----------|-----------|---------------|----------|
| `playwright-report` | 30 days | Always | HTML test report with traces |
| `test-results` | 7 days | On failure | Screenshots, videos, traces |

---

## Troubleshooting CI Failures

### Tests Pass Locally But Fail in CI

**Common causes:**
1. **Timing issues:** CI may be slower than local machine
   - **Fix:** Increase timeouts in `playwright.config.ts`
2. **Environment differences:** CI uses Ubuntu, you might use macOS/Windows
   - **Fix:** Test in Docker container locally
3. **Missing environment variables:** CI may not have required secrets
   - **Fix:** Add secrets in GitHub repository settings

### Workflow Fails to Start

**Common causes:**
1. **Syntax error in YAML:** Check workflow file syntax
   - **Fix:** Use [YAML Lint](https://www.yamllint.com/) to validate
2. **Missing required files:** Workflow expects certain files to exist
   - **Fix:** Ensure `package.json`, `playwright.config.ts`, and tests exist

### Cache Issues

If caching causes problems:

```yaml
# Temporarily disable cache by commenting out cache steps
# - name: Setup pnpm cache
#   uses: actions/cache@v4
#   ...
```

Or clear cache:
1. Go to **Actions** → **Caches** in GitHub
2. Delete problematic caches
3. Re-run workflow

---

## Adding New Workflows

### Example: TypeScript Type Checking

Create `.github/workflows/type-check.yml`:

```yaml
name: Type Check

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  typecheck:
    name: TypeScript Type Check
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run type check
        run: pnpm check
```

### Example: Linting

Create `.github/workflows/lint.yml`:

```yaml
name: Lint

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint:
    name: ESLint & Prettier
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Check formatting
        run: pnpm format --check
```

---

## Branch Protection Rules

### Recommended Settings

To enforce CI checks before merging:

1. Go to **Settings** → **Branches** in GitHub
2. Add rule for `main` branch:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - Select: **Run E2E Tests** (from Playwright workflow)
3. Add rule for `develop` branch (same settings)

This ensures:
- No code can be merged if tests fail
- All PRs must have passing tests
- Branches must be up-to-date with base branch

---

## Monitoring & Notifications

### GitHub Notifications

By default, GitHub sends notifications when:
- ✅ Workflow succeeds after previously failing
- ❌ Workflow fails

### Slack Integration (Optional)

Add Slack notifications to workflow:

```yaml
- name: Notify Slack on failure
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "❌ Playwright tests failed on ${{ github.ref }}"
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## Cost Optimization

### GitHub Actions Minutes

- **Free tier:** 2,000 minutes/month for private repos
- **Public repos:** Unlimited minutes
- **Current usage:** ~1 minute per workflow run

### Optimization Tips

1. **Cache aggressively:** Reduces run time by 60-70%
2. **Run only on relevant branches:** Avoid running on feature branches
3. **Use matrix strategy sparingly:** Only test multiple Node versions if needed
4. **Fail fast:** Stop workflow on first failure

---

## Security Best Practices

### Secrets Management

Never commit secrets to the repository. Use GitHub Secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets (e.g., `DATABASE_URL`, `API_KEY`)
3. Reference in workflow:

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Dependabot

Enable Dependabot to keep dependencies updated:

1. Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

---

## Future Enhancements

### Planned Additions

1. **Visual Regression Testing:** Compare screenshots across commits
2. **Performance Testing:** Lighthouse CI for performance metrics
3. **Deployment Automation:** Auto-deploy to staging on PR merge
4. **Code Coverage:** Track test coverage over time
5. **Accessibility Testing:** Automated a11y checks with axe-core

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Documentation](https://playwright.dev/docs/ci)
- [pnpm CI Guide](https://pnpm.io/continuous-integration)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)

---

**Last Updated:** December 1, 2025  
**Maintained By:** Intelleges Development Team
