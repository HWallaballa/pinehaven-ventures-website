---
id: "SPEC-CTL-005"
title: "CSV and PDF export functionality"
product: "crypto-transaction-log"
priority: 3
type: "feature"
status: "backlog"
depends_on: ["SPEC-CTL-004"]
estimated_complexity: "medium"
---

# CSV and PDF export functionality

## Context

Users need to export their transaction data for tax reporting and record-keeping.

## Requirements

1. Create `src/app/api/ctl/transactions/export/route.ts`:
   - `GET ?format=csv` — returns transactions as downloadable CSV
   - `GET ?format=pdf` — returns transactions as downloadable PDF
   - Supports same filters as the list endpoint (type, exchange, date range)
2. Add export buttons to the transaction list page header
3. CSV export: standard format with headers matching normalized schema
4. PDF export: formatted table with title, date range, summary totals

## Acceptance Criteria

- [ ] CSV export downloads a valid CSV file
- [ ] PDF export downloads a formatted PDF
- [ ] Both exports respect current filters
- [ ] Export buttons are accessible from the transaction list page
- [ ] All verification commands pass

## Technical Constraints

- CSV generation: pure string building (no library needed)
- PDF generation: use a lightweight library like `jspdf` or server-side rendering
- Exports must be authenticated (check user session)

## Out of Scope

- Tax form generation
- Scheduled/automated exports

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
