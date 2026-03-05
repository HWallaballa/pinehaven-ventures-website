---
id: "SPEC-CTL-001"
title: "Production CSV parser — multi-exchange format detection and normalization"
product: "crypto-transaction-log"
priority: 2
type: "feature"
status: "backlog"
depends_on: ["SPEC-INFRA-001"]
estimated_complexity: "large"
---

# Production CSV parser — multi-exchange format detection and normalization

## Context

The Crypto Transaction Log demo currently uses mock data. The production version needs a robust CSV parser that auto-detects the exchange format and normalizes transactions into a common schema.

## Requirements

1. Create `src/lib/csv-parser.ts` with:
   - `detectExchange(csvContent: string): ExchangeFormat` — identifies Coinbase, Binance, Kraken, or Gemini by header patterns
   - `parseCSV(csvContent: string, format?: ExchangeFormat): NormalizedTransaction[]` — parses and normalizes
2. Normalized transaction schema:
   - `date` (ISO 8601), `type` (buy/sell/transfer/reward), `asset`, `amount`, `price_per_unit`, `total_value`, `fee`, `currency`, `exchange`, `notes`
3. Handle edge cases: different date formats, missing fields, currency symbols
4. Create tests in `tests/csv-parser.test.ts` with sample data for each exchange

## Acceptance Criteria

- [ ] Auto-detects Coinbase, Binance, Kraken, Gemini CSV formats
- [ ] Normalizes all formats to a common `NormalizedTransaction` type
- [ ] Handles missing optional fields gracefully
- [ ] Parses dates correctly across formats
- [ ] Unit tests cover all 4 exchange formats
- [ ] All verification commands pass

## Technical Constraints

- Pure TypeScript — no CSV parsing libraries (keep bundle small)
- Export types from a shared types file
- Parser must work both server-side and client-side

## Out of Scope

- API upload endpoints (SPEC-CTL-002)
- UI import flow (SPEC-CTL-003)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
