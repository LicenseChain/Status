# Changelog

All notable changes to the LicenseChain Status Page will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Historical uptime charts
- Service-specific status pages
- RSS feed for status updates
- Email notifications for incidents
- API endpoints for status data

## [1.3.0] - 2026-01-29

### Added
- Locale-specific metadata generation using generateMetadata function
- Enhanced SEO structured data with locale-aware content
- BreadcrumbList structured data for better navigation
- Locale-specific OpenGraph metadata with alternateLocale support
- Locale-specific keywords in metadata
- Service Channel structured data with availableLanguage support
- SearchAction structured data for website search functionality

### Changed
- Header logo now uses favicon.svg instead of logo.png
- Structured data now uses favicon.svg for all logo references
- Metadata generation is now fully locale-aware with translated titles and descriptions
- OpenGraph locale mapping for all 9 supported languages
- Enhanced WebSite structured data with inLanguage property
- Enhanced WebPage structured data with locale-specific content

### Fixed
- Improved SEO positioning with proper locale-specific metadata
- Better search engine understanding of multi-language content

## [1.2.0] - 2026-01-29

### Added
- CI/CD pipeline workflow for automated quality checks
- GitHub Actions workflow for linting, type checking, building, and security auditing
- Automated build verification before Vercel deployment

### Changed
- Repository description updated for SEO optimization
- GitHub topics added for better discoverability

## [1.1.0] - 2026-01-15

### Added
- SEO optimizations: sitemap.xml, enhanced robots.txt, hreflang tags
- Comprehensive documentation: CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md, DEVELOPMENT_GOALS.md
- .env.example with detailed security documentation
- Enhanced structured data for better search engine visibility
- Multi-language hreflang tags for all supported locales

### Changed
- Consolidated deployment documentation into README.md
- Improved README structure following documentation best practices
- Enhanced metadata with language alternates

### Fixed
- Removed duplicate next.config.ts file
- Cleaned up unused SVG files from public directory
- Removed duplicate deployment documentation

## [1.0.0] - 2026-01-01

### Added
- Initial release
- Real-time status monitoring
- Service status display
- Incident reporting
- Modern UI design
- Dark mode support
- Responsive design

[Unreleased]: https://github.com/licensechain/status/compare/v1.0.0...HEAD
[1.2.0]: https://github.com/licensechain/status/releases/tag/v1.2.0
