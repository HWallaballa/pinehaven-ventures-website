import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Architecture & Tech Stack Reference | Pinehaven Ventures',
  description:
    'Technical architecture reference for the Pinehaven Ventures platform — Next.js 16, React 19, Tailwind v4, Stripe integration, Vercel deployment, and manifest-driven code generation.',
};

type StackLayer = {
  layer: string;
  technology: string;
  version: string;
  purpose: string;
};

type FileMapEntry = {
  path: string;
  generated: boolean;
  purpose: string;
};

type ComponentEntry = {
  name: string;
  path: string;
  type: 'client' | 'server';
  props: string;
  usedIn: string;
};

type EnvVar = {
  name: string;
  scope: 'server' | 'client';
  description: string;
  generated: boolean;
};

type ApiRoute = {
  method: string;
  path: string;
  purpose: string;
  accepts: string;
  returns: string;
};

type PipelineStep = {
  step: number;
  title: string;
  description: string;
};

const stack: StackLayer[] = [
  { layer: 'Framework', technology: 'Next.js', version: '16.x', purpose: 'App Router, server components, API routes, static/dynamic rendering' },
  { layer: 'UI Library', technology: 'React', version: '19.x', purpose: 'Component model, hooks, server/client component split' },
  { layer: 'Language', technology: 'TypeScript', version: '5.x', purpose: 'Type safety across all source files, strict mode enabled' },
  { layer: 'Styling', technology: 'Tailwind CSS', version: '4.x', purpose: 'Utility-first CSS via PostCSS plugin, theme variables in globals.css' },
  { layer: 'Payments', technology: 'Stripe SDK', version: '20.x (server) / 8.x (client)', purpose: 'Hosted Checkout, subscriptions, billing portal, webhooks' },
  { layer: 'Hosting', technology: 'Vercel', version: 'Managed', purpose: 'Automatic deployments from GitHub, edge network, environment variables' },
  { layer: 'Script Runner', technology: 'tsx', version: '4.x', purpose: 'Executes TypeScript scripts (generator, seed) without a compile step' },
  { layer: 'Linting', technology: 'ESLint', version: '9.x', purpose: 'Code quality with next/core-web-vitals and next/typescript configs' },
];

const deploymentPipeline: PipelineStep[] = [
  { step: 1, title: 'Edit ventures.json', description: 'All product, plan, and pricing changes start here. This is the single source of truth.' },
  { step: 2, title: 'Run npm run generate', description: 'Reads ventures.json and regenerates stripe-products.ts, seed-stripe.ts, .env.example, and scaffolds new product pages.' },
  { step: 3, title: 'Customize generated pages', description: 'Product pages are scaffolded once and never overwritten. Enhance hero copy, features, and layout after generation.' },
  { step: 4, title: 'Verify locally', description: 'Run npx tsc --noEmit (type check) and npm run build (full production build) to catch errors before pushing.' },
  { step: 5, title: 'Push to GitHub', description: 'Commit changes and push to the repository. Vercel watches the repo for changes.' },
  { step: 6, title: 'Vercel builds and deploys', description: 'Vercel automatically runs next build and deploys to pinehavenventures.io. Environment variables are configured in Vercel dashboard.' },
];

const generatorOutputs = [
  { file: 'src/lib/stripe-products.ts', description: 'Runtime Stripe product configuration with helper functions (getProductBySlug, getPlanById, formatPrice).' },
  { file: 'scripts/seed-stripe.ts', description: 'Script to provision Stripe products/prices and configure the billing portal.' },
  { file: '.env.example', description: 'Environment variable template with placeholders for all Stripe price IDs.' },
  { file: 'src/app/ventures/<id>/page.tsx', description: 'Product page scaffold (only created for new ventures, never overwrites existing pages).' },
];

const fileMap: FileMapEntry[] = [
  { path: 'ventures.json', generated: false, purpose: 'Single source of truth for all ventures, plans, and pricing' },
  { path: 'scripts/generate-from-manifest.ts', generated: false, purpose: 'Generator script that reads ventures.json and produces generated files' },
  { path: 'scripts/seed-stripe.ts', generated: true, purpose: 'Stripe product/price provisioning and billing portal setup' },
  { path: 'src/lib/stripe-products.ts', generated: true, purpose: 'Runtime Stripe config with product lookup helpers' },
  { path: 'src/lib/stripe.ts', generated: false, purpose: 'Server-side Stripe client initialization' },
  { path: 'src/lib/stripe-client.ts', generated: false, purpose: 'Client-side loadStripe wrapper' },
  { path: '.env.example', generated: true, purpose: 'Environment variable template' },
  { path: 'src/app/ventures/*/page.tsx', generated: false, purpose: 'Product pages (scaffolded once, then customized)' },
  { path: 'src/app/api/stripe/*/route.ts', generated: false, purpose: 'Generic API routes (checkout, webhooks, portal)' },
  { path: 'src/app/components/*.tsx', generated: false, purpose: 'Shared UI components' },
  { path: 'src/app/reference/*/page.tsx', generated: false, purpose: 'Toolkit reference documents' },
  { path: 'src/app/toolkit/page.tsx', generated: false, purpose: 'Toolkit hub page listing all reference docs' },
  { path: 'src/app/checkout/*/page.tsx', generated: false, purpose: 'Post-checkout success and cancel pages' },
];

