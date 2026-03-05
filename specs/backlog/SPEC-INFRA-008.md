---
id: "SPEC-INFRA-008"
title: "Webhook handler — invoice.payment_failed with dunning email"
product: "shared-infra"
priority: 2
type: "feature"
status: "backlog"
depends_on: ["SPEC-INFRA-007"]
estimated_complexity: "medium"
---

# Webhook handler — invoice.payment_failed with dunning email

## Context

When a recurring payment fails, we need to update the subscription status and notify the customer to update their payment method.

## Requirements

1. `invoice.payment_failed` handler:
   - Update subscription status to `past_due`
   - Send a dunning email to the customer via Resend
2. Install `resend` package
3. Create email template helper in `src/lib/email.ts`

## Acceptance Criteria

- [ ] Payment failure updates subscription to `past_due` status
- [ ] Dunning email is sent to the customer's email address
- [ ] Email includes a link to the Stripe billing portal
- [ ] `resend` package is in dependencies
- [ ] `RESEND_API_KEY` added to `.env.example`
- [ ] All verification commands pass

## Environment Variables

| Variable | Description | Where to set |
|----------|-------------|--------------|
| `RESEND_API_KEY` | Resend API key for transactional email | `.env.local` |

## Technical Constraints

- Use Resend SDK for email delivery
- Email should be plain and professional — no heavy HTML templates needed
- Gracefully handle missing Resend key (log warning, don't crash)

## Out of Scope

- Other email types (SPEC-INFRA-011)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
