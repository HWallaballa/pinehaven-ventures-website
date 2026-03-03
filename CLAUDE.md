# Pinehaven Ventures — AI Agent Instructions

## Architecture

This is a **Next.js 16** app (App Router, React 19, TypeScript, Tailwind CSS v4) that markets and sells five SaaS products via Stripe Checkout. Deployed on Vercel.

- **Runtime:** Node.js with Next.js App Router (`src/app/` directory structure)
- **Styling:** Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss` plugin), no `tailwind.config.js` — uses `@theme inline` in `globals.css`
- **Fonts:** Geist Sans + Geist Mono (via `next/font/google`)
- **Payments:** Stripe (server-side `stripe` SDK + client-side `@stripe/stripe-js`)
- **Email collection:** Airtable API (via `/api/subscribe` route)
- **Path alias:** `@/*` maps to `./src/*`

**Single source of truth:** `ventures.json` in the project root. Every product, plan, price, and feature is defined here. All generated code derives from it.

## Current product portfolio

| Product | Slug | Status | Pricing | Has Demo |
|---|---|---|---|---|
| PowerPMIS | `powerpmis` | MVP Pilot | Contact | Yes |
| Power Digital Intelligence | `power-digital` | Live | $10,000/year | No |
| Power Queue Tracker | `power-queue-tracker` | Live | $49–$149/mo | No |
| AutoReels.ai | `autoreels` | Live | $29–$199/mo | No |
| Crypto Transaction Log | `crypto-transaction-log` | Live | Free / $9/mo | Yes |

**Note:** PowerPMIS is **not** in `ventures.json` (it's an MVP pilot, not a Stripe product). It has manually-built pages at `src/app/ventures/powerpmis/`.

## Key commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint (next/core-web-vitals + next/typescript) |
| `npx tsc --noEmit` | TypeScript type-check without emitting |
| `npm run generate` | Read `ventures.json` → regenerate `stripe-products.ts`, `seed-stripe.ts`, `.env.example`, scaffold new product pages |
| `npm run generate:dry` | Preview what `generate` would do without writing files |
| `STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe` | Create products/prices in Stripe and output env vars |
| `npm run seed-stripe:dry` | Preview Stripe objects that would be created |

## File map

### Root config

| File | Purpose |
|---|---|
| `ventures.json` | Single source of truth for all ventures (human-edited) |
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript config (`@/*` path alias, strict mode, bundler resolution) |
| `next.config.ts` | Next.js config (currently empty/default) |
| `postcss.config.mjs` | PostCSS with `@tailwindcss/postcss` |
| `eslint.config.mjs` | Flat ESLint config extending `next/core-web-vitals` + `next/typescript` |
| `.env.example` | **Generated** — env var template |
| `.gitignore` | Standard Next.js ignores; `.env*` ignored except `.env.example` |

### Scripts (`scripts/`)

| File | Generated? | Purpose |
|---|---|---|
| `generate-from-manifest.ts` | No | Generator script — reads `ventures.json`, outputs generated files |
| `seed-stripe.ts` | **Yes** | Stripe product/price provisioning + portal config |

### Shared libraries (`src/lib/`)

| File | Generated? | Purpose |
|---|---|---|
| `stripe-products.ts` | **Yes** | Exported `stripeProducts` array, lookup helpers (`getProductBySlug`, `getPlanById`, `getPlanByPriceId`, `formatPrice`) |
| `stripe.ts` | No | Server-side Stripe client factory (`getStripeClient()`) — defers init to request time |
| `stripe-client.ts` | No | Client-side `loadStripe` singleton (`getStripe()`) |

### Reusable components (`src/app/components/`)

| Component | Client? | Purpose |
|---|---|---|
| `Navigation.tsx` | Yes | Site-wide nav bar (Home, Products, Toolkit) with active-path highlighting |
| `CheckoutButton.tsx` | Yes | Generic Stripe Checkout trigger — accepts `priceId`, `mode`, `label`, `className` |
| `PricingCard.tsx` | Yes | Plan card with price display, feature list, and embedded `CheckoutButton` |
| `ContactForm.tsx` | Yes | Contact form using `mailto:` link to `hunter@pinehavenventures.io` |
| `LeadCapture.tsx` | Yes | Homepage email capture — posts to `/api/subscribe` with `source: 'homepage'` |
| `SubscribeBanner.tsx` | Yes | Sticky banner email capture — posts to `/api/subscribe`, sets `pqt_subscribed` cookie |

### API routes (`src/app/api/`)

| Route | Method | Purpose |
|---|---|---|
| `stripe/checkout/route.ts` | POST | Creates Stripe Checkout session. Accepts `{ priceId, mode?, successUrl?, cancelUrl? }` |
| `stripe/portal/route.ts` | POST | Creates Stripe Billing Portal session. Accepts `{ customerId }` |
| `stripe/webhooks/route.ts` | POST | Handles Stripe webhook events (signature verified). Events: `checkout.session.completed`, `customer.subscription.updated/deleted`, `invoice.payment_succeeded/failed`. All handlers currently log only (TODO comments for provisioning). |
| `subscribe/route.ts` | POST | Email subscription via Airtable. Accepts `{ email, source? }`. Idempotent — silently succeeds for existing subscribers. Requires `AIRTABLE_TOKEN` and `AIRTABLE_BASE_ID` env vars. |

### Pages (`src/app/`)

| Route | File | Description |
|---|---|---|
| `/` | `page.tsx` | Homepage — hero, product grid (5 products), stats, lead capture, contact form |
| `/ventures` | `ventures/page.tsx` | Products listing page with alternating layout |
| `/ventures/powerpmis` | `ventures/powerpmis/page.tsx` | PowerPMIS product page (manually built, not from generator) |
| `/ventures/powerpmis/demo` | `ventures/powerpmis/demo/page.tsx` | PowerPMIS interactive demo |
| `/ventures/power-digital` | `ventures/power-digital/page.tsx` | Power Digital Intelligence product page |
| `/ventures/power-queue-tracker` | `ventures/power-queue-tracker/page.tsx` | Power Queue Tracker product page (with social proof, FAQ) |
| `/ventures/autoreels` | `ventures/autoreels/page.tsx` | AutoReels.ai product page |
| `/ventures/crypto-transaction-log` | `ventures/crypto-transaction-log/page.tsx` | Crypto Transaction Log product page |
| `/ventures/crypto-transaction-log/demo` | `ventures/crypto-transaction-log/demo/page.tsx` | Crypto demo with CSV import wizard |
| `/checkout/success` | `checkout/success/page.tsx` | Post-checkout success page |
| `/checkout/cancel` | `checkout/cancel/page.tsx` | Post-checkout cancellation page |
| `/toolkit` | `toolkit/page.tsx` | Hub page linking to internal reference docs |
| `/reference/dark-factory-transition-plan` | `reference/dark-factory-transition-plan/page.tsx` | 90-day operating plan document |
| `/reference/stripe-integration-spec` | `reference/stripe-integration-spec/page.tsx` | Stripe integration technical spec |
| `/reference/powerpmis-mvp-implementation` | `reference/powerpmis-mvp-implementation/page.tsx` | PowerPMIS delivery log and product scope |

### Demo components

| File | Purpose |
|---|---|
| `ventures/crypto-transaction-log/demo/_components/types.ts` | Transaction types, CSV parsing, sample data, formatting helpers |
| `ventures/crypto-transaction-log/demo/_components/CryptoDemo.tsx` | Main demo UI — transaction table, filters, search, export |
| `ventures/crypto-transaction-log/demo/_components/ImportWizard.tsx` | CSV/XLS import wizard with column mapping |
| `ventures/powerpmis/demo/_components/PowerPMISDemo.tsx` | PowerPMIS interactive demo |

## How to add a new venture (end-to-end)

### Step 1: Edit `ventures.json`

Add a new entry to the `ventures` array. Required fields:

```json
{
  "id": "my-new-app",
  "name": "My New App",
  "tagline": "Short value prop",
  "description": "Longer description for the hero section.",
  "color": "blue",
  "icon": "bolt",
  "status": "live",
  "target_market": ["Audience 1", "Audience 2"],
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "plans": [
    {
      "id": "my-new-app-starter",
      "name": "Starter",
      "price": 29,
      "currency": "usd",
      "interval": "month",
      "stripe_env_key": "NEXT_PUBLIC_STRIPE_PRICE_MY_NEW_APP_STARTER",
      "description": "For individuals",
      "features": ["Plan feature 1", "Plan feature 2"]
    }
  ]
}
```

**Color options:** green, blue, purple, orange, red, cyan, amber

**Free tiers:** Set `price: 0` and omit `stripe_env_key`. Add `"has_free_tier": true` at the venture level.

**Demos:** Add `"has_demo": true` at the venture level. Demo pages must be manually built at `ventures/<id>/demo/`.

### Step 2: Run the generator

```bash
npm run generate
```

This will:
- Regenerate `src/lib/stripe-products.ts` (type-safe Stripe config with lookup helpers)
- Regenerate `scripts/seed-stripe.ts` (Stripe provisioning script)
- Regenerate `.env.example` (env var placeholders for all price IDs)
- Scaffold `src/app/ventures/<id>/page.tsx` (only if page doesn't already exist)

### Step 3: Review and customize the generated page

The generator creates a functional but basic product page. Customize it:
- Enhance the hero section copy
- Add "How It Works" steps if relevant
- Add persona cards for target market
- Add a FAQ section
- Adjust the pricing card layout if needed

### Step 4: Update related pages

The generator does **not** update these — do it manually:
- `src/app/page.tsx` — add to the `products` array in the homepage
- `src/app/ventures/page.tsx` — add to the `ventures` array in the listing page

### Step 5: Seed Stripe (requires live Stripe key)

```bash
STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe
```

Copy the output env vars into `.env.local`.

### Step 6: Verify

```bash
npx tsc --noEmit   # TypeScript check
npm run build       # Full build
```

## Rules for generated files

- Files marked **Yes** in the "Generated?" columns are **overwritten** by `npm run generate`. Do not edit them manually.
- Product pages are only scaffolded if they don't already exist. Existing pages are never overwritten.
- After running the generator, always run `npx tsc --noEmit` to verify.

## Stripe integration details

- **Checkout flow:** Stripe Checkout (hosted) — no custom payment forms
- **API routes:** Generic — they accept any `priceId`, so no changes needed when adding products
- **Webhook events handled:** `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
- **Webhook handlers:** Currently log-only — each has a TODO comment for provisioning logic
- **Billing portal:** Configured via seed script — customers can update payment, cancel, switch plans
- **Portal constraint:** Stripe requires unique billing intervals per product for plan switching

## Environment variables

All secrets go in `.env.local` (gitignored). See `.env.example` for the full list.

| Variable | Required | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | Yes | Server-side Stripe API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Client-side Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signature verification |
| `NEXT_PUBLIC_APP_URL` | Yes | App base URL (defaults to `http://localhost:3000`) |
| `NEXT_PUBLIC_STRIPE_PRICE_*` | Per plan | Stripe Price IDs — one per paid plan (see `.env.example`) |
| `AIRTABLE_TOKEN` | For subscribe | Airtable Personal Access Token |
| `AIRTABLE_BASE_ID` | For subscribe | Airtable base ID for Subscribers table |

## Code conventions

- **All components** in `src/app/components/` are client components (`'use client'`)
- **Page components** are server components by default (unless they need interactivity)
- **Demo components** use `_components/` directory convention (Next.js private folder)
- **Imports** use the `@/` alias for `src/` paths in library code; relative paths in page/component files
- **Styling** is utility-first Tailwind with inline classes — no CSS modules or styled-components
- **No test framework** is currently configured
- **No database** — Stripe is the payment backend, Airtable stores email subscribers
- **No authentication** — checkout redirects to Stripe hosted pages; no user accounts on site

## Deployment

- **Platform:** Vercel (inferred from `.vercel` in `.gitignore`)
- **Build command:** `npm run build`
- **Dev server:** `npm run dev` (uses Turbopack)
- **Node version:** Compatible with ES2017 target
