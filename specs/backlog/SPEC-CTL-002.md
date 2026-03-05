---
id: "SPEC-CTL-002"
title: "Supabase transactions table and CRUD API routes"
product: "crypto-transaction-log"
priority: 2
type: "infrastructure"
status: "backlog"
depends_on: ["SPEC-INFRA-005", "SPEC-CTL-001"]
estimated_complexity: "large"
---

# Supabase transactions table and CRUD API routes

## Context

Transactions need persistent storage with proper access control. This creates the database table and CRUD API endpoints.

## Requirements

1. Create Supabase migration for `transactions` table:
   - `id` (uuid, PK), `user_id` (uuid, references profiles)
   - `date` (timestamptz), `type` (text), `asset` (text), `amount` (numeric)
   - `price_per_unit` (numeric, nullable), `total_value` (numeric, nullable)
   - `fee` (numeric, nullable), `currency` (text, default 'USD')
   - `exchange` (text), `notes` (text, nullable)
   - `created_at`, `updated_at` (timestamps)
   - RLS: users can CRUD their own transactions
2. Create API routes at `src/app/api/ctl/transactions/route.ts`:
   - `GET` — list transactions (paginated, filterable)
   - `POST` — create transaction(s) (single or bulk from CSV import)
   - `DELETE` — delete transaction by id
3. Create `src/app/api/ctl/import/route.ts`:
   - `POST` — accepts CSV file upload, parses via csv-parser, bulk inserts

## Acceptance Criteria

- [ ] Migration creates `transactions` table with RLS
- [ ] GET returns paginated transactions for authenticated user
- [ ] POST creates single or bulk transactions
- [ ] DELETE removes a transaction owned by the authenticated user
- [ ] Import endpoint parses CSV and bulk inserts
- [ ] All endpoints require authentication
- [ ] All verification commands pass

## Database Changes

```sql
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date timestamptz NOT NULL,
  type text NOT NULL,
  asset text NOT NULL,
  amount numeric NOT NULL,
  price_per_unit numeric,
  total_value numeric,
  fee numeric,
  currency text DEFAULT 'USD',
  exchange text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own transactions"
  ON transactions FOR ALL USING (auth.uid() = user_id);
```

## Technical Constraints

- Use Supabase server client with user's session (not service role) for proper RLS
- Paginate with `limit` and `offset` query params
- CSV import should validate data before inserting

## Out of Scope

- UI components (SPEC-CTL-003, SPEC-CTL-004)
- Export functionality (SPEC-CTL-005)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
