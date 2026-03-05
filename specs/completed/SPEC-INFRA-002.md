---
id: "SPEC-INFRA-002"
title: "Auth pages — login, signup, forgot password"
product: "shared-infra"
priority: 1
type: "feature"
status: "backlog"
depends_on: ["SPEC-INFRA-001"]
estimated_complexity: "large"
---

# Auth pages — login, signup, forgot password

## Context

Users need to create accounts and log in to access paid product features. These shared auth pages serve all 5 SaaS products.

## Requirements

1. Create `src/app/auth/login/page.tsx` — email/password login form
2. Create `src/app/auth/signup/page.tsx` — email/password registration form
3. Create `src/app/auth/forgot-password/page.tsx` — password reset request form
4. Create `src/app/auth/callback/route.ts` — handles Supabase auth callback (email confirmation, OAuth)
5. All forms should use server actions or API routes to call Supabase Auth
6. Style consistently with existing site design (Tailwind)
7. Include error handling and loading states

## Acceptance Criteria

- [ ] `/auth/login` renders a login form with email and password fields
- [ ] `/auth/signup` renders a signup form with email and password fields
- [ ] `/auth/forgot-password` renders a password reset form
- [ ] `/auth/callback` handles the Supabase redirect and sets session
- [ ] Forms show validation errors from Supabase
- [ ] Successful login redirects to `/` (or returnTo param)
- [ ] All verification commands pass

## Technical Constraints

- Use Supabase client from `src/lib/supabase.ts` (SPEC-INFRA-001)
- Forms must be client components (use "use client")
- Use existing Navigation component for layout consistency

## Out of Scope

- OAuth/social login (future enhancement)
- Session middleware / route protection (SPEC-INFRA-003)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
