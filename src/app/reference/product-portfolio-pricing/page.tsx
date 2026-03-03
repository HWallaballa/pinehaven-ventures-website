import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Product Portfolio & Pricing Matrix | Pinehaven Ventures',
  description:
    'Consolidated reference for all Pinehaven Ventures products — pricing tiers, target markets, revenue targets, Stripe configuration, and product lifecycle stages.',
};

type VentureOverview = {
  name: string;
  id: string;
  href: string;
  tagline: string;
  description: string;
  color: string;
  colorClasses: string;
  status: string;
  statusColor: string;
  targetMarket: string[];
  hasFreeTrail: boolean;
  hasDemo: boolean;
};

type PricingRow = {
  venture: string;
  plan: string;
  price: string;
  interval: string;
  mode: string;
  envKey: string;
  popular: boolean;
};

type RevenueTarget = {
  venture: string;
  href: string;
  target90Day: string;
  weeklyTarget: string;
  pricingAnchor: string;
  primaryMotion: string;
};

const ventures: VentureOverview[] = [
  {
    name: 'Power Digital Intelligence',
    id: 'power-digital',
    href: '/ventures/power-digital',
    tagline: 'Institutional-grade data center market intelligence',
    description: 'Track power queue positions, capacity pipelines, and site selection data across ERCOT and beyond. Built for data center developers, institutional investors, and utilities.',
    color: 'Green',
    colorClasses: 'bg-green-100 text-green-800 border-green-200',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-800',
    targetMarket: ['Data center developers', 'Institutional investors', 'Utilities & ISOs'],
    hasFreeTrail: false,
    hasDemo: false,
  },
  {
    name: 'Power Queue Tracker',
    id: 'power-queue-tracker',
    href: '/ventures/power-queue-tracker',
    tagline: 'Never miss a critical ERCOT interconnection queue change',
    description: 'Real-time ERCOT interconnection queue monitoring with daily/weekly digests, smart search, watchlists, and data export for energy professionals.',
    color: 'Blue',
    colorClasses: 'bg-blue-100 text-blue-800 border-blue-200',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-800',
    targetMarket: ['Data center developers', 'Consultants', 'Energy professionals'],
    hasFreeTrail: false,
    hasDemo: false,
  },
  {
    name: 'AutoReels.ai',
    id: 'autoreels',
    href: '/ventures/autoreels',
    tagline: 'AI-powered short-form video generation',
    description: 'Generate stunning short-form videos with AI, manage multiple TikTok accounts, and auto-post on schedule. For creators, small businesses, and agencies.',
    color: 'Purple',
    colorClasses: 'bg-purple-100 text-purple-800 border-purple-200',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-800',
    targetMarket: ['Creators', 'Small businesses', 'Agencies'],
    hasFreeTrail: false,
    hasDemo: false,
  },
  {
    name: 'Crypto Transaction Log',
    id: 'crypto-transaction-log',
    href: '/ventures/crypto-transaction-log',
    tagline: 'Track crypto across every exchange',
    description: 'Upload CSV and XLS files from any exchange, track, analyze, and export crypto transactions across iOS, Android, and web.',
    color: 'Orange',
    colorClasses: 'bg-orange-100 text-orange-800 border-orange-200',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-800',
    targetMarket: ['Crypto investors', 'Active traders'],
    hasFreeTrail: true,
    hasDemo: true,
  },
  {
    name: 'PowerPMIS',
    id: 'powerpmis',
    href: '/ventures/powerpmis',
    tagline: 'Project Management Intelligence System',
    description: 'Move from reality capture to cost allocation and executive reporting in one workflow. Built for owners and EPC teams managing large construction and infrastructure projects.',
    color: 'Amber',
    colorClasses: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    status: 'MVP Pilot',
    statusColor: 'bg-yellow-100 text-yellow-800',
    targetMarket: ['Construction owners', 'EPC teams', 'PMO users'],
    hasFreeTrail: false,
    hasDemo: true,
  },
];

