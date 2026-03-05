---
id: "SPEC-INFRA-010"
title: "Billing portal UI at /account/billing"
product: "shared-infra"
priority: 3
type: "feature"
status: "backlog"
depends_on: ["SPEC-INFRA-004", "SPEC-INFRA-005"]
estimated_complexity: "medium"
---

# Billing portal UI at /account/billing

## Context

Users need a dedicated billing page that shows their subscription details and provides access to the Stripe Customer Portal.

## Requirements

1. Create `src/app/account/billing/page.tsx` showing:
   - Current plan name and price
   - Subscription status (active, past_due, canceled)
   - Current period dates and next renewal date
   - "Manage Subscription" button → Stripe Customer Portal
   - "Cancel Subscription" info (handled via portal)
2. Add "Billing" link to the account page navigation

## Acceptance Criteria

- [ ] `/account/billing` renders subscription details from Supabase
- [ ] Shows plan name by mapping stripe_price_id to ventures.json data
- [ ] "Manage Subscription" button uses existing `/api/stripe/portal` route
- [ ] Handles "no subscription" state gracefully
- [ ] All verification commands pass

## Technical Constraints

- Server component, protected by auth middleware
- Use data from `subscriptions` table via Supabase server client

## Out of Scope

- Invoice history (can be viewed in Stripe portal)
- Plan switching UI (handled by Stripe portal)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
