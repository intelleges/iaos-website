# Deployment Guide

This document explains how to deploy the Intelleges Marketing Site using the automated GitHub Actions workflows.

## Overview

The project uses GitHub Actions for continuous deployment with two environments:

- **Staging**: Automatically deploys from the `develop` branch
- **Production**: Automatically deploys from the `main` branch

## Deployment Workflow

### Automatic Deployments

1. **Staging Deployment**
   - Trigger: Push or merge to `develop` branch
   - Environment: `staging`
   - URL: `https://staging-intelleges-marketing-site.manus.space`
   - Purpose: Testing and QA before production

2. **Production Deployment**
   - Trigger: Push or merge to `main` branch
   - Environment: `production`
   - URL: `https://intelleges-marketing-site.manus.space`
   - Purpose: Live production site

### Manual Deployments

You can trigger deployments manually from the GitHub Actions tab:

1. Go to **Actions** → **Deploy to Manus**
2. Click **Run workflow**
3. Select the branch and environment
4. Click **Run workflow**

## Deployment Process

The deployment workflow performs the following steps:

1. **Code Checkout**: Fetches the latest code from the repository
2. **Dependency Installation**: Installs all npm packages using pnpm
3. **Type Checking**: Runs TypeScript compiler to verify type safety
4. **Unit Tests**: Executes Vitest unit tests
5. **Build**: Compiles the application for production
6. **Deploy**: Creates a checkpoint and deploys to Manus
7. **Post-Deploy Tests**: Runs Playwright smoke tests to verify deployment

## Branch Strategy

```
main (production)
  ↑
  └── Pull Request (requires CI checks to pass)
        ↑
        develop (staging)
          ↑
          └── feature branches
```

### Workflow

1. Create feature branch from `develop`
2. Make changes and push to feature branch
3. Create Pull Request to `develop`
4. CI checks run automatically (lint, type-check, tests)
5. After approval and merge → automatic staging deployment
6. Test on staging environment
7. Create Pull Request from `develop` to `main`
8. After approval and merge → automatic production deployment

## Environment Variables

The following environment variables are automatically injected by Manus:

- `VITE_APP_TITLE`
- `VITE_APP_LOGO`
- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- And more (see project settings)

No additional configuration is needed for deployments.

## Monitoring Deployments

### GitHub Actions UI

1. Go to the **Actions** tab in your repository
2. Click on the latest workflow run
3. View the deployment summary, logs, and test results

### Deployment Summary

Each deployment creates a summary with:
- Environment (staging/production)
- Branch and commit SHA
- Deployment URL
- Recent changes (last 5 commits)
- Next steps for verification

### Post-Deployment Verification

After deployment, the workflow automatically:
1. Runs smoke tests against the deployed site
2. Uploads test results as artifacts
3. Reports status in the workflow summary

## Rollback Procedure

If a deployment causes issues:

1. **Quick Rollback**: Revert the problematic commit and push
   ```bash
   git revert <commit-sha>
   git push origin main  # or develop
   ```

2. **Using Manus Checkpoints**:
   - Go to Manus Management UI
   - Navigate to project checkpoints
   - Click "Rollback" on a previous stable checkpoint

3. **Emergency Rollback**: Manually trigger workflow with previous commit
   ```bash
   git checkout <previous-stable-commit>
   git push origin main --force  # Use with caution!
   ```

## Troubleshooting

### Deployment Failed

1. Check the GitHub Actions logs for error messages
2. Common issues:
   - TypeScript errors: Fix type issues and push again
   - Test failures: Review test logs and fix failing tests
   - Build errors: Check build logs for missing dependencies or configuration issues

### Tests Failing

1. Review test results in the workflow artifacts
2. Download the test report for detailed analysis
3. Run tests locally to reproduce:
   ```bash
   pnpm test:unit
   pnpm test:e2e
   ```

### Deployment Successful but Site Not Working

1. Check browser console for errors
2. Verify environment variables in Manus settings
3. Check application logs in Manus Management UI
4. Run smoke tests manually:
   ```bash
   BASE_URL=https://intelleges-marketing-site.manus.space pnpm test:e2e:smoke
   ```

## Best Practices

1. **Always test on staging first** before deploying to production
2. **Run tests locally** before pushing to ensure CI will pass
3. **Use descriptive commit messages** for better deployment tracking
4. **Monitor the deployment** immediately after merge to catch issues early
5. **Keep deployments small** to make rollbacks easier if needed
6. **Document breaking changes** in commit messages and PR descriptions

## Deployment Checklist

Before deploying to production:

- [ ] All CI checks passing on `develop` branch
- [ ] Staging deployment tested and verified
- [ ] Database migrations applied (if any)
- [ ] Environment variables updated (if needed)
- [ ] Breaking changes documented
- [ ] Stakeholders notified of deployment window
- [ ] Rollback plan prepared
- [ ] Post-deployment verification plan ready

## Support

For deployment issues or questions:
- Check the [CI/CD documentation](./CI_CD.md)
- Review the [GitHub Push Guide](./PUSH_TO_GITHUB.md)
- Contact the development team
- Submit issues at https://help.manus.im
