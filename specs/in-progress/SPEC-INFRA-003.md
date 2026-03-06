---
id: "SPEC-INFRA-003"
title: "Session middleware — protect routes and provide user context"
product: "shared-infra"
priority: 1
type: "infrastructure"
status: "backlog"
depends_on: ["SPEC-INFRA-001", "SPEC-INFRA-002"]
estimated_complexity: "medium"
---

# Session middleware — protect routes and provide user context

## Context

Authenticated routes (product apps, account pages) need to verify the user's session and redirect unauthenticated users to login.

## Requirements

1. Create `src/middleware.ts` (Next.js middleware) that:
   - Refreshes the Supabase session on every request (prevents stale cookies)
   - Protects routes matching `/account/*`, `/ventures/*/app/*` by redirecting to `/auth/login`
   - Passes through all other routes (marketing pages, demos, API routes)
2. Expose a `getUser()` helper in `src/lib/supabase.ts` for server components to get the current user

## Acceptance Criteria

- [ ] `src/middleware.ts` exists and runs on protected route patterns
- [ ] Unauthenticated requests to `/account` redirect to `/auth/login?returnTo=/account`
- [ ] Unauthenticated requests to `/ventures/crypto-transaction-log/app/*` redirect to login
- [ ] Marketing pages (`/`, `/ventures/*` without `/app/`) remain accessible
- [ ] `getUser()` returns the authenticated user or null
- [ ] All verification commands pass

## Technical Constraints

- Use `@supabase/ssr` `createServerClient` in middleware
- Middleware config must use `matcher` to avoid running on static assets
- Do not block API routes (`/api/*`) — they handle their own auth

## Out of Scope

- Subscription gating (SPEC-INFRA-009)
- Role-based access control

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
