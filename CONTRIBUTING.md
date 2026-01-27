# Contributing to LicenseChain Status

Thanks for helping improve LicenseChain Status!

## Code of Conduct

Please read and follow our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Development Setup

```bash
# Clone the repository
git clone https://github.com/LicenseChain/Status.git
cd Status

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npm run prisma:generate

# Run development server
npm run dev
```

## Branching & Commit Style

### Branch Naming
- `feature/...` - New features
- `fix/...` - Bug fixes
- `docs/...` - Documentation updates
- `chore/...` - Maintenance tasks
- `refactor/...` - Code refactoring

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements
- `style:` - Code style changes (formatting, etc.)

Example:
```
feat: add multi-language support for status page
fix: resolve dark mode persistence issue
docs: update deployment guide with Vercel instructions
```

## Pull Requests

1. **Link related issues** - Reference any related GitHub issues
2. **Add tests** - Include tests for new features or bug fixes
3. **Update documentation** - Keep README, CHANGELOG, and docs up to date
4. **Follow PR template** - Use the provided PR template
5. **Keep diffs focused** - One logical change per PR
6. **Test locally** - Ensure the build passes and app runs correctly

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests pass locally

## Release Process

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes (backward compatible)

### Steps
1. Update version in `package.json`
2. Update [CHANGELOG.md](CHANGELOG.md) with changes
3. Create a release tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
4. Push tag: `git push origin v1.0.0`

## Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions

## Testing

- Test all new features locally
- Verify multi-language support works
- Test dark/light mode functionality
- Ensure responsive design works on mobile devices

## Questions?

For questions or clarifications, please:
- Open an issue on GitHub
- Contact: support@licensechain
