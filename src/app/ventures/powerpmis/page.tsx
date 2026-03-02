import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function PowerPMIS() {
  const mvpModules = [
    {
      title: 'Capture to Model',
      desc: 'Ingest LiDAR, drone, and field captures, then align to project control points for consistent progress tracking.',
      icon: 'CAP',
    },
    {
      title: 'Quantities + Estimation',
      desc: 'Turn captured geometry into repeatable quantity take-offs and estimate packages with defensible audit history.',
      icon: 'QTY',
    },
    {
      title: 'WBS Cost Allocation',
      desc: 'Allocate direct and shared costs across project WBS structures without spreadsheet-heavy workflows.',
      icon: 'WBS',
    },
    {
      title: 'Executive Reporting',
      desc: 'Publish portfolio dashboards for budget vs EAC, variance hotspots, and scan recency from one platform.',
      icon: 'KPI',
    },
  ];

  const pilotDeliverables = [
    'Reality capture upload + geo-registration workflow',
    'Automated quantity extraction for core civil scopes',
    'Rule-based WBS allocation with approval tracking',
    'Pilot KPI dashboard with variance and recency metrics',
    'PowerBI/Excel export for executive reporting packs',
  ];

  const pilotKpis = [
    { label: 'Estimate Cycle Time', value: '-50%', detail: 'From field update to estimate package approval.' },
    { label: 'Quantity Confidence', value: '>98%', detail: 'Alignment between field and office calculations.' },
    { label: 'Allocation Traceability', value: '100%', detail: 'Every shared-cost split has approval lineage.' },
    { label: 'Reporting Latency', value: '< 24h', detail: 'Executive dashboards refreshed same-day.' },
  ];

  const capabilityRoadmap = [
    {
      id: 'togal',
      platform: 'Togal.ai-like capability set',
      focus: 'Automated takeoff and quantity intelligence',
      mvp: [
        'Capture-driven quantity extraction for core scopes',
        'Template-based assemblies for repeatable takeoff packages',
        'Delta takeoff between scan versions',
      ],
      nextPhase: [
        'AI-assisted object segmentation for faster scope tagging',
        'Recommended assemblies from historical projects',
      ],
      status: 'MVP active',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 'destini',
      platform: 'Destini-style estimating coverage',
      focus: 'Scenario-based estimating and budget control',
      mvp: [
        'Cost library driven estimates linked to quantities',
        'Versioned estimate snapshots with approval history',
        'What-if comparisons on labor, material, and risk allowances',
      ],
      nextPhase: [
        'Probabilistic forecast bands and risk envelopes',
        'Cross-project benchmark pricing recommendations',
      ],
      status: 'MVP active',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 'projectmanager',
      platform: 'ProjectManager-style delivery controls',
      focus: 'Task execution, schedule visibility, and team accountability',
      mvp: [
        'Phase-based workflow boards for capture, quantities, and allocation',
        'Owner assignment and status tracking for each control step',
        'Executive milestone summaries tied to project progress',
      ],
      nextPhase: [
        'Resource loading and critical path indicators',
        'Team workload balancing and capacity alerts',
      ],
      status: 'In implementation',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 'procore',
      platform: 'Procore-aligned field + office workflow',
      focus: 'Field coordination, documentation, and system integrations',
      mvp: [
        'Exceptions queue with owner assignment and severity',
        'Audit-ready change history for cost allocation updates',
        'Export packages compatible with owner and PM workflows',
      ],
      nextPhase: [
        'API sync for RFIs, budget revisions, and submittal context',
        'Deep links from cost lines to scan locations and field issues',
      ],
      status: 'Integration roadmap',
      statusColor: 'bg-blue-100 text-blue-800',
    },
  ];

  const integrationDependencies = [
    {
      name: 'Procore API',
      requirement: 'Client ID/secret and project-level scopes for budgets, RFIs, and documents',
    },
    {
      name: 'Scheduling systems',
      requirement: 'Primavera P6 or MS Project export feeds for WBS/schedule alignment',
    },
    {
      name: 'Reality data storage',
      requirement: 'Cloud object storage for LiDAR/drone files and version history',
    },
    {
      name: 'BI/reporting',
      requirement: 'PowerBI or Excel output channels for executive packs and governance reports',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/ventures" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            &larr; Back to Products
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 mb-6">
            Power<span className="text-blue-600">PMIS</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Project Management Intelligence System for owners, EPC firms, and field teams.
            PowerPMIS connects capture, quantification, allocation, and reporting into one pilot-ready workflow.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
              MVP Pilot
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              In Development
            </span>
          </div>
          <Link
            href="/ventures/powerpmis/demo"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
          >
            Try MVP Demo
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>
      </section>

      {/* MVP Flow */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            MVP Workflow: From Field Reality to Executive Action
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mvpModules.map((module) => (
              <div key={module.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-3xl mb-3">{module.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Day-One Pilot Deliverables
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">
            The first release focuses on measurable workflows that improve speed, confidence, and executive visibility.
          </p>
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <ul className="grid md:grid-cols-2 gap-4">
              {pilotDeliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Pilot KPI Targets</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Success criteria for the MVP pilot phase across controls, operations, and reporting.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pilotKpis.map((kpi) => (
              <div key={kpi.label} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2 mb-2">{kpi.value}</p>
                <p className="text-sm text-gray-600">{kpi.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Coverage */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Capability Roadmap Against Leading Platforms
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-4xl mx-auto">
            PowerPMIS is being built to cover critical workflows teams expect from modern takeoff, estimating,
            project-control, and field-management products. The roadmap below shows what is included in MVP
            versus planned next-phase expansion.
          </p>
          <div className="grid lg:grid-cols-2 gap-6">
            {capabilityRoadmap.map((track) => (
              <div key={track.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{track.platform}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${track.statusColor}`}>
                    {track.status}
                  </span>
                </div>
                <p className="text-sm text-blue-700 font-medium mb-4">{track.focus}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">MVP coverage</p>
                    <ul className="space-y-2">
                      {track.mvp.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-green-500"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Next phase</p>
                    <ul className="space-y-2">
                      {track.nextPhase.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Dependencies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            External Integration Dependencies
          </h2>
          <p className="text-gray-600 text-center mb-8">
            To fully activate Procore-like and enterprise PM workflows, these external systems and credentials are required.
          </p>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <ul className="space-y-4">
              {integrationDependencies.map((dependency) => (
                <li key={dependency.name} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold text-gray-900">{dependency.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{dependency.requirement}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to Validate PowerPMIS with Your Team?
          </h2>
          <p className="text-gray-600 mb-8">
            Run the demo flow, review pilot KPIs, and map your existing WBS structure into the MVP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ventures/powerpmis/demo"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Try the Demo
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Contact Us
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
