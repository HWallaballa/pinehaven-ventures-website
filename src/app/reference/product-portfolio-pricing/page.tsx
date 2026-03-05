import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Product Portfolio & Pricing Matrix | Pinehaven Ventures',
  description:
    'Consolidated reference for all Pinehaven Ventures products — pricing tiers, target markets, growth motions, Stripe configuration, and product lifecycle stages.',
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

type GrowthMotion = {
  venture: string;
  href: string;
  primaryMotion: string;
  leadingIndicator: string;
  goal: string;
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
    name: 'ReelPost.ai',
    id: 'reelpost',
    href: '/ventures/reelpost',
    tagline: 'AI-powered multi-platform short-form video generation',
    description: 'Generate stunning short-form videos with AI and auto-post to TikTok, YouTube Shorts, Instagram Reels, and Facebook Reels. For creators, small businesses, and agencies.',
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
  { venture: 'ReelPost.ai', plan: 'Starter', price: '$29', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_REELPOST_STARTER', popular: false },
  { venture: 'ReelPost.ai', plan: 'Pro', price: '$79', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_REELPOST_PRO', popular: true },
  { venture: 'ReelPost.ai', plan: 'Agency', price: '$199', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_REELPOST_AGENCY', popular: false },
  { venture: 'Crypto Transaction Log', plan: 'Free', price: '$0', interval: 'month', mode: 'none', envKey: 'N/A (free tier)', popular: false },
  { venture: 'Crypto Transaction Log', plan: 'Premium', price: '$9', interval: 'month', mode: 'subscription', envKey: 'NEXT_PUBLIC_STRIPE_PRICE_CRYPTO_LOG_PREMIUM', popular: false },
];

const growthMotions: GrowthMotion[] = [
  {
    venture: 'Power Digital Intelligence',
    href: '/ventures/power-digital',
    primaryMotion: 'Account-based outbound + investor/developer demos',
    leadingIndicator: 'Qualified demos booked per week and proposal-to-close rate',
    goal: 'Grow annual license base to profitability',
  },
  {
    venture: 'Power Queue Tracker',
    href: '/ventures/power-queue-tracker',
    primaryMotion: 'Digest-led self-serve conversion + enterprise upsell',
    leadingIndicator: 'Net new subscribers, activation rate, and weekly churn',
    goal: 'Sustain positive subscriber growth trend',
  },
  {
    venture: 'ReelPost.ai',
    href: '/ventures/reelpost',
    primaryMotion: 'Creator funnel + agency multi-account upgrades',
    leadingIndicator: 'Trial-to-paid conversion and retained weekly publishers',
    goal: 'Build self-sustaining creator acquisition funnel',
  },
  {
    venture: 'Crypto Transaction Log',
    href: '/ventures/crypto-transaction-log',
    primaryMotion: 'Demo-led acquisition + premium upgrade automation',
    leadingIndicator: 'Import success rate and free-to-premium conversion',
    goal: 'Maximize free-to-premium conversion rate',
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
              growth motions, and Stripe configuration. The goal across all ventures is
              profitability. This is the business-level companion to the Architecture & Tech Stack reference.
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
                <p className="text-3xl font-bold text-gray-900">Profitability</p>
                <p className="text-sm text-gray-600 mt-1">90-day goal</p>
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

          {/* Growth motions */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Growth motions by venture
            </h2>
            <p className="text-gray-700 mb-4">
              Each venture has a defined path to profitability. The focus is on sustainable customer
              acquisition and retention, measured by leading indicators rather than fixed targets.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Venture</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Primary motion</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Leading indicator</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Goal</th>
                  </tr>
                </thead>
                <tbody>
                  {growthMotions.map((row) => (
                    <tr key={row.venture} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm">
                        <Link href={row.href} className="font-semibold text-blue-700 hover:text-blue-800">
                          {row.venture}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.primaryMotion}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.leadingIndicator}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.goal}</td>
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
