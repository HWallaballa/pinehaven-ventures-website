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
    title: 'Production Roadmap',
    href: '/reference/production-roadmap',
    description:
      'Unified roadmap for moving all five products from marketing sites to live SaaS platforms. Covers shared infrastructure (auth, webhooks, billing portal), recommended build order, per-product Phase 2 milestones, and current blockers.',
    tag: 'Roadmap',
    tagColor: 'bg-red-100 text-red-800',
    updated: 'March 5, 2026',
  },
  {
    title: 'Dark Factory Transition Plan',
    href: '/reference/dark-factory-transition-plan',
    description:
      '90-day operating plan to move Pinehaven Ventures toward a dark factory structure — leveraging an engineering background to automate AI workflows, not vibe code. Includes sprint backlogs, an operating scorecard, and the path to profitability for all four ventures.',
    tag: 'Strategy',
    tagColor: 'bg-purple-100 text-purple-800',
    updated: 'March 3, 2026',
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

const referenceItems: ToolkitItem[] = [
  {
    title: 'Architecture & Tech Stack',
    href: '/reference/architecture-tech-stack',
    description:
      'Technical architecture reference — Next.js 16, React 19, Tailwind v4, Stripe SDK, Vercel deployment pipeline, manifest-driven code generation, file map, component inventory, API routes, and environment variables.',
    tag: 'Engineering Reference',
    tagColor: 'bg-cyan-100 text-cyan-800',
    updated: 'March 3, 2026',
  },
  {
    title: 'Product Portfolio & Pricing Matrix',
    href: '/reference/product-portfolio-pricing',
    description:
      'Consolidated business reference for all five ventures — product details, complete pricing matrix across every plan, growth motions with leading indicators, and Stripe configuration mapping.',
    tag: 'Business Reference',
    tagColor: 'bg-orange-100 text-orange-800',
    updated: 'March 3, 2026',
  },
  {
    title: 'Development & Operations Runbook',
    href: '/reference/development-operations-runbook',
    description:
      'Step-by-step procedures for operating the platform — adding new ventures end-to-end, running generators, seeding Stripe, deploying to Vercel, webhook configuration, and troubleshooting common issues.',
    tag: 'Operations Guide',
    tagColor: 'bg-green-100 text-green-800',
    updated: 'March 3, 2026',
  },
  {
    title: 'Site Map & Route Reference',
    href: '/reference/site-map-routes',
    description:
      'Complete inventory of every page, API endpoint, demo, and shared component on the site — with purpose descriptions, category tags, and a component dependency map.',
    tag: 'Navigation Reference',
    tagColor: 'bg-indigo-100 text-indigo-800',
    updated: 'March 3, 2026',
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
    title: 'ReelPost.ai — Product Scope',
    href: '/reference/reelpost-scope',
    description:
      'Scope assessment for ReelPost.ai: website deliverables, 3-tier Stripe checkout, gap analysis for the AI video generation and multi-platform auto-posting platform, and competitive landscape.',
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
              Latest additions: Product scope documents for all five ventures, plus architecture, portfolio, runbook, and site map references.
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

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Reference Docs
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Architecture, operations, and site inventory references.
            </p>
            <div className="space-y-4">
              {referenceItems.map((item) => (
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
