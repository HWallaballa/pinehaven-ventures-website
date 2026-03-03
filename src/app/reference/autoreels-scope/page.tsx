import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'AutoReels.ai — Product Scope | Pinehaven Ventures',
  description:
    'Scope assessment for AutoReels.ai: website deliverables, 3-tier Stripe checkout, gap analysis for the AI video generation and TikTok auto-posting platform, and competitive landscape.',
};

type RouteDeliverable = {
  route: string;
  purpose: string;
  status: string;
};

type ScopeBlock = {
  title: string;
  items: string[];
};

type CompetitorTrack = {
  name: string;
  category: string;
  overlap: string[];
  differentiation: string[];
  status: string;
  statusColor: string;
};

const routeDeliverables: RouteDeliverable[] = [
  {
    route: '/ventures/autoreels',
    purpose: 'Product page with how-it-works, feature grid, 3-tier pricing, and CTA section.',
    status: 'Live on main',
  },
  {
    route: '/ventures',
    purpose: 'AutoReels.ai card in product portfolio listing.',
    status: 'Live on main',
  },
  {
    route: '/',
    purpose: 'Homepage portfolio entry for AutoReels.ai.',
    status: 'Live on main',
  },
];

const scopeDefinition: ScopeBlock[] = [
  {
    title: 'What\'s built (website + checkout)',
    items: [
      'Product landing page with hero and "From $29/month" pricing badge.',
      'Three-step "How It Works" flow: Describe/Pick Template → AI Generates → Post/Schedule.',
      'Six feature cards: AI video generation, template library, AI voiceover, multi-account management, smart scheduling, one-click posting.',
      'Three-tier pricing with Stripe Checkout: Starter ($29/mo), Pro ($79/mo, popular), Agency ($199/mo).',
      'CTA section with link to contact form.',
      'Product listed on homepage portfolio grid and ventures listing page.',
    ],
  },
  {
    title: 'Phase 2 scope (product build-out)',
    items: [
      'AI video generation engine — text-to-video pipeline using generative AI models.',
      'TikTok API integration — OAuth authentication, direct posting, and content management.',
      'Template library system with categorized, pre-built video styles and trending formats.',
      'AI voiceover generation — text-to-speech integration with multiple voice profiles and languages.',
      'Automated caption and hashtag generation from video content.',
      'Content scheduling engine with optimal time slot suggestions.',
      'Multi-account dashboard for connecting and managing multiple TikTok accounts.',
      'Video preview and editing interface before posting.',
      'Usage metering and enforcement (video count limits per plan tier).',
      'User authentication, account management, and billing portal access.',
    ],
  },
  {
    title: 'Out of scope',
    items: [
      'Instagram Reels, YouTube Shorts, or other social platform support.',
      'Native mobile application (iOS/Android).',
      'White-label or reseller program for agencies to brand as their own.',
      'Custom AI model training on user-provided brand assets.',
      'Video analytics and performance tracking dashboards.',
    ],
  },
];

const competitorTracks: CompetitorTrack[] = [
  {
    name: 'Opus Clip',
    category: 'AI Video Repurposing',
    overlap: [
      'AI-powered short-form video creation',
      'Auto-captioning and formatting for social platforms',
    ],
    differentiation: [
      'Opus Clip focuses on repurposing long-form content; AutoReels generates from text prompts',
      'AutoReels includes native TikTok posting and multi-account management',
    ],
    status: 'Direct competitor',
    statusColor: 'bg-red-100 text-red-800',
  },
  {
    name: 'Pictory / InVideo',
    category: 'AI Video Editors',
    overlap: [
      'Text-to-video creation workflows',
      'Template-based video generation',
    ],
    differentiation: [
      'Pictory/InVideo are general-purpose; AutoReels is TikTok-first',
      'AutoReels bundles posting, scheduling, and multi-account management',
    ],
    status: 'Niche competitor',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    name: 'CapCut (TikTok native)',
    category: 'Video Editing',
    overlap: [
      'TikTok-optimized video creation',
      'Template-based content generation',
    ],
    differentiation: [
      'CapCut is manual editing; AutoReels is fully AI-generated',
      'AutoReels handles scheduling and multi-account workflows',
    ],
    status: 'Platform tool',
    statusColor: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Descript',
    category: 'AI Media Production',
    overlap: [
      'AI voiceover and caption generation',
      'Template-based video workflows',
    ],
    differentiation: [
      'Descript is a full production suite; AutoReels is narrow and automated',
      'AutoReels targets content volume over production quality',
    ],
    status: 'Adjacent',
    statusColor: 'bg-gray-100 text-gray-800',
  },
];

const dependencies = [
  'AI video generation API (Runway, Pika, or custom model) for text-to-video pipeline.',
  'TikTok API for Business — developer access for OAuth, posting, and account management.',
  'Text-to-speech API with multiple voice profiles and language support.',
  'Cloud video storage and processing infrastructure (encoding, thumbnails, CDN delivery).',
  'Content moderation pipeline to screen generated videos before posting.',
  'Scheduling and job queue infrastructure for automated posting at optimal times.',
];

export default function AutoReelsScopePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 mb-10">
            <p className="text-sm font-semibold tracking-wide text-purple-700 uppercase mb-3">
              Toolkit Reference
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              AutoReels.ai
              <span className="text-purple-600"> — Product Scope</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Scope assessment for the AI-powered short-form video generation and TikTok auto-posting platform.
              Covers what&apos;s built on the website today, what&apos;s needed to deliver the full product,
              and competitive positioning in the AI video creation market.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                Status: Live (marketing + checkout)
              </span>
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                $29 – $199/month
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Last updated: March 3, 2026
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product overview</h2>
            <p className="text-gray-600 mb-4">
              AutoReels.ai is positioned as an AI-powered video creation and TikTok management platform,
              targeting creators, small businesses, and agencies. The product page features a clear 3-step
              workflow, feature grid, and 3-tier pricing with Stripe Checkout. The underlying AI video
              generation engine, TikTok API integration, and scheduling system have not been built.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Website deliverables</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Route</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Purpose</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {routeDeliverables.map((row) => (
                    <tr key={row.route} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-mono text-purple-700">{row.route}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.purpose}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product scope</h2>
            <div className="space-y-4">
              {scopeDefinition.map((block) => (
                <article key={block.title} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{block.title}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-purple-600">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Competitive landscape
            </h2>
            <div className="grid lg:grid-cols-2 gap-4">
              {competitorTracks.map((track) => (
                <article key={track.name} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{track.name}</h3>
                    <span className={`inline-flex shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${track.statusColor}`}>
                      {track.status}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">{track.category}</p>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-800 mb-1">Overlap</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {track.overlap.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-yellow-600">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">Differentiation</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {track.differentiation.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-purple-600">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12 bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Dependencies &amp; blockers</h2>
            <p className="text-gray-700 mb-4">
              The following are required to move AutoReels.ai from marketing page to operational product:
            </p>
            <ul className="space-y-2 text-gray-700">
              {dependencies.map((dep) => (
                <li key={dep} className="flex gap-2">
                  <span className="text-purple-600">-</span>
                  <span>{dep}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-purple-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Related pages</h2>
            <p className="text-purple-50 leading-relaxed mb-6">
              Review the current product presentation and checkout flow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/ventures/autoreels"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-purple-100 transition-colors"
              >
                View Product Page
              </Link>
              <Link
                href="/toolkit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-purple-200 text-white font-semibold hover:bg-purple-500 transition-colors"
              >
                Back to Toolkit
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
