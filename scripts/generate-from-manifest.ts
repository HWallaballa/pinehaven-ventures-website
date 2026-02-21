#!/usr/bin/env node
/**
 * Dark Factory Generator
 * ======================
 * Reads ventures.json (the single source of truth) and generates:
 *   1. src/lib/stripe-products.ts   — Stripe product/price config
 *   2. scripts/seed-stripe.ts       — Stripe seed script
 *   3. src/app/ventures/<id>/page.tsx — Product pages (only for NEW ventures)
 *   4. Navigation update suggestions
 *
 * Usage:
 *   npx tsx scripts/generate-from-manifest.ts
 *   npx tsx scripts/generate-from-manifest.ts --dry-run
 *
 * The AI agent runs this after editing ventures.json.
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');
const dryRun = process.argv.includes('--dry-run');

// ---------------------------------------------------------------------------
// Load manifest
// ---------------------------------------------------------------------------

type Plan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  stripe_env_key?: string;
  description?: string;
  popular?: boolean;
  features: string[];
};

type Venture = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  icon: string;
  status: string;
  target_market: string[];
  has_free_tier?: boolean;
  has_demo?: boolean;
  features: string[];
  plans: Plan[];
};

type Manifest = {
  company: string;
  contact_email: string;
  ventures: Venture[];
};

const manifest: Manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'ventures.json'), 'utf-8')
);

console.log(`Loaded manifest: ${manifest.ventures.length} ventures`);
if (dryRun) console.log('DRY RUN — no files will be written\n');

// ---------------------------------------------------------------------------
// 1. Generate stripe-products.ts
// ---------------------------------------------------------------------------

function generateStripeProducts(): string {
  const lines: string[] = [];

  lines.push(`export type StripePlan = {`);
  lines.push(`  id: string;`);
  lines.push(`  name: string;`);
  lines.push(`  priceId: string;`);
  lines.push(`  price: number;`);
  lines.push(`  currency: string;`);
  lines.push(`  interval: 'month' | 'year';`);
  lines.push(`  mode: 'subscription' | 'payment';`);
  lines.push(`  features: string[];`);
  lines.push(`};`);
  lines.push(``);
  lines.push(`export type StripeProduct = {`);
  lines.push(`  id: string;`);
  lines.push(`  name: string;`);
  lines.push(`  slug: string;`);
  lines.push(`  description: string;`);
  lines.push(`  plans: StripePlan[];`);
  lines.push(`};`);
  lines.push(``);
  lines.push(`/**`);
  lines.push(` * AUTO-GENERATED from ventures.json — do not edit manually.`);
  lines.push(` * Run: npx tsx scripts/generate-from-manifest.ts`);
  lines.push(` */`);
  lines.push(`export const stripeProducts: StripeProduct[] = [`);

  for (const v of manifest.ventures) {
    const paidPlans = v.plans.filter((p) => p.price > 0 && p.stripe_env_key);
    if (paidPlans.length === 0) continue;

    lines.push(`  {`);
    lines.push(`    id: ${JSON.stringify(v.id)},`);
    lines.push(`    name: ${JSON.stringify(v.name)},`);
    lines.push(`    slug: ${JSON.stringify(v.id)},`);
    lines.push(`    description: ${JSON.stringify(v.tagline)},`);
    lines.push(`    plans: [`);

    for (const p of paidPlans) {
      const fallback = `price_${p.id.replace(/-/g, '_')}`;
      lines.push(`      {`);
      lines.push(`        id: ${JSON.stringify(p.id)},`);
      lines.push(`        name: ${JSON.stringify(p.name)},`);
      lines.push(`        priceId: process.env.${p.stripe_env_key} || ${JSON.stringify(fallback)},`);
      lines.push(`        price: ${p.price},`);
      lines.push(`        currency: ${JSON.stringify(p.currency)},`);
      lines.push(`        interval: ${JSON.stringify(p.interval)},`);
      lines.push(`        mode: 'subscription',`);
      lines.push(`        features: ${JSON.stringify(p.features, null, 10).replace(/\n {10}/g, '\n          ')},`);
      lines.push(`      },`);
    }

    lines.push(`    ],`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);
  lines.push(`/** Look up a product by its slug. */`);
  lines.push(`export function getProductBySlug(slug: string): StripeProduct | undefined {`);
  lines.push(`  return stripeProducts.find((p) => p.slug === slug);`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`/** Look up a plan by its ID across all products. */`);
  lines.push(`export function getPlanById(planId: string): StripePlan | undefined {`);
  lines.push(`  for (const product of stripeProducts) {`);
  lines.push(`    const plan = product.plans.find((p) => p.id === planId);`);
  lines.push(`    if (plan) return plan;`);
  lines.push(`  }`);
  lines.push(`  return undefined;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`/** Look up a plan by its Stripe price ID. */`);
  lines.push(`export function getPlanByPriceId(priceId: string): StripePlan | undefined {`);
  lines.push(`  for (const product of stripeProducts) {`);
  lines.push(`    const plan = product.plans.find((p) => p.priceId === priceId);`);
  lines.push(`    if (plan) return plan;`);
  lines.push(`  }`);
  lines.push(`  return undefined;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`/** Format a price as a display string. */`);
  lines.push(`export function formatPrice(price: number, interval: 'month' | 'year'): string {`);
  lines.push(`  const formatted = new Intl.NumberFormat('en-US', {`);
  lines.push(`    style: 'currency',`);
  lines.push(`    currency: 'USD',`);
  lines.push(`    minimumFractionDigits: 0,`);
  lines.push(`  }).format(price);`);
  lines.push(`  return \`\${formatted}/\${interval === 'month' ? 'mo' : 'yr'}\`;`);
  lines.push(`}`);
  lines.push(``);

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// 2. Generate seed-stripe.ts
// ---------------------------------------------------------------------------

function generateSeedStripe(): string {
  const lines: string[] = [];

  lines.push(`#!/usr/bin/env node`);
  lines.push(`/**`);
  lines.push(` * AUTO-GENERATED from ventures.json — do not edit manually.`);
  lines.push(` * Run: npx tsx scripts/generate-from-manifest.ts`);
  lines.push(` *`);
  lines.push(` * Usage:`);
  lines.push(` *   STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/seed-stripe.ts`);
  lines.push(` *   STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/seed-stripe.ts --dry-run`);
  lines.push(` */`);
  lines.push(``);
  lines.push(`import Stripe from 'stripe';`);
  lines.push(``);
  lines.push(`const secretKey = process.env.STRIPE_SECRET_KEY;`);
  lines.push(`const dryRun = process.argv.includes('--dry-run');`);
  lines.push(``);
  lines.push(`if (!secretKey) {`);
  lines.push(`  console.error('ERROR: STRIPE_SECRET_KEY is required.');`);
  lines.push(`  process.exit(1);`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`const stripe = new Stripe(secretKey, { apiVersion: '2026-01-28.clover', typescript: true });`);
  lines.push(``);
  lines.push(`const products = ${JSON.stringify(
    manifest.ventures
      .filter((v) => v.plans.some((p) => p.price > 0 && p.stripe_env_key))
      .map((v) => ({
        name: v.name,
        description: `${v.tagline}. ${v.description}`,
        plans: v.plans
          .filter((p) => p.price > 0 && p.stripe_env_key)
          .map((p) => ({
            envKey: p.stripe_env_key,
            nickname: p.name,
            unitAmount: p.price * 100,
            interval: p.interval,
          })),
      })),
    null,
    2
  )};`);
  lines.push(``);
  lines.push(`function dollars(cents: number): string { return \`$\${(cents / 100).toLocaleString('en-US')}\`; }`);
  lines.push(`function divider(label: string) { console.log(\`\\n\${'='.repeat(60)}\\n  \${label}\\n\${'='.repeat(60)}\`); }`);
  lines.push(``);
  lines.push(`async function main() {`);
  lines.push(`  console.log('Pinehaven Ventures — Stripe Seed Script');`);
  lines.push(`  console.log(\`Mode: \${dryRun ? 'DRY RUN' : 'LIVE'}\`);`);
  lines.push(`  console.log(\`Key: \${secretKey!.slice(0, 8)}...\${secretKey!.slice(-4)}\`);`);
  lines.push(``);
  lines.push(`  const envLines: string[] = [];`);
  lines.push(`  const allPriceIds: string[] = [];`);
  lines.push(``);
  lines.push(`  for (const productDef of products) {`);
  lines.push(`    divider(productDef.name);`);
  lines.push(`    let stripeProduct: Stripe.Product | null = null;`);
  lines.push(`    if (!dryRun) {`);
  lines.push(`      stripeProduct = await stripe.products.create({ name: productDef.name, description: productDef.description });`);
  lines.push(`      console.log(\`  Product created: \${stripeProduct.id}\`);`);
  lines.push(`    } else {`);
  lines.push(`      console.log(\`  [DRY RUN] Would create product: \${productDef.name}\`);`);
  lines.push(`    }`);
  lines.push(`    for (const plan of productDef.plans) {`);
  lines.push(`      const label = \`\${plan.nickname} — \${dollars(plan.unitAmount)}/\${plan.interval}\`;`);
  lines.push(`      if (!dryRun) {`);
  lines.push(`        const price = await stripe.prices.create({`);
  lines.push(`          product: stripeProduct!.id, nickname: plan.nickname,`);
  lines.push(`          unit_amount: plan.unitAmount, currency: 'usd',`);
  lines.push(`          recurring: { interval: plan.interval as 'month' | 'year' },`);
  lines.push(`        });`);
  lines.push(`        console.log(\`  Price created: \${price.id}  (\${label})\`);`);
  lines.push(`        envLines.push(\`\${plan.envKey}=\${price.id}\`);`);
  lines.push(`        allPriceIds.push(price.id);`);
  lines.push(`      } else {`);
  lines.push(`        console.log(\`  [DRY RUN] Would create price: \${label}\`);`);
  lines.push(`        envLines.push(\`\${plan.envKey}=price_placeholder\`);`);
  lines.push(`      }`);
  lines.push(`    }`);
  lines.push(`  }`);
  lines.push(``);
  lines.push(`  // Customer Portal`);
  lines.push(`  divider('Customer Portal Configuration');`);
  lines.push(`  if (!dryRun) {`);
  lines.push(`    const productPriceMap: Record<string, string[]> = {};`);
  lines.push(`    let idx = 0;`);
  lines.push(`    for (const pd of products) {`);
  lines.push(`      const prices: string[] = [];`);
  lines.push(`      for (let i = 0; i < pd.plans.length; i++) { prices.push(allPriceIds[idx]); idx++; }`);
  lines.push(`      if (prices.length > 0) {`);
  lines.push(`        const detail = await stripe.prices.retrieve(prices[0]);`);
  lines.push(`        const prodId = typeof detail.product === 'string' ? detail.product : detail.product.id;`);
  lines.push(`        productPriceMap[prodId] = prices;`);
  lines.push(`      }`);
  lines.push(`    }`);
  lines.push(`    await stripe.billingPortal.configurations.create({`);
  lines.push(`      business_profile: { headline: '${manifest.company} — Manage Your Subscription' },`);
  lines.push(`      features: {`);
  lines.push(`        customer_update: { enabled: true, allowed_updates: ['email', 'address'] },`);
  lines.push(`        invoice_history: { enabled: true },`);
  lines.push(`        payment_method_update: { enabled: true },`);
  lines.push(`        subscription_cancel: { enabled: true, mode: 'at_period_end' },`);
  lines.push(`        subscription_update: {`);
  lines.push(`          enabled: true, default_allowed_updates: ['price'],`);
  lines.push(`          proration_behavior: 'create_prorations',`);
  lines.push(`          products: Object.entries(productPriceMap).map(([p, prices]) => ({ product: p, prices })),`);
  lines.push(`        },`);
  lines.push(`      },`);
  lines.push(`    });`);
  lines.push(`    console.log('  Portal configured');`);
  lines.push(`  } else { console.log('  [DRY RUN] Would configure portal'); }`);
  lines.push(``);
  lines.push(`  divider('Environment Variables — paste into .env.local');`);
  lines.push(`  console.log('');`);
  lines.push(`  envLines.forEach((l) => console.log(l));`);
  lines.push(`  console.log('');`);
  lines.push(`  divider('Done');`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`main().catch((err) => { console.error('Fatal:', err); process.exit(1); });`);
  lines.push(``);

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// 3. Generate .env.example
// ---------------------------------------------------------------------------

function generateEnvExample(): string {
  const lines: string[] = [];
  lines.push(`# Stripe API Keys`);
  lines.push(`STRIPE_SECRET_KEY=sk_test_your_secret_key_here`);
  lines.push(`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here`);
  lines.push(``);
  lines.push(`# Stripe Webhook Secret`);
  lines.push(`STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here`);
  lines.push(``);
  lines.push(`# Application URL`);
  lines.push(`NEXT_PUBLIC_APP_URL=http://localhost:3000`);
  lines.push(``);
  lines.push(`# Stripe Price IDs (auto-generated section)`);

  for (const v of manifest.ventures) {
    const paidPlans = v.plans.filter((p) => p.stripe_env_key);
    if (paidPlans.length === 0) continue;
    lines.push(``);
    lines.push(`# ${v.name}`);
    for (const p of paidPlans) {
      lines.push(`${p.stripe_env_key}=price_your_${p.id.replace(/-/g, '_')}_id`);
    }
  }

  lines.push(``);
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// 4. Detect new ventures that need page scaffolding
// ---------------------------------------------------------------------------

function detectNewVentures(): Venture[] {
  const newVentures: Venture[] = [];
  for (const v of manifest.ventures) {
    const pagePath = path.join(ROOT, 'src', 'app', 'ventures', v.id, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
      newVentures.push(v);
    }
  }
  return newVentures;
}

function generateProductPage(v: Venture): string {
  const colorMap: Record<string, { bg: string; text: string; button: string; hover: string; gradient: string; check: string }> = {
    green:  { bg: 'bg-green-100', text: 'text-green-600', button: 'bg-green-600', hover: 'hover:bg-green-700', gradient: 'from-green-50 to-emerald-100', check: 'text-green-600' },
    blue:   { bg: 'bg-blue-100', text: 'text-blue-600', button: 'bg-blue-600', hover: 'hover:bg-blue-700', gradient: 'from-blue-50 to-sky-100', check: 'text-blue-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', button: 'bg-purple-600', hover: 'hover:bg-purple-700', gradient: 'from-purple-50 to-violet-100', check: 'text-purple-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', button: 'bg-orange-600', hover: 'hover:bg-orange-700', gradient: 'from-orange-50 to-amber-100', check: 'text-orange-600' },
    red:    { bg: 'bg-red-100', text: 'text-red-600', button: 'bg-red-600', hover: 'hover:bg-red-700', gradient: 'from-red-50 to-rose-100', check: 'text-red-600' },
    cyan:   { bg: 'bg-cyan-100', text: 'text-cyan-600', button: 'bg-cyan-600', hover: 'hover:bg-cyan-700', gradient: 'from-cyan-50 to-sky-100', check: 'text-cyan-600' },
    amber:  { bg: 'bg-amber-100', text: 'text-amber-600', button: 'bg-amber-600', hover: 'hover:bg-amber-700', gradient: 'from-amber-50 to-yellow-100', check: 'text-amber-600' },
  };
  const c = colorMap[v.color] || colorMap.blue;

  const paidPlans = v.plans.filter((p) => p.price > 0 && p.stripe_env_key);
  const lowestPrice = paidPlans.length > 0 ? Math.min(...paidPlans.map((p) => p.price)) : 0;
  const priceLabel = paidPlans.length === 1
    ? `$${paidPlans[0].price.toLocaleString()}/${paidPlans[0].interval === 'month' ? 'month' : 'year'}`
    : `From $${lowestPrice}/${paidPlans[0]?.interval === 'year' ? 'year' : 'month'}`;

  // Depth for relative import depends on where the page sits
  const relDepth = '../../';

  const lines: string[] = [];
  lines.push(`import Navigation from '${relDepth}components/Navigation';`);
  lines.push(`import CheckoutButton from '${relDepth}components/CheckoutButton';`);
  lines.push(`import Link from 'next/link';`);
  lines.push(`import { getProductBySlug } from '@/lib/stripe-products';`);
  lines.push(``);
  lines.push(`export default function ${toPascalCase(v.id)}() {`);
  lines.push(`  const product = getProductBySlug(${JSON.stringify(v.id)});`);
  lines.push(``);
  lines.push(`  return (`);
  lines.push(`    <div className="min-h-screen bg-white">`);
  lines.push(`      <Navigation />`);
  lines.push(``);
  lines.push(`      {/* Hero */}`);
  lines.push(`      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${c.gradient}">`);
  lines.push(`        <div className="max-w-6xl mx-auto text-center">`);
  lines.push(`          <Link href="/ventures" className="text-blue-600 hover:text-blue-700 font-medium text-sm">`);
  lines.push(`            &larr; Back to Products`);
  lines.push(`          </Link>`);
  lines.push(`          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 mb-6">`);
  lines.push(`            ${escapeJsx(v.name)}`);
  lines.push(`          </h1>`);
  lines.push(`          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">`);
  lines.push(`            ${escapeJsx(v.description)}`);
  lines.push(`          </p>`);
  lines.push(`          <div className="flex items-center justify-center gap-4">`);
  lines.push(`            <span className="px-4 py-2 ${c.bg} ${c.text.replace('text-', 'text-')} rounded-full text-sm font-semibold">`);
  lines.push(`              ${priceLabel}`);
  lines.push(`            </span>`);
  lines.push(`            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">`);
  lines.push(`              ${v.status.charAt(0).toUpperCase() + v.status.slice(1)}`);
  lines.push(`            </span>`);
  lines.push(`          </div>`);
  lines.push(`        </div>`);
  lines.push(`      </section>`);
  lines.push(``);

  // Features
  lines.push(`      {/* Features */}`);
  lines.push(`      <section className="py-16 px-4 sm:px-6 lg:px-8">`);
  lines.push(`        <div className="max-w-6xl mx-auto">`);
  lines.push(`          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Features</h2>`);
  lines.push(`          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">`);
  for (const feat of v.features) {
    lines.push(`            <div className="bg-gray-50 rounded-xl p-6">`);
    lines.push(`              <h3 className="text-lg font-semibold text-gray-900 mb-2">${escapeJsx(feat)}</h3>`);
    lines.push(`            </div>`);
  }
  lines.push(`          </div>`);
  lines.push(`        </div>`);
  lines.push(`      </section>`);
  lines.push(``);

  // Pricing
  lines.push(`      {/* Pricing */}`);
  lines.push(`      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">`);
  lines.push(`        <div className="max-w-6xl mx-auto">`);
  lines.push(`          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Pricing</h2>`);
  lines.push(`          <div className="grid md:grid-cols-${Math.min(paidPlans.length, 3)} gap-8 max-w-4xl mx-auto">`);
  for (const plan of paidPlans) {
    const isPopular = plan.popular || false;
    lines.push(`            <div className="rounded-xl p-8 border ${isPopular ? `border-${v.color}-500 bg-${v.color}-50/50 relative` : 'border-gray-200 bg-white'}">`);
    if (isPopular) {
      lines.push(`              <span className="absolute -top-3 left-1/2 -translate-x-1/2 ${c.button} text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>`);
    }
    lines.push(`              <h3 className="text-xl font-bold text-gray-900">${plan.name}</h3>`);
    if (plan.description) {
      lines.push(`              <p className="text-sm text-gray-500 mt-1 mb-4">${escapeJsx(plan.description)}</p>`);
    }
    lines.push(`              <div className="mb-6">`);
    lines.push(`                <span className="text-4xl font-bold text-gray-900">$${plan.price.toLocaleString()}</span>`);
    lines.push(`                <span className="text-gray-500">/${plan.interval === 'month' ? 'mo' : 'yr'}</span>`);
    lines.push(`              </div>`);
    lines.push(`              <CheckoutButton`);
    lines.push(`                priceId={product?.plans.find((p) => p.id === ${JSON.stringify(plan.id)})?.priceId || ''}`);
    lines.push(`                mode="subscription"`);
    lines.push(`                label="Subscribe Now"`);
    lines.push(`                className="block text-center w-full rounded-lg py-3 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${c.button} text-white ${c.hover}"`);
    lines.push(`              />`);
    lines.push(`              <ul className="mt-6 space-y-3">`);
    for (const f of plan.features) {
      lines.push(`                <li className="flex items-center gap-2 text-sm text-gray-700">`);
      lines.push(`                  <svg className="w-4 h-4 ${c.check} flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>`);
      lines.push(`                  ${escapeJsx(f)}`);
      lines.push(`                </li>`);
    }
    lines.push(`              </ul>`);
    lines.push(`            </div>`);
  }
  lines.push(`          </div>`);
  lines.push(`        </div>`);
  lines.push(`      </section>`);
  lines.push(`    </div>`);
  lines.push(`  );`);
  lines.push(`}`);
  lines.push(``);

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toPascalCase(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function escapeJsx(s: string): string {
  return s.replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}

function writeFile(filePath: string, content: string) {
  if (dryRun) {
    console.log(`  [DRY RUN] Would write: ${path.relative(ROOT, filePath)}`);
    return;
  }
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  Written: ${path.relative(ROOT, filePath)}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('\n--- Generating stripe-products.ts ---');
  writeFile(path.join(ROOT, 'src', 'lib', 'stripe-products.ts'), generateStripeProducts());

  console.log('\n--- Generating seed-stripe.ts ---');
  writeFile(path.join(ROOT, 'scripts', 'seed-stripe.ts'), generateSeedStripe());

  console.log('\n--- Generating .env.example ---');
  writeFile(path.join(ROOT, '.env.example'), generateEnvExample());

  console.log('\n--- Checking for new ventures ---');
  const newVentures = detectNewVentures();
  if (newVentures.length === 0) {
    console.log('  No new ventures detected (all have existing pages).');
  } else {
    for (const v of newVentures) {
      console.log(`  NEW: ${v.name} (${v.id})`);
      const pagePath = path.join(ROOT, 'src', 'app', 'ventures', v.id, 'page.tsx');
      writeFile(pagePath, generateProductPage(v));
    }
  }

  console.log('\n--- Summary ---');
  console.log(`  Ventures in manifest: ${manifest.ventures.length}`);
  console.log(`  Paid plans: ${manifest.ventures.flatMap((v) => v.plans.filter((p) => p.price > 0 && p.stripe_env_key)).length}`);
  console.log(`  New pages scaffolded: ${newVentures.length}`);
  console.log('');

  if (newVentures.length > 0) {
    console.log('  NEXT STEPS:');
    console.log('  1. Review the generated product pages and customize the content');
    console.log('  2. Run: STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe');
    console.log('  3. Paste the output price IDs into .env.local');
    console.log('  4. Update Navigation.tsx if a new nav link is needed');
    console.log('');
  }
}

main();
