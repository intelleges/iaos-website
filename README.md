# Intelleges Marketing Site

Enterprise compliance management system marketing website with integrated pricing calculator and customer portal.

![Playwright Tests](https://github.com/YOUR_ORG/intelleges-marketing-site/actions/workflows/playwright-tests.yml/badge.svg)
![Type Check](https://github.com/YOUR_ORG/intelleges-marketing-site/actions/workflows/type-check.yml/badge.svg)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x or higher
- pnpm 10.x or higher

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The site will be available at `http://localhost:3000`

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm test` | Run unit tests with Vitest |
| `pnpm test:e2e` | Run E2E tests with Playwright |
| `pnpm test:e2e:ui` | Run E2E tests in interactive UI mode |
| `pnpm test:e2e:report` | View last E2E test report |
| `pnpm db:push` | Push database schema changes |

---

## 🧪 Testing

### End-to-End Tests

The project uses Playwright for automated E2E testing. Tests run automatically in CI/CD on every push and pull request.

```bash
# Run all E2E tests
pnpm test:e2e

# Run tests in interactive mode
pnpm test:e2e:ui

# View last test report
pnpm test:e2e:report
```

**Test Coverage:**
- ✅ Pricing calculator integration toggles (9 tests)
- ✅ Tier-based feature restrictions
- ✅ Visual verification of UI states

See [TESTING.md](./TESTING.md) for detailed testing documentation.

---

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment.

### Workflows

- **Playwright Tests:** Runs E2E tests on push/PR to `main` and `develop` branches
  - Caches dependencies for faster runs (~30-45s)
  - Uploads test reports and failure screenshots
  - Comments on PRs with test results

See [CI_CD.md](./CI_CD.md) for detailed CI/CD documentation.

---

## 🏗️ Project Structure

```
intelleges-marketing-site/
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── client/
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── contexts/       # React contexts
│       ├── hooks/          # Custom React hooks
│       └── lib/            # Utility functions
├── server/                 # Backend API (Express + tRPC)
├── drizzle/               # Database schema and migrations
├── tests/                 # Playwright E2E tests
├── playwright.config.ts   # Playwright configuration
└── package.json           # Dependencies and scripts
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Component library
- **Wouter** - Client-side routing
- **Framer Motion** - Animations

### Backend
- **Express** - Web server
- **tRPC** - Type-safe API
- **Drizzle ORM** - Database ORM
- **MySQL** - Database

### Testing
- **Playwright** - E2E testing
- **Vitest** - Unit testing

### DevOps
- **GitHub Actions** - CI/CD
- **pnpm** - Package management
- **TypeScript** - Type safety

---

## 📚 Documentation

- [TESTING.md](./TESTING.md) - Testing guide and best practices
- [CI_CD.md](./CI_CD.md) - CI/CD pipeline documentation
- [INTEGRATION_TOGGLE_VERIFICATION.md](./INTEGRATION_TOGGLE_VERIFICATION.md) - Integration toggle verification report

---

## 🔐 Environment Variables

Required environment variables are automatically injected in the Manus platform:

- `DATABASE_URL` - MySQL database connection string
- `JWT_SECRET` - JWT signing secret
- `SENDGRID_API_KEY` - SendGrid email API key
- `STRIPE_SECRET_KEY` - Stripe payment API key
- `VITE_APP_TITLE` - Application title
- `VITE_APP_LOGO` - Application logo URL

---

## 🚢 Deployment

### Manus Platform

The site is deployed on the Manus platform with automatic SSL, CDN, and database provisioning.

To deploy:
1. Save a checkpoint in the Manus UI
2. Click the **Publish** button in the Management UI header
3. Your site will be live at `https://your-domain.manus.space`

### Manual Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 📄 License

MIT

---

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Ensure all tests pass: `pnpm test:e2e`
4. Submit a pull request to `develop`

All PRs must pass CI checks before merging.

---

## 📞 Support

For questions or issues, contact the Intelleges development team.

---

**Built with ❤️ by the Intelleges Team**
