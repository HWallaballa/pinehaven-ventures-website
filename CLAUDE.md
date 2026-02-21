# Pinehaven Ventures — Dark Factory Agent Instructions

## Architecture

This is a Next.js 16 app (App Router, React 19, TypeScript, Tailwind v4) that markets and sells four SaaS products via Stripe Checkout.

**Single source of truth:** `ventures.json` in the project root. Every product, plan, price, and feature is defined here. All generated code derives from it.

## Key commands

| Command | Purpose |
|---|---|
| `npm run generate` | Read `ventures.json` → regenerate `stripe-products.ts`, `seed-stripe.ts`, `.env.example`, and scaffold new product pages |
| `npm run generate:dry` | Preview what `generate` would do without writing files |
| `STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe` | Create products/prices in Stripe and output env vars |
| `npm run seed-stripe:dry` | Preview what Stripe objects would be created |

## How to add a new venture (end-to-end)

This is the standard operating procedure. An AI agent can execute all steps autonomously.

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

### Step 2: Run the generator

```bash
npm run generate
```

This will:
- Regenerate `src/lib/stripe-products.ts` (adds the new product to the Stripe config)
- Regenerate `scripts/seed-stripe.ts` (adds the new product to the seed script)
- Regenerate `.env.example` (adds the new env var placeholders)
- Scaffold `src/app/ventures/my-new-app/page.tsx` (new product page with checkout buttons)

### Step 3: Review and customize the generated page

The generator creates a functional but basic product page. Customize it:
- Enhance the hero section copy
- Add "How It Works" steps if relevant
- Add persona cards for target market
- Flesh out the features section with descriptions and icons
- Adjust the pricing card layout if needed

### Step 4: Seed Stripe (requires live Stripe key)

```bash
STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe
```

Copy the output env vars into `.env.local`.

### Step 5: Verify

```bash
npx tsc --noEmit   # TypeScript check
npm run build       # Full build
```

## File map

| File | Generated? | Purpose |
|---|---|---|
| `ventures.json` | No (human-edited) | Single source of truth for all ventures |
| `scripts/generate-from-manifest.ts` | No | Generator script |
| `scripts/seed-stripe.ts` | **Yes** | Stripe product/price provisioning |
| `src/lib/stripe-products.ts` | **Yes** | Runtime Stripe config |
| `src/lib/stripe.ts` | No | Server-side Stripe client |
| `src/lib/stripe-client.ts` | No | Client-side loadStripe |
| `.env.example` | **Yes** | Environment variable template |
| `src/app/ventures/*/page.tsx` | Scaffold only | Product pages (customize after generation) |
| `src/app/api/stripe/*/route.ts` | No | API routes (generic, no changes needed) |
| `src/app/components/CheckoutButton.tsx` | No | Reusable checkout trigger |
| `src/app/components/PricingCard.tsx` | No | Reusable pricing card |
| `src/app/checkout/*/page.tsx` | No | Success/cancel pages |

## Rules for generated files

- Files marked **Yes** in the "Generated?" column are overwritten by `npm run generate`. Do not edit them manually.
- Product pages are only scaffolded if they don't already exist. Existing pages are never overwritten.
- After running the generator, always run `npx tsc --noEmit` to verify.

## Stripe integration details

- **Checkout flow:** Stripe Checkout (hosted) — no custom payment forms
- **API routes:** Generic — they accept any `priceId`, so no changes needed when adding products
- **Webhook events handled:** `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
- **Billing portal:** Configured via seed script — customers can update payment, cancel, switch plans

## Environment variables

All Stripe keys go in `.env.local` (gitignored). See `.env.example` for the full list.
