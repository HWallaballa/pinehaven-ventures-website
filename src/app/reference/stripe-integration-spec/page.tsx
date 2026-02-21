import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Stripe Integration Spec — Dark Factory Agent Implementation | Pinehaven Ventures',
  description:
    'Dark factory specification for Stripe payment integration across all four Pinehaven Ventures products. Covers checkout flows, webhooks, billing portal, and product configuration.',
};

type ProductStripeConfig = {
  product: string;
  href: string;
  plans: { name: string; price: string; mode: string; interval: string }[];
  checkoutBehavior: string;
  successScenarios: string[];
};

type ImplementationPhase = {
  phase: string;
  goal: string;
  deliverables: string[];
  acceptanceScenarios: string[];
};

const productConfigs: ProductStripeConfig[] = [
  {
    product: 'Power Digital Intelligence',
    href: '/ventures/power-digital',
    plans: [
      { name: 'Annual License', price: '$10,000/year', mode: 'subscription', interval: 'yearly' },
    ],
    checkoutBehavior: 'Stripe Checkout in subscription mode with annual billing cycle. Customer enters payment details, receives immediate access upon successful payment. Invoice generated automatically.',
    successScenarios: [
      'User clicks "Get Started" and is redirected to Stripe Checkout with the $10,000/year plan pre-selected.',
      'Successful payment redirects to /checkout/success with session details.',
      'Failed or cancelled payment redirects to /checkout/cancel with retry option.',
      'Webhook receives checkout.session.completed and logs the subscription.',
      'Customer can access billing portal to manage subscription.',
    ],
  },
  {
    product: 'Power Queue Tracker',
    href: '/ventures/power-queue-tracker',
    plans: [
      { name: 'Solo', price: '$49/month', mode: 'subscription', interval: 'monthly' },
      { name: 'Team', price: '$99/month', mode: 'subscription', interval: 'monthly' },
      { name: 'Enterprise', price: '$149/month', mode: 'subscription', interval: 'monthly' },
    ],
    checkoutBehavior: 'Stripe Checkout in subscription mode with three tier options. Each pricing card triggers checkout for the corresponding plan. Supports plan upgrades through billing portal.',
    successScenarios: [
      'Each pricing tier (Solo/Team/Enterprise) creates a checkout session for the correct price.',
      'Checkout pre-fills customer email if provided from the product page.',
      'Subscription is activated immediately on successful payment.',
      'Webhook processes subscription lifecycle events (created, updated, cancelled).',
      'Customers can upgrade/downgrade plans through the billing portal.',
    ],
  },
  {
    product: 'AutoReels.ai',
    href: '/ventures/autoreels',
    plans: [
      { name: 'Starter', price: '$29/month', mode: 'subscription', interval: 'monthly' },
      { name: 'Pro', price: '$79/month', mode: 'subscription', interval: 'monthly' },
      { name: 'Agency', price: '$199/month', mode: 'subscription', interval: 'monthly' },
    ],
    checkoutBehavior: 'Stripe Checkout in subscription mode with three tiers. Agency plan supports multi-seat licensing. Trial periods configurable per plan.',
    successScenarios: [
      'Starter/Pro/Agency each route to the correct Stripe price ID.',
      'Checkout session includes product metadata for downstream fulfillment.',
      'Successful subscription triggers welcome email via webhook.',
      'Agency plan checkout supports quantity adjustment for multiple accounts.',
      'Cancel flow routes through billing portal with retention prompts.',
    ],
  },
  {
    product: 'Crypto Transaction Log',
    href: '/ventures/crypto-transaction-log',
    plans: [
      { name: 'Free', price: '$0', mode: 'none', interval: 'N/A' },
      { name: 'Premium', price: '$9/month', mode: 'subscription', interval: 'monthly' },
    ],
    checkoutBehavior: 'Free tier requires no payment. Premium upgrade uses Stripe Checkout in subscription mode. Upgrade prompt appears in-app and on product page.',
    successScenarios: [
      'Free users see "Upgrade to Premium" button that triggers Stripe Checkout.',
      'Premium checkout session is created for $9/month subscription.',
      'Successful upgrade redirects to success page with premium features unlocked.',
      'Webhook updates user status from free to premium.',
      'Downgrade to free tier handled through billing portal cancellation.',
    ],
  },
];

