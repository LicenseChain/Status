# LicenseChain Status Page

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/website?url=https://status.licensechain.app)](https://status.licensechain.app)
[![Sponsor](https://img.shields.io/badge/Sponsor-LicenseChain-ea4aaa?logo=github&logoColor=white)](https://github.com/sponsors/LicenseChain)

A modern, professional status page for LicenseChain services built with Next.js 14, TypeScript, and Tailwind CSS. Features real-time status monitoring, incident management, and multi-language support.

**Open source and available under the MIT License.**

## ✨ Features

- **Real-time Status Monitoring** - Live updates of all service statuses with automatic health checks
- **Multi-language Support** - Available in 9 languages (English, Spanish, French, German, Russian, Chinese, Japanese, Portuguese, Italian)
- **Modern UI/UX Design** - Clean, professional interface with glassmorphism design and smooth animations
- **Dark Mode by Default** - Dark theme as default with Light/Dark toggle option
- **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Service Categories** - Organized by Core Services, Infrastructure, and Payment Processing
- **Performance Metrics** - Real-time uptime and response time data
- **Incident Management** - Track and display service incidents with status updates
- **Auto-refresh** - Automatic status updates every 30 seconds
- **Automated Health Checks** - Cron job runs 6 times per day at random intervals to update service statuses
- **SEO Optimized** - Full SEO support with locale-specific metadata, structured data (Schema.org), sitemap, and multi-language hreflang tags
- **Language Switcher** - Easy language selection in header with dropdown menu

## 🧭 Table of Contents

- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Development](#-development)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Security](#-security)
- [License](#-license)

## 🚀 Quick Start

```bash
# 1) Clone and install
git clone https://github.com/licensechain/status.git
cd status
npm install

# 2) Configure environment
cp .env.example .env
# Edit .env with your database credentials

# 3) Generate Prisma client
npm run prisma:generate

# 4) Run development server
npm run dev
```

Visit `http://localhost:3000` to see the status page.

## 💿 Installation

### Prerequisites

- Node.js 20+ 
- npm, yarn, or pnpm
- PostgreSQL database (shared with LicenseChain ecosystem)

### Step-by-Step

1. **Clone the repository**
   ```bash
   git clone https://github.com/licensechain/status.git
   cd status
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and configure:
   - `DATABASE_URL` - PostgreSQL connection string (required)
   - Optional webhook health check URLs

4. **Generate Prisma client**
   ```bash
   npm run prisma:generate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

| Variable | Description | Required | Sensitive |
|----------|-------------|----------|-----------|
| `DATABASE_URL` | PostgreSQL connection string with credentials | Yes | ✅ Yes |
| `CRYPTO_WEBHOOK_HEALTH_URL` | Crypto payment webhook health check endpoint | No | ✅ Yes |
| `STRIPE_WEBHOOK_HEALTH_URL` | Stripe webhook health check endpoint | No | ✅ Yes |
| `NEXT_PUBLIC_WEBHOOK_HEALTH_URL` | Public webhook health check URL | No | ❌ No |
| `NEXT_PUBLIC_STRIPE_WEBHOOK_HEALTH_URL` | Public Stripe webhook health check URL | No | ❌ No |

> **Security Note**: Variables marked as sensitive should never be committed to version control. See [.env.example](.env.example) for detailed documentation.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub: `Repository/Status`

2. **Configure Project**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)

3. **Environment Variables**
   - Add all required variables from `.env.example`
   - Mark sensitive variables appropriately

4. **Custom Domain**
   - Add custom domain: `status.domain_here.app`
   - Configure DNS records as instructed

### Build Commands

```bash
# Production build
npm run build

# Deploy to Vercel
npm run deploy:vercel

# Start production server
npm start
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Custom domain configured
- [ ] All service endpoints tested
- [ ] Auto-refresh functionality verified
- [ ] Error handling tested
- [ ] Mobile responsiveness validated
- [ ] Dark mode functionality checked

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:generate  # Generate Prisma client
```

### Project Structure

```
status/
├── src/
│   ├── app/
│   │   ├── [locale]/        # Locale-based routes
│   │   ├── api/             # API routes
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   ├── i18n/                # Internationalization
│   └── lib/                  # Utilities and helpers
├── messages/                 # Translation files
├── public/                   # Static assets
└── prisma/                   # Database schema
```

### Adding New Services

1. Update service configuration in `src/lib/status-monitor.ts`
2. Add service icon mapping in the main component
3. Update service categories as needed

### Customization

- **Styling**: Modify `tailwind.config.js` and component styles
- **Translations**: Update files in `messages/` directory
- **Theme**: Default is dark mode, toggle between light/dark only

## 🌍 Supported Languages

- English (en) - Default
- Spanish (es)
- French (fr)
- German (de)
- Russian (ru)
- Chinese (zh)
- Japanese (ja)
- Portuguese (pt)
- Italian (it)

## 🗺️ Roadmap

Planned milestones live in [ROADMAP.md](ROADMAP.md). For changes, see [CHANGELOG.md](CHANGELOG.md).

### Upcoming Features
- Historical uptime charts
- Service-specific status pages
- RSS feed for status updates
- Email notifications for incidents
- API endpoints for status data

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) and follow the PR template.

### Quick Guidelines
- Follow [Conventional Commits](https://www.conventionalcommits.org/)
- Use branch naming: `feature/...`, `fix/...`, `docs/...`
- Ensure all tests pass before submitting PR
- Update documentation for new features

## 🔒 Security

Please report vulnerabilities via [SECURITY.md](SECURITY.md).

**Security Contact**: security@licensechain.app

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

**Copyright © 2026 LicenseChain LLC**

## 💝 Sponsors

Support LicenseChain Status Page development by becoming a sponsor. Your sponsorship helps us maintain and improve this open-source project.

- **[GitHub Sponsors](https://github.com/sponsors/LicenseChain)** - Support us directly on GitHub
- **[LicenseChain Website](https://licensechain.app/sponsor)** - Learn more about sponsorship opportunities

Thank you to all our sponsors! 🙏

## 🔗 Links

- **Live Status Page**: [https://status.licensechain.app](https://status.licensechain.app)
- **Main Website**: [https://licensechain.app](https://licensechain.app)
- **Documentation**: [https://docs.licensechain.app](https://docs.licensechain.app)
- **GitHub Organization**: [https://github.com/licensechain](https://github.com/licensechain)

---

**Status**: ✅ Production Ready  
**Version**: 1.4.0  
**Last Updated**: January 2026
