# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server with Turbopack (localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint (next/core-web-vitals + next/typescript) |
| `npx tsc --noEmit` | TypeScript check (run after any code changes) |
| `npm run generate` | Read `ventures.json` and regenerate derived files |
| `npm run generate:dry` | Preview what `generate` would write |
| `STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe` | Create products/prices in Stripe |
| `npm run seed-stripe:dry` | Preview Stripe provisioning |

## Architecture

Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (via `@tailwindcss/postcss`). Stripe Checkout (hosted) for payments — no custom payment forms.

**Path alias:** `@/*` maps to `./src/*`.

### Single source of truth: `ventures.json`

Every product, plan, price, and feature is defined in `ventures.json` at the project root. The generator (`scripts/generate-from-manifest.ts`) reads it and produces:

- `src/lib/stripe-products.ts` — runtime Stripe config (types + lookup helpers)
- `scripts/seed-stripe.ts` — Stripe product/price provisioning script
- `.env.example` — environment variable template
- `src/app/ventures/<slug>/page.tsx` — scaffolded product pages (only if they don't already exist)

**Do not manually edit files marked as generated.** After running `npm run generate`, always run `npx tsc --noEmit` to verify.

### Key directories

- `src/app/` — Next.js App Router pages and layouts
- `src/app/components/` — shared UI components (Navigation, ContactForm, PricingCard, CheckoutButton, LeadCapture, SubscribeBanner)
- `src/app/ventures/` — product marketing pages, each venture gets a folder; some have `/demo` sub-routes with `_components/` for demo-specific client components
- `src/app/reference/` — internal documentation pages (architecture, roadmaps, scope docs, site map)
- `src/app/api/stripe/` — API routes: `checkout/`, `portal/`, `webhooks/`
- `src/app/api/subscribe/` — email subscribe endpoint
- `src/lib/` — `stripe.ts` (server client), `stripe-client.ts` (client-side `loadStripe`), `stripe-products.ts` (generated config)

### Stripe integration

- API routes are generic — they accept any `priceId`, so no changes needed when adding products
- Webhook events handled: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
- All Stripe keys go in `.env.local` (gitignored). See `.env.example` for the full list
- `NEXT_PUBLIC_APP_URL` defaults to `http://localhost:3000` if unset

### Supabase integration

- **Client components:** Use `createClient()` from `@/lib/supabase` — browser client with anon key
- **Server components:** Use `await createServerClient()` — cookie-based session via `next/headers`
- **Admin operations:** Use `createServiceClient()` — service role key (server-side only, never expose to client)
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- All Supabase keys go in `.env.local` (gitignored). See `.env.example` for the full list

## How to add a new venture

1. Add entry to `ventures.json` `ventures` array with: `id`, `name`, `tagline`, `description`, `color`, `icon`, `status`, `target_market`, `features`, `plans[]`
   - Color options: green, blue, purple, orange, red, cyan, amber
   - Free tiers: set `price: 0`, omit `stripe_env_key`, add `"has_free_tier": true` at venture level
   - Plan fields: `id`, `name`, `price`, `currency`, `interval`, `stripe_env_key`, `description`, `features`
2. Run `npm run generate`
3. Customize the scaffolded page at `src/app/ventures/<id>/page.tsx`
4. Seed Stripe: `STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe` — copy output env vars to `.env.local`
5. Verify: `npx tsc --noEmit && npm run build`
