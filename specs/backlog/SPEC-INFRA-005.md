---
id: "SPEC-INFRA-005"
title: "Supabase schema — profiles and subscriptions tables with RLS"
product: "shared-infra"
priority: 1
type: "infrastructure"
status: "backlog"
depends_on: ["SPEC-INFRA-001"]
estimated_complexity: "large"
---

# Supabase schema — profiles and subscriptions tables with RLS

## Context

The backend needs database tables to store user profiles and their Stripe subscription state. Row-Level Security ensures users can only access their own data.

## Requirements

1. Create Supabase migration for `profiles` table:
   - `id` (uuid, references `auth.users`)
   - `email` (text)
   - `full_name` (text, nullable)
   - `stripe_customer_id` (text, nullable, unique)
   - `created_at`, `updated_at` (timestamps)
2. Create Supabase migration for `subscriptions` table:
   - `id` (uuid, PK)
   - `user_id` (uuid, references profiles)
   - `stripe_subscription_id` (text, unique)
   - `stripe_price_id` (text)
   - `status` (text — active, canceled, past_due, etc.)
   - `current_period_start`, `current_period_end` (timestamps)
   - `cancel_at_period_end` (boolean)
   - `created_at`, `updated_at` (timestamps)
3. Enable RLS on both tables
4. Add RLS policies:
   - profiles: users can read/update their own row
   - subscriptions: users can read their own subscriptions
   - Service role bypasses RLS (for webhook handlers)
5. Create trigger to auto-create profile on user signup
6. Add TypeScript types in `src/lib/database.types.ts`

## Database Changes

```sql
-- profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  stripe_customer_id text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id text UNIQUE NOT NULL,
  stripe_price_id text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## Acceptance Criteria

- [ ] Migration file exists at `supabase/migrations/YYYYMMDD_profiles_subscriptions.sql`
- [ ] `src/lib/database.types.ts` exports TypeScript types for both tables
- [ ] RLS policies are defined in the migration
- [ ] Auto-create profile trigger is included
- [ ] All verification commands pass

## Out of Scope

- Webhook handlers that write to these tables (SPEC-INFRA-006/007)
- Product-specific tables (SPEC-CTL-002)

## Verification Commands

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
