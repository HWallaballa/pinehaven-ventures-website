import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Site Map & Route Reference | Pinehaven Ventures',
  description:
    'Complete inventory of every route, page, API endpoint, and component on the Pinehaven Ventures website — with purpose, status, and dependency information.',
};

type RouteEntry = {
  route: string;
  purpose: string;
  type: 'page' | 'api' | 'layout';
  category: string;
  generated: boolean;
};

type ComponentUsage = {
  component: string;
  path: string;
  usedIn: string[];
};

type DemoPage = {
  route: string;
  venture: string;
  description: string;
  keyComponents: string;
};

const publicRoutes: RouteEntry[] = [
  { route: '/', purpose: 'Homepage — hero section, product portfolio grid, stats, lead capture, and contact form', type: 'page', category: 'Core', generated: false },
  { route: '/ventures', purpose: 'Product portfolio listing — all 5 ventures displayed as detailed cards', type: 'page', category: 'Core', generated: false },
  { route: '/toolkit', purpose: 'Toolkit hub — index of all reference documents with descriptions, tags, and dates', type: 'page', category: 'Core', generated: false },
];

const ventureRoutes: RouteEntry[] = [
  { route: '/ventures/power-digital', purpose: 'Power Digital Intelligence product page — hero, features, pricing card, FAQ', type: 'page', category: 'Venture', generated: false },
  { route: '/ventures/power-queue-tracker', purpose: 'Power Queue Tracker product page — hero, features, 3 pricing tiers, FAQ, subscribe banner', type: 'page', category: 'Venture', generated: false },
  { route: '/ventures/autoreels', purpose: 'AutoReels.ai product page — hero, features, 3 pricing tiers, FAQ', type: 'page', category: 'Venture', generated: false },
  { route: '/ventures/crypto-transaction-log', purpose: 'Crypto Transaction Log product page — hero, features, free + premium pricing, demo link', type: 'page', category: 'Venture', generated: false },
  { route: '/ventures/powerpmis', purpose: 'PowerPMIS product page — MVP workflow, deliverables, KPIs, roadmap, dependencies', type: 'page', category: 'Venture', generated: false },
];

const demoRoutes: DemoPage[] = [
  {
    route: '/ventures/crypto-transaction-log/demo',
    venture: 'Crypto Transaction Log',
    description: 'Interactive demo with sample transaction data, CSV import wizard, filtering, search, and export functionality.',
    keyComponents: 'CryptoDemo.tsx, ImportWizard.tsx',
  },
  {
    route: '/ventures/powerpmis/demo',
    venture: 'PowerPMIS',
    description: 'Interactive MVP demo with phase workflow, project scenarios, exception queue, KPI snapshots, and capability tracks.',
    keyComponents: 'PowerPMISDemo.tsx',
  },
];

const checkoutRoutes: RouteEntry[] = [
  { route: '/checkout/success', purpose: 'Post-checkout success page — confirmation message, next steps, billing portal link', type: 'page', category: 'Checkout', generated: false },
  { route: '/checkout/cancel', purpose: 'Checkout cancellation page — reassurance, product links, contact support option', type: 'page', category: 'Checkout', generated: false },
];

const referenceRoutes: RouteEntry[] = [
  { route: '/reference/dark-factory-transition-plan', purpose: '90-day operating plan — revenue targets, sprint backlogs, scorecard, organizational redesign', type: 'page', category: 'Reference', generated: false },
  { route: '/reference/stripe-integration-spec', purpose: 'Stripe payment integration spec — checkout flows, webhooks, billing portal, API routes', type: 'page', category: 'Reference', generated: false },
  { route: '/reference/powerpmis-mvp-implementation', purpose: 'PowerPMIS delivery log — implementation dates, route deliverables, scope definitions, capability roadmap', type: 'page', category: 'Reference', generated: false },
  { route: '/reference/architecture-tech-stack', purpose: 'Architecture reference — tech stack, deployment pipeline, file map, component inventory, env vars', type: 'page', category: 'Reference', generated: false },
  { route: '/reference/product-portfolio-pricing', purpose: 'Product portfolio — all ventures, pricing matrix, revenue targets, Stripe mapping', type: 'page', category: 'Reference', generated: false },
  { route: '/reference/development-operations-runbook', purpose: 'Operations runbook — add ventures, run generators, seed Stripe, deploy, troubleshoot', type: 'page', category: 'Reference', generated: false },
  { route: '/reference/site-map-routes', purpose: 'This document — complete route and component inventory', type: 'page', category: 'Reference', generated: false },
];

const apiRoutes: RouteEntry[] = [
  { route: '/api/stripe/checkout', purpose: 'POST — Create Stripe Checkout session for any product/plan', type: 'api', category: 'API', generated: false },
  { route: '/api/stripe/webhooks', purpose: 'POST — Receive and validate Stripe webhook events (5 event types)', type: 'api', category: 'API', generated: false },
  { route: '/api/stripe/portal', purpose: 'POST — Create billing portal session for subscription management', type: 'api', category: 'API', generated: false },
  { route: '/api/subscribe', purpose: 'POST — Email signup (Airtable integration for lead capture)', type: 'api', category: 'API', generated: false },
];

