# Adding New Ventures — Operator Guide

This guide walks through adding a new SaaS product to the Pinehaven Ventures website. The process is designed to be run almost entirely by an AI agent (Claude Code) with minimal manual steps.

## TL;DR — The 3-Minute Version

```
1. Edit ventures.json          ← add your product definition
2. npm run generate            ← auto-generates 4 files
3. Customize the product page  ← polish the scaffolded page
4. npm run seed-stripe         ← create Stripe products/prices
5. npm run build               ← verify everything compiles
```

That's it. The rest of this doc explains each step in detail, using **PowerPMIS** (a Procore + Togal.ai-style construction management platform) as a worked example.

---

## What Gets Automated

| What | How | Manual? |
|---|---|---|
| Stripe runtime config (`stripe-products.ts`) | Regenerated from `ventures.json` | No — fully auto |
| Stripe seed script (`seed-stripe.ts`) | Regenerated from `ventures.json` | No — fully auto |
| Env var template (`.env.example`) | Regenerated from `ventures.json` | No — fully auto |
| Product page (`src/app/ventures/<id>/page.tsx`) | Scaffolded if it doesn't exist | Customize after |
| Stripe products/prices in your Stripe account | Created by `seed-stripe` | Run once per product |
| Navigation links | Not auto-updated | Add manually if needed |

---

## Step 1: Define the Venture in `ventures.json`

Open `ventures.json` and add a new object to the `ventures` array.

### PowerPMIS Example

```json
{
  "id": "power-pmis",
  "name": "PowerPMIS",
  "tagline": "AI-powered construction project management",
  "description": "The all-in-one platform for general contractors and owners. Manage projects, automate plan takeoffs with AI, track costs, and streamline RFIs and submittals — from preconstruction through closeout.",
  "color": "cyan",
  "icon": "building-office",
  "status": "live",
  "target_market": [
    "General contractors",
    "Construction owners/developers",
    "Preconstruction teams",
    "Subcontractors"
  ],
  "features": [
    "AI plan takeoff & quantity estimation",
    "Project scheduling & Gantt charts",
    "RFI & submittal management",
    "Daily logs & field reporting",
    "Cost tracking & change orders",
    "Document management & plan rooms",
    "Bid management & prequalification",
    "Real-time dashboards & reporting"
  ],
  "plans": [
    {
      "id": "power-pmis-starter",
      "name": "Starter",
      "price": 99,
      "currency": "usd",
      "interval": "month",
      "stripe_env_key": "NEXT_PUBLIC_STRIPE_PRICE_POWER_PMIS_STARTER",
      "description": "For small GCs and subcontractors",
      "features": [
        "Up to 5 active projects",
        "3 user seats",
        "AI plan takeoff (10 sheets/month)",
        "RFI & submittal tracking",
        "Daily logs",
        "Email support"
      ]
    },
    {
      "id": "power-pmis-pro",
      "name": "Pro",
      "price": 299,
      "currency": "usd",
      "interval": "month",
      "popular": true,
      "stripe_env_key": "NEXT_PUBLIC_STRIPE_PRICE_POWER_PMIS_PRO",
      "description": "For mid-size general contractors",
      "features": [
        "Up to 25 active projects",
        "15 user seats",
        "AI plan takeoff (100 sheets/month)",
        "Cost tracking & change orders",
        "Scheduling & Gantt charts",
        "Bid management",
        "Custom reports",
        "Priority support"
      ]
    },
    {
      "id": "power-pmis-enterprise",
      "name": "Enterprise",
      "price": 799,
      "currency": "usd",
      "interval": "month",
      "stripe_env_key": "NEXT_PUBLIC_STRIPE_PRICE_POWER_PMIS_ENTERPRISE",
      "description": "For large GCs and owner/developers",
      "features": [
        "Unlimited projects",
        "Unlimited users",
        "AI plan takeoff (unlimited)",
        "Full cost management suite",
        "Advanced scheduling",
        "Bid management & prequalification",
        "API access & integrations",
        "Dedicated account manager",
        "SSO & custom roles"
      ]
    }
  ]
}
```

### Field Reference

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | URL slug — lowercase, hyphenated (e.g. `power-pmis`) |
| `name` | Yes | Display name |
| `tagline` | Yes | One-liner for cards and Stripe product descriptions |
| `description` | Yes | Longer hero copy (1-2 sentences) |
| `color` | Yes | Theme color: `green`, `blue`, `purple`, `orange`, `red`, `cyan`, `amber` |
| `icon` | Yes | Heroicon name (for future use) |
| `status` | Yes | `live`, `coming-soon`, or `beta` |
| `target_market` | Yes | Array of audience segments |
| `features` | Yes | Top-level feature list (shown on the product page) |
| `plans` | Yes | Array of pricing plans (see below) |
| `has_free_tier` | No | Set `true` if there's a $0 plan |
| `has_demo` | No | Set `true` to show a demo CTA |

### Plan Fields

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Unique plan slug (e.g. `power-pmis-pro`) |
| `name` | Yes | Display name (e.g. "Pro") |
| `price` | Yes | Dollar amount. Use `0` for free tiers |
| `currency` | Yes | Always `"usd"` for now |
| `interval` | Yes | `"month"` or `"year"` |
| `stripe_env_key` | No* | Env var name for the Stripe price ID. Omit for free plans |
| `description` | No | Short description under the plan name |
| `popular` | No | Set `true` to add "MOST POPULAR" badge |
| `features` | Yes | Bullet-point features for the pricing card |

*Required for all paid plans. Convention: `NEXT_PUBLIC_STRIPE_PRICE_<PRODUCT>_<PLAN>` in SCREAMING_SNAKE_CASE.

---

## Step 2: Run the Generator

