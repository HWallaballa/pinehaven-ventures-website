import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function AutoReels() {
  const plans = [
    {
      name: 'Starter',
      price: 29,
      desc: 'For individual creators',
      features: [
        '30 AI videos/month',
        '1 TikTok account',
        'Basic templates',
        'Direct posting',
        'Email support',
      ],
    },
    {
      name: 'Pro',
      price: 79,
      popular: true,
      desc: 'For serious creators and small businesses',
      features: [
        '100 AI videos/month',
        '5 TikTok accounts',
        'All templates',
        'Smart scheduling',
        'AI voiceover',
        'Priority support',
      ],
    },
    {
      name: 'Agency',
      price: 199,
      desc: 'For agencies managing multiple brands',
      features: [
        '500 AI videos/month',
        'Unlimited TikTok accounts',
        'All templates',
        'Smart scheduling',
        'AI voiceover',
        'Priority generation',
        'API access',
        'Dedicated account manager',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-violet-100">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/ventures" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            &larr; Back to Products
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-6 mb-6">
            AutoReels<span className="text-purple-600">.ai</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate stunning short-form videos with AI and auto-post them to TikTok.
            Schedule content, manage multiple accounts, and grow your audience — all on autopilot.
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
              From $29/month
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            From Idea to TikTok in 3 Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Describe or Pick a Template',
                desc: 'Write a text prompt describing your video, or choose from dozens of pre-built templates for trending content styles.',
              },
              {
                step: '2',
                title: 'AI Generates Your Video',
                desc: 'Our AI creates a professional short-form video in 1-3 minutes. Add AI voiceover, captions, and hashtags automatically.',
              },
              {
                step: '3',
                title: 'Post or Schedule',
                desc: 'Post directly to TikTok with one click, or schedule it for the optimal posting time. Repeat across all your accounts.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
            Everything You Need to Dominate TikTok
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            A complete toolkit for AI-powered video creation and TikTok management.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Video Generation',
                desc: 'Create professional videos from text prompts. Our AI handles visuals, transitions, and pacing.',
                icon: '🎬',
              },
              {
                title: 'Template Library',
                desc: 'Dozens of pre-built templates for trending styles: news recaps, product showcases, motivational content, and more.',
                icon: '📋',
              },
              {
                title: 'AI Voiceover',
                desc: 'Add professional voiceovers with natural-sounding AI voices. Multiple languages and tones available.',
                icon: '🎙️',
              },
              {
                title: 'Multi-Account Management',
                desc: 'Connect and manage multiple TikTok accounts from one dashboard. Perfect for agencies.',
                icon: '👥',
              },
              {
                title: 'Smart Scheduling',
                desc: 'Schedule posts for optimal times. Our system posts automatically so you never miss a slot.',
                icon: '📅',
              },
              {
                title: 'One-Click Posting',
                desc: 'Generated a video you love? Post it to TikTok instantly with a single click.',
                icon: '🚀',
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
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Pricing</h2>
          <p className="text-gray-600 text-center mb-12">Scale your TikTok presence at any budget.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-8 border ${
                  plan.popular
                    ? 'border-purple-500 bg-purple-50/50 relative'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <Link
                  href="/#contact"
                  className={`block text-center w-full rounded-lg py-3 font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
            Ready to Automate Your TikTok?
          </h2>
          <p className="text-gray-600 mb-8">
            Join creators and agencies using AI to produce and post TikTok content at scale.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Get Started Today
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
