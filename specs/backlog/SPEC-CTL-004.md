---
id: "SPEC-CTL-004"
title: "Transaction list page with search, filter, sort"
product: "crypto-transaction-log"
priority: 2
type: "feature"
status: "backlog"
depends_on: ["SPEC-CTL-002", "SPEC-INFRA-003"]
estimated_complexity: "large"
---

# Transaction list page with search, filter, sort

## Context

Users need to view, search, and filter their imported transactions. This replaces the demo transaction list with a real, authenticated version.

## Requirements

1. Create `src/app/ventures/crypto-transaction-log/app/transactions/page.tsx`:
   - Fetch transactions from `/api/ctl/transactions`
   - Table view with columns: Date, Type, Asset, Amount, Price, Total Value, Fee, Exchange
   - Search by asset name or exchange
   - Filter by: type (buy/sell/transfer/reward), exchange, date range
   - Sort by any column (ascending/descending)
   - Pagination (25 per page)
2. Add "Import" and "Export" action buttons in the header
3. Add "Delete" action per row (with confirmation)

## Acceptance Criteria

- [ ] Transaction list loads from Supabase via API
- [ ] Search filters transactions by asset or exchange
- [ ] Type and exchange filters work
- [ ] Date range filter works
- [ ] Column sorting works
- [ ] Pagination works with 25 items per page
- [ ] Delete removes a transaction with confirmation
- [ ] All verification commands pass

## Technical Constraints

- Client component for interactive features
- Use URL search params for filter/sort state (enables bookmarkable URLs)
- Responsive table design (horizontal scroll on mobile)

## Out of Scope

- Export functionality (SPEC-CTL-005)
- Freemium gating (SPEC-CTL-006)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
