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
 * AUTO-GENERATED from ventures.json — do not edit manually.
 * Run: npx tsx scripts/generate-from-manifest.ts
 */
export const stripeProducts: StripeProduct[] = [
  {
    id: "power-digital",
    name: "Power Digital Intelligence",
    slug: "power-digital",
    description: "Institutional-grade data center market intelligence",
    plans: [
      {
        id: "power-digital-annual",
        name: "Annual License",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_POWER_DIGITAL_ANNUAL || "price_power_digital_annual",
        price: 10000,
        currency: "usd",
        interval: "year",
        mode: 'subscription',
        features: [
          "Full platform access for your organization",
          "Unlimited users and API calls",
          "Historical data back to 2019",
          "Custom alerts and watchlists",
          "Monthly intelligence reports",
          "Dedicated account manager"
],
      },
    ],
  },
  {
    id: "power-queue-tracker",
    name: "Power Queue Tracker",
    slug: "power-queue-tracker",
    description: "Never miss a critical ERCOT interconnection queue change",
    plans: [
      {
        id: "pqt-solo",
        name: "Solo",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PQT_SOLO || "price_pqt_solo",
        price: 49,
        currency: "usd",
        interval: "month",
        mode: 'subscription',
        features: [
          "1 user seat",
          "Daily ERCOT queue digest emails",
          "Full queue search and filters",
          "CSV data export",
          "Email support"
],
      },
      {
        id: "pqt-team",
        name: "Team",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PQT_TEAM || "price_pqt_team",
        price: 99,
        currency: "usd",
        interval: "month",
        mode: 'subscription',
        features: [
          "Up to 5 user seats",
          "Daily + weekly digest emails",
          "Custom watchlists with alerts",
          "Priority data refresh",
          "Excel and CSV exports",
          "Priority support"
],
      },
      {
        id: "pqt-enterprise",
        name: "Enterprise",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PQT_ENTERPRISE || "price_pqt_enterprise",
        price: 149,
        currency: "usd",
        interval: "month",
        mode: 'subscription',
        features: [
          "Unlimited user seats",
          "Real-time queue change alerts",
          "API access for integrations",
          "Custom report builder",
          "Historical data archive",
          "Dedicated account manager",
          "SLA guarantee"
],
      },
    ],
  },
  {
    id: "reelpost",
    name: "ReelPost.ai",
    slug: "reelpost",
    description: "AI-powered multi-platform short-form video generation",
    plans: [
      {
        id: "reelpost-starter",
        name: "Starter",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_REELPOST_STARTER || "price_reelpost_starter",
        price: 29,
        currency: "usd",
        interval: "month",
        mode: 'subscription',
        features: [
          "30 AI videos/month",
          "2 connected accounts (any platform)",
          "Basic templates",
          "Direct posting",
          "Email support"
],
      },
      {
        id: "reelpost-pro",
        name: "Pro",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_REELPOST_PRO || "price_reelpost_pro",
        price: 79,
        currency: "usd",
        interval: "month",
        mode: 'subscription',
        features: [
          "100 AI videos/month",
          "10 connected accounts (any platform)",
          "All templates",
          "Smart scheduling",
          "Cross-platform scheduling",
          "AI voiceover",
          "Priority support"
],
      },
      {
        id: "reelpost-agency",
        name: "Agency",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_REELPOST_AGENCY || "price_reelpost_agency",
        price: 199,
        currency: "usd",
        interval: "month",
        mode: 'subscription',
        features: [
          "500 AI videos/month",
          "Unlimited connected accounts (all platforms)",
          "All templates",
          "Smart scheduling",
          "AI voiceover",
          "Cross-platform analytics",
          "Priority generation",
          "API access",
          "Dedicated account manager"
],
      },
    ],
  },
  {
    id: "crypto-transaction-log",
    name: "Crypto Transaction Log",
    slug: "crypto-transaction-log",
    description: "Track crypto across every exchange",
    plans: [
      {
        id: "ctl-premium",
        name: "Premium",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CTL_PREMIUM || "price_ctl_premium",
        price: 9,
        currency: "usd",
        interval: "month",
        mode: 'subscription',
        features: [
          "All free features",
          "Unlimited exchange support",
          "Multi-exchange combined exports",
          "Advanced filters & tags",
          "Cloud sync across devices",
          "Priority support"
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
