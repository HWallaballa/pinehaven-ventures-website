# Crypto Transaction Log — Setup Guide

## What Was Built

The full Crypto Transaction Log product app, inside the existing Pinehaven Ventures website.

### New Files Created

**Supabase Integration:**
- `src/lib/supabase.ts` — Server-side Supabase client (+ admin client)
- `src/lib/supabase-client.ts` — Browser-side Supabase client
- `src/lib/supabase-middleware.ts` — Auth session refresh for middleware
- `src/lib/database.types.ts` — TypeScript types matching the DB schema
- `src/middleware.ts` — Protects `/ventures/crypto-transaction-log/app/*` routes
- `supabase/migrations/001_initial_schema.sql` — Full database schema

**Auth:**
- `src/app/ventures/crypto-transaction-log/login/page.tsx` — Login/signup page (email + Google)
- `src/app/ventures/crypto-transaction-log/auth/callback/route.ts` — OAuth callback handler

**App Pages (authenticated):**
- `src/app/ventures/crypto-transaction-log/app/layout.tsx` — App layout with auth check
- `src/app/ventures/crypto-transaction-log/app/_components/AppShell.tsx` — Sidebar + header
- `src/app/ventures/crypto-transaction-log/app/page.tsx` — Dashboard with stats + quick actions
- `src/app/ventures/crypto-transaction-log/app/transactions/page.tsx` — Full transaction list with CRUD
- `src/app/ventures/crypto-transaction-log/app/import/page.tsx` — CSV import wizard
- `src/app/ventures/crypto-transaction-log/app/export/page.tsx` — Export with tier gating
- `src/app/ventures/crypto-transaction-log/app/settings/page.tsx` — Account + subscription management

**API Routes:**
- `src/app/api/ctl/transactions/route.ts` — Transaction CRUD (GET/POST/PATCH/DELETE)
- `src/app/api/ctl/import/route.ts` — Bulk import with tier checks

**Modified Files:**
- `package.json` — Added @supabase/ssr, @supabase/supabase-js, xlsx
- `.env.local` — Added Supabase env var placeholders
- `.env.example` — Added Supabase env var placeholders
- `src/app/api/stripe/webhooks/route.ts` — Full tier provisioning on checkout/subscription events
- `src/app/ventures/crypto-transaction-log/page.tsx` — Updated CTAs to link to login + app

---

## Setup Steps (on your machine)

### 1. Install new dependencies

```bash
cd pinehaven-ventures-website
npm install
```

This pulls in `@supabase/supabase-js`, `@supabase/ssr`, and `xlsx`.

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (name it `crypto-transaction-log` or similar)
3. Wait for it to spin up (~2 minutes)

### 3. Run the database migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run**

This creates the `profiles`, `transactions`, and `imports` tables with RLS policies and auto-triggers.

### 4. Get your Supabase keys

1. In Supabase dashboard, go to **Settings > API**
2. Copy the **Project URL**, **anon/public key**, and **service_role key**
3. Add them to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key
```

### 5. Enable Google OAuth (optional)

1. In Supabase dashboard, go to **Authentication > Providers**
2. Enable Google
3. Add your Google OAuth client ID and secret
4. Set the redirect URL to: `https://your-project-id.supabase.co/auth/v1/callback`

### 6. Set up Stripe webhook

1. In your Stripe dashboard, go to **Developers > Webhooks**
2. Add an endpoint pointing to `https://your-domain.com/api/stripe/webhooks`
3. Subscribe to events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
4. Copy the webhook signing secret to `.env.local`:

```
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret
```

### 7. Test locally

```bash
npm run dev
```

Then visit:
- **Marketing page:** http://localhost:3000/ventures/crypto-transaction-log
- **Login:** http://localhost:3000/ventures/crypto-transaction-log/login
- **App (after login):** http://localhost:3000/ventures/crypto-transaction-log/app

### 8. Verify the build

```bash
npx tsc --noEmit   # TypeScript check
npm run build       # Full production build
```

---

## Architecture Overview

```
Marketing Page (/ventures/crypto-transaction-log)
  └─ "Get Started Free" → Login Page
       └─ Supabase Auth (email/password + Google)
            └─ App Dashboard (/ventures/crypto-transaction-log/app)
                 ├── Transactions (CRUD, filters, search, pagination)
                 ├── Import (CSV upload → column mapping → review → bulk insert)
                 ├── Export (CSV download with tier gating)
                 └── Settings (profile, subscription upgrade via Stripe)

Stripe Webhooks → Update profiles.tier (free/premium)
Free Tier: 1 exchange, single-exchange export
Premium ($9/mo): Unlimited exchanges, combined exports
```

---

## Tier Gating Summary

| Feature | Free | Premium ($9/mo) |
|---------|------|-----------------|
| Exchanges | 1 | Unlimited |
| CSV Import | Yes | Yes |
| XLS/XLSX Import | No | Yes |
| Single Exchange Export | Yes | Yes |
| Multi-Exchange Export | No | Yes |
| Transaction CRUD | Yes | Yes |
| Filters & Search | Yes | Yes |
| Cloud Sync | Yes | Yes |