```bash
npm run generate
```

Output will look like:

```
Loaded manifest: 5 ventures

--- Generating stripe-products.ts ---
  Written: src/lib/stripe-products.ts

--- Generating seed-stripe.ts ---
  Written: scripts/seed-stripe.ts

--- Generating .env.example ---
  Written: .env.example

--- Checking for new ventures ---
  NEW: PowerPMIS (power-pmis)
  Written: src/app/ventures/power-pmis/page.tsx

--- Summary ---
  Ventures in manifest: 5
  Paid plans: 14
  New pages scaffolded: 1

  NEXT STEPS:
  1. Review the generated product pages and customize the content
  2. Run: STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe
  3. Paste the output price IDs into .env.local
  4. Update Navigation.tsx if a new nav link is needed
```

### What `generate` creates/overwrites

| File | Action |
|---|---|
| `src/lib/stripe-products.ts` | **Overwritten** every run |
| `scripts/seed-stripe.ts` | **Overwritten** every run |
| `.env.example` | **Overwritten** every run |
| `src/app/ventures/power-pmis/page.tsx` | **Created only if new** — never overwrites existing pages |

### Preview mode

To see what would change without writing files:

```bash
npm run generate:dry
```

---

## Step 3: Customize the Product Page

The generator creates a functional but basic page. For a polished product, enhance it with:

1. **Hero section** — Refine the copy, add a tagline with brand styling
2. **"How It Works" section** — 3-4 steps explaining the workflow (see AutoReels page for reference pattern)
3. **Feature cards** — Add icons and descriptions to each feature
4. **Target audience / persona cards** — Show who the product is for
5. **CTA section** — Add a closing call-to-action

Reference: `src/app/ventures/autoreels/page.tsx` is the most polished existing page.

### Telling Claude Code to do this

You can give Claude Code a prompt like:

> Customize the PowerPMIS product page. Use the AutoReels page as a style reference. Add a "How It Works" section with 4 steps (Upload Plans → AI Takeoff → Manage Project → Track Costs), flesh out the feature cards with icons and descriptions, and add a CTA section. The color theme is cyan.

---

## Step 4: Seed Stripe

Once `ventures.json` is finalized and the generator has run, create the actual Stripe products and prices:

```bash
# Preview first
STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe:dry

# Then run for real
STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe
```

The script will:
1. Create a Stripe Product for PowerPMIS
2. Create 3 Stripe Prices (Starter $99/mo, Pro $299/mo, Enterprise $799/mo)
3. Configure the customer billing portal
4. Output the env vars to paste into `.env.local`

Example output:

```
============================================================
  PowerPMIS
============================================================
  Product created: prod_ABC123
  Price created: price_DEF456  (Starter — $99/month)
  Price created: price_GHI789  (Pro — $299/month)
  Price created: price_JKL012  (Enterprise — $799/month)

============================================================
  Environment Variables — paste into .env.local
============================================================

NEXT_PUBLIC_STRIPE_PRICE_POWER_PMIS_STARTER=price_DEF456
NEXT_PUBLIC_STRIPE_PRICE_POWER_PMIS_PRO=price_GHI789
NEXT_PUBLIC_STRIPE_PRICE_POWER_PMIS_ENTERPRISE=price_JKL012
```

Copy those lines into your `.env.local` file.

---

## Step 5: Verify the Build

```bash
npx tsc --noEmit   # TypeScript check
npm run build       # Full Next.js build
```

Both should pass with zero errors.

---

## Giving It All to Claude Code as One Prompt

For maximum automation, you can give Claude Code the entire job in one shot:

> Add a new venture called "PowerPMIS" to ventures.json. It's an AI-powered construction project management platform (like Procore meets Togal.ai). Target market: general contractors, owners/developers, preconstruction teams, subcontractors. Key features: AI plan takeoff, project scheduling, RFI/submittal management, daily logs, cost tracking, change orders, document management, bid management. Use cyan as the color. Three plans: Starter at $99/mo, Pro at $299/mo (popular), Enterprise at $799/mo. After editing ventures.json, run the generator, customize the product page (use AutoReels as a style reference), and verify the build passes.

Claude Code will:
1. Edit `ventures.json`
2. Run `npm run generate`
3. Customize `src/app/ventures/power-pmis/page.tsx`
4. Run `npx tsc --noEmit` and `npm run build`

The only manual step remaining is `npm run seed-stripe` (requires your live Stripe key) and pasting the env vars.

---

## Quick Reference: All Commands

| Command | When to Use |
|---|---|
| `npm run generate` | After editing `ventures.json` |
| `npm run generate:dry` | Preview changes without writing |
| `STRIPE_SECRET_KEY=sk_... npm run seed-stripe` | After finalizing plans/pricing |
| `STRIPE_SECRET_KEY=sk_... npm run seed-stripe:dry` | Preview Stripe operations |
| `npx tsc --noEmit` | Quick type-check |
| `npm run build` | Full build verification |

## Gotchas

- **Generated files are overwritten** — Don't manually edit `stripe-products.ts`, `seed-stripe.ts`, or `.env.example`. Edit `ventures.json` and re-run the generator.
- **Product pages are scaffolded once** — The generator won't overwrite an existing page. To re-scaffold, delete the page first.
- **Free plans need no `stripe_env_key`** — Set `price: 0` and omit `stripe_env_key`. Add `"has_free_tier": true` at the venture level.
- **Navigation is not auto-updated** — If the product needs a top-level nav link, add it to `src/app/components/Navigation.tsx` manually. Products already appear on the `/ventures` listing page automatically.
- **Stripe seed is additive** — Running `seed-stripe` multiple times creates duplicate products. If you need to re-seed, archive the old products in the Stripe dashboard first.