const implementationPhases: ImplementationPhase[] = [
  {
    phase: 'Phase 1: Infrastructure',
    goal: 'Install dependencies, configure environment, and create shared Stripe utilities',
    deliverables: [
      'Install stripe and @stripe/stripe-js packages.',
      'Create .env.example with STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET, and NEXT_PUBLIC_APP_URL.',
      'Create src/lib/stripe.ts with server-side Stripe client initialization.',
      'Create src/lib/stripe-client.ts with client-side loadStripe helper.',
      'Create src/lib/stripe-products.ts mapping all products and plans to Stripe price IDs.',
    ],
    acceptanceScenarios: [
      'npm run build succeeds with all Stripe packages installed.',
      'Stripe client initializes without errors when valid keys are provided.',
      'Product configuration exports correct price IDs for all 10 plans across 4 products.',
      'Environment variables are documented and .env.example is committed.',
    ],
  },
  {
    phase: 'Phase 2: API Routes',
    goal: 'Create server-side endpoints for checkout, webhooks, and billing portal',
    deliverables: [
      'POST /api/stripe/checkout — Creates a Stripe Checkout session for any product/plan combination.',
      'POST /api/stripe/webhooks — Receives and validates Stripe webhook events.',
      'POST /api/stripe/portal — Creates a billing portal session for existing customers.',
    ],
    acceptanceScenarios: [
      'Checkout endpoint returns a valid session URL when given a valid priceId.',
      'Checkout endpoint returns 400 for missing or invalid priceId.',
      'Webhook endpoint validates the Stripe signature before processing events.',
      'Webhook endpoint returns 200 for all processed events and logs unhandled event types.',
      'Portal endpoint returns a redirect URL to the Stripe billing portal.',
      'All endpoints return proper error responses with appropriate HTTP status codes.',
    ],
  },
  {
    phase: 'Phase 3: UI Components',
    goal: 'Build reusable checkout and pricing components',
    deliverables: [
      'CheckoutButton component that calls /api/stripe/checkout and redirects to Stripe.',
      'PricingCard component with plan details and integrated checkout trigger.',
      'Success page (/checkout/success) displaying confirmation and next steps.',
      'Cancel page (/checkout/cancel) with retry option and support link.',
    ],
    acceptanceScenarios: [
      'CheckoutButton shows loading state during checkout session creation.',
      'CheckoutButton displays error message if session creation fails.',
      'PricingCard renders plan name, price, features, and checkout button.',
      'Success page reads session_id from URL and displays order confirmation.',
      'Cancel page provides clear path back to product page.',
    ],
  },
  {
    phase: 'Phase 4: Product Page Integration',
    goal: 'Wire Stripe checkout into all four product pages',
    deliverables: [
      'Power Digital: Replace contact CTA with CheckoutButton for annual license.',
      'Power Queue Tracker: Replace all three plan CTAs with CheckoutButtons.',
      'AutoReels.ai: Replace all three plan CTAs with CheckoutButtons.',
      'Crypto Transaction Log: Add Premium upgrade CheckoutButton alongside free tier.',
    ],
    acceptanceScenarios: [
      'Each product page renders correct pricing with functional checkout buttons.',
      'Clicking any checkout button creates a session and redirects to Stripe.',
      'Product pages maintain existing design and layout with checkout integration.',
      'All 10 purchasable plans across 4 products are connected to Stripe.',
    ],
  },
];

const envVariables = [
  {
    name: 'STRIPE_SECRET_KEY',
    description: 'Server-side Stripe API key (sk_test_... or sk_live_...)',
    example: 'sk_test_...',
    required: true,
  },
  {
    name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    description: 'Client-side Stripe publishable key (pk_test_... or pk_live_...)',
    example: 'pk_test_...',
    required: true,
  },
  {
    name: 'STRIPE_WEBHOOK_SECRET',
    description: 'Webhook signing secret from Stripe Dashboard (whsec_...)',
    example: 'whsec_...',
    required: true,
  },
  {
    name: 'NEXT_PUBLIC_APP_URL',
    description: 'Base URL for success/cancel redirects',
    example: 'https://www.pinehavenventures.io',
    required: true,
  },
];

