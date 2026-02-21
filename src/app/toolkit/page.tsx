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

const items: ToolkitItem[] = [
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
          </section>

          <div className="space-y-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border border-gray-200 rounded-xl p-6 bg-white hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h2>
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
