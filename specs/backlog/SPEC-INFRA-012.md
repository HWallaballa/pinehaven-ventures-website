---
id: "SPEC-INFRA-012"
title: "Update CLAUDE.md with Supabase, auth, and testing conventions"
product: "shared-infra"
priority: 3
type: "infrastructure"
status: "backlog"
depends_on: ["SPEC-INFRA-005", "SPEC-INFRA-003"]
estimated_complexity: "small"
---

# Update CLAUDE.md with Supabase, auth, and testing conventions

## Context

CLAUDE.md is the primary reference for the dark factory agent. It needs to be updated with the patterns established by the infrastructure specs so future specs are implemented consistently.

## Requirements

1. Add to CLAUDE.md:
   - Supabase section: client helpers, service role usage, migration conventions
   - Auth section: middleware patterns, `getUser()` usage, protected route patterns
   - Testing section: vitest setup, test file conventions, how to write tests
   - Database section: table naming, RLS policy conventions, TypeScript types
   - Email section: Resend usage, email helper patterns

## Acceptance Criteria

- [ ] CLAUDE.md includes Supabase client usage documentation
- [ ] CLAUDE.md includes auth/middleware patterns
- [ ] CLAUDE.md includes testing conventions
- [ ] CLAUDE.md includes database conventions
- [ ] Test and verification commands are up to date
- [ ] All verification commands pass

## Technical Constraints

- Keep CLAUDE.md concise — patterns and conventions, not tutorials
- Reference specific file paths for helpers

## Out of Scope

- Product-specific documentation

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
