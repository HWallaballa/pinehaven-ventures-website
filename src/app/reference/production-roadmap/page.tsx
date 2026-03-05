import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Production Roadmap | Pinehaven Ventures',
  description:
    'Unified roadmap for moving all Pinehaven Ventures products from marketing sites to fully operational SaaS platforms. Covers shared infrastructure, per-product milestones, and current blockers.',
};

type InfraItem = {
  name: string;
  description: string;
  status: string;
  statusColor: string;
  blockedBy: string[];
};

type ProductMilestone = {
  product: string;
  href: string;
  color: string;
  currentState: string;
  phase2Items: { item: string; priority: string; priorityColor: string }[];
  blockers: string[];
};

const sharedInfrastructure: InfraItem[] = [
  {
    name: 'User authentication and account management',
    description:
      'Supabase Auth integration — email/password signup, login, session management, and protected routes. Required before any product can grant access post-purchase.',
    status: 'Not started',
    statusColor: 'bg-red-100 text-red-800',
    blockedBy: ['Supabase project configuration (env vars currently empty)'],
  },
  {
    name: 'Post-purchase access provisioning',
    description:
      'Link Stripe subscription status to user accounts. When a checkout completes, grant the user access to the product they purchased. Handle upgrades, downgrades, and cancellations.',
    status: 'Not started',
    statusColor: 'bg-red-100 text-red-800',
    blockedBy: ['User authentication system'],
  },
  {
    name: 'Transactional email system',
    description:
      'Send welcome emails, subscription confirmations, and account notifications. Stripe receipt emails are now enabled, but product-specific emails (onboarding, digests, alerts) require a dedicated email provider.',
    status: 'Partially done',
    statusColor: 'bg-yellow-100 text-yellow-800',
    blockedBy: ['Email provider selection (Resend, SendGrid, or Postmark)'],
  },
  {
    name: 'Billing portal integration',
    description:
      'The /api/stripe/portal API route exists but there is no UI to access it. Users need a way to manage subscriptions, update payment methods, and view invoices.',
    status: 'API only',
    statusColor: 'bg-yellow-100 text-yellow-800',
    blockedBy: ['User authentication (need to identify the customer)'],
  },
  {
    name: 'Stripe webhook fulfillment',
    description:
      'Webhook route exists and validates signatures, but only logs events. Needs to: create user accounts on checkout.session.completed, update access on subscription changes, and handle failed payments.',
    status: 'Logging only',
    statusColor: 'bg-yellow-100 text-yellow-800',
    blockedBy: ['User authentication', 'Database schema for subscriptions'],
  },
  {
    name: 'Production environment configuration',
    description:
      'Vercel deployment is live at pinehavenventures.io with all Stripe env vars configured. Supabase env vars are still empty. Stripe is using live keys.',
    status: 'Stripe done, Supabase pending',
    statusColor: 'bg-yellow-100 text-yellow-800',
    blockedBy: ['Supabase project setup'],
  },
];

