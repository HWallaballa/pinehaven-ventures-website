import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function PowerPMIS() {
  const mvpModules = [
    {
      title: 'Capture-to-Model',
      description: 'Ingest LiDAR, photogrammetry, or drone scans and auto-align them to project control.',
      highlights: [
        'iOS/Android capture + file uploads (LAS/LAZ/OBJ)',
        'Geo-registration with control-point mapping',
        'Versioned scans with date-based comparisons'
      ]
    },
    {
      title: 'Quantities & Estimation',
      description: 'Generate quantities from scans and convert them into defensible cost estimates.',
      highlights: [
        'Automated take-offs (earthwork, slab, trench, façade)',
        'Editable cost libraries with regional factors',
        'Scenario modeling and export-ready summaries'
      ]
    },
    {
      title: 'WBS & Cost Allocation',
      description: 'Map quantities to WBS codes and split shared costs without spreadsheets.',
      highlights: [
        'Drag-and-drop WBS builder with templates',
        'Rule-based allocations by area, length, or percent',
        'Audit-ready change history'
      ]
    },
    {
      title: 'Executive Dashboards',
      description: 'Turn field reality into portfolio insights in one place.',
      highlights: [
        'Budget vs. EAC, earned value, and variance',
        'Scan recency & progress indicators',
        'Export to PowerBI or Excel'
      ]
    }
  ];

  const mvpOutcomes = [
    {
      title: 'Week 0-2: Onboard & Configure',
      items: [
        'Connect cost libraries, WBS templates, and project metadata',
        'Set up capture workflows and scan storage',
        'Define reporting formats and approval gates'
      ]
    },
    {
      title: 'Week 2-6: Capture & Quantify',
      items: [
        'Collect scans and auto-register them to control points',
        'Generate quantities with automated take-offs',
        'Validate quantities with field annotations'
      ]
    },
    {
      title: 'Week 6-10: Estimate & Report',
      items: [
        'Finalize estimates with scenario modeling',
        'Allocate costs by WBS and shared scopes',
        'Deliver executive dashboards and exports'
      ]
    }
  ];

  const mvpDeliverables = [
    'Capture, upload, and version scans across multiple sites',
    'Generate quantities and cost estimates in hours instead of days',
    'Map quantities to customer-specific WBS structures',
    'Produce audit-ready allocation and approval reports',
    'Share dashboards with executives and owners'
  ];

  const featureCategories = [
    {
      id: 'capture',
      title: '3D Capture & Reality Data',
      icon: '📷',
      status: 'MVP-ready',
      description: 'Reduces survey costs and keeps stakeholders visually aligned on site progress.',
      features: [
        'Multi-source scanning (LiDAR-equipped iOS/Android, photogrammetry, drone & terrestrial LiDAR imports)',
        'On-device meshing & compression (USDZ/glTF)',
        'Control-point mapping and geo-registration tools',
        'Versioned point-cloud management with scan comparisons',
        'Scan scheduler & recency alerts'
      ]
    },
    {
      id: 'estimation',
      title: 'Quantity Take-Off & Cost Estimation',
      icon: '📊',
      status: 'MVP-ready',
      description: 'Generates defensible estimates faster while keeping audit trails intact.',
      features: [
        'Automated geometry analyzers (earthwork, trench, slab, MEP penetrations, façade areas, structural steel)',
        'Customizable cost libraries (RSMeans import, regional factors, vendor quotes)',
        'Assembly builder for reusable recipe items (e.g., "24 in. duct bank")',
        'Scenario analysis & what-if mark-ups (inflation, risk allowances)',
        'Excel, CostX & PowerBI export adapters'
      ]
    },
    {
      id: 'allocation',
      title: 'Cost Allocation Engine',
      icon: '💰',
      status: 'MVP-ready',
      description: 'Handles complex campus developments without spreadsheet gymnastics.',
      features: [
        'Rule-based splits (percentage, area, linear feet, custom formulas)',
        'Multi-project shared-cost pools (e.g., common sitework for two data centers)',
        'Approval workflow & audit trail',
        'Predictive allocation suggestions via ML (planned)'
      ]
    },
    {
      id: 'wbs',
      title: 'Work Breakdown Structure (WBS) Management',
      icon: '🏗️',
      status: 'MVP-ready',
      description: 'Lets each customer keep their own coding standards while the system stays normalized.',
      features: [
        'Import parsers (Primavera XER, MS Project XML, Excel, JSON)',
        'Visual WBS editor with drag-&-drop hierarchy',
        'Template library spanning vertical build, heavy civil, industrial, interior fit-out, etc.',
        'Mapping wizard (external WBS ➝ internal cost codes / quantities)',
        'Saved mapping profiles per client & project type'
      ]
    },
    {
      id: 'integrations',
      title: 'Project-Management Integrations',
      icon: '🔗',
      status: 'Roadmap',
      description: 'Eliminates double-entry and keeps the field & office in lock-step.',
      features: [
        'One-way export to Procore (budgets, RFIs, docs) in early pilots',
        'Webhook events (estimate approved ➝ create budget revisions)',
        'Connectors marketplace (Primavera P6, Aconex, SAP, Owner ERPs)',
        'Deep links from line-items to 3D scan regions'
      ]
    },
    {
      id: 'portfolio',
      title: 'Portfolio & Reporting',
      icon: '📈',
      status: 'MVP-ready',
      description: 'Gives executives one glass pane for all builds, not 50 spreadsheets.',
      features: [
        'Portfolio dashboard (budget vs. EAC, earned value, scan status, safety metrics)',
        'Benchmarking & variance heat-maps across projects',
        'Capital-plan forecasting with cash-flow curves',
        'Custom report builder (drag-and-drop KPIs)'
      ]
    },
    {
      id: 'collaboration',
      title: 'Collaboration & Communication',
      icon: '👥',
      status: 'Roadmap',
      description: 'Keeps context, decisions and approvals in one place.',
      features: [
        'Role-based permissions down to cost-code level',
        'In-scan annotations & punch-list items',
        'Issue threads linked to quantities or WBS nodes',
        '@Mentions with email/Slack/Teams push',
        'E-signature & approval stamps (cost reviews, allocations)'
      ]
    },
    {
      id: 'offline',
      title: 'Offline & Edge Capability',
      icon: '📡',
      status: 'Roadmap',
      description: 'Critical for remote sites with spotty signal.',
      features: [
        'Offline scan capture, costing & WBS edit',
        'Delta sync when connectivity restores',
        'Field cache size management (auto-purge old scans)'
      ]
    },
    {
      id: 'ai',
      title: 'AI & Advanced Analytics',
      icon: '🤖',
      status: 'Exploration',
      description: 'Turns piles of data into next-step intelligence.',
      features: [
        'Object recognition (identify generators, trench boxes, rebar bundles)',
        'Productivity-rate prediction based on historical crew data',
        'Risk heat-map (flag cost lines likely to overrun)',
        'Natural-language search across scans, costs, RFIs'
      ]
    },
    {
      id: 'platform',
      title: 'Developer & Integration Platform',
      icon: '⚙️',
      status: 'Roadmap',
      description: 'Enables clients and third parties to build on top of the platform.',
      features: [
        'REST & GraphQL APIs (projects, scans, costs, WBS)',
        'Webhook subscriptions & event bus',
        'SDKs (JavaScript, Python, .NET)',
        'Sandbox environment & API analytics'
      ]
    },
    {
      id: 'security',
      title: 'Administration & Security',
      icon: '🔒',
      status: 'Roadmap',
      description: 'Meets enterprise IT and owner compliance checklists.',
      features: [
        'SSO/SAML, MFA, SCIM user-provisioning',
        'Granular RBAC & project isolation',
        'Data-residency controls (US/EU/GovCloud)',
        'Point-cloud encryption (AES-256) & KMS key-rotation',
        'Audit logs & SOC 2 report pack'
      ]
    },
    {
      id: 'performance',
      title: 'Performance & Scalability',
      icon: '⚡',
      status: 'Roadmap',
      description: 'Ensures the platform keeps pace as adoption grows.',
      features: [
        'Target upload performance tuned for large field scans',
        'Progressive rendering for large point clouds on tablets',
        'Scale targets for multi-project portfolios'
      ]
    },
    {
      id: 'support',
      title: 'Support & Success',
      icon: '🎯',
      status: 'MVP-ready',
      description: 'Drives user satisfaction and accelerates ROI.',
      features: [
        'In-app guided tours & tooltips',
        'Contextual help linked to knowledge base',
        'Ticketing portal with SLA dashboards',
        'Usage analytics & adoption scorecards'
      ]
    }
  ];

  const workflowSteps = [
    'Reality capture',
    'Quantities',
    'Costs & allocations',
    'WBS & schedules',
    'Project/portfolio dashboards',
    'Systems of record (Procore, ERP)',
    'Actionable insights & collaboration'
  ];

  const demoExperience = [
    {
      title: 'Field Capture to Quantities',
      description: 'Upload a fresh site scan and automatically generate measurable geometry for earthwork, trenching, and slab scopes.',
      outcomes: [
        'Detect progress variance between scan versions',
        'Auto-tag quantity deltas by scope package',
        'Push validated take-offs to estimator workspace'
      ]
    },
    {
      title: 'Estimate to WBS Allocation',
      description: 'Convert validated quantities into line-item estimates and map shared costs to customer-specific WBS structures.',
      outcomes: [
        'Apply rule-based cost split strategies',
        'Track approval ownership per budget revision',
        'Maintain a full audit trail for allocation changes'
      ]
    },
    {
      title: 'Executive Portfolio Review',
      description: 'Surface project-level variances, cash-flow outlook, and scan recency across the active portfolio in one dashboard.',
      outcomes: [
        'Flag at-risk scopes before overrun',
        'Compare project performance against benchmarks',
        'Export board-ready KPI packs to PowerBI or Excel'
      ]
    }
  ];

  const pilotKpis = [
    {
      label: 'Estimate Cycle Time',
      value: '50% Faster',
      detail: 'Reduce turnaround from field update to approved estimate package.'
    },
    {
      label: 'Quantity Confidence',
      value: '>98%',
      detail: 'Improve consistency between capture-derived and manual measurements.'
    },
    {
      label: 'Change Visibility',
      value: 'Near Real-Time',
      detail: 'Automatically flag high-impact scope movement within reporting windows.'
    },
    {
      label: 'Executive Reporting',
      value: '1 Platform',
      detail: 'Replace fragmented spreadsheets with a governed portfolio dashboard.'
    }
  ];

  const releaseScope = [
    {
      title: 'MVP (Current)',
      badge: 'In Delivery',
      badgeStyles: 'bg-blue-100 text-blue-800',
      items: [
        'Capture ingestion, geo-registration, and scan versioning',
        'Automated quantity take-offs for core civil/building scopes',
        'Estimate generation with editable cost libraries',
        'WBS mapping, allocation rules, and approval audit history',
        'Executive dashboard exports for pilot portfolios'
      ]
    },
    {
      title: 'Phase 2 (Roadmap)',
      badge: 'Planned',
      badgeStyles: 'bg-indigo-100 text-indigo-800',
      items: [
        'Expanded PM integrations (Procore, Primavera, SAP ecosystem)',
        'Offline/edge workflows for remote construction sites',
        'Advanced ML forecasting for overrun and schedule risks',
        'Developer APIs and event-driven extension marketplace'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Link href="/ventures" className="text-blue-600 hover:text-blue-700 font-medium">
                ← Back to Ventures
              </Link>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Power<span className="text-blue-600">PMIS</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              The complete Project Management Intelligence System that transforms construction workflows 
              from reality capture to actionable insights. One platform, unlimited possibilities.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              In Development
            </div>
          </div>
        </div>
      </section>

      {/* One-Stop Shop Flow */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Complete Construction Intelligence Workflow
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium text-sm">
                  {step}
                </div>
                {index < workflowSteps.length - 1 && (
                  <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MVP Focus */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              MVP Focus
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-4">
              Building the MVP Around What Owners Need Most
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The MVP centers on the workflows that create immediate ROI: capture, quantify, estimate, and report. 
              These modules deliver a complete loop from field reality to executive decisions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mvpModules.map((module) => (
              <div key={module.title} className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 mb-6">{module.description}</p>
                <ul className="space-y-3">
                  {module.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-gray-700">
                      <svg className="w-4 h-4 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MVP Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              MVP Delivery Roadmap
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A structured path from onboarding to repeatable project execution. Each milestone is built to validate 
              speed, accuracy, and adoption with pilot customers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {mvpOutcomes.map((outcome) => (
              <div key={outcome.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{outcome.title}</h3>
                <ul className="space-y-3 text-gray-600">
                  {outcome.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MVP Deliverables */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What the MVP Delivers on Day One
            </h2>
            <p className="text-gray-600 mb-6">
              PowerPMIS MVP is designed to be production-ready for pilot projects with clear, measurable outcomes.
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
              {mvpDeliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Demo Experience */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              PowerPMIS Demo Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The MVP demo follows a practical owner workflow from field reality through budget decisions,
              using the same structure as the CryptoTransactionLog demo format.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {demoExperience.map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {item.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot KPIs and Release Scope */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Pilot KPI Targets
              </h2>
              <p className="text-gray-600 mb-6">
                These metrics define what MVP success looks like for owners and project controls teams.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {pilotKpis.map((metric) => (
                  <div key={metric.label} className="border border-gray-200 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2 mb-1">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                First Release Scope
              </h2>
              <p className="text-gray-600 mb-6">
                Scope boundaries keep delivery realistic while proving measurable ROI during pilots.
              </p>
              <div className="space-y-6">
                {releaseScope.map((phase) => (
                  <div key={phase.title} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{phase.title}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${phase.badgeStyles}`}>
                        {phase.badge}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Full Platform Vision
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Once the MVP proves ROI, PowerPMIS expands into a full enterprise platform covering every 
              stage of construction intelligence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featureCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-3xl">{category.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {category.title}
                      </h3>
                      <span className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                        {category.status}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-4">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {category.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why PowerPMIS Changes Everything
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cost Reduction</h3>
              <p className="text-gray-600">
                Eliminate redundant surveys, reduce estimate time from days to minutes, 
                and avoid costly change orders through better planning.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accuracy & Control</h3>
              <p className="text-gray-600">
                Defensible estimates, automated quantity take-offs, and real-time progress tracking 
                eliminate guesswork from project management.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Speed & Efficiency</h3>
              <p className="text-gray-600">
                From reality capture to executive reporting in one seamless workflow. 
                No more data silos or manual re-entry.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Construction Operations?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              PowerPMIS represents the future of construction project management. 
              Be among the first to experience the complete solution.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Request Early Access
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
