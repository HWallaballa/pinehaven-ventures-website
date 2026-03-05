---
id: "SPEC-INFRA-009"
title: "Subscription gate middleware"
product: "shared-infra"
priority: 2
type: "infrastructure"
status: "backlog"
depends_on: ["SPEC-INFRA-005", "SPEC-INFRA-003"]
estimated_complexity: "medium"
---

# Subscription gate middleware

## Context

Product app routes (`/ventures/*/app/*`) should only be accessible to users with an active subscription for that product. Users without a subscription should see an upgrade prompt.

## Requirements

1. Create `src/lib/subscription-gate.ts` with a helper:
   - `checkSubscription(userId, productSlug)` — queries Supabase for active subscription matching the product
2. Create a layout or middleware check for `/ventures/[product]/app/` routes that:
   - Checks if user has an active subscription
   - If not, redirects to the product page with an upgrade prompt
3. Support free tier check: if the product has `has_free_tier: true` in ventures.json, allow access without subscription (with feature limits enforced at the API level)

## Acceptance Criteria

- [ ] `checkSubscription()` correctly queries subscriptions table
- [ ] Users with active subscription can access product app routes
- [ ] Users without subscription are redirected to the product marketing page
- [ ] Free-tier products allow access without subscription
- [ ] All verification commands pass

## Technical Constraints

- Use Supabase server client (from middleware context)
- Map Stripe price IDs to product slugs using `stripe-products.ts`

## Out of Scope

- Feature-level gating within products (per-product specs)
- Usage metering

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