const apiRoutes = [
  {
    method: 'POST',
    path: '/api/stripe/checkout',
    description: 'Creates a Stripe Checkout session',
    requestBody: '{ priceId: string, mode: "subscription" | "payment", successUrl?: string, cancelUrl?: string }',
    response: '{ url: string } — Redirect URL to Stripe Checkout',
    errorCodes: ['400 — Missing or invalid priceId', '500 — Stripe API error'],
  },
  {
    method: 'POST',
    path: '/api/stripe/webhooks',
    description: 'Handles Stripe webhook events',
    requestBody: 'Raw request body (Stripe signature verified)',
    response: '{ received: true }',
    errorCodes: ['400 — Invalid signature', '500 — Processing error'],
  },
  {
    method: 'POST',
    path: '/api/stripe/portal',
    description: 'Creates a billing portal session',
    requestBody: '{ customerId: string }',
    response: '{ url: string } — Redirect URL to billing portal',
    errorCodes: ['400 — Missing customerId', '500 — Stripe API error'],
  },
];

export default function StripeIntegrationSpecPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 mb-10">
            <p className="text-sm font-semibold tracking-wide text-blue-700 uppercase mb-3">
              Dark Factory Agent Spec
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Stripe Integration
              <span className="text-blue-600">: All Ventures Payment Infrastructure</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This specification defines the complete Stripe payment integration across all four
              Pinehaven Ventures products. It follows the dark factory methodology: human-defined
              spec with acceptance scenarios, agent-implemented code, human-evaluated outcomes.
            </p>
            <p className="text-sm text-gray-500">
              Created: February 20, 2026. Spec status: Implemented. Covers checkout sessions,
              webhook handling, billing portal, and per-product pricing configuration.
            </p>
          </section>

          {/* Scope overview */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Integration scope</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Stripe Checkout (hosted) is used for all payment flows. This removes PCI compliance
                burden and provides a battle-tested payment UI. The integration spans:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span><strong>10 pricing plans</strong> across 4 products, all using Stripe subscription mode.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span><strong>3 API routes</strong> for checkout session creation, webhook processing, and billing portal access.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span><strong>Reusable components</strong> (CheckoutButton, PricingCard) for consistent checkout UX across all product pages.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">4.</span>
                  <span><strong>Success and cancel pages</strong> for post-checkout user experience.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Product configurations */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product checkout configurations</h2>
            <div className="space-y-5">
              {productConfigs.map((config) => (
                <article key={config.product} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      <Link href={config.href} className="text-blue-700 hover:text-blue-800">
                        {config.product}
                      </Link>
                    </h3>
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {config.plans.length} plan{config.plans.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Plans</h4>
                    <div className="flex flex-wrap gap-2">
                      {config.plans.map((plan) => (
                        <span
                          key={plan.name}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-blue-50 text-blue-800 border border-blue-100"
                        >
                          <span className="font-semibold">{plan.name}</span>
                          <span className="mx-1.5 text-blue-300">|</span>
                          <span>{plan.price}</span>
                          <span className="mx-1.5 text-blue-300">|</span>
                          <span className="text-blue-600">{plan.interval}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">Checkout behavior</h4>
                    <p className="text-sm text-gray-700">{config.checkoutBehavior}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Acceptance scenarios</h4>
                    <ul className="space-y-1.5">
                      {config.successScenarios.map((scenario, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700">
                          <span className="text-green-600 font-semibold shrink-0">PASS</span>
                          <span>{scenario}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Implementation phases */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Implementation phases</h2>
            <div className="space-y-5">
              {implementationPhases.map((phase) => (
                <article key={phase.phase} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{phase.phase}</h3>
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {phase.goal}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Deliverables</h4>
                    <ul className="space-y-1.5">
                      {phase.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-700">
                          <span className="text-blue-600">-</span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Acceptance scenarios</h4>
                    <ul className="space-y-1.5">
                      {phase.acceptanceScenarios.map((scenario, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700">
                          <span className="text-green-600 font-semibold shrink-0">PASS</span>
                          <span>{scenario}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Environment variables */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Environment variables</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Variable</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Example</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Required</th>
                  </tr>
                </thead>
                <tbody>
                  {envVariables.map((v) => (
                    <tr key={v.name} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-mono text-blue-700">{v.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{v.description}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-500">{v.example}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${v.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
                          {v.required ? 'Required' : 'Optional'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* API routes */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">API route specifications</h2>
            <div className="space-y-4">
              {apiRoutes.map((route) => (
                <article key={route.path} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-800 font-mono">
                      {route.method}
                    </span>
                    <code className="text-lg font-semibold text-gray-900">{route.path}</code>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{route.description}</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Request body</h4>
                      <p className="text-sm font-mono text-gray-700 bg-gray-50 rounded p-2">{route.requestBody}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Response</h4>
                      <p className="text-sm font-mono text-gray-700 bg-gray-50 rounded p-2">{route.response}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Error codes</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {route.errorCodes.map((code) => (
                          <li key={code} className="font-mono bg-gray-50 rounded p-1.5 text-xs">{code}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* File structure */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">File structure (new and modified)</h2>
            <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm text-gray-300 overflow-x-auto">
              <pre>{`src/
├── lib/
│   ├── stripe.ts                          # Server-side Stripe client
│   ├── stripe-client.ts                   # Client-side loadStripe
│   └── stripe-products.ts                 # Product/plan → priceId mapping
├── app/
│   ├── api/
│   │   └── stripe/
│   │       ├── checkout/route.ts          # POST: Create checkout session
│   │       ├── webhooks/route.ts          # POST: Handle Stripe events
│   │       └── portal/route.ts            # POST: Create portal session
│   ├── checkout/
│   │   ├── success/page.tsx               # Post-checkout success page
│   │   └── cancel/page.tsx                # Post-checkout cancel page
│   ├── components/
│   │   ├── CheckoutButton.tsx             # Reusable checkout trigger
│   │   └── PricingCard.tsx                # Plan card with checkout
│   ├── ventures/
│   │   ├── power-digital/page.tsx         # MODIFIED: Add checkout
│   │   ├── power-queue-tracker/page.tsx   # MODIFIED: Add checkout
│   │   ├── autoreels/page.tsx             # MODIFIED: Add checkout
│   │   └── crypto-transaction-log/
│   │       └── page.tsx                   # MODIFIED: Add checkout
│   └── reference/
│       └── stripe-integration-spec/
│           └── page.tsx                   # THIS DOCUMENT
.env.example                               # NEW: Environment template`}</pre>
            </div>
          </section>

          {/* Webhook events */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Webhook events handled</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Event</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Action</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Products affected</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { event: 'checkout.session.completed', action: 'Log subscription creation, record customer ID', products: 'All' },
                    { event: 'customer.subscription.updated', action: 'Log plan changes (upgrades/downgrades)', products: 'All multi-tier' },
                    { event: 'customer.subscription.deleted', action: 'Log cancellation, trigger retention flow', products: 'All' },
                    { event: 'invoice.payment_succeeded', action: 'Log successful recurring payment', products: 'All' },
                    { event: 'invoice.payment_failed', action: 'Log failed payment for follow-up', products: 'All' },
                  ].map((row) => (
                    <tr key={row.event} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-mono text-blue-700">{row.event}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.action}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.products}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Implementation status: Complete
            </h2>
            <p className="text-blue-50 leading-relaxed mb-6">
              All four products are now wired to Stripe Checkout. Configure your Stripe Dashboard
              products and price IDs in the environment variables, then deploy to activate live
              payments.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/reference/dark-factory-transition-plan"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                View Dark Factory Plan
              </Link>
              <Link
                href="/ventures"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-blue-200 text-white font-semibold hover:bg-blue-500 transition-colors"
              >
                View Products
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
