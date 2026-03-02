import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'PowerPMIS MVP Implementation Log + Product Scope | Pinehaven Ventures',
  description:
    'Complete implementation log for PowerPMIS updates delivered to the Pinehaven Ventures website, including route-level changes, feature roadmap, and scoped MVP definition.',
};

type RouteDeliverable = {
  route: string;
  purpose: string;
  status: string;
};

type ChangeItem = {
  date: string;
  title: string;
  details: string[];
  files: string[];
};

type ScopeBlock = {
  title: string;
  items: string[];
};

type CapabilityTrack = {
  benchmark: string;
  now: string[];
  next: string[];
  status: string;
  statusColor: string;
};

const routeDeliverables: RouteDeliverable[] = [
  {
    route: '/ventures/powerpmis',
    purpose: 'PowerPMIS product page with MVP workflow, deliverables, KPIs, roadmap, and dependencies.',
    status: 'Live on main',
  },
  {
    route: '/ventures/powerpmis/demo',
    purpose: 'Interactive MVP demo view with phase workflow, project scenarios, exceptions, and KPI snapshots.',
    status: 'Live on main',
  },
  {
    route: '/ventures',
    purpose: 'PowerPMIS card and venture listing entry added to product portfolio.',
    status: 'Live on main',
  },
  {
    route: '/',
    purpose: 'Homepage product portfolio now includes PowerPMIS as MVP pilot offering.',
    status: 'Live on main',
  },
  {
    route: '/toolkit',
    purpose: 'Toolkit now includes this implementation and scope reference.',
    status: 'Live on main',
  },
];

const implementationLog: ChangeItem[] = [
  {
    date: 'March 2, 2026',
    title: 'PowerPMIS MVP pages and route architecture delivered',
    details: [
      'Built a dedicated PowerPMIS product page in current production route structure.',
      'Built a dedicated PowerPMIS demo route with app-like workflow view.',
      'Added PowerPMIS to both homepage portfolio and ventures listing.',
      'Validated route generation and static build before deployment.',
    ],
    files: [
      'src/app/page.tsx',
      'src/app/ventures/page.tsx',
      'src/app/ventures/powerpmis/page.tsx',
      'src/app/ventures/powerpmis/demo/page.tsx',
      'src/app/ventures/powerpmis/demo/_components/PowerPMISDemo.tsx',
    ],
  },
  {
    date: 'March 2, 2026',
    title: 'Capability roadmap expanded for Togal.ai, Destini, ProjectManager, and Procore-style coverage',
    details: [
      'Added explicit capability-roadmap mapping with MVP and next-phase breakdown.',
      'Added integration dependency list for enterprise rollout readiness.',
      'Added capability-coverage tracks directly inside demo for visibility.',
    ],
    files: [
      'src/app/ventures/powerpmis/page.tsx',
      'src/app/ventures/powerpmis/demo/_components/PowerPMISDemo.tsx',
      'README.md',
    ],
  },
];

const scopeDefinition: ScopeBlock[] = [
  {
    title: 'MVP scope (current delivery focus)',
    items: [
      'Reality capture to quantity workflow support (scan ingestion, version deltas, extraction support).',
      'Estimate and WBS allocation workflows with approval traceability.',
      'Phase-based project-control workflow views for owners and PMO users.',
      'Executive KPI snapshots for budget, EAC, variance, and completion tracking.',
      'Exceptions queue for high/medium/low risk triage with ownership.',
      'Export-compatible outputs for executive and governance reporting.',
    ],
  },
  {
    title: 'Phase 2 scope (next implementation wave)',
    items: [
      'Deeper takeoff automation via AI segmentation and smart scope tagging.',
      'Probabilistic estimating and risk-band scenario forecasting.',
      'Resource/capacity controls and critical path risk visualization.',
      'API-based field-office synchronization (Procore-aligned workflows).',
      'Deeper links between scan evidence, issues, and budget line items.',
    ],
  },
  {
    title: 'Out of scope (for current website MVP release)',
    items: [
      'Production-grade authenticated user management for PowerPMIS web app users.',
      'Live transactional integrations into customer PM systems without project credentials.',
      'Full ERP financial posting and invoice automation.',
      'Native mobile application release and offline synchronization engine.',
    ],
  },
];

