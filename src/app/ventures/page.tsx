import Navigation from '../components/Navigation';
import Link from 'next/link';

export default function Ventures() {
  const ventures = [
    {
      id: 'power-digital',
      title: 'Power Digital Intelligence',
      subtitle: 'Institutional Data Center Market Intelligence',
      description: 'The definitive intelligence platform for institutional investors, developers, and utilities tracking the data center energy market. Power Digital aggregates interconnection queue data, capacity pipelines, and market signals into a single dashboard — giving you an unfair advantage in site selection, deal sourcing, and market timing.',
      features: [
        'Real-time ERCOT interconnection queue tracking with MW-level detail',
        'Data center capacity pipeline monitoring across major markets',
        'Market intelligence reports and trend analysis',
        'Custom alerts for queue movements and new filings',
      ],
      pricing: '$10,000/year',
      pricingColor: 'bg-green-100 text-green-800',
      status: 'Live',
      statusColor: 'bg-green-100 text-green-800',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      ),
      gradientFrom: 'from-green-50',
      gradientTo: 'to-emerald-100',
    },
    {
      id: 'power-queue-tracker',
      title: 'Power Queue Tracker',
      subtitle: 'ERCOT Queue Monitoring for Data Center Site Selection',
      description: 'Purpose-built for data center developers, energy consultants, and real estate professionals who need to track ERCOT power interconnection queues. PQT delivers automated digests, queue position tracking, and capacity insights — so you never miss a critical filing or status change.',
      features: [
        'Automated daily/weekly ERCOT queue digests via email',
        'Filter and search across all active interconnection requests',
        'Track queue position changes and new filings in real-time',
        'Export data for analysis and reporting',
      ],
      pricing: '$49 – $149/mo',
      pricingColor: 'bg-blue-100 text-blue-800',
      status: 'Live',
      statusColor: 'bg-green-100 text-green-800',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-sky-100',
    },
    {
      id: 'autoreels',
      title: 'AutoReels.ai',
      subtitle: 'AI Video Generation + TikTok Auto-Posting',
      description: 'Generate professional short-form videos with AI and auto-post them to TikTok — all from one dashboard. AutoReels handles everything from prompt-to-video generation, multi-account management, smart scheduling, and one-click posting. Built for creators, agencies, and businesses scaling their TikTok presence.',
      features: [
        'AI video generation from text prompts or pre-built templates',
        'Connect and manage multiple TikTok accounts',
        'Smart scheduling with auto-posting at optimal times',
        'AI voiceover, captions, and hashtag generation',
      ],
      pricing: '$29 – $199/mo',
      pricingColor: 'bg-purple-100 text-purple-800',
      status: 'Live',
      statusColor: 'bg-green-100 text-green-800',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      ),
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-violet-100',
    },
    {
      id: 'crypto-transaction-log',
      title: 'Crypto Transaction Log',
      subtitle: 'Cross-Exchange Crypto Portfolio Tracking',
      description: 'Upload CSV and XLS files from any exchange and have them automatically converted into a unified crypto transaction log. Track, analyze, search, sort, and export your transactions across all exchanges — available on iOS, Android, and web. Built for crypto investors and traders who need a single source of truth for their portfolio activity.',
      features: [
        'Import CSV/XLS files from any crypto exchange automatically',
        'Track transactions across multiple exchanges in one place',
        'Filter by exchange, date range, and transaction type',
        'Export combined reports for tax prep and portfolio analysis',
      ],
      pricing: 'Free / Premium',
      pricingColor: 'bg-orange-100 text-orange-800',
      status: 'Live',
      statusColor: 'bg-green-100 text-green-800',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-amber-100',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Products</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Four live SaaS products serving energy markets, data center developers, content creators, and crypto investors.
            Each product solves a real problem with a clear path to revenue.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {ventures.map((venture, index) => (
              <div key={venture.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900">{venture.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${venture.statusColor}`}>
                      {venture.status}
                    </span>
                  </div>
                  <h3 className="text-xl text-blue-600 font-medium mb-4">{venture.subtitle}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{venture.description}</p>

                  <div className="mb-6">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${venture.pricingColor}`}>
                      {venture.pricing}
                    </span>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {venture.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/ventures/${venture.id}`}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Visual Element */}
                <div className="flex-1 lg:max-w-md">
                  <div className={`bg-gradient-to-br ${venture.gradientFrom} ${venture.gradientTo} rounded-2xl p-8 h-80 flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {venture.icon}
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">{venture.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{venture.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you need energy market intelligence, AI content creation tools, or crypto portfolio tracking,
            we have a product for you.
          </p>
          <Link
            href="/#contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
