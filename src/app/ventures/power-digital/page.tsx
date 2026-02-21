import Navigation from '../../components/Navigation';
import CheckoutButton from '../../components/CheckoutButton';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/stripe-products';

export default function PowerDigital() {
  const product = getProductBySlug('power-digital');
  const annualPlan = product?.plans[0];
  const features = [
    {
      title: 'Interconnection Queue Tracking',
      desc: 'Monitor every filing, status change, and MW position in the ERCOT interconnection queue. Filter by county, utility, fuel type, and capacity range.',
      items: [
        'Live queue position tracking with historical deltas',
        'New filing alerts delivered within hours',
        'MW-level detail on every interconnection request',
        'Filter by geography, fuel type, voltage, and status',
      ],
    },
    {
      title: 'Market Intelligence Reports',
      desc: 'Monthly and quarterly reports synthesizing queue trends, capacity pipelines, and market dynamics for data center-relevant regions.',
      items: [
        'Data center capacity pipeline analysis',
        'Regional supply/demand forecasting',
        'Competitive landscape mapping',
        'Capital expenditure trend tracking',
      ],
    },
    {
      title: 'Custom Alerts & Notifications',
      desc: 'Set up custom watchlists and get notified when queue positions change, new filings appear, or market conditions shift.',
      items: [
        'Watchlist by project, region, or developer',
        'Email and webhook notifications',
        'Threshold-based alerts (MW changes, status transitions)',
        'Weekly digest summaries for executive review',
      ],
    },
    {
      title: 'Data Exports & API Access',
      desc: 'Export any dataset to Excel, CSV, or connect directly via API for integration with your internal tools and models.',
      items: [
        'Full data export in CSV, Excel, and JSON',
        'REST API for programmatic access',
        'Historical data going back 5+ years',
        'Custom report builder for board-level presentations',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/ventures" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            &larr; Back to Products
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 mb-6">
            Power Digital <span className="text-green-600">Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Institutional-grade data center market intelligence. The single source of truth
            for interconnection queues, capacity pipelines, and energy market signals.
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              $10,000/year
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Live
            </span>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Built for Institutional Decision-Makers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Data Center Developers',
                desc: 'Find the best sites faster. Track queue positions and capacity availability before your competitors do.',
                icon: '🏗️',
              },
              {
                title: 'Institutional Investors',
                desc: 'Due diligence at scale. Understand power availability and risk for every data center deal in your pipeline.',
                icon: '📊',
              },
              {
                title: 'Utilities & ISOs',
                desc: 'Anticipate load growth. See which interconnection requests signal real demand versus speculative filings.',
                icon: '⚡',
              },
            ].map((persona) => (
              <div key={persona.title} className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">{persona.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{persona.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{persona.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Platform Features</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to make informed decisions about data center energy markets.
          </p>
          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-blue-600 font-medium mb-4 text-sm">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-10 border border-green-200">
            <p className="text-5xl font-bold text-gray-900 mb-2">$10,000</p>
            <p className="text-gray-600 mb-6">per year &middot; annual license</p>
            <ul className="text-left space-y-3 mb-8 max-w-md mx-auto">
              {[
                'Full platform access for your organization',
                'Unlimited users and API calls',
                'Historical data back to 2019',
                'Custom alerts and watchlists',
                'Monthly intelligence reports',
                'Dedicated account manager',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            {annualPlan && (
              <CheckoutButton
                priceId={annualPlan.priceId}
                mode="subscription"
                label="Subscribe — $10,000/year"
                className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