const capabilityTracks: CapabilityTrack[] = [
  {
    benchmark: 'Togal.ai-like takeoff workflows',
    now: [
      'Capture-driven quantity workflows and delta analysis',
      'Assembly-oriented quantity/estimate preparation',
    ],
    next: [
      'AI object recognition for faster takeoff classification',
      'Historical assembly recommendations by project archetype',
    ],
    status: 'MVP active',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    benchmark: 'Destini-style estimating',
    now: [
      'Scenario-based estimate snapshots',
      'Estimate revisions tied to quantity and allocation changes',
    ],
    next: [
      'Risk-envelope forecasting and confidence bands',
      'Portfolio benchmarking against historical cost outcomes',
    ],
    status: 'MVP active',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    benchmark: 'ProjectManager-style execution',
    now: [
      'Phase-based workflow and owner accountability',
      'Status and completion tracking by project phase',
    ],
    next: [
      'Resource leveling and workload views',
      'Critical-path based risk surfacing',
    ],
    status: 'In implementation',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    benchmark: 'Procore-aligned coordination',
    now: [
      'Exceptions, approvals, and audit log patterns for field-office operations',
      'Export-ready packets for owner and PM workflows',
    ],
    next: [
      'API sync for RFIs, budgets, and document references',
      'Cross-linking scan regions to cost lines and field issues',
    ],
    status: 'Integration roadmap',
    statusColor: 'bg-blue-100 text-blue-800',
  },
];

const dependencies = [
  'Procore API credentials and project-level access scopes',
  'Primavera P6 or MS Project data feeds for WBS/schedule alignment',
  'Cloud object storage for reality-capture files and version history',
  'PowerBI or Excel-based executive reporting channels',
];

export default function PowerPMISImplementationPage() {
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
              PowerPMIS Implementation Log
              <span className="text-blue-600"> + Product Scope</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This document records the PowerPMIS website and demo delivery work completed so far,
              and defines the current product scope (MVP, phase 2, and out-of-scope boundaries).
            </p>
            <p className="text-sm text-gray-500">
              Last updated: March 2, 2026. This is the operational reference for PowerPMIS web delivery status.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Route-level deliverables</h2>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Implementation log</h2>
            <div className="space-y-5">
              {implementationLog.map((entry) => (
                <article key={entry.title} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{entry.title}</h3>
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {entry.date}
                    </span>
                  </div>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    {entry.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="text-blue-600">-</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">File paths updated</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.files.map((file) => (
                        <code
                          key={file}
                          className="inline-flex px-2.5 py-1 rounded-lg text-xs bg-gray-100 text-gray-700"
                        >
                          {file}
                        </code>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">PowerPMIS product scope</h2>
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
              Capability roadmap vs comparable platforms
            </h2>
            <div className="grid lg:grid-cols-2 gap-4">
              {capabilityTracks.map((track) => (
                <article key={track.benchmark} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{track.benchmark}</h3>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${track.statusColor}`}>
                      {track.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-800 mb-1">Now</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {track.now.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-green-600">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">Next</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {track.next.map((item) => (
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">External dependencies</h2>
            <p className="text-gray-700 mb-4">
              The following external systems are required to fully execute enterprise-level rollout:
            </p>
            <ul className="space-y-2 text-gray-700">
              {dependencies.map((dependency) => (
                <li key={dependency} className="flex gap-2">
                  <span className="text-blue-600">-</span>
                  <span>{dependency}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-blue-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Related pages</h2>
            <p className="text-blue-50 leading-relaxed mb-6">
              Use these routes to review current product presentation and demo execution flow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/ventures/powerpmis"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                View PowerPMIS Product Page
              </Link>
              <Link
                href="/ventures/powerpmis/demo"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-blue-200 text-white font-semibold hover:bg-blue-500 transition-colors"
              >
                Open PowerPMIS Demo
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
