export type StripePlan = {
  id: string;
  name: string;
  priceId: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  mode: 'subscription' | 'payment';
  features: string[];
};

export type StripeProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  plans: StripePlan[];
};

/**
 * Stripe product and price configuration for all Pinehaven Ventures products.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create products in your Stripe Dashboard (https://dashboard.stripe.com/products)
 * 2. Create a price for each plan listed below
 * 3. Replace the placeholder priceId values with your actual Stripe price IDs (price_...)
 */
export const stripeProducts: StripeProduct[] = [
  {
    id: 'power-digital',
    name: 'Power Digital Intelligence',
    slug: 'power-digital',
    description: 'Institutional data center market intelligence and queue analytics',
    plans: [
      {
        id: 'power-digital-annual',
        name: 'Annual License',
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_POWER_DIGITAL_ANNUAL || 'price_power_digital_annual',
        price: 10000,
        currency: 'usd',
        interval: 'year',
        mode: 'subscription',
        features: [
          'Real-time ERCOT interconnection queue tracking',
          'Data center capacity pipeline monitoring',
          'Market intelligence reports',
          'Custom alerts and watchlists',
          'API access',
          'Priority support',
        ],
      },
    ],
  },
  {
    id: 'power-queue-tracker',
    name: 'Power Queue Tracker',
    slug: 'power-queue-tracker',
    description: 'ERCOT queue monitoring, digests, alerts, and exports',
    plans: [
      {
        id: 'pqt-solo',
        name: 'Solo',
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PQT_SOLO || 'price_pqt_solo',
        price: 49,
        currency: 'usd',
        interval: 'month',
        mode: 'subscription',
        features: [
          'Daily queue digests',
          'Smart search & filters',
          '3 active watchlists',
          'CSV export',
          'Email support',
        ],
      },
      {
        id: 'pqt-team',
        name: 'Team',
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PQT_TEAM || 'price_pqt_team',
        price: 99,
        currency: 'usd',
        interval: 'month',
        mode: 'subscription',
        features: [
          'Everything in Solo',
          'Unlimited watchlists',
          'Team collaboration (up to 5 seats)',
          'Weekly deep-dive reports',
          'API access',
          'Priority support',
        ],
      },
      {
        id: 'pqt-enterprise',
        name: 'Enterprise',
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PQT_ENTERPRISE || 'price_pqt_enterprise',
        price: 149,
        currency: 'usd',
        interval: 'month',
        mode: 'subscription',
        features: [
          'Everything in Team',
          'Unlimited seats',
          'Custom alert rules',
          'Historical data access',
          'Dedicated account manager',
          'SLA guarantee',
        ],
      },
    ],
  },
  {
    id: 'autoreels',
    name: 'AutoReels.ai',
    slug: 'autoreels',
    description: 'AI video generation and automated TikTok publishing',
    plans: [
      {
        id: 'autoreels-starter',
        name: 'Starter',
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_STARTER || 'price_autoreels_starter',
        price: 29,
        currency: 'usd',
        interval: 'month',
        mode: 'subscription',
        features: [
          '30 AI-generated videos/month',
          '1 TikTok account',
          'Smart scheduling',
          'Basic analytics',
          'Email support',
        ],
      },
      {
        id: 'autoreels-pro',
        name: 'Pro',
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_PRO || 'price_autoreels_pro',
        price: 79,
        currency: 'usd',
        interval: 'month',
        mode: 'subscription',
        features: [
          '100 AI-generated videos/month',
          '5 TikTok accounts',
          'AI voiceover & captions',
          'Advanced analytics',
          'A/B testing',
          'Priority support',
        ],
      },
      {
        id: 'autoreels-agency',
        name: 'Agency',
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_AGENCY || 'price_autoreels_agency',
        price: 199,
        currency: 'usd',
        interval: 'month',
        mode: 'subscription',
        features: [
          'Unlimited AI-generated videos',
          '25 TikTok accounts',
          'White-label dashboard',
          'Team management',
          'API access',
          'Dedicated account manager',
        ],
      },
    ],
  },
  {
    id: 'crypto-transaction-log',
    name: 'Crypto Transaction Log',
    slug: 'crypto-transaction-log',
    description: 'Cross-exchange crypto import, organization, and exports',
    plans: [
      {
        id: 'ctl-premium',
        name: 'Premium',
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CTL_PREMIUM || 'price_ctl_premium',
        price: 9,
        currency: 'usd',
        interval: 'month',
        mode: 'subscription',
        features: [
          'Unlimited transaction imports',
          'Tax export wizard',
          'Multi-exchange consolidation',
          'Auto-tagging',
          'Portfolio digests',
          'Priority support',
        ],
      },
    ],
  },
];

/** Look up a product by its slug. */
export function getProductBySlug(slug: string): StripeProduct | undefined {
  return stripeProducts.find((p) => p.slug === slug);
}

/** Look up a plan by its ID across all products. */
export function getPlanById(planId: string): StripePlan | undefined {
  for (const product of stripeProducts) {
    const plan = product.plans.find((p) => p.id === planId);
    if (plan) return plan;
  }
  return undefined;
}

/** Look up a plan by its Stripe price ID. */
export function getPlanByPriceId(priceId: string): StripePlan | undefined {
  for (const product of stripeProducts) {
    const plan = product.plans.find((p) => p.priceId === priceId);
    if (plan) return plan;
  }
  return undefined;
}

/** Format a price as a display string. */
export function formatPrice(price: number, interval: 'month' | 'year'): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
  return `${formatted}/${interval === 'month' ? 'mo' : 'yr'}`;
}
