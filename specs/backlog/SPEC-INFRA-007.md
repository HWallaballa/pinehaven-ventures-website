---
id: "SPEC-INFRA-007"
title: "Webhook handlers — subscription.updated and subscription.deleted"
product: "shared-infra"
priority: 1
type: "feature"
status: "backlog"
depends_on: ["SPEC-INFRA-006"]
estimated_complexity: "medium"
---

# Webhook handlers — subscription.updated and subscription.deleted

## Context

When subscriptions change (upgrade, downgrade, cancel), the Supabase subscriptions table must stay in sync.

## Requirements

1. `customer.subscription.updated` handler:
   - Update the matching subscription row: status, price_id, period dates, cancel_at_period_end
2. `customer.subscription.deleted` handler:
   - Update subscription status to `canceled`
3. Both handlers should be in `src/lib/stripe-webhooks.ts`

## Acceptance Criteria

- [ ] Subscription updates sync status, price, period dates to Supabase
- [ ] Subscription deletion sets status to `canceled`
- [ ] Handles missing subscription records gracefully (log warning, don't crash)
- [ ] All verification commands pass

## Technical Constraints

- Use Supabase service role client
- Match subscriptions by `stripe_subscription_id`

## Out of Scope

- Payment failure handling (SPEC-INFRA-008)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
