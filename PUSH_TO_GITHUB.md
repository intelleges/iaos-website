# Push to GitHub - Quick Start Guide

This guide will help you push your code to GitHub and enable all CI/CD features.

---

## Prerequisites

✅ Git is already initialized in this project  
✅ GitHub Actions workflows are configured  
✅ Dependabot is configured  
✅ All files are ready to commit

---

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **+** icon (top right) → **New repository**
3. Repository settings:
   - **Name:** `intelleges-marketing-site`
   - **Description:** "Enterprise compliance management system marketing website"
   - **Visibility:** Private (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **Create repository**

---

## Step 2: Stage and Commit All Files

```bash
cd /home/ubuntu/intelleges-marketing-site

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit with CI/CD integration

- Playwright E2E tests with 9 test cases
- GitHub Actions workflows (Playwright tests + TypeScript type checking)
- Dependabot configuration for automated dependency updates
- Comprehensive documentation (README, TESTING, CI_CD, GITHUB_SETUP)
- Pricing calculator with integration toggle verification"

# Verify commit
git log --oneline -1
```

---

## Step 3: Connect to GitHub Remote

Replace `YOUR_ORG` and `YOUR_REPO` with your actual GitHub organization/username and repository name:

```bash
# Add remote (HTTPS - easier for most users)
git remote add origin https://github.com/YOUR_ORG/intelleges-marketing-site.git

# Or use SSH (if you have SSH keys configured)
# git remote add origin git@github.com:YOUR_ORG/intelleges-marketing-site.git

# Verify remote
git remote -v
```

---

## Step 4: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

**Expected output:**
```
Enumerating objects: 150, done.
Counting objects: 100% (150/150), done.
Delta compression using up to 4 threads
Compressing objects: 100% (120/120), done.
Writing objects: 100% (150/150), 250.00 KiB | 5.00 MiB/s, done.
Total 150 (delta 30), reused 0 (delta 0)
To https://github.com/YOUR_ORG/intelleges-marketing-site.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## Step 5: Verify GitHub Actions Workflows

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You should see two workflows:
   - ✅ **Playwright Tests**
   - ✅ **Type Check**
4. Both workflows will run automatically on the first push

**Note:** The Type Check workflow will currently fail because there are existing TypeScript errors in the codebase. This is expected and can be fixed later.

---

## Step 6: Update Workflow Status Badges

### Get Badge URLs

1. Go to **Actions** tab
2. Click on "Playwright Tests" workflow
3. Click **...** menu (top right) → **Create status badge**
4. Copy the markdown code
5. Repeat for "Type Check" workflow

### Update README.md

Replace the placeholder badges in `README.md`:

```markdown
# Before
![Playwright Tests](https://github.com/YOUR_ORG/intelleges-marketing-site/actions/workflows/playwright-tests.yml/badge.svg)

# After (with your actual org/repo)
![Playwright Tests](https://github.com/intelleges/intelleges-marketing-site/actions/workflows/playwright-tests.yml/badge.svg)
![Type Check](https://github.com/intelleges/intelleges-marketing-site/actions/workflows/type-check.yml/badge.svg)
```

Then commit and push:

```bash
git add README.md
git commit -m "Update workflow status badges"
git push
```

---

## Step 7: Update Dependabot Configuration

Edit `.github/dependabot.yml` and replace placeholders:

```yaml
reviewers:
  - "your-github-username"  # Replace with your actual GitHub username
assignees:
  - "your-github-username"  # Replace with your actual GitHub username
```

Then commit and push:

```bash
git add .github/dependabot.yml
git commit -m "Configure Dependabot reviewers and assignees"
git push
```

---

## Step 8: Enable Branch Protection Rules

### Protect Main Branch

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. **Branch name pattern:** `main`
4. Enable these settings:

   **Pull Request Requirements:**
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: **1**
     - ✅ Dismiss stale pull request approvals when new commits are pushed
   
   **Status Check Requirements:**
   - ✅ **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
     - Search and select:
       - ✅ **Run E2E Tests** (from Playwright workflow)
       - ✅ **TypeScript Type Check** (from Type Check workflow)
   
   **Additional Settings:**
   - ✅ **Require conversation resolution before merging**
   - ✅ **Do not allow bypassing the above settings**
   - ✅ **Restrict who can push to matching branches** (optional - add specific users/teams)

5. Click **Create**

### Protect Develop Branch (Optional)

If you use a `develop` branch for active development:

1. Create develop branch:
   ```bash
   git checkout -b develop
   git push -u origin develop
   ```

2. Repeat the branch protection steps above for `develop` branch

---

## Step 9: Test the CI/CD Pipeline

### Method 1: Create a Test Pull Request

```bash
# Create a feature branch
git checkout -b test/ci-pipeline

# Make a small change
echo "# CI/CD Pipeline Test" >> CI_TEST.md
git add CI_TEST.md
git commit -m "Test CI/CD pipeline"

# Push branch
git push -u origin test/ci-pipeline
```

Then:
1. Go to GitHub and create a pull request from `test/ci-pipeline` to `main`
2. Watch the workflows run automatically
3. Check for automated comments with test results
4. Verify branch protection prevents merging if tests fail
5. Merge the PR if tests pass

### Method 2: Push Directly (if no branch protection)

```bash
# Make a change
echo "# Test" >> TEST.md
git add TEST.md
git commit -m "Test CI/CD"
git push

# Check Actions tab on GitHub
```

---

## Step 10: Verify Dependabot

1. Go to **Insights** → **Dependency graph** → **Dependabot**
2. You should see Dependabot is enabled
3. Dependabot will create PRs weekly (every Monday at 9:00 AM) for:
   - npm package updates (grouped by category)
   - GitHub Actions updates

---

## What Happens Next?

### Automatic CI/CD Workflows

Every time you push code or create a pull request:

1. **Playwright Tests** workflow runs (~30-45 seconds)
   - Runs all 9 E2E tests
   - Uploads test reports and failure screenshots
   - Comments on PRs with results

2. **Type Check** workflow runs (~10-15 seconds)
   - Runs TypeScript type checking
   - Comments on PRs if type errors found

### Automatic Dependency Updates

Every Monday at 9:00 AM:

1. **Dependabot** checks for package updates
2. Creates PRs for outdated dependencies
3. Groups related packages together (e.g., all Playwright packages in one PR)
4. Assigns PRs to configured reviewers

### Branch Protection

If enabled:

1. **No direct pushes** to `main` branch
2. **All changes** must go through pull requests
3. **All CI checks** must pass before merging
4. **Code review** required (1 approval minimum)

---

## Troubleshooting

### Authentication Issues

If you get authentication errors when pushing:

**For HTTPS:**
```bash
# Use personal access token (PAT) instead of password
# Generate PAT at: https://github.com/settings/tokens
# Use PAT as password when prompted
```

**For SSH:**
```bash
# Generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add SSH key to GitHub
# Copy public key: cat ~/.ssh/id_ed25519.pub
# Add at: https://github.com/settings/keys
```

### Workflow Not Running

If workflows don't appear in Actions tab:

1. Check `.github/workflows/` files are committed
2. Verify YAML syntax: `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/playwright-tests.yml'))"`
3. Check workflow triggers match your branch names

### Type Check Failing

The Type Check workflow will currently fail due to existing TypeScript errors. This is expected. To fix:

1. Run `pnpm check` locally to see errors
2. Fix TypeScript errors in the codebase
3. Commit and push fixes

Or temporarily disable the workflow by commenting out the status check requirement in branch protection.

---

## Quick Reference Commands

```bash
# Check git status
git status

# View commit history
git log --oneline

# View remote configuration
git remote -v

# Pull latest changes
git pull origin main

# Create and switch to new branch
git checkout -b feature/my-feature

# Push current branch
git push -u origin HEAD

# View workflow runs (requires GitHub CLI)
gh run list

# View workflow logs
gh run view --log
```

---

## Next Steps

After pushing to GitHub:

1. ✅ **Fix TypeScript errors** to make Type Check workflow pass
2. ✅ **Add more test coverage** for other features
3. ✅ **Set up deployment** workflow for staging/production
4. ✅ **Configure notifications** for workflow failures (Slack, email)
5. ✅ **Add code coverage** tracking with Codecov or similar

---

## Resources

- [GitHub Documentation](https://docs.github.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)

---

**Ready to push! 🚀**

Follow the steps above to get your code on GitHub with full CI/CD integration.
