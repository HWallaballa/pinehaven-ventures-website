---
id: "SPEC-XXX-NNN"
title: ""
product: ""          # e.g., crypto-transaction-log, power-digital, shared-infra
priority: 3          # 1 = critical, 2 = high, 3 = medium, 4 = low
type: "feature"      # feature | bugfix | refactor | infrastructure
status: "backlog"    # backlog | in-progress | completed | rejected
depends_on: []       # list of spec IDs that must be completed first
estimated_complexity: "medium"  # small | medium | large
---

# {{title}}

## Context

Brief description of why this feature is needed and what problem it solves.

## Requirements

1. Requirement one
2. Requirement two
3. Requirement three

## Acceptance Criteria

- [ ] Criterion one — specific, testable outcome
- [ ] Criterion two
- [ ] Criterion three

## Technical Constraints

- Must work with existing Next.js 16 App Router architecture
- Must pass `npx tsc --noEmit`, `npm run lint`, `npm run test`, `npm run build`
- List any specific libraries, patterns, or APIs to use

## Out of Scope

- What this spec explicitly does NOT cover

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```

## Notes

Any additional context, links, or implementation hints for the agent.