const components: ComponentEntry[] = [
  { name: 'Navigation', path: 'src/app/components/Navigation.tsx', type: 'client', props: 'None', usedIn: 'Every page (layout-level)' },
  { name: 'CheckoutButton', path: 'src/app/components/CheckoutButton.tsx', type: 'client', props: 'priceId, mode, label, className', usedIn: 'PricingCard, product pages' },
  { name: 'PricingCard', path: 'src/app/components/PricingCard.tsx', type: 'client', props: 'name, price, interval, priceId, features, highlighted, badge', usedIn: 'All product pages with paid plans' },
  { name: 'LeadCapture', path: 'src/app/components/LeadCapture.tsx', type: 'client', props: 'None', usedIn: 'Homepage' },
  { name: 'ContactForm', path: 'src/app/components/ContactForm.tsx', type: 'client', props: 'None', usedIn: 'Homepage (#contact anchor)' },
  { name: 'SubscribeBanner', path: 'src/app/components/SubscribeBanner.tsx', type: 'client', props: 'None', usedIn: 'Power Queue Tracker product page' },
];

const apiRoutes: ApiRoute[] = [
  { method: 'POST', path: '/api/stripe/checkout', purpose: 'Create a Stripe Checkout session', accepts: '{ priceId, mode?, successUrl?, cancelUrl? }', returns: '{ url: string }' },
  { method: 'POST', path: '/api/stripe/webhooks', purpose: 'Receive and process Stripe webhook events', accepts: 'Raw body with stripe-signature header', returns: '{ received: true }' },
  { method: 'POST', path: '/api/stripe/portal', purpose: 'Create a billing portal session', accepts: '{ customerId }', returns: '{ url: string }' },
  { method: 'POST', path: '/api/subscribe', purpose: 'Capture email signups (Airtable integration)', accepts: '{ email, source }', returns: '{ success: true }' },
];

