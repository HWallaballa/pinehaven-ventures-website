import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';

export const metadata: Metadata = {
  title: 'Toolkit | Pinehaven Ventures',
  description:
    'Reference documents, specs, and strategic plans for the Pinehaven Ventures dark factory operating model.',
};

type ToolkitItem = {
  title: string;
  href: string;
  description: string;
  tag: string;
  tagColor: string;
  updated: string;
};

const docsAndSpecs: ToolkitItem[] = [
  {
    title: 'Dark Factory Transition Plan',
    href: '/reference/dark-factory-transition-plan',
    description:
      '90-day operating plan to move Pinehaven Ventures toward a dark factory structure — includes revenue targets, sprint backlogs, and a live scorecard for all four ventures.',
    tag: 'Strategy',
    tagColor: 'bg-purple-100 text-purple-800',
    updated: 'February 20, 2026',
  },
  {
    title: 'Stripe Integration Spec',
    href: '/reference/stripe-integration-spec',
    description:
      'Dark factory agent spec for Stripe payment integration across all products. Covers checkout flows, webhook handling, billing portal, API routes, and per-product pricing configuration.',
    tag: 'Engineering Spec',
    tagColor: 'bg-blue-100 text-blue-800',
    updated: 'February 20, 2026',
  },
];

const productScopeItems: ToolkitItem[] = [
  {
    title: 'Power Digital Intelligence — Product Scope',
    href: '/reference/power-digital-scope',
    description:
      'Scope assessment for Power Digital Intelligence: website deliverables, $10K/yr Stripe checkout status, gap analysis for the full ERCOT data center market intelligence platform, and competitive landscape.',
    tag: 'Product Scope',
    tagColor: 'bg-green-100 text-green-800',
    updated: 'March 3, 2026',
  },
  {
    title: 'Power Queue Tracker — Product Scope',
    href: '/reference/power-queue-tracker-scope',
    description:
      'Scope assessment for Power Queue Tracker: website deliverables, 3-tier Stripe checkout, gap analysis for building the ERCOT queue monitoring platform, and competitive landscape.',
    tag: 'Product Scope',
    tagColor: 'bg-blue-100 text-blue-800',
    updated: 'March 3, 2026',
  },
  {
    title: 'AutoReels.ai — Product Scope',
    href: '/reference/autoreels-scope',
    description:
      'Scope assessment for AutoReels.ai: website deliverables, 3-tier Stripe checkout, gap analysis for the AI video generation and TikTok auto-posting platform, and competitive landscape.',
    tag: 'Product Scope',
    tagColor: 'bg-purple-100 text-purple-800',
    updated: 'March 3, 2026',
  },
  {
    title: 'Crypto Transaction Log — Product Scope',
    href: '/reference/crypto-transaction-log-scope',
    description:
      'Scope assessment for Crypto Transaction Log: website deliverables with interactive demo, freemium Stripe checkout, gap analysis for the multi-exchange transaction tracker, and competitive landscape.',
    tag: 'Product Scope',
    tagColor: 'bg-orange-100 text-orange-800',
    updated: 'March 3, 2026',
  },
  {
    title: 'PowerPMIS — Implementation Log + Product Scope',
    href: '/reference/powerpmis-mvp-implementation',
    description:
      'Complete delivery log for PowerPMIS website updates, including every implemented route and file path, plus scoped MVP/Phase-2/out-of-scope definitions and capability roadmap mapping (Togal.ai, Destini, ProjectManager, Procore).',
    tag: 'Delivery Log',
    tagColor: 'bg-emerald-100 text-emerald-800',
    updated: 'March 2, 2026',
  },
];

function ToolkitCard({ item }: { item: ToolkitItem }) {
  return (
    <Link
      href={item.href}
      className="block border border-gray-200 rounded-xl p-6 bg-white hover:border-blue-300 hover:shadow-sm transition-all group"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
          {item.title}
        </h3>
        <span
          className={`inline-flex shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${item.tagColor}`}
        >
          {item.tag}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-3">
        {item.description}
      </p>
      <p className="text-xs text-gray-400">
        Last updated: {item.updated}
      </p>
    </Link>
  );
}

export default function ToolkitPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <section className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Toolkit
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Reference documents, specs, and strategic plans that guide how
              Pinehaven Ventures operates. These are living documents — updated
              as the business evolves.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Latest addition: Product scope documents for all five ventures.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Strategy &amp; Engineering
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Foundational plans and technical specifications.
            </p>
            <div className="space-y-4">
              {docsAndSpecs.map((item) => (
                <ToolkitCard key={item.href} item={item} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Product Scope
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Current status, gap analysis, and roadmap for each venture product.
            </p>
            <div className="space-y-4">
              {productScopeItems.map((item) => (
                <ToolkitCard key={item.href} item={item} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
