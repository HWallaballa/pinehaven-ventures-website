import Navigation from '../components/Navigation';
import Link from 'next/link';

export default function Ventures() {
  const ventures = [
    {
      id: 'powerpmis',
      title: 'PowerPMIS',
      subtitle: 'Project Management Intelligence System',
      description: 'A comprehensive project management platform designed to streamline complex workflows and enhance team collaboration. PowerPMIS combines intelligent automation with intuitive interfaces to help organizations manage projects more effectively, track progress in real-time, and make data-driven decisions.',
      features: [
        'Real-time project tracking and analytics',
        'Intelligent task automation and scheduling',
        'Advanced team collaboration tools',
        'Customizable dashboards and reporting'
      ],
      status: 'In Development'
    },
    {
      id: 'cryptotransactionlog',
      title: 'CryptoTransactionLog',
      subtitle: 'Blockchain Transaction Management',
      description: 'A secure and efficient cryptocurrency transaction logging and management system built for traders, businesses, and financial institutions. CryptoTransactionLog provides comprehensive tracking, analysis, and reporting capabilities for all cryptocurrency transactions with enterprise-grade security.',
      features: [
        'Multi-currency transaction tracking',
        'Advanced security and encryption',
        'Comprehensive audit trails',
        'Tax reporting and compliance tools'
      ],
      status: 'Beta Testing'
    },
    {
      id: 'powerdevs',
      title: 'PowerDevs',
      subtitle: 'Developer Productivity Platform',
      description: 'A cutting-edge development platform that empowers software teams to build, deploy, and scale applications faster than ever before. PowerDevs integrates modern development tools with AI-powered assistance to accelerate the entire software development lifecycle.',
      features: [
        'AI-powered code assistance and optimization',
        'Integrated CI/CD pipelines',
        'Advanced debugging and monitoring tools',
        'Collaborative development environment'
      ],
      status: 'In Development'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development':
        return 'bg-yellow-100 text-yellow-800';
      case 'Beta Testing':
        return 'bg-blue-100 text-blue-800';
      case 'Concept Stage':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Ventures</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of innovative technology solutions designed to solve complex challenges 
            and drive digital transformation across various industries.
          </p>
        </div>
      </section>

      {/* Ventures Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {ventures.map((venture, index) => (
              <div key={venture.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900">{venture.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(venture.status)}`}>
                      {venture.status}
                    </span>
                  </div>
                  <h3 className="text-xl text-blue-600 font-medium mb-4">{venture.subtitle}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{venture.description}</p>
                  
                  {/* Features */}
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
                  
                  {/* PowerPMIS Learn More Button */}
                  {venture.id === 'powerpmis' && (
                    <div className="mb-8">
                      <Link
                        href="/ventures/powerpmis"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Explore Full Feature Set
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Visual Element */}
                <div className="flex-1 lg:max-w-md">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {venture.id === 'powerpmis' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          )}
                          {venture.id === 'cryptotransactionlog' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          )}
                          {venture.id === 'powerdevs' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          )}
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
            Interested in Learning More?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get in touch to discuss how our innovative solutions can help transform your business.
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