---
id: "SPEC-SMOKE-001"
title: "Add data-testid to homepage hero heading"
product: "shared-infra"
priority: 1
type: "feature"
status: "backlog"
depends_on: []
estimated_complexity: "small"
---

# Add data-testid to homepage hero heading

## Context

This is a smoke test spec to validate the dark factory pipeline. It makes a trivial change that can be verified automatically.

## Requirements

1. Add `data-testid="hero-heading"` to the main heading (`h1`) on the homepage (`src/app/page.tsx`)

## Acceptance Criteria

- [ ] The `h1` element on the homepage has `data-testid="hero-heading"`
- [ ] All verification commands pass

## Technical Constraints

- Only modify `src/app/page.tsx`
- Do not change any other styling or content

## Out of Scope

- Any other page modifications

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
