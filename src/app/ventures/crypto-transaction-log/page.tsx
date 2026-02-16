import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function CryptoTransactionLog() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      desc: 'For casual crypto investors',
      features: [
        'Basic exchange support',
        'CSV/XLS file import',
        'Transaction search & sort',
        'Single exchange tracking',
        'Community support',
      ],
    },
    {
      name: 'Premium',
      price: 9,
      popular: true,
      desc: 'For active traders and multi-exchange users',
      features: [
        'All free features',
        'Unlimited exchange support',
        'Multi-exchange combined exports',
        'Advanced filters & tags',
        'Cloud sync across devices',
        'Priority support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/ventures" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            &larr; Back to Products
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 mb-6">
            Crypto Transaction <span className="text-orange-600">Log</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload CSV and XLS files from any exchange, track, analyze, search, sort, and export your
            crypto transactions — all in one place. Available on iOS, Android, and web.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
              Free / Premium
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Live
            </span>
          </div>
          <Link
            href="/ventures/crypto-transaction-log/demo"
            className="inline-flex items-center px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/25"
          >
            Try Interactive Demo
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            From Exchange Files to Unified Log in 3 Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Your Files',
                desc: 'Import CSV or XLS transaction files from any crypto exchange. We automatically detect and parse the format.',
              },
              {
                step: '2',
                title: 'Review & Organize',
                desc: 'All your transactions are merged into a single log. Add notes, tags, and filter by exchange, date, or transaction type.',
              },
              {
                step: '3',
                title: 'Analyze & Export',
                desc: 'Search and sort your complete transaction history. Export combined reports for tax preparation or portfolio analysis.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Everything You Need to Track Your Crypto
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            A complete toolkit for importing, managing, and exporting crypto transactions across every exchange.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'CSV & XLS Import',
                desc: 'Upload transaction files from any exchange. Our parser automatically detects formats and converts them into your log.',
                icon: '📄',
              },
              {
                title: 'Multi-Exchange Support',
                desc: 'Track transactions across Coinbase, Binance, Kraken, and any other exchange — all in one unified view.',
                icon: '🔗',
              },
              {
                title: 'Smart Filters',
                desc: 'Filter by exchange, date range, transaction type (buy, sell, deposit, withdraw), and custom tags.',
                icon: '🔍',
              },
              {
                title: 'Notes & Tags',
                desc: 'Add notes and tags to any transaction for better organization and easier lookup when you need it.',
                icon: '🏷️',
              },
              {
                title: 'Combined Export',
                desc: 'Export merged transaction data from multiple exchanges into a single file for tax prep or analysis.',
                icon: '📊',
              },
              {
                title: 'Cross-Platform',
                desc: 'Access your transaction log from iOS, Android, or the web. Your data syncs seamlessly across all devices.',
                icon: '📱',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Pricing</h2>
          <p className="text-gray-600 text-center mb-12">Start tracking for free. Upgrade when you need more.</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-8 border ${
                  plan.popular
                    ? 'border-orange-500 bg-orange-50/50 relative'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    BEST VALUE
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-bold text-gray-900">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-500">/mo</span>
                    </>
                  )}
                </div>
                <Link
                  href="/#contact"
                  className={`block text-center w-full rounded-lg py-3 font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Simplify Your Crypto Tracking?
          </h2>
          <p className="text-gray-600 mb-8">
            Join investors and traders who use Crypto Transaction Log to manage their portfolio across every exchange.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ventures/crypto-transaction-log/demo"
              className="inline-flex items-center justify-center px-8 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Try the Demo
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-orange-600 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors"
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
