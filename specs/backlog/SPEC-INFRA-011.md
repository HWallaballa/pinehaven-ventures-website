---
id: "SPEC-INFRA-011"
title: "Transactional email setup with Resend"
product: "shared-infra"
priority: 3
type: "feature"
status: "backlog"
depends_on: ["SPEC-INFRA-008"]
estimated_complexity: "medium"
---

# Transactional email setup with Resend

## Context

The platform needs transactional emails for key user lifecycle events: welcome, subscription confirmation, and payment failure.

## Requirements

1. Extend `src/lib/email.ts` (created in SPEC-INFRA-008) with email templates:
   - `sendWelcomeEmail(email, name?)` — sent after signup
   - `sendSubscriptionConfirmation(email, planName, productName)` — sent after checkout
   - `sendPaymentFailedEmail(email, portalUrl)` — already exists from SPEC-INFRA-008
2. Call `sendWelcomeEmail` from the auth callback or signup flow
3. Call `sendSubscriptionConfirmation` from the checkout.session.completed webhook handler
4. All emails should use a consistent "from" address: `noreply@pinehavenventures.io`

## Acceptance Criteria

- [ ] Welcome email sends on new user signup
- [ ] Subscription confirmation email sends on checkout completion
- [ ] Emails use consistent branding (from address, basic formatting)
- [ ] Email sending failures are logged but don't crash the app
- [ ] All verification commands pass

## Technical Constraints

- Use Resend SDK (installed in SPEC-INFRA-008)
- Emails should be simple text/HTML — no complex templating needed
- From address configurable via `EMAIL_FROM` env var

## Out of Scope

- Marketing emails
- Email preferences/unsubscribe

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
