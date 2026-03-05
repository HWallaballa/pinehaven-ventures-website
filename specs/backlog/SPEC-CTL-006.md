---
id: "SPEC-CTL-006"
title: "Freemium gate — free tier limits and premium unlock"
product: "crypto-transaction-log"
priority: 3
type: "feature"
status: "backlog"
depends_on: ["SPEC-INFRA-009", "SPEC-CTL-004"]
estimated_complexity: "medium"
---

# Freemium gate — free tier limits and premium unlock

## Context

The Crypto Transaction Log has a free tier (1 exchange, 100 transactions) and a premium tier (unlimited). This spec enforces those limits.

## Requirements

1. Create `src/lib/ctl-limits.ts` with:
   - `checkTransactionLimit(userId)` — returns remaining quota
   - `checkExchangeLimit(userId)` — returns whether user can add a new exchange
2. Enforce limits in the import API (`/api/ctl/import`):
   - Free tier: reject imports exceeding 100 total transactions or from a 2nd exchange
   - Premium tier: no limits
3. Show usage info on the import page:
   - "X/100 transactions used" for free tier
   - "Unlimited" for premium
4. Show upgrade prompt when limits are hit

## Acceptance Criteria

- [ ] Free users are limited to 100 transactions
- [ ] Free users are limited to 1 exchange source
- [ ] Premium users have no limits
- [ ] Import API returns clear error when limit exceeded
- [ ] UI shows current usage and limits
- [ ] Upgrade prompt links to checkout for the premium plan
- [ ] All verification commands pass

## Technical Constraints

- Check subscription status via `checkSubscription()` from SPEC-INFRA-009
- Limits are checked server-side in the API (not just client-side)
- Use `ventures.json` plan data to determine tier

## Out of Scope

- Other product freemium gates
- Usage analytics

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
