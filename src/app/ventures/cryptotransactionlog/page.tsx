import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function CryptoTransactionLog() {
  const mvpPillars = [
    {
      title: 'Unified Transaction Capture',
      description: 'Aggregate on-chain wallets and exchange accounts into a single normalized ledger.',
      highlights: [
        'CSV, API, and wallet-address imports',
        'Auto-detection of transfers, swaps, fees, and staking rewards',
        'Deduplication engine with immutable source history'
      ]
    },
    {
      title: 'Portfolio Reconciliation',
      description: 'Continuously reconcile balances against blockchain and exchange positions.',
      highlights: [
        'Daily position snapshots with variance alerts',
        'Cross-chain and exchange transfer matching',
        'Missing-cost-basis and orphan transaction detection'
      ]
    },
    {
      title: 'Audit-Grade Reporting',
      description: 'Generate defensible records for finance, compliance, and investor reporting.',
      highlights: [
        'Realized/unrealized P&L by asset, wallet, and period',
        'Tax lot accounting (FIFO/LIFO/Specific ID)',
        'Export-ready audit packets with full event lineage'
      ]
    },
    {
      title: 'Operational Controls',
      description: 'Protect sensitive data and enforce clear approval ownership.',
      highlights: [
        'Role-based approval workflow for record changes',
        'Change logs with before/after value tracking',
        'SOC-style controls for access, retention, and exports'
      ]
    }
  ];

  const demoFlow = [
    'Connect wallets and exchange accounts',
    'Normalize all transactions into one ledger',
    'Reconcile balances against on-chain states',
    'Review flagged exceptions and approvals',
    'Publish P&L, tax, and compliance exports'
  ];

  const pilotMetrics = [
    {
      label: 'Reconciliation Time',
      value: '70% Faster',
      detail: 'Compared to spreadsheet-driven monthly close.'
    },
    {
      label: 'Ledger Accuracy',
      value: '>99.5%',
      detail: 'Validated against chain and exchange balances.'
    },
    {
      label: 'Audit Traceability',
      value: '100%',
      detail: 'Every adjustment linked to source evidence.'
    },
    {
      label: 'Close Readiness',
      value: 'Same Day',
      detail: 'Automated exception queues reduce delay risk.'
    }
  ];

  const complianceControls = [
    'Immutable event history for every imported transaction',
    'Approval gates for manual overrides and categorization changes',
    'Field-level access controls for finance vs operations users',
    'Export logs covering file type, owner, and download timestamp',
    'Retention policies aligned to audit and tax requirements',
    'API key rotation and encrypted credential storage'
  ];

  const releasePlan = [
    {
      title: 'MVP (Current)',
      badge: 'Beta',
      badgeStyles: 'bg-emerald-100 text-emerald-800',
      items: [
        'Wallet + exchange ingestion',
        'Normalization and reconciliation queue',
        'P&L and tax-lot export templates',
        'Role-based approvals and audit logs'
      ]
    },
    {
      title: 'Phase 2 (Roadmap)',
      badge: 'Planned',
      badgeStyles: 'bg-blue-100 text-blue-800',
      items: [
        'Real-time anomaly scoring with threshold policies',
        'Automated filing bundles for jurisdiction profiles',
        'Multi-entity consolidation and inter-company views',
        'Expanded ERP and treasury integrations'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Link href="/ventures" className="text-emerald-700 hover:text-emerald-800 font-medium">
                ← Back to Ventures
              </Link>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Crypto<span className="text-emerald-700">TransactionLog</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              A secure transaction intelligence layer for digital-asset operations. CryptoTransactionLog
              unifies fragmented records, accelerates reconciliation, and produces compliance-ready output.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              Demo Experience
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Demo Workflow
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {demoFlow.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-medium text-sm">
                  {step}
                </div>
                {index < demoFlow.length - 1 && (
                  <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
              MVP Scope
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-4">
              What the CryptoTransactionLog MVP Covers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The initial release focuses on finance-critical workflows that reduce close risk,
              improve traceability, and shorten monthly reporting cycles.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mvpPillars.map((pillar) => (
              <div key={pillar.title} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-gray-600 mb-6">{pillar.description}</p>
                <ul className="space-y-3">
                  {pillar.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-gray-700">
                      <svg className="w-4 h-4 text-emerald-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
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

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pilot KPI Targets
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These targets define MVP success criteria for finance and compliance stakeholders.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pilotMetrics.map((metric) => (
              <div key={metric.label} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2 mb-2">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Security and Compliance Controls
              </h2>
              <p className="text-gray-600 mb-6">
                The demo highlights controls expected by finance leaders, auditors, and regulated operators.
              </p>
              <ul className="space-y-3">
                {complianceControls.map((control) => (
                  <li key={control} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{control}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Release Scope
              </h2>
              <p className="text-gray-600 mb-6">
                Clear release boundaries keep stakeholders aligned while accelerating delivery.
              </p>
              <div className="space-y-6">
                {releasePlan.map((phase) => (
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
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500"></span>
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

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want a Live Walkthrough?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We can run a tailored demo using your sample wallet and exchange exports to validate MVP fit.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center px-8 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Request Demo Session
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
