import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function PowerPMIS() {
  const featureCategories = [
    {
      id: 'capture',
      title: '3D Capture & Reality Data',
      icon: '📷',
      description: 'Reduces survey costs, keeps stakeholders visually aligned on site progress.',
      features: [
        'Multi-source scanning (LiDAR-equipped iOS/Android, photogrammetry, drone & terrestrial LiDAR imports)',
        'On-device meshing & compression (USDZ/glTF)',
        'Automatic control-point detection & geo-registration',
        'Versioned point-cloud management with differencing ("show me cut/fill delta vs. last week")',
        'Scan scheduler & recency alerts'
      ]
    },
    {
      id: 'estimation',
      title: 'Quantity Take-Off & Cost Estimation',
      icon: '📊',
      description: 'Generates defensible estimates in minutes, not days.',
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
      description: 'Handles complex campus developments without spreadsheet gymnastics.',
      features: [
        'Rule-based splits (percentage, area, linear feet, custom formulas)',
        'Multi-project shared-cost pools (e.g., common sitework for two data centers)',
        'Approval workflow & audit trail',
        'Predictive allocation suggestions via ML (Phase 2)'
      ]
    },
    {
      id: 'wbs',
      title: 'Work Breakdown Structure (WBS) Management',
      icon: '🏗️',
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
      description: 'Eliminates double-entry and keeps the field & office in lock-step.',
      features: [
        'One-way & two-way sync with Procore (Budgets, Drawings, RFIs, Observations, Docs)',
        'Webhook events (estimate approved ➝ create budget revisions)',
        'Connectors marketplace (Primavera P6, Aconex, SAP, Owner ERPs)',
        'Deep links—click from Procore line-item to open exact 3D scan region'
      ]
    },
    {
      id: 'portfolio',
      title: 'Portfolio & Reporting',
      icon: '📈',
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
      description: 'Ensures the platform doesn\'t choke when adoption spikes.',
      features: [
        '1 GB upload < 3 min on 5G',
        'Render 50M points at 30 fps on iPad Pro',
        'Horizontal scale to 200 active projects & 10 TB of scans Year 1'
      ]
    },
    {
      id: 'support',
      title: 'Support & Success',
      icon: '🎯',
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

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Feature Set
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every feature a power-user could ask for. Built for enterprises that demand 
              complete visibility and control over their construction operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featureCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-3xl">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.title}
                    </h3>
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
