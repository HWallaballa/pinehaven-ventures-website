#!/usr/bin/env node
/**
 * Stripe Product & Price Seed Script
 * ===================================
 * Creates all Pinehaven Ventures products, prices, and customer portal
 * configuration in your Stripe account, then outputs the env vars.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/seed-stripe.ts
 *   STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/seed-stripe.ts --dry-run
 */

import Stripe from 'stripe';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const secretKey = process.env.STRIPE_SECRET_KEY;
const dryRun = process.argv.includes('--dry-run');

if (!secretKey) {
  console.error(
    'ERROR: STRIPE_SECRET_KEY is required.\n' +
      'Usage: STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/seed-stripe.ts'
  );
  process.exit(1);
}

const stripe = new Stripe(secretKey, {
  apiVersion: '2026-01-28.clover',
  typescript: true,
});

// ---------------------------------------------------------------------------
// Product definitions — single source of truth
// ---------------------------------------------------------------------------

type PlanDef = {
  envKey: string;
  nickname: string;
  unitAmount: number; // cents
  interval: 'month' | 'year';
};

type ProductDef = {
  name: string;
  description: string;
  plans: PlanDef[];
};

const products: ProductDef[] = [
  {
    name: 'Power Digital Intelligence',
    description:
      'Institutional-grade data center market intelligence. Real-time ERCOT interconnection queue tracking, capacity pipeline monitoring, and market intelligence reports.',
    plans: [
      {
        envKey: 'NEXT_PUBLIC_STRIPE_PRICE_POWER_DIGITAL_ANNUAL',
        nickname: 'Annual License',
        unitAmount: 1000000, // $10,000
        interval: 'year',
      },
    ],
  },
  {
    name: 'Power Queue Tracker',
    description:
      'Automated ERCOT interconnection queue monitoring with email digests, smart search, watchlists, alerts, and data exports.',
    plans: [
      {
        envKey: 'NEXT_PUBLIC_STRIPE_PRICE_PQT_SOLO',
        nickname: 'Solo',
        unitAmount: 4900, // $49
        interval: 'month',
      },
      {
        envKey: 'NEXT_PUBLIC_STRIPE_PRICE_PQT_TEAM',
        nickname: 'Team',
        unitAmount: 9900, // $99
        interval: 'month',
      },
      {
        envKey: 'NEXT_PUBLIC_STRIPE_PRICE_PQT_ENTERPRISE',
        nickname: 'Enterprise',
        unitAmount: 14900, // $149
        interval: 'month',
      },
    ],
  },
  {
    name: 'AutoReels.ai',
    description:
      'AI-powered short-form video generation and automated TikTok publishing. Create, schedule, and post across multiple accounts.',
    plans: [
      {
        envKey: 'NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_STARTER',
        nickname: 'Starter',
        unitAmount: 2900, // $29
        interval: 'month',
      },
      {
        envKey: 'NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_PRO',
        nickname: 'Pro',
        unitAmount: 7900, // $79
        interval: 'month',
      },
      {
        envKey: 'NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_AGENCY',
        nickname: 'Agency',
        unitAmount: 19900, // $199
        interval: 'month',
      },
    ],
  },
  {
    name: 'Crypto Transaction Log',
    description:
      'Import CSV/XLS from any exchange, track, search, sort, and export crypto transactions. Available on iOS, Android, and web.',
    plans: [
      {
        envKey: 'NEXT_PUBLIC_STRIPE_PRICE_CTL_PREMIUM',
        nickname: 'Premium',
        unitAmount: 900, // $9
        interval: 'month',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function dollars(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US')}`;
}

function divider(label: string) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  ${label}`);
  console.log('='.repeat(60));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Pinehaven Ventures — Stripe Seed Script');
  console.log(`Mode: ${dryRun ? 'DRY RUN (no Stripe calls)' : 'LIVE'}`);
  console.log(`Key: ${secretKey!.slice(0, 8)}...${secretKey!.slice(-4)}`);

  const envLines: string[] = [];
  const allPriceIds: string[] = [];

  for (const productDef of products) {
    divider(productDef.name);

    let stripeProduct: Stripe.Product | null = null;

    if (!dryRun) {
      stripeProduct = await stripe.products.create({
        name: productDef.name,
        description: productDef.description,
      });
      console.log(`  Product created: ${stripeProduct.id}`);
    } else {
      console.log(`  [DRY RUN] Would create product: ${productDef.name}`);
    }

    for (const plan of productDef.plans) {
      const label = `${plan.nickname} — ${dollars(plan.unitAmount)}/${plan.interval}`;

      if (!dryRun) {
        const price = await stripe.prices.create({
          product: stripeProduct!.id,
          nickname: plan.nickname,
          unit_amount: plan.unitAmount,
          currency: 'usd',
          recurring: { interval: plan.interval },
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

  // -------------------------------------------------------------------------
  // Customer Portal configuration
  // -------------------------------------------------------------------------
  divider('Customer Portal Configuration');

  if (!dryRun) {
    const portalProducts: Stripe.BillingPortal.ConfigurationCreateParams.Features.SubscriptionUpdate.Product[] =
      allPriceIds.map((priceId) => ({
        product: '', // will be filled below
        prices: [priceId],
      }));

    // Group prices by product for portal config
    const productPriceMap: Record<string, string[]> = {};
    let priceIdx = 0;
    for (const productDef of products) {
      const productPrices: string[] = [];
      for (let i = 0; i < productDef.plans.length; i++) {
        productPrices.push(allPriceIds[priceIdx]);
        priceIdx++;
      }
      // Use the first price's product lookup to get the product ID
      if (productPrices.length > 0) {
        const priceDetail = await stripe.prices.retrieve(productPrices[0]);
        const productId =
          typeof priceDetail.product === 'string'
            ? priceDetail.product
            : priceDetail.product.id;
        productPriceMap[productId] = productPrices;
      }
    }

    const portalSubscriptionProducts = Object.entries(productPriceMap).map(
      ([productId, prices]) => ({
        product: productId,
        prices,
      })
    );

    await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: 'Pinehaven Ventures — Manage Your Subscription',
      },
      features: {
        customer_update: {
          enabled: true,
          allowed_updates: ['email', 'address'],
        },
        invoice_history: {
          enabled: true,
        },
        payment_method_update: {
          enabled: true,
        },
        subscription_cancel: {
          enabled: true,
          mode: 'at_period_end',
        },
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price'],
          proration_behavior: 'create_prorations',
          products: portalSubscriptionProducts,
        },
      },
    });

    console.log('  Customer portal configured successfully');
    console.log('  - Customers can update email & address');
    console.log('  - Customers can view invoice history');
    console.log('  - Customers can update payment methods');
    console.log('  - Customers can cancel (at period end)');
    console.log('  - Customers can switch plans (with proration)');
  } else {
    console.log('  [DRY RUN] Would configure customer billing portal');
  }

  // -------------------------------------------------------------------------
  // Output env block
  // -------------------------------------------------------------------------
  divider('Environment Variables — paste into .env.local');

  console.log('');
  console.log('# Stripe Price IDs (generated by seed-stripe.ts)');
  console.log('');
  console.log('# Power Digital Intelligence');
  console.log(envLines[0]);
  console.log('');
  console.log('# Power Queue Tracker');
  console.log(envLines.slice(1, 4).join('\n'));
  console.log('');
  console.log('# AutoReels.ai');
  console.log(envLines.slice(4, 7).join('\n'));
  console.log('');
  console.log('# Crypto Transaction Log');
  console.log(envLines[7]);
  console.log('');

  divider('Done');
  if (dryRun) {
    console.log('  This was a dry run. Re-run without --dry-run to create real Stripe objects.');
  } else {
    console.log('  All products, prices, and portal configured in Stripe.');
    console.log('  Copy the env block above into your .env.local file.');
    console.log('  Then set up a webhook endpoint at: https://your-domain.com/api/stripe/webhooks');
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