const productMilestones: ProductMilestone[] = [
  {
    product: 'Power Digital Intelligence',
    href: '/ventures/power-digital',
    color: 'green',
    currentState:
      'Marketing page live with $10,000/year Stripe Checkout. No product behind the paywall — no data pipeline, no dashboard, no reports.',
    phase2Items: [
      { item: 'ERCOT interconnection queue data pipeline (daily refresh)', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'Market intelligence dashboard with queue tracking and capacity views', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'Custom alerts for queue movements and new filings', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Monthly intelligence report generation', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Historical data archive back to 2019', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800' },
      { item: 'REST API for programmatic access', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800' },
    ],
    blockers: [
      'ERCOT API access or data scraping pipeline',
      'Data warehouse for queue and capacity data',
      'User auth + org-level access control',
    ],
  },
  {
    product: 'Power Queue Tracker',
    href: '/ventures/power-queue-tracker',
    color: 'blue',
    currentState:
      'Marketing page live with 3-tier Stripe Checkout ($49/$99/$149). Email subscribe CTA captures leads. No actual queue data, digests, or dashboard.',
    phase2Items: [
      { item: 'ERCOT queue data pipeline with daily automated refresh', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'Automated email digests (daily/weekly queue summaries)', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'Web dashboard with queue search, filters, and watchlists', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'Alert engine for queue position changes and new filings', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'CSV/Excel export for queue data', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Team collaboration and multi-seat management', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800' },
      { item: 'PJM and CAISO market expansion', priority: 'Low', priorityColor: 'bg-gray-100 text-gray-800' },
    ],
    blockers: [
      'ERCOT data access (shared dependency with Power Digital)',
      'Email infrastructure for automated digests',
      'User auth + subscription tier enforcement',
    ],
  },
  {
    product: 'ReelPost.ai',
    href: '/ventures/reelpost',
    color: 'purple',
    currentState:
      'Marketing page live with 3-tier Stripe Checkout ($29/$79/$199). Multi-platform positioning (TikTok, YouTube Shorts, Instagram Reels, Facebook Reels). No AI video generation or platform integrations built.',
    phase2Items: [
      { item: 'AI video generation engine (text-to-video pipeline)', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'TikTok API integration (OAuth, posting, account management)', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'YouTube Data API integration (Shorts uploading)', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Instagram Graph API integration (Reels publishing)', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Facebook Graph API integration (Reels publishing)', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Template library with categorized video styles', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'AI voiceover generation (text-to-speech)', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800' },
      { item: 'Cross-platform scheduling engine', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800' },
      { item: 'Video preview and editing interface', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800' },
    ],
    blockers: [
      'AI video generation API selection (Runway, Pika, or custom)',
      'Platform API developer access (TikTok, YouTube, Instagram, Facebook)',
      'Cloud video storage and processing infrastructure',
      'User auth + usage metering per plan tier',
    ],
  },
  {
    product: 'Crypto Transaction Log',
    href: '/ventures/crypto-transaction-log',
    color: 'orange',
    currentState:
      'Marketing page live with freemium Stripe Checkout (Free + $9/mo). Interactive demo with CSV import simulation using mock data. No production data parsing or persistence.',
    phase2Items: [
      { item: 'Production CSV/XLS parser for major exchange formats', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'Persistent database for transaction storage', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'Multi-exchange format auto-detection', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Notes, custom tags, and advanced filtering', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Combined export reports (CSV, PDF)', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Cloud sync across devices', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800' },
      { item: 'Tax export wizard', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800' },
      { item: 'iOS and Android apps', priority: 'Low', priorityColor: 'bg-gray-100 text-gray-800' },
    ],
    blockers: [
      'Exchange format library (Coinbase, Binance, Kraken, etc.)',
      'Cloud database for transaction persistence',
      'User auth + freemium tier enforcement',
    ],
  },
  {
    product: 'PowerPMIS',
    href: '/ventures/powerpmis',
    color: 'amber',
    currentState:
      'Marketing page and interactive demo live. MVP pilot status — not yet accepting payments. Demo shows app-like workflow views for reality capture, quantity take-off, and cost allocation.',
    phase2Items: [
      { item: 'Reality capture to quantity take-off workflow', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'Rule-based WBS allocation with approval trails', priority: 'Critical', priorityColor: 'bg-red-100 text-red-800' },
      { item: 'Executive KPI dashboards (cost and schedule variance)', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Export-ready reporting for owners and stakeholders', priority: 'High', priorityColor: 'bg-orange-100 text-orange-800' },
      { item: 'Procore API integration', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800' },
      { item: 'Primavera P6 / MS Project data feeds', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800' },
    ],
    blockers: [
      'Pilot customer engagement for requirements validation',
      'Procore developer API access',
      'Cloud storage for project files and scan data',
      'User auth + role-based access control',
    ],
  },
];

export default function ProductionRoadmapPage() {
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
              Production Roadmap
              <span className="text-blue-600"> — From Marketing to Live Products</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Current state: all five products have marketing pages with Stripe Checkout deployed to
              production at pinehavenventures.io. No product has a functional backend — purchasing a
              subscription grants no access to any application. This document maps what needs to be
              built for each product to become operational.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                Stripe: Live
              </span>
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                Vercel: Deployed
              </span>
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                Auth: Not built
              </span>
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                Product backends: Not built
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Last updated: March 5, 2026
            </p>
          </section>

          {/* Current state summary */}
          <section className="mb-10 bg-gray-900 text-white rounded-2xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold mb-4">Where things stand today</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">What&apos;s working</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>- Marketing pages for all 5 products</li>
                  <li>- Stripe Checkout with live payment processing</li>
                  <li>- Stripe receipt emails (enabled via Dashboard)</li>
                  <li>- Promo code support on checkout</li>
                  <li>- Vercel production deployment (pinehavenventures.io)</li>
                  <li>- Crypto Transaction Log interactive demo (mock data)</li>
                  <li>- PowerPMIS interactive demo</li>
                  <li>- Email subscribe lead capture</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-3">What&apos;s not built</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>- User accounts and login (Supabase Auth not configured)</li>
                  <li>- Post-purchase access provisioning</li>
                  <li>- Product-specific emails (welcome, digests, alerts)</li>
                  <li>- Billing portal UI (API route exists, no frontend)</li>
                  <li>- Webhook fulfillment (logs only, no actions)</li>
                  <li>- Every product backend (data pipelines, AI engines, etc.)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Shared infrastructure */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Shared infrastructure (build first)
            </h2>
            <p className="text-gray-600 mb-4">
              These components are required by every product. Build them once before starting
              any individual product backend.
            </p>
            <div className="space-y-4">
              {sharedInfrastructure.map((item) => (
                <article key={item.name} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <span className={`inline-flex shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{item.description}</p>
                  {item.blockedBy.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Blocked by</p>
                      <ul className="space-y-1">
                        {item.blockedBy.map((blocker) => (
                          <li key={blocker} className="text-sm text-gray-600 flex gap-2">
                            <span className="text-red-500">-</span>
                            <span>{blocker}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Recommended build order */}
          <section className="mb-10 bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Recommended build order
            </h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">1.</span>
                <span><strong>Supabase Auth + user accounts</strong> — unlock every product. Configure Supabase project, add env vars to Vercel, build signup/login/protected routes.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">2.</span>
                <span><strong>Webhook fulfillment</strong> — connect Stripe checkout.session.completed to user account creation and subscription status tracking.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">3.</span>
                <span><strong>Billing portal UI</strong> — add account settings page where logged-in users can manage their subscription.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">4.</span>
                <span><strong>Crypto Transaction Log</strong> — closest to launchable. The demo already shows the workflow. Build production CSV parser, persistent storage, and export. Smallest gap to a real product.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">5.</span>
                <span><strong>Power Queue Tracker</strong> — highest revenue potential at scale. Requires ERCOT data pipeline and email digest system. Shares data infrastructure with Power Digital.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">6.</span>
                <span><strong>Power Digital Intelligence</strong> — premium product ($10K/yr). Builds on same ERCOT data pipeline as PQT. Add dashboard, reports, and enterprise features.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">7.</span>
                <span><strong>ReelPost.ai</strong> — largest technical scope. Requires AI video generation API, 4 platform API integrations, and cloud video infrastructure. Build after other products are generating revenue.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold shrink-0">8.</span>
                <span><strong>PowerPMIS</strong> — MVP pilot with longest sales cycle. Continue pilot customer conversations while building other products. Requires Procore API access and domain expertise validation.</span>
              </li>
            </ol>
          </section>

          {/* Per-product milestones */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Per-product roadmap
            </h2>
            <div className="space-y-6">
              {productMilestones.map((product) => (
                <article key={product.product} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      <Link href={product.href} className="text-blue-700 hover:text-blue-800">
                        {product.product}
                      </Link>
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-800 mb-1">Current state</p>
                    <p className="text-sm text-gray-700">{product.currentState}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">Phase 2 milestones</p>
                    <div className="space-y-2">
                      {product.phase2Items.map((item) => (
                        <div key={item.item} className="flex items-start gap-3">
                          <span className={`inline-flex shrink-0 px-2 py-0.5 rounded text-xs font-semibold mt-0.5 ${item.priorityColor}`}>
                            {item.priority}
                          </span>
                          <span className="text-sm text-gray-700">{item.item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">Blockers</p>
                    <ul className="space-y-1">
                      {product.blockers.map((blocker) => (
                        <li key={blocker} className="text-sm text-gray-600 flex gap-2">
                          <span className="text-red-500">-</span>
                          <span>{blocker}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              First priority: shared infrastructure
            </h2>
            <p className="text-blue-50 leading-relaxed mb-6">
              Every product is blocked by the same thing: no user accounts. Set up Supabase Auth,
              wire webhook fulfillment, and add a billing portal — then each product can be built
              independently on top of the shared foundation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/toolkit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                Back to Toolkit
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
