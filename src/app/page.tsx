import Navigation from './components/Navigation';
import ContactForm from './components/ContactForm';
import Link from 'next/link';

export default function Home() {
  const products = [
    {
      href: '/ventures/power-digital',
      title: 'Power Digital Intelligence',
      desc: 'Institutional-grade data center market intelligence. Track power queue positions, capacity, and site selection data across ERCOT and beyond.',
      tag: '$10,000/year',
      tagColor: 'bg-green-100 text-green-800',
    },
    {
      href: '/ventures/power-queue-tracker',
      title: 'Power Queue Tracker',
      desc: 'Real-time ERCOT interconnection queue monitoring for data center developers, investors, and energy consultants.',
      tag: 'From $49/mo',
      tagColor: 'bg-blue-100 text-blue-800',
    },
    {
      href: '/ventures/autoreels',
      title: 'AutoReels.ai',
      desc: 'Generate stunning short-form videos with AI and auto-post to TikTok. Schedule content across multiple accounts on autopilot.',
      tag: 'From $29/mo',
      tagColor: 'bg-purple-100 text-purple-800',
    },
    {
      href: '/ventures/crypto-transaction-log',
      title: 'Crypto Transaction Log',
      desc: 'Upload CSV and XLS files from any exchange, track, analyze, and export your crypto transactions — all in one place across iOS, Android, and web.',
      tag: 'Free / Premium',
      tagColor: 'bg-orange-100 text-orange-800',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Software Products That{' '}
            <span className="text-blue-600">Drive Revenue</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Pinehaven Ventures builds and operates vertical SaaS products.
            From energy market intelligence to AI-powered content creation,
            we turn complex workflows into scalable, profitable platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ventures"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Our Products
            </Link>
            <a
              href="#contact"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Product Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four live products serving energy markets, data center developers, content creators, and crypto investors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.tagColor}`}>
                    {product.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.desc}
                </p>
                <div className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1">
                  Learn more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">4</p>
              <p className="text-gray-600 text-sm mt-1">Live Products</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">SaaS</p>
              <p className="text-gray-600 text-sm mt-1">Recurring Revenue</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">B2B + B2C</p>
              <p className="text-gray-600 text-sm mt-1">Market Coverage</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">Full-Stack</p>
              <p className="text-gray-600 text-sm mt-1">In-House Engineering</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact">
        <ContactForm />
      </div>
    </div>
  );
}
