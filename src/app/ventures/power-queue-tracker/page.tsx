import Navigation from '../../components/Navigation';
import CheckoutButton from '../../components/CheckoutButton';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/stripe-products';

export default function PowerQueueTracker() {
  const product = getProductBySlug('power-queue-tracker');

  const plans = [
    {
      name: 'Solo',
      price: 49,
      priceId: product?.plans.find((p) => p.id === 'pqt-solo')?.priceId || '',
      desc: 'For individual consultants and analysts',
      features: [
        '1 user seat',
        'Daily ERCOT queue digest emails',
        'Full queue search and filters',
        'CSV data export',
        'Email support',
      ],
    },
    {
      name: 'Team',
      price: 99,
      popular: true,
      priceId: product?.plans.find((p) => p.id === 'pqt-team')?.priceId || '',
      desc: 'For development teams and small firms',
      features: [
        'Up to 5 user seats',
        'Daily + weekly digest emails',
        'Custom watchlists with alerts',
        'Priority data refresh',
        'Excel and CSV exports',
        'Priority support',
      ],
    },
    {
      name: 'Enterprise',
      price: 149,
      priceId: product?.plans.find((p) => p.id === 'pqt-enterprise')?.priceId || '',
      desc: 'For organizations needing full coverage',
      features: [
        'Unlimited user seats',
        'Real-time queue change alerts',
        'API access for integrations',
        'Custom report builder',
        'Historical data archive',
        'Dedicated account manager',
        'SLA guarantee',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-sky-100">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/ventures" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            &larr; Back to Products
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 mb-6">
            Power Queue <span className="text-blue-600">Tracker</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Never miss a critical ERCOT interconnection queue change.
            Automated monitoring, email digests, and real-time alerts
            for data center site selection professionals.
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              From $49/month
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Live
            </span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'We Fetch', desc: 'Automated data pipeline pulls the latest ERCOT interconnection queue data daily.' },
              { step: '2', title: 'We Parse', desc: 'Raw filings are parsed, normalized, and enriched with historical context.' },
              { step: '3', title: 'We Alert', desc: 'Automated digests highlight new filings, status changes, and queue movements.' },
              { step: '4', title: 'You Act', desc: 'Use actionable insights to make faster, better-informed site selection decisions.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Key Features</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Purpose-built tools for tracking ERCOT power interconnection queues.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Automated Email Digests',
                desc: 'Receive daily or weekly summaries of all queue changes, new filings, and status updates — straight to your inbox.',
                icon: '📧',
              },
              {
                title: 'Smart Search & Filters',
                desc: 'Find exactly what you need. Filter by county, utility, fuel type, MW range, filing date, and queue status.',
                icon: '🔍',
              },
              {
                title: 'Watchlists & Alerts',
                desc: 'Track specific projects or regions. Get instant notifications when anything in your watchlist changes.',
                icon: '🔔',
              },
              {
                title: 'Data Export & API',
                desc: 'Export any view to CSV or Excel. Enterprise plans get full API access for integrating with your internal tools.',
                icon: '📊',
              },
              {
                title: 'Historical Tracking',
                desc: 'See how queue positions have evolved over time. Identify patterns and predict bottlenecks before they happen.',
                icon: '📈',
              },
              {
                title: 'Team Collaboration',
                desc: 'Share watchlists, annotate filings, and keep your entire team aligned on the same queue data.',
                icon: '👥',
              },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Pricing</h2>
          <p className="text-gray-600 text-center mb-12">
            Choose the plan that fits your team.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-8 border ${
                  plan.popular
                    ? 'border-blue-500 bg-blue-50/50 relative'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <CheckoutButton
                  priceId={plan.priceId}
                  mode="subscription"
                  label="Get Started"
                  className={`block text-center w-full rounded-lg py-3 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                />
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
