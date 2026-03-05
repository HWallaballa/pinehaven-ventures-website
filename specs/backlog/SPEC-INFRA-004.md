---
id: "SPEC-INFRA-004"
title: "Account page with profile and subscription status"
product: "shared-infra"
priority: 2
type: "feature"
status: "backlog"
depends_on: ["SPEC-INFRA-003"]
estimated_complexity: "medium"
---

# Account page with profile and subscription status

## Context

Users need a central account page to see their profile info and linked subscription status.

## Requirements

1. Create `src/app/account/page.tsx` — shows user email, created date
2. Display linked subscription status (if any) — plan name, status, renewal date
3. Add "Manage Billing" button that links to `/api/stripe/portal`
4. Add "Sign Out" button
5. Add account link to Navigation component when user is logged in

## Acceptance Criteria

- [ ] `/account` page renders for authenticated users
- [ ] Shows user email and account creation date
- [ ] Shows subscription info if present (reads from Supabase once SPEC-INFRA-005 is done, placeholder until then)
- [ ] "Manage Billing" button opens Stripe portal
- [ ] "Sign Out" button logs out and redirects to `/`
- [ ] Navigation shows "Account" link when logged in, "Login" when not
- [ ] All verification commands pass

## Technical Constraints

- This is a server component (protected by middleware from SPEC-INFRA-003)
- Use `getUser()` from `src/lib/supabase.ts`

## Out of Scope

- Profile editing (name, avatar)
- Billing detail page (SPEC-INFRA-010)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