const envVars: EnvVar[] = [
  { name: 'STRIPE_SECRET_KEY', scope: 'server', description: 'Server-side Stripe API key', generated: false },
  { name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', scope: 'client', description: 'Client-side Stripe publishable key', generated: false },
  { name: 'STRIPE_WEBHOOK_SECRET', scope: 'server', description: 'Webhook signing secret from Stripe Dashboard', generated: false },
  { name: 'NEXT_PUBLIC_APP_URL', scope: 'client', description: 'Base URL for checkout redirects', generated: false },
  { name: 'AIRTABLE_TOKEN', scope: 'server', description: 'Airtable API token for lead capture', generated: false },
  { name: 'AIRTABLE_BASE_ID', scope: 'server', description: 'Airtable base ID for subscriber table', generated: false },
  { name: 'NEXT_PUBLIC_STRIPE_PRICE_POWER_DIGITAL_ANNUAL', scope: 'client', description: 'Price ID for Power Digital annual license', generated: true },
  { name: 'NEXT_PUBLIC_STRIPE_PRICE_PQT_SOLO', scope: 'client', description: 'Price ID for Power Queue Tracker Solo plan', generated: true },
  { name: 'NEXT_PUBLIC_STRIPE_PRICE_PQT_TEAM', scope: 'client', description: 'Price ID for Power Queue Tracker Team plan', generated: true },
  { name: 'NEXT_PUBLIC_STRIPE_PRICE_PQT_ENTERPRISE', scope: 'client', description: 'Price ID for Power Queue Tracker Enterprise plan', generated: true },
  { name: 'NEXT_PUBLIC_STRIPE_PRICE_REELPOST_STARTER', scope: 'client', description: 'Price ID for ReelPost Starter plan', generated: true },
  { name: 'NEXT_PUBLIC_STRIPE_PRICE_REELPOST_PRO', scope: 'client', description: 'Price ID for ReelPost Pro plan', generated: true },
  { name: 'NEXT_PUBLIC_STRIPE_PRICE_REELPOST_AGENCY', scope: 'client', description: 'Price ID for ReelPost Agency plan', generated: true },
  { name: 'NEXT_PUBLIC_STRIPE_PRICE_CRYPTO_LOG_PREMIUM', scope: 'client', description: 'Price ID for Crypto Transaction Log Premium plan', generated: true },
];

export default function ArchitectureTechStackPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 mb-10">
            <p className="text-sm font-semibold tracking-wide text-blue-700 uppercase mb-3">
              Engineering Reference
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Architecture & Tech Stack
              <span className="text-blue-600">: How This Project Works</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This document describes the technical architecture of the Pinehaven Ventures website:
              the stack, deployment pipeline, manifest-driven code generation, file map, component
              inventory, API routes, and environment variables.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: March 3, 2026. Reflects the current production architecture on pinehavenventures.io.
            </p>
          </section>

          {/* Tech stack */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tech stack</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Layer</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Technology</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Version</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {stack.map((row) => (
                    <tr key={row.layer} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{row.layer}</td>
                      <td className="px-4 py-3 text-sm text-blue-700 font-semibold">{row.technology}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">{row.version}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Deployment pipeline */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deployment pipeline</h2>
            <p className="text-gray-700 mb-4">
              Code flows from a single JSON manifest to a live production site in six steps.
              Vercel handles build and hosting automatically on every push.
            </p>
            <div className="space-y-4">
              {deploymentPipeline.map((step) => (
                <div key={step.step} className="flex gap-4 items-start border border-gray-200 rounded-xl p-5 bg-white">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-700 text-sm mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Manifest-driven generation */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Manifest-driven code generation</h2>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
              <p className="text-gray-700 leading-relaxed">
                <code className="font-mono text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">ventures.json</code> in
                the project root is the single source of truth. Every product, plan, price, and feature
                is defined there. The generator script reads this file and produces all derived code,
                eliminating manual synchronization across Stripe configs, environment variables, and page scaffolds.
              </p>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What the generator produces</h3>
            <div className="space-y-3">
              {generatorOutputs.map((output) => (
                <div key={output.file} className="border border-gray-200 rounded-xl p-4 bg-white">
                  <code className="text-sm font-mono text-blue-700">{output.file}</code>
                  <p className="text-sm text-gray-700 mt-1">{output.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* File map */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">File map</h2>
            <p className="text-gray-700 mb-4">
              Files marked as generated are overwritten by <code className="font-mono text-blue-700 bg-gray-100 px-1.5 py-0.5 rounded">npm run generate</code>.
              Do not edit them manually.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Path</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Generated?</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {fileMap.map((row) => (
                    <tr key={row.path} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-mono text-gray-800">{row.path}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${row.generated ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                          {row.generated ? 'Generated' : 'Manual'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Component inventory */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Component inventory</h2>
            <p className="text-gray-700 mb-4">
              All shared components live in <code className="font-mono text-blue-700 bg-gray-100 px-1.5 py-0.5 rounded">src/app/components/</code>.
              Every component is a client component (marked with <code className="font-mono">&apos;use client&apos;</code>).
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Component</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Props</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Used in</th>
                  </tr>
                </thead>
                <tbody>
                  {components.map((c) => (
                    <tr key={c.name} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm">
                        <span className="font-semibold text-gray-900">{c.name}</span>
                        <br />
                        <code className="text-xs font-mono text-gray-500">{c.path}</code>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">{c.props}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{c.usedIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* API routes */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">API routes</h2>
            <p className="text-gray-700 mb-4">
              All API routes are generic and accept any valid input. No changes are needed when adding new products.
            </p>
            <div className="space-y-4">
              {apiRoutes.map((route) => (
                <article key={route.path} className="border border-gray-200 rounded-xl p-5 bg-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-800 font-mono">
                      {route.method}
                    </span>
                    <code className="text-lg font-semibold text-gray-900">{route.path}</code>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{route.purpose}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Accepts</p>
                      <p className="text-sm font-mono text-gray-700 bg-gray-50 rounded p-2">{route.accepts}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Returns</p>
                      <p className="text-sm font-mono text-gray-700 bg-gray-50 rounded p-2">{route.returns}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Environment variables */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Environment variables</h2>
            <p className="text-gray-700 mb-4">
              Variables go in <code className="font-mono text-blue-700 bg-gray-100 px-1.5 py-0.5 rounded">.env.local</code> (gitignored).
              Variables prefixed with <code className="font-mono">NEXT_PUBLIC_</code> are exposed to the browser.
              Generated variables are auto-populated by <code className="font-mono">npm run generate</code> into <code className="font-mono">.env.example</code>.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Variable</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Scope</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {envVars.map((v) => (
                    <tr key={v.name} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-xs font-mono text-blue-700">{v.name}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${v.scope === 'server' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                          {v.scope}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{v.description}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${v.generated ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                          {v.generated ? 'Generated' : 'Manual'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Related references
            </h2>
            <p className="text-blue-50 leading-relaxed mb-6">
              See the Stripe Integration Spec for payment flow details, the Operations Runbook
              for step-by-step procedures, and the Site Map for the complete route inventory.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/reference/stripe-integration-spec"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                Stripe Integration Spec
              </Link>
              <Link
                href="/toolkit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-blue-200 text-white font-semibold hover:bg-blue-500 transition-colors"
              >
                Back to Toolkit
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
