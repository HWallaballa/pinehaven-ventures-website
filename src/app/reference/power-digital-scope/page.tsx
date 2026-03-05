import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Power Digital Intelligence — Product Scope | Pinehaven Ventures',
  description:
    'Scope assessment for Power Digital Intelligence: website deliverables, Stripe checkout status, gap analysis for the full ERCOT data center market intelligence platform, and competitive landscape.',
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
    route: '/ventures/power-digital',
    purpose: 'Product page with feature detail, persona cards, and $10K/yr Stripe checkout.',
    status: 'Live on main',
  },
  {
    route: '/ventures',
    purpose: 'Power Digital Intelligence card in product portfolio listing.',
    status: 'Live on main',
  },
  {
    route: '/',
    purpose: 'Homepage portfolio entry for Power Digital Intelligence.',
    status: 'Live on main',
  },
];

const scopeDefinition: ScopeBlock[] = [
  {
    title: 'What\'s built (website + checkout)',
    items: [
      'Product landing page with hero, tagline, and institutional positioning.',
      'Three persona cards targeting data center developers, institutional investors, and utilities/ISOs.',
      'Four detailed feature blocks: interconnection queue tracking, market intelligence reports, custom alerts, and data exports/API.',
      'Pricing section with $10,000/year annual license and Stripe Checkout integration.',
      'Product listed on homepage portfolio grid and ventures listing page.',
    ],
  },
  {
    title: 'Phase 2 scope (product build-out)',
    items: [
      'ERCOT interconnection queue data pipeline — ingestion, parsing, normalization, and daily refresh.',
      'Dashboard application with search, filter, geographic visualization, and queue position tracking.',
      'Alert and notification engine for watchlists, queue changes, and threshold-based triggers.',
      'API access layer for programmatic data retrieval (REST endpoints, authentication, rate limiting).',
      'Monthly market intelligence report generation and distribution system.',
      'Historical data archive infrastructure with records back to 2019.',
      'User authentication and organization-level access management.',
      'Customer onboarding flow and dedicated account manager tooling.',
    ],
  },
  {
    title: 'Out of scope',
    items: [
      'Live streaming data feeds or sub-daily refresh cycles.',
      'Multi-market coverage beyond ERCOT (PJM, CAISO, SPP, MISO).',
      'Custom on-premise deployment or data residency configurations.',
      'Predictive modeling or AI-driven forecasting features.',
      'White-label or reseller licensing.',
    ],
  },
];

const competitorTracks: CompetitorTrack[] = [
  {
    name: 'Bloomberg Terminal (energy data)',
    category: 'Market Intelligence',
    overlap: [
      'Energy market data access and analytics',
      'Institutional-grade reporting and exports',
    ],
    differentiation: [
      'Pinehaven is narrowly focused on data center interconnection queues',
      'Purpose-built for site selection workflows, not general energy trading',
    ],
    status: 'Niche competitor',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    name: 'Enverus',
    category: 'Energy Data Platform',
    overlap: [
      'ERCOT market data and interconnection queue coverage',
      'API access for enterprise integrations',
    ],
    differentiation: [
      'Enverus covers full energy value chain; Pinehaven is data-center-specific',
      'Lower price point with narrower, deeper coverage of queue dynamics',
    ],
    status: 'Direct competitor',
    statusColor: 'bg-red-100 text-red-800',
  },
  {
    name: 'S&P Global Market Intelligence',
    category: 'Market Data',
    overlap: [
      'Institutional investor workflows and due diligence data',
      'Energy infrastructure analytics',
    ],
    differentiation: [
      'S&P is broad financial data; Pinehaven is purpose-built for DC power queues',
      'Faster time-to-insight for data center site selection decisions',
    ],
    status: 'Adjacent',
    statusColor: 'bg-blue-100 text-blue-800',
  },
];

const dependencies = [
  'ERCOT API access or data feed agreements for interconnection queue data.',
  'Cloud data warehouse for ingestion, normalization, and historical archive.',
  'Dashboard platform or framework for interactive data visualization.',
  'Email delivery infrastructure (SendGrid, SES) for alerts and report distribution.',
  'Authentication and user management system for organization-level access.',
];

export default function PowerDigitalScopePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 mb-10">
            <p className="text-sm font-semibold tracking-wide text-green-700 uppercase mb-3">
              Toolkit Reference
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Power Digital Intelligence
              <span className="text-green-600"> — Product Scope</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Scope assessment for the institutional-grade data center market intelligence platform.
              Covers what&apos;s built on the website today, what&apos;s needed to deliver the full product,
              and where the product sits in its competitive landscape.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                Status: Live (marketing + checkout)
              </span>
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                $10,000/year
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Last updated: March 3, 2026
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product overview</h2>
            <p className="text-gray-600 mb-4">
              Power Digital Intelligence is positioned as the single source of truth for interconnection queues,
              capacity pipelines, and energy market signals — targeting data center developers, institutional investors,
              and utilities/ISOs. Currently, the product exists as a marketing page with Stripe Checkout for a $10,000/year
              annual license. The underlying data platform has not been built.
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
                      <td className="px-4 py-3 text-sm font-mono text-green-700">{row.route}</td>
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
                        <span className="text-green-600">-</span>
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
                          <span className="text-green-600">-</span>
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
              The following are required to move Power Digital Intelligence from marketing page to operational product:
            </p>
            <ul className="space-y-2 text-gray-700">
              {dependencies.map((dep) => (
                <li key={dep} className="flex gap-2">
                  <span className="text-green-600">-</span>
                  <span>{dep}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-green-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Related pages</h2>
            <p className="text-green-50 leading-relaxed mb-6">
              Review the current product presentation and checkout flow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/ventures/power-digital"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-green-700 font-semibold hover:bg-green-100 transition-colors"
              >
                View Product Page
              </Link>
              <Link
                href="/toolkit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-green-200 text-white font-semibold hover:bg-green-500 transition-colors"
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
