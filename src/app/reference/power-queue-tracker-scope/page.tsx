import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Power Queue Tracker — Product Scope | Pinehaven Ventures',
  description:
    'Scope assessment for Power Queue Tracker: website deliverables, 3-tier Stripe checkout, gap analysis for the ERCOT queue monitoring platform, and competitive landscape.',
};

type RouteDeliverable = {
  route: string;
  purpose: string;
  status: string;
};

type ScopeBlock = {
  title: string;
  items: string[];
};

type CompetitorTrack = {
  name: string;
  category: string;
  overlap: string[];
  differentiation: string[];
  status: string;
  statusColor: string;
};

const routeDeliverables: RouteDeliverable[] = [
  {
    route: '/ventures/power-queue-tracker',
    purpose: 'Product page with trust bar, how-it-works, features, 3-tier pricing, and FAQ accordion.',
    status: 'Live on main',
  },
  {
    route: '/ventures',
    purpose: 'Power Queue Tracker card in product portfolio listing.',
    status: 'Live on main',
  },
  {
    route: '/',
    purpose: 'Homepage portfolio entry for Power Queue Tracker.',
    status: 'Live on main',
  },
];

const scopeDefinition: ScopeBlock[] = [
  {
    title: 'What\'s built (website + checkout)',
    items: [
      'Product landing page with hero, trust bar (5,000+ MW tracked, daily updates, 14-day trial, cancel anytime).',
      'Four-step "How It Works" flow: Fetch → Parse → Alert → Act.',
      'Six feature cards: email digests, smart search, watchlists, data export, historical tracking, team collaboration.',
      'Three-tier pricing with Stripe Checkout: Solo ($49/mo), Team ($99/mo, popular), Enterprise ($149/mo).',
      'Interactive FAQ accordion with 5 common questions.',
      'SubscribeBanner component for email capture.',
      'Product listed on homepage portfolio grid and ventures listing page.',
    ],
  },
  {
    title: 'Phase 2 scope (product build-out)',
    items: [
      'ERCOT interconnection queue data pipeline with daily automated refresh.',
      'Email digest system — daily and weekly automated queue change summaries.',
      'Web dashboard with full search, filter, and watchlist management interface.',
      'Alert engine with real-time notifications, webhooks, and threshold-based triggers.',
      'Data export functionality: CSV, Excel, and JSON formats.',
      'REST API for Enterprise tier with authentication and usage metering.',
      'Multi-user seat management and team collaboration features.',
      'Historical tracking database with queue position change history.',
      'Custom report builder for Enterprise customers.',
      'PJM and CAISO market expansion (referenced in FAQ as Q2 2026 roadmap).',
    ],
  },
  {
    title: 'Out of scope',
    items: [
      'Real-time streaming or sub-hourly data refresh for queue changes.',
      'Native mobile application for queue monitoring.',
      'Multi-ISO coverage beyond ERCOT, PJM, and CAISO.',
      'Predictive analytics or AI-driven queue outcome forecasting.',
      'White-label or embedded analytics for third-party platforms.',
    ],
  },
];

const competitorTracks: CompetitorTrack[] = [
  {
    name: 'Gridstatus.io',
    category: 'Open Energy Data',
    overlap: [
      'ERCOT interconnection queue data access',
      'Historical tracking and change monitoring',
    ],
    differentiation: [
      'Gridstatus is open-source and free; PQT adds curated digests and alerts',
      'PQT is purpose-built for site selection workflows, not raw data browsing',
    ],
    status: 'Direct competitor',
    statusColor: 'bg-red-100 text-red-800',
  },
  {
    name: 'Enverus Power',
    category: 'Energy Data Platform',
    overlap: [
      'ERCOT queue monitoring and energy market data',
      'Enterprise API access and custom reporting',
    ],
    differentiation: [
      'Enverus is enterprise-priced ($50K+); PQT starts at $49/mo',
      'PQT targets niche DC site selection; Enverus covers full energy value chain',
    ],
    status: 'Niche competitor',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    name: 'Custom ERCOT scrapers',
    category: 'In-house Solutions',
    overlap: [
      'Daily ERCOT queue data retrieval and parsing',
      'Internal alerting on queue changes',
    ],
    differentiation: [
      'PQT eliminates maintenance burden of self-built scrapers',
      'Provides enriched data with historical context and normalized schema',
    ],
    status: 'Build vs. buy',
    statusColor: 'bg-blue-100 text-blue-800',
  },
];

const dependencies = [
  'ERCOT data access — automated pipeline to pull and parse interconnection queue filings.',
  'Email delivery infrastructure (SendGrid or SES) for digest and alert distribution.',
  'Cloud database for historical queue data, watchlists, and user preferences.',
  'User authentication system with seat-based access control for team plans.',
  'Webhook infrastructure for Enterprise real-time alert delivery.',
];

export default function PowerQueueTrackerScopePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 mb-10">
            <p className="text-sm font-semibold tracking-wide text-blue-700 uppercase mb-3">
              Toolkit Reference
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Power Queue Tracker
              <span className="text-blue-600"> — Product Scope</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Scope assessment for the ERCOT interconnection queue monitoring platform.
              Covers what&apos;s built on the website today, what&apos;s needed to deliver the full product,
              and competitive positioning in the energy data market.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                Status: Live (marketing + checkout)
              </span>
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                $49 – $149/month
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Last updated: March 3, 2026
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product overview</h2>
            <p className="text-gray-600 mb-4">
              Power Queue Tracker is positioned as an automated monitoring tool for ERCOT interconnection queue changes,
              targeting data center developers, consultants, and energy professionals. The product page is the most
              feature-rich in the portfolio — with a trust bar, how-it-works flow, feature grid, 3-tier pricing, and
              interactive FAQ. Stripe Checkout is configured for all three tiers. The underlying monitoring platform,
              data pipeline, and alert system have not been built.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Website deliverables</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Route</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Purpose</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {routeDeliverables.map((row) => (
                    <tr key={row.route} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-mono text-blue-700">{row.route}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.purpose}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product scope</h2>
            <div className="space-y-4">
              {scopeDefinition.map((block) => (
                <article key={block.title} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{block.title}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-blue-600">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Competitive landscape
            </h2>
            <div className="grid lg:grid-cols-2 gap-4">
              {competitorTracks.map((track) => (
                <article key={track.name} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{track.name}</h3>
                    <span className={`inline-flex shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${track.statusColor}`}>
                      {track.status}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">{track.category}</p>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-800 mb-1">Overlap</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {track.overlap.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-yellow-600">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">Differentiation</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {track.differentiation.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-blue-600">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12 bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Dependencies &amp; blockers</h2>
            <p className="text-gray-700 mb-4">
              The following are required to move Power Queue Tracker from marketing page to operational product:
            </p>
            <ul className="space-y-2 text-gray-700">
              {dependencies.map((dep) => (
                <li key={dep} className="flex gap-2">
                  <span className="text-blue-600">-</span>
                  <span>{dep}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-blue-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Related pages</h2>
            <p className="text-blue-50 leading-relaxed mb-6">
              Review the current product presentation and checkout flow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/ventures/power-queue-tracker"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                View Product Page
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
