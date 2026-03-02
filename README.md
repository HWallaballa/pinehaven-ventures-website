# Pinehaven Ventures Website

Next.js (App Router) site for Pinehaven Ventures product marketing pages and venture demos.

## Local Development

```bash
npm install
npm run dev
```

## Core Routes

- `/` - Home page
- `/ventures` - Product portfolio
- `/ventures/powerpmis` - PowerPMIS product page
- `/ventures/powerpmis/demo` - PowerPMIS MVP demo
- `/ventures/crypto-transaction-log` - Crypto Transaction Log product page
- `/ventures/crypto-transaction-log/demo` - Crypto Transaction Log interactive demo
- `/toolkit` - Documentation and implementation toolkit hub
- `/reference/powerpmis-mvp-implementation` - PowerPMIS implementation log and scope

## PowerPMIS Capability Tracks

The PowerPMIS pages currently map roadmap coverage against:

- Togal.ai-like quantity takeoff automation
- Destini-style estimating and scenario modeling
- ProjectManager-style execution tracking
- Procore-aligned field and office integration workflows

External dependencies for full enterprise rollout:

- Procore API credentials (client/app authorization and project scopes)
- Primavera P6 or MS Project schedule data feeds
- Cloud object storage for scan/version data
- PowerBI/Excel reporting channels for executive exports

## Build Validation

```bash
npm run build
```