const pricingMatrix: PricingRow[] = [
  { venture: 'Power Digital Intelligence', plan: 'Annual License', price: '$10,000', interval: 'year', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_POWER_DIGITAL_ANNUAL', popular: false },
  { venture: 'Power Queue Tracker', plan: 'Solo', price: '$49', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_PQT_SOLO', popular: false },
  { venture: 'Power Queue Tracker', plan: 'Team', price: '$99', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_PQT_TEAM', popular: true },
  { venture: 'Power Queue Tracker', plan: 'Enterprise', price: '$149', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_PQT_ENTERPRISE', popular: false },
  { venture: 'AutoReels.ai', plan: 'Starter', price: '$29', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_STARTER', popular: false },
  { venture: 'AutoReels.ai', plan: 'Pro', price: '$79', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_PRO', popular: true },
  { venture: 'AutoReels.ai', plan: 'Agency', price: '$199', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_AUTOREELS_AGENCY', popular: false },
  { venture: 'Crypto Transaction Log', plan: 'Free', price: '$0', interval: 'month', mode: 'none', envKey: 'N/A (free tier)', popular: false },
  { venture: 'Crypto Transaction Log', plan: 'Premium', price: '$9', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_CRYPTO_LOG_PREMIUM', popular: false },
];

const revenueTargets: RevenueTarget[] = [
  {
    venture: 'Power Digital Intelligence',
    href: '/ventures/power-digital',
    target90Day: '$250,000',
    weeklyTarget: '$19.2k/week (~2 annual licenses)',
    pricingAnchor: '$10,000/year',
    primaryMotion: 'Account-based outbound + investor/developer demos',
  },
  {
    venture: 'Power Queue Tracker',
    href: '/ventures/power-queue-tracker',
    target90Day: '$110,000',
    weeklyTarget: '$8.5k/week (~$2.1k net new MRR)',
    pricingAnchor: '$49/$99/$149 monthly',
    primaryMotion: 'Digest-led self-serve conversion + enterprise upsell',
  },
  {
    venture: 'AutoReels.ai',
    href: '/ventures/autoreels',
    target90Day: '$90,000',
    weeklyTarget: '$6.9k/week (~$1.7k net new MRR)',
    pricingAnchor: '$29/$79/$199 monthly',
    primaryMotion: 'Creator funnel + agency multi-account upgrades',
  },
  {
    venture: 'Crypto Transaction Log',
    href: '/ventures/crypto-transaction-log',
    target90Day: '$50,000',
    weeklyTarget: '$3.8k/week (~140 premium upgrades)',
    pricingAnchor: 'Free + $9 premium',
    primaryMotion: 'Demo-led acquisition + premium upgrade automation',
  },
];

export default function ProductPortfolioPricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 mb-10">
            <p className="text-sm font-semibold tracking-wide text-blue-700 uppercase mb-3">
              Business Reference
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Product Portfolio
              <span className="text-blue-600"> & Pricing Matrix</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Consolidated view of all Pinehaven Ventures products, pricing tiers, target markets,
              revenue contribution targets, and Stripe configuration. This is the business-level
              companion to the Architecture & Tech Stack reference.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: March 3, 2026. All pricing and product data sourced from ventures.json.
            </p>
          </section>

          {/* Portfolio summary */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio at a glance</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="border border-gray-200 rounded-xl p-5 bg-white text-center">
                <p className="text-3xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600 mt-1">Products</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5 bg-white text-center">
                <p className="text-3xl font-bold text-gray-900">4 Live + 1 MVP</p>
                <p className="text-sm text-gray-600 mt-1">Delivery stages</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5 bg-white text-center">
                <p className="text-3xl font-bold text-gray-900">9</p>
                <p className="text-sm text-gray-600 mt-1">Paid pricing plans</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5 bg-white text-center">
                <p className="text-3xl font-bold text-gray-900">$500K</p>
                <p className="text-sm text-gray-600 mt-1">90-day revenue target</p>
              </div>
            </div>
          </section>

          {/* Venture cards */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All ventures</h2>
            <div className="space-y-4">
              {ventures.map((v) => (
                <article key={v.id} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-gray-900">{v.name}</h3>
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${v.statusColor}`}>
                        {v.status}
                      </span>
                    </div>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${v.colorClasses}`}>
                      Theme: {v.color}
                    </span>
                  </div>
                  <p className="text-blue-700 font-medium text-sm mb-2">{v.tagline}</p>
                  <p className="text-gray-700 text-sm mb-3">{v.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm mb-3">
                    <div>
                      <span className="font-semibold text-gray-800">Target market: </span>
                      <span className="text-gray-600">{v.targetMarket.join(', ')}</span>
                    </div>
                    {v.hasFreeTrail && (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Free tier available
                      </span>
                    )}
                    {v.hasDemo && (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        Demo available
                      </span>
                    )}
                  </div>
                  <Link
                    href={v.href}
                    className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    View product page
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Pricing matrix */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete pricing matrix</h2>
            <p className="text-gray-700 mb-4">
              All plans across all products. Popular plans are marked. Free tiers have no Stripe price ID.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Venture</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Plan</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Interval</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Mode</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Stripe env key</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingMatrix.map((row) => (
                    <tr key={`${row.venture}-${row.plan}`} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{row.venture}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {row.plan}
                        {row.popular && (
                          <span className="ml-2 inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                            Popular
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-blue-700">{row.price}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">/{row.interval}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${row.mode === 'subscription' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                          {row.mode}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-500">{row.envKey}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Revenue targets */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Revenue contribution targets (90-day plan)
            </h2>
            <p className="text-gray-700 mb-4">
              From the Dark Factory Transition Plan. Four live ventures contribute to a combined $500K target.
              PowerPMIS (MVP Pilot) is not yet included in revenue projections.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Venture</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">90-day target</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Weekly pace</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Pricing anchor</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Primary motion</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueTargets.map((row) => (
                    <tr key={row.venture} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm">
                        <Link href={row.href} className="font-semibold text-blue-700 hover:text-blue-800">
                          {row.venture}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-blue-700">{row.target90Day}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.weeklyTarget}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.pricingAnchor}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.primaryMotion}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-200 bg-blue-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">Total</td>
                    <td className="px-4 py-3 text-sm font-bold text-blue-800">$500,000</td>
                    <td className="px-4 py-3 text-sm text-gray-700" colSpan={3}>
                      Updated weekly in the Dark Factory operating scorecard
                    </td>
                  </tr>
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
              See the Dark Factory Transition Plan for the full 90-day scorecard and sprint backlogs,
              or visit the Architecture reference for technical implementation details.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/reference/dark-factory-transition-plan"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                Dark Factory Transition Plan
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
