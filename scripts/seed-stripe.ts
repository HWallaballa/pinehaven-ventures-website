#!/usr/bin/env node
/**
 * AUTO-GENERATED from ventures.json — do not edit manually.
 * Run: npx tsx scripts/generate-from-manifest.ts
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/seed-stripe.ts
 *   STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/seed-stripe.ts --dry-run
 */

import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;
const dryRun = process.argv.includes('--dry-run');

if (!secretKey) {
  console.error('ERROR: STRIPE_SECRET_KEY is required.');
  process.exit(1);
}

const stripe = new Stripe(secretKey, { apiVersion: '2026-01-28.clover', typescript: true });

const products = [
  {
    "name": "Power Digital Intelligence",
    "description": "Institutional-grade data center market intelligence. The single source of truth for interconnection queues, capacity pipelines, and energy market signals.",
    "plans": [
      {
        "envKey": "NEXT_PUBLIC_STRIPE_PRICE_POWER_DIGITAL_ANNUAL",
        "nickname": "Annual License",
        "unitAmount": 1000000,
        "interval": "year"
      }
    ]
  },
  {
    "name": "Power Queue Tracker",
    "description": "Never miss a critical ERCOT interconnection queue change. Automated monitoring, email digests, and real-time alerts for data center site selection professionals.",
    "plans": [
      {
        "envKey": "NEXT_PUBLIC_STRIPE_PRICE_PQT_SOLO",
        "nickname": "Solo",
        "unitAmount": 4900,
        "interval": "month"
      },
      {
        "envKey": "NEXT_PUBLIC_STRIPE_PRICE_PQT_TEAM",
        "nickname": "Team",
        "unitAmount": 9900,
        "interval": "month"
      },
      {
        "envKey": "NEXT_PUBLIC_STRIPE_PRICE_PQT_ENTERPRISE",
        "nickname": "Enterprise",
        "unitAmount": 14900,
        "interval": "month"
      }
    ]
  },
  {
    "name": "AutoReels.ai",
    "description": "AI-powered short-form video generation. Generate stunning short-form videos with AI and auto-post them to TikTok. Schedule content, manage multiple accounts, and grow your audience — all on autopilot.",
    "plans": [
      {
        "envKey": "NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_STARTER",
        "nickname": "Starter",
        "unitAmount": 2900,
        "interval": "month"
      },
      {
        "envKey": "NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_PRO",
        "nickname": "Pro",
        "unitAmount": 7900,
        "interval": "month"
      },
      {
        "envKey": "NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_AGENCY",
        "nickname": "Agency",
        "unitAmount": 19900,
        "interval": "month"
      }
    ]
  },
  {
    "name": "Crypto Transaction Log",
    "description": "Track crypto across every exchange. Upload CSV and XLS files from any exchange, track, analyze, search, sort, and export your crypto transactions — all in one place.",
    "plans": [
      {
        "envKey": "NEXT_PUBLIC_STRIPE_PRICE_CTL_PREMIUM",
        "nickname": "Premium",
        "unitAmount": 900,
        "interval": "month"
      }
    ]
  }
];

function dollars(cents: number): string { return `$${(cents / 100).toLocaleString('en-US')}`; }
function divider(label: string) { console.log(`\n${'='.repeat(60)}\n  ${label}\n${'='.repeat(60)}`); }

async function main() {
  console.log('Pinehaven Ventures — Stripe Seed Script');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Key: ${secretKey!.slice(0, 8)}...${secretKey!.slice(-4)}`);

  const envLines: string[] = [];
  const allPriceIds: string[] = [];

  for (const productDef of products) {
    divider(productDef.name);
    let stripeProduct: Stripe.Product | null = null;
    if (!dryRun) {
      stripeProduct = await stripe.products.create({ name: productDef.name, description: productDef.description });
      console.log(`  Product created: ${stripeProduct.id}`);
    } else {
      console.log(`  [DRY RUN] Would create product: ${productDef.name}`);
    }
    for (const plan of productDef.plans) {
      const label = `${plan.nickname} — ${dollars(plan.unitAmount)}/${plan.interval}`;
      if (!dryRun) {
        const price = await stripe.prices.create({
          product: stripeProduct!.id, nickname: plan.nickname,
          unit_amount: plan.unitAmount, currency: 'usd',
          recurring: { interval: plan.interval as 'month' | 'year' },
        });
        console.log(`  Price created: ${price.id}  (${label})`);
        envLines.push(`${plan.envKey}=${price.id}`);
        allPriceIds.push(price.id);
      } else {
        console.log(`  [DRY RUN] Would create price: ${label}`);
        envLines.push(`${plan.envKey}=price_placeholder`);
      }
    }
  }

  // Customer Portal
  divider('Customer Portal Configuration');
  if (!dryRun) {
    const productPriceMap: Record<string, string[]> = {};
    let idx = 0;
    for (const pd of products) {
      const prices: string[] = [];
      for (let i = 0; i < pd.plans.length; i++) { prices.push(allPriceIds[idx]); idx++; }
      if (prices.length > 0) {
        const detail = await stripe.prices.retrieve(prices[0]);
        const prodId = typeof detail.product === 'string' ? detail.product : detail.product.id;
        productPriceMap[prodId] = prices;
      }
    }
    await stripe.billingPortal.configurations.create({
      business_profile: { headline: 'Pinehaven Ventures LLC — Manage Your Subscription' },
      features: {
        customer_update: { enabled: true, allowed_updates: ['email', 'address'] },
        invoice_history: { enabled: true },
        payment_method_update: { enabled: true },
        subscription_cancel: { enabled: true, mode: 'at_period_end' },
        subscription_update: {
          enabled: true, default_allowed_updates: ['price'],
          proration_behavior: 'create_prorations',
          products: Object.entries(productPriceMap).map(([p, prices]) => ({ product: p, prices })),
        },
      },
    });
    console.log('  Portal configured');
  } else { console.log('  [DRY RUN] Would configure portal'); }

  divider('Environment Variables — paste into .env.local');
  console.log('');
  envLines.forEach((l) => console.log(l));
  console.log('');
  divider('Done');
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