const componentUsage: ComponentUsage[] = [
  {
    component: 'Navigation',
    path: 'src/app/components/Navigation.tsx',
    usedIn: ['Homepage', 'Ventures listing', 'All product pages', 'All reference pages', 'Toolkit hub', 'Checkout pages'],
  },
  {
    component: 'CheckoutButton',
    path: 'src/app/components/CheckoutButton.tsx',
    usedIn: ['PricingCard component', 'Product pages (directly for single-plan products)'],
  },
  {
    component: 'PricingCard',
    path: 'src/app/components/PricingCard.tsx',
    usedIn: ['Power Digital page', 'Power Queue Tracker page', 'AutoReels page', 'Crypto Transaction Log page'],
  },
  {
    component: 'LeadCapture',
    path: 'src/app/components/LeadCapture.tsx',
    usedIn: ['Homepage (email capture section)'],
  },
  {
    component: 'ContactForm',
    path: 'src/app/components/ContactForm.tsx',
    usedIn: ['Homepage (#contact anchor)'],
  },
  {
    component: 'SubscribeBanner',
    path: 'src/app/components/SubscribeBanner.tsx',
    usedIn: ['Power Queue Tracker product page (top banner)'],
  },
];

const navStructure = [
  { label: 'Home', href: '/', description: 'Links to homepage' },
  { label: 'Products', href: '/ventures', description: 'Links to product portfolio listing' },
  { label: 'Toolkit', href: '/toolkit', description: 'Links to toolkit reference hub' },
];

function categoryColor(category: string): string {
  switch (category) {
    case 'Core': return 'bg-blue-100 text-blue-800';
    case 'Venture': return 'bg-green-100 text-green-800';
    case 'Checkout': return 'bg-purple-100 text-purple-800';
    case 'Reference': return 'bg-amber-100 text-amber-800';
    case 'API': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export default function SiteMapRoutesPage() {
  const allPageRoutes = [...publicRoutes, ...ventureRoutes, ...checkoutRoutes, ...referenceRoutes];
  const totalRoutes = allPageRoutes.length + demoRoutes.length + apiRoutes.length;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 mb-10">
            <p className="text-sm font-semibold tracking-wide text-blue-700 uppercase mb-3">
              Navigation Reference
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Site Map
              <span className="text-blue-600"> & Route Reference</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Complete inventory of every route, page, API endpoint, demo, and component on the
              Pinehaven Ventures website. Use this as a navigation reference and dependency map.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: March 3, 2026. Total routes: {totalRoutes} ({allPageRoutes.length} pages + {demoRoutes.length} demos + {apiRoutes.length} API endpoints).
            </p>
          </section>

          {/* Summary stats */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="border border-gray-200 rounded-xl p-5 bg-white text-center">
                <p className="text-3xl font-bold text-blue-700">{publicRoutes.length}</p>
                <p className="text-sm text-gray-600 mt-1">Core pages</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5 bg-white text-center">
                <p className="text-3xl font-bold text-green-700">{ventureRoutes.length}</p>
                <p className="text-sm text-gray-600 mt-1">Product pages</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5 bg-white text-center">
                <p className="text-3xl font-bold text-amber-700">{referenceRoutes.length}</p>
                <p className="text-sm text-gray-600 mt-1">Reference docs</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5 bg-white text-center">
                <p className="text-3xl font-bold text-purple-700">{demoRoutes.length}</p>
                <p className="text-sm text-gray-600 mt-1">Demo pages</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5 bg-white text-center">
                <p className="text-3xl font-bold text-red-700">{apiRoutes.length}</p>
                <p className="text-sm text-gray-600 mt-1">API endpoints</p>
              </div>
            </div>
          </section>

          {/* Navigation structure */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Navigation bar structure</h2>
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <p className="text-sm text-gray-600">Top navigation links (rendered by Navigation component)</p>
              </div>
              <div className="flex divide-x divide-gray-200">
                {navStructure.map((item) => (
                  <div key={item.href} className="flex-1 p-4">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <code className="text-xs font-mono text-blue-700">{item.href}</code>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Public pages */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All page routes</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Route</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {allPageRoutes.map((r) => (
                    <tr key={r.route} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-mono text-blue-700">{r.route}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColor(r.category)}`}>
                          {r.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Demo pages */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive demo pages</h2>
            <div className="space-y-4">
              {demoRoutes.map((demo) => (
                <article key={demo.route} className="border border-gray-200 rounded-xl p-5 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <code className="text-sm font-mono text-blue-700">{demo.route}</code>
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                      {demo.venture}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{demo.description}</p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Components:</span> {demo.keyComponents}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* API routes */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">API endpoints</h2>
            <p className="text-gray-700 mb-4">
              All API routes are generic — they accept any valid input and require no changes when adding new products.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Endpoint</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {apiRoutes.map((r) => (
                    <tr key={r.route} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-bold bg-green-100 text-green-800 font-mono mr-2">POST</span>
                        <code className="font-mono text-gray-900">{r.route}</code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Component usage map */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Component dependency map</h2>
            <p className="text-gray-700 mb-4">
              Where each shared component is used across the site. All components are client components
              located in <code className="font-mono text-blue-700 bg-gray-100 px-1.5 py-0.5 rounded">src/app/components/</code>.
            </p>
            <div className="space-y-4">
              {componentUsage.map((c) => (
                <article key={c.component} className="border border-gray-200 rounded-xl p-5 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{c.component}</h3>
                      <code className="text-xs font-mono text-gray-500">{c.path}</code>
                    </div>
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {c.usedIn.length} location{c.usedIn.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {c.usedIn.map((location) => (
                      <li key={location} className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700">
                        {location}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Related references
            </h2>
            <p className="text-blue-50 leading-relaxed mb-6">
              See the Architecture reference for the full tech stack and deployment pipeline,
              or the Operations Runbook for step-by-step procedures.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/reference/architecture-tech-stack"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                Architecture & Tech Stack
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
