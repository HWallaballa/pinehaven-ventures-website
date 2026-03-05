---
id: "SPEC-CTL-003"
title: "Authenticated import flow replacing demo mock data"
product: "crypto-transaction-log"
priority: 2
type: "feature"
status: "backlog"
depends_on: ["SPEC-CTL-002", "SPEC-INFRA-003"]
estimated_complexity: "large"
---

# Authenticated import flow replacing demo mock data

## Context

The demo import wizard at `/ventures/crypto-transaction-log/demo` uses mock data. The production version at `/ventures/crypto-transaction-log/app/import` should use real CSV parsing and persist to Supabase.

## Requirements

1. Create `src/app/ventures/crypto-transaction-log/app/import/page.tsx`:
   - File upload UI (drag and drop + file picker)
   - Auto-detect exchange format and show detected format to user
   - Preview parsed transactions before importing
   - "Import" button that calls `/api/ctl/import` endpoint
   - Success/error feedback
2. Reuse/adapt the `ImportWizard` component patterns from the demo
3. Page must be authenticated (protected by middleware)

## Acceptance Criteria

- [ ] Import page at `/ventures/crypto-transaction-log/app/import` works for authenticated users
- [ ] CSV file upload and drag-and-drop work
- [ ] Exchange format is auto-detected and displayed
- [ ] Transaction preview shows before final import
- [ ] Successful import redirects to transactions list
- [ ] Error states are handled (invalid CSV, API errors)
- [ ] All verification commands pass

## Technical Constraints

- Client component (file upload requires browser APIs)
- Use the CSV parser from SPEC-CTL-001 for client-side preview
- Use the import API from SPEC-CTL-002 for server-side persistence

## Out of Scope

- Transaction list page (SPEC-CTL-004)
- Export (SPEC-CTL-005)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
