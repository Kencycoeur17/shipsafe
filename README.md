# ShipSafe

A lightweight Next.js production-readiness CLI for safer deployments.

[![CI](https://github.com/Kencycoeur17/shipsafe/actions/workflows/ci.yml/badge.svg)](https://github.com/Kencycoeur17/shipsafe/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

ShipSafe runs local checks for common pre-deployment configuration oversights. It does not upload source code.

## Current checks

- Next.js dependency detection
- Build and test script presence
- Environment example file presence
- Environment ignore pattern review

These are **heuristic checks**, not proof of security or production readiness.

## Install and run

Requires Node.js 20 or later.

```bash
git clone https://github.com/Kencycoeur17/shipsafe.git
cd shipsafe
npm install
npm run build
node dist/cli.js scan /path/to/nextjs-app
node dist/cli.js scan /path/to/nextjs-app --json
```

Exit codes: `0` = no warnings; `1` = warnings; `2` = usage or scan error.

## Example output

```text
ShipSafe — Next.js preflight checks

PASS  Next.js dependency detected
PASS  build script configured
WARN  Missing test script
PASS  Environment example present
WARN  Review .gitignore to prevent committing local environment files

2 warning(s)
```

## Development

```bash
npm install
npm test
```

## Roadmap

- [x] Basic CLI, five checks, JSON output and tests
- [ ] More robust gitignore analysis and safe secret detection
- [ ] Next.js configuration rules with documented false-positive cases
- [ ] Configurable rules and CI integration examples
- [ ] Terminal demo GIF and real-world sample project

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Good first contributions include documentation, fixtures and tests.

## Security

See [SECURITY.md](SECURITY.md). Never include credentials in bug reports.

## License

MIT — see [LICENSE](LICENSE).

Maintained by [Braintechken](https://github.com/Kencycoeur17).
