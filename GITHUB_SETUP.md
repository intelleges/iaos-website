# GitHub Repository Setup Guide

This guide walks you through setting up the GitHub repository with CI/CD integration.

---

## Prerequisites

- GitHub account with repository access
- Git installed locally
- Repository already created on GitHub

---

## Step 1: Initialize Git Repository

If you haven't already initialized git:

```bash
cd /path/to/intelleges-marketing-site

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit with Playwright CI/CD integration"
```

---

## Step 2: Connect to GitHub Remote

```bash
# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_ORG/intelleges-marketing-site.git

# Verify remote
git remote -v
```

---

## Step 3: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main

# Or push to develop branch
git checkout -b develop
git push -u origin develop
```

---

## Step 4: Verify GitHub Actions Workflow

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You should see the "Playwright Tests" workflow
4. The workflow will run automatically on the first push

---

## Step 5: Update Workflow Badge in README

1. Go to **Actions** tab in your repository
2. Click on "Playwright Tests" workflow
3. Click the **...** menu (top right)
4. Select **Create status badge**
5. Copy the markdown code
6. Replace the placeholder in `README.md`:

```markdown
# Before
![Playwright Tests](https://github.com/YOUR_ORG/intelleges-marketing-site/actions/workflows/playwright-tests.yml/badge.svg)

# After (with your actual org/repo)
![Playwright Tests](https://github.com/intelleges/intelleges-marketing-site/actions/workflows/playwright-tests.yml/badge.svg)
```

---

## Step 6: Configure Branch Protection (Optional but Recommended)

### Protect Main Branch

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Branch name pattern: `main`
4. Enable these settings:
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: 1
   - ✅ **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
     - Search and select: **Run E2E Tests**
   - ✅ **Require conversation resolution before merging**
   - ✅ **Do not allow bypassing the above settings**
5. Click **Create**

### Protect Develop Branch

Repeat the same steps for `develop` branch.

---

## Step 7: Test the CI/CD Pipeline

### Method 1: Create a Test PR

```bash
# Create a feature branch
git checkout -b test/ci-pipeline

# Make a small change
echo "# CI/CD Test" >> test.md
git add test.md
git commit -m "Test CI/CD pipeline"

# Push branch
git push -u origin test/ci-pipeline
```

Then:
1. Go to GitHub and create a pull request from `test/ci-pipeline` to `main`
2. Watch the Playwright tests run automatically
3. Check for the automated comment with test results
4. Merge the PR if tests pass

### Method 2: Push Directly (if branch protection not enabled)

```bash
# Make a change
echo "# Test" >> test.md
git add test.md
git commit -m "Test CI/CD"
git push

# Check Actions tab on GitHub
```

---

## Step 8: Verify Test Artifacts

After a workflow run:

1. Go to **Actions** tab
2. Click on a completed workflow run
3. Scroll to **Artifacts** section
4. Download `playwright-report` to view HTML test report
5. If tests failed, download `test-results` for screenshots

---

## Troubleshooting

### Workflow Not Running

**Issue:** Workflow doesn't appear in Actions tab

**Solutions:**
1. Ensure `.github/workflows/playwright-tests.yml` is committed and pushed
2. Check YAML syntax: `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/playwright-tests.yml'))"`
3. Verify workflow triggers match your branch names

### Tests Fail in CI But Pass Locally

**Issue:** Tests pass locally but fail in GitHub Actions

**Solutions:**
1. Check the workflow logs for specific error messages
2. Ensure all environment variables are set (if needed)
3. Increase timeouts in `playwright.config.ts` if CI is slower
4. Run tests locally with `CI=true pnpm test:e2e` to simulate CI environment

### Cache Not Working

**Issue:** Workflow takes too long despite caching

**Solutions:**
1. Go to **Actions** → **Caches** in GitHub
2. Verify caches are being created
3. Check cache keys match in workflow file
4. Clear old caches and re-run workflow

---

## Next Steps

After setup is complete:

1. ✅ **Add more test coverage:** Create additional Playwright tests for other features
2. ✅ **Set up deployment:** Add deployment workflow for staging/production
3. ✅ **Enable Dependabot:** Keep dependencies updated automatically
4. ✅ **Add code coverage:** Track test coverage over time
5. ✅ **Set up notifications:** Configure Slack/email notifications for failures

---

## Useful Commands

```bash
# View workflow status
gh workflow list

# View recent workflow runs
gh run list --workflow=playwright-tests.yml

# View logs from latest run
gh run view --log

# Re-run failed jobs
gh run rerun <run-id>

# Download artifacts
gh run download <run-id>
```

*(Requires [GitHub CLI](https://cli.github.com/) to be installed)*

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub CLI](https://cli.github.com/)
- [Playwright CI Guide](https://playwright.dev/docs/ci)

---

**Setup Complete! 🎉**

Your repository is now configured with automated testing in CI/CD. Every push and pull request will automatically run Playwright tests to ensure code quality.
