import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Crypto Transaction Log — Product Scope | Pinehaven Ventures',
  description:
    'Scope assessment for Crypto Transaction Log: website deliverables with interactive demo, freemium Stripe checkout, gap analysis for the multi-exchange transaction tracker, and competitive landscape.',
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
    route: '/ventures/crypto-transaction-log',
    purpose: 'Product page with how-it-works, feature grid, freemium pricing, and CTA section.',
    status: 'Live on main',
  },
  {
    route: '/ventures/crypto-transaction-log/demo',
    purpose: 'Interactive import wizard demo with CSV/XLS parsing simulation and transaction view.',
    status: 'Live on main',
  },
  {
    route: '/ventures',
    purpose: 'Crypto Transaction Log card in product portfolio listing.',
    status: 'Live on main',
  },
  {
    route: '/',
    purpose: 'Homepage portfolio entry for Crypto Transaction Log.',
    status: 'Live on main',
  },
];

const scopeDefinition: ScopeBlock[] = [
  {
    title: 'What\'s built (website + checkout + demo)',
    items: [
      'Product landing page with hero, "Try Interactive Demo" CTA, and freemium positioning.',
      'Three-step "How It Works" flow: Upload Files → Review & Organize → Analyze & Export.',
      'Six feature cards: CSV/XLS import, multi-exchange support, smart filters, notes/tags, combined export, cross-platform.',
      'Two-tier pricing with Stripe Checkout: Free (links to demo) and Premium ($9/mo, popular).',
      'Interactive demo page with import wizard component simulating CSV/XLS upload and transaction parsing.',
      'Demo includes mock transaction data, exchange format detection, and basic transaction table view.',
      'Product listed on homepage portfolio grid and ventures listing page.',
    ],
  },
  {
    title: 'Phase 2 scope (product build-out)',
    items: [
      'Production CSV/XLS parser for real exchange-specific transaction formats (Coinbase, Binance, Kraken, etc.).',
      'Multi-exchange format detection and automatic normalization engine.',
      'Transaction database with persistent storage, search, sort, and advanced filtering.',
      'Notes and tagging system for individual transaction annotation.',
      'Combined export report generator — unified CSV/PDF across all exchanges.',
      'Cloud sync infrastructure for Premium tier cross-device access.',
      'User authentication, account management, and billing portal access.',
      'iOS and Android applications (or responsive progressive web app).',
      'Exchange format library — ongoing maintenance as exchanges update export formats.',
      'Tax reporting export templates (Form 8949, Schedule D compatible).',
    ],
  },
  {
    title: 'Out of scope',
    items: [
      'Direct exchange API connections for automatic transaction import.',
      'Real-time portfolio tracking or live price feeds.',
      'Tax filing or tax advisory services.',
      'DeFi protocol tracking or on-chain wallet analysis.',
      'Trading execution or exchange integration beyond data import.',
    ],
  },
];

const competitorTracks: CompetitorTrack[] = [
  {
    name: 'CoinTracker',
    category: 'Crypto Tax & Portfolio',
    overlap: [
      'Multi-exchange transaction tracking and consolidation',
      'Tax reporting and export functionality',
    ],
    differentiation: [
      'CoinTracker connects via API; CTL uses file-based import (simpler, privacy-first)',
      'CTL starts free and targets casual investors; CoinTracker is $59+/yr',
    ],
    status: 'Direct competitor',
    statusColor: 'bg-red-100 text-red-800',
  },
  {
    name: 'Koinly',
    category: 'Crypto Tax Software',
    overlap: [
      'CSV import from multiple exchanges',
      'Transaction consolidation and tax report generation',
    ],
    differentiation: [
      'Koinly is tax-focused with TurboTax integration; CTL focuses on transaction management',
      'CTL offers a free tier with no transaction limits',
    ],
    status: 'Direct competitor',
    statusColor: 'bg-red-100 text-red-800',
  },
  {
    name: 'CoinLedger',
    category: 'Crypto Tax Reporting',
    overlap: [
      'CSV/XLS import and transaction parsing',
      'Multi-exchange transaction history consolidation',
    ],
    differentiation: [
      'CoinLedger is single-purpose tax reporting; CTL is ongoing transaction management',
      'CTL cross-platform (web + mobile) with cloud sync for daily tracking',
    ],
    status: 'Niche competitor',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    name: 'Exchange native exports',
    category: 'Built-in Tools',
    overlap: [
      'Transaction history download in CSV format',
      'Basic search and filter within each exchange',
    ],
    differentiation: [
      'CTL unifies transactions across all exchanges in one view',
      'CTL adds notes, tags, and combined export — features exchanges don\'t offer',
    ],
    status: 'Build vs. buy',
    statusColor: 'bg-blue-100 text-blue-800',
  },
];

const dependencies = [
  'Exchange CSV format specification library — documented parsers for Coinbase, Binance, Kraken, Gemini, and others.',
  'Cloud database for persistent transaction storage and user data.',
  'Cross-platform sync infrastructure (web ↔ mobile) for Premium tier.',
  'User authentication system with free/premium tier enforcement.',
  'Mobile distribution — App Store and Google Play developer accounts (or PWA infrastructure).',
  'Export/reporting engine for generating combined CSV, PDF, and tax-compatible outputs.',
];

export default function CryptoTransactionLogScopePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 mb-10">
            <p className="text-sm font-semibold tracking-wide text-orange-700 uppercase mb-3">
              Toolkit Reference
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Crypto Transaction Log
              <span className="text-orange-600"> — Product Scope</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Scope assessment for the multi-exchange crypto transaction tracking platform.
              Covers what&apos;s built on the website today (including the interactive demo),
              what&apos;s needed to deliver the full product, and competitive positioning.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-800">
                Status: Live (marketing + checkout + demo)
              </span>
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                Free / $9/month
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Last updated: March 3, 2026
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product overview</h2>
            <p className="text-gray-600 mb-4">
              Crypto Transaction Log is the most developed product in the portfolio from a website perspective —
              it has a full product page, freemium pricing with Stripe Checkout, and an interactive demo with an
              import wizard that simulates CSV/XLS parsing. It targets crypto investors and active traders who need
              to consolidate transactions across multiple exchanges. The underlying production import engine, cloud
              sync, and mobile applications have not been built.
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
                      <td className="px-4 py-3 text-sm font-mono text-orange-700">{row.route}</td>
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
                        <span className="text-orange-600">-</span>
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
                          <span className="text-orange-600">-</span>
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
              The following are required to move Crypto Transaction Log from marketing page to operational product:
            </p>
            <ul className="space-y-2 text-gray-700">
              {dependencies.map((dep) => (
                <li key={dep} className="flex gap-2">
                  <span className="text-orange-600">-</span>
                  <span>{dep}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-orange-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Related pages</h2>
            <p className="text-orange-50 leading-relaxed mb-6">
              Review the current product presentation, demo, and checkout flow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/ventures/crypto-transaction-log"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-orange-700 font-semibold hover:bg-orange-100 transition-colors"
              >
                View Product Page
              </Link>
              <Link
                href="/ventures/crypto-transaction-log/demo"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-orange-200 text-white font-semibold hover:bg-orange-500 transition-colors"
              >
                Open Demo
              </Link>
              <Link
                href="/toolkit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-orange-200 text-white font-semibold hover:bg-orange-500 transition-colors"
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
