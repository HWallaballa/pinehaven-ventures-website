---
id: "SPEC-INFRA-006"
title: "Webhook handler — checkout.session.completed fulfillment"
product: "shared-infra"
priority: 1
type: "feature"
status: "backlog"
depends_on: ["SPEC-INFRA-005"]
estimated_complexity: "large"
---

# Webhook handler — checkout.session.completed fulfillment

## Context

When a customer completes Stripe Checkout, we need to create/link their user account in Supabase and record their active subscription. Currently the webhook just logs the event.

## Requirements

1. In `src/app/api/stripe/webhooks/route.ts`, replace the `checkout.session.completed` TODO with:
   - Look up the Stripe customer by email
   - Find or create the Supabase profile with matching email, set `stripe_customer_id`
   - Create a `subscriptions` row with the Stripe subscription details
   - Set subscription status to `active`
2. Create a shared helper `src/lib/stripe-webhooks.ts` for the fulfillment logic
3. Use the Supabase service role client (bypasses RLS) for webhook writes

## Acceptance Criteria

- [ ] `checkout.session.completed` handler creates/updates profile with stripe_customer_id
- [ ] Handler creates a subscription record in the subscriptions table
- [ ] Uses Supabase service role client (not anon)
- [ ] Handles edge cases: existing customer, duplicate webhooks (idempotent)
- [ ] Existing webhook signature verification remains unchanged
- [ ] All verification commands pass

## Technical Constraints

- Must use `SUPABASE_SERVICE_ROLE_KEY` for database writes (server-only, never exposed to client)
- Must be idempotent — receiving the same event twice should not create duplicate records
- Retrieve full subscription details from Stripe API (`stripe.subscriptions.retrieve`)

## Out of Scope

- Subscription update/delete handlers (SPEC-INFRA-007)
- Welcome email (SPEC-INFRA-011)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
