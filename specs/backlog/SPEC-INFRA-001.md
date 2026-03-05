---
id: "SPEC-INFRA-001"
title: "Supabase project setup and client helpers"
product: "shared-infra"
priority: 1
type: "infrastructure"
status: "backlog"
depends_on: []
estimated_complexity: "medium"
---

# Supabase project setup and client helpers

## Context

All 5 SaaS products need a shared authentication and data layer. Supabase provides auth, database, and RLS out of the box. This spec sets up the Supabase client integration in the Next.js app.

## Requirements

1. Install `@supabase/supabase-js` and `@supabase/ssr`
2. Create `src/lib/supabase.ts` with:
   - `createClient()` — browser client (uses anon key)
   - `createServerClient()` — server component / route handler client (uses cookies for session)
3. Add Supabase env vars to `.env.example`
4. Update `CLAUDE.md` with Supabase patterns

## Acceptance Criteria

- [ ] `@supabase/supabase-js` and `@supabase/ssr` are in `dependencies`
- [ ] `src/lib/supabase.ts` exports `createClient` and `createServerClient`
- [ ] `.env.example` includes `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `CLAUDE.md` documents the Supabase client usage patterns
- [ ] All verification commands pass

## Environment Variables

| Variable | Description | Where to set |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server only) | `.env.local` |

## Technical Constraints

- Use `@supabase/ssr` for cookie-based auth (Next.js App Router compatible)
- Server client must use `cookies()` from `next/headers`
- Browser client must be a singleton to avoid multiple GoTrue instances

## Out of Scope

- Auth UI pages (SPEC-INFRA-002)
- Database schema (SPEC-INFRA-005)
- Session middleware (SPEC-INFRA-003)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
