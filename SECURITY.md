# Security Policy

## Supported Versions

We actively support security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### 1. **Do NOT** create a public GitHub issue

Security vulnerabilities should be reported privately to prevent exploitation.

### 2. Email Security Team

Send an email to: **security@licensechain.app**

Include the following information:
- **Type of vulnerability** (e.g., XSS, SQL injection, authentication bypass)
- **Affected component** (file/function/endpoint)
- **Steps to reproduce** (detailed reproduction steps)
- **Potential impact** (what could an attacker do?)
- **Suggested fix** (if you have one)

### 3. Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity (typically 7-30 days)

### 4. Disclosure Policy

- We will acknowledge receipt of your report
- We will keep you informed of the progress
- We will credit you in the security advisory (if you wish)
- We will not disclose the vulnerability until a fix is available

## Security Best Practices

### For Developers

1. **Never commit secrets** - Use `.env.example` as a template
2. **Keep dependencies updated** - Run `npm audit` regularly
3. **Use strong passwords** - For database and API keys
4. **Rotate credentials** - Regularly update sensitive keys
5. **Review code changes** - Before merging PRs

### Environment Variables

- Mark sensitive variables with `[SENSITIVE]` in `.env.example`
- Never expose `DATABASE_URL` or API keys
- Use environment-specific configurations
- Rotate secrets after any potential exposure

## Known Security Considerations

### Database Security
- Use connection pooling (pgbouncer) for production
- Never expose database credentials in client-side code
- Use read-only connections when possible

### API Security
- Validate all input data
- Use rate limiting for API endpoints
- Implement proper authentication for admin functions
- Sanitize user inputs to prevent injection attacks

### Deployment Security
- Use HTTPS in production
- Configure proper CORS policies
- Set secure headers (CSP, HSTS, etc.)
- Regularly update dependencies

## Security Updates

Security updates will be:
- Released as patch versions (e.g., 1.0.1)
- Documented in CHANGELOG.md
- Tagged with security advisory labels

## Acknowledgments

We appreciate responsible disclosure. Security researchers who help us improve our security will be acknowledged (with permission) in our security advisories.

---

**Last Updated**: January 2026
