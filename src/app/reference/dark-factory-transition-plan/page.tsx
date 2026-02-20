import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Dark Factory Transition Plan (90 Days to $500K) | Pinehaven Ventures',
  description:
    'Reference document outlining a practical migration plan to a dark factory operating model, including a 90-day scorecard to target $500K in revenue.',
};

type ProgramStatus = 'On Track' | 'At Risk' | 'Off Track';

type ScorecardMetric = {
  metric: string;
  baseline: string;
  day30: string;
  day60: string;
  day90: string;
  current: string;
  status: ProgramStatus;
};

type VentureProfile = {
  name: string;
  href: string;
  offer: string;
  pricing: string;
  buyers: string;
  contributionTarget: string;
};

type VentureRevenuePlan = {
  venture: string;
  href: string;
  revenueTarget: string;
  weeklyTarget: string;
  pricingAnchor: string;
  primaryMotion: string;
  leadingIndicator: string;
};

type VentureSprintPlan = {
  venture: string;
  day1to30: string;
  day31to60: string;
  day61to90: string;
  kpi: string;
};

const vibeLevels = [
  {
    level: 'Level 0',
    name: 'Spicy Autocomplete',
    summary: 'AI suggests next lines, but the human still writes the software.',
  },
  {
    level: 'Level 1',
    name: 'Coding Intern',
    summary: 'AI handles scoped tasks; human reviews everything and owns architecture.',
  },
  {
    level: 'Level 2',
    name: 'Junior Developer',
    summary:
      'AI can make multi-file changes; the human still reads every diff. Most AI-native developers appear to be here.',
  },
  {
    level: 'Level 3',
    name: 'Developer as Manager',
    summary:
      'AI implements and the human mostly directs work plus reviews diffs. Many teams plateau here.',
  },
  {
    level: 'Level 4',
    name: 'Developer as PM',
    summary:
      'The human writes a clear spec, leaves, then returns to evaluate outcomes. Diff-reading mostly disappears.',
  },
];

const ventureProfiles: VentureProfile[] = [
  {
    name: 'Power Digital Intelligence',
    href: '/ventures/power-digital',
    offer: 'Institutional data center market intelligence and queue analytics',
    pricing: '$10,000/year annual license',
    buyers: 'Data center developers, institutional investors, utilities',
    contributionTarget: '$250,000',
  },
  {
    name: 'Power Queue Tracker',
    href: '/ventures/power-queue-tracker',
    offer: 'ERCOT queue monitoring, digests, alerts, and exports',
    pricing: '$49/$99/$149 monthly plans',
    buyers: 'Developers, consultants, and energy-adjacent teams',
    contributionTarget: '$110,000',
  },
  {
    name: 'AutoReels.ai',
    href: '/ventures/autoreels',
    offer: 'AI video generation and automated TikTok publishing',
    pricing: '$29/$79/$199 monthly plans',
    buyers: 'Creators, small businesses, and agencies',
    contributionTarget: '$90,000',
  },
  {
    name: 'Crypto Transaction Log',
    href: '/ventures/crypto-transaction-log',
    offer: 'Cross-exchange crypto import, organization, and exports',
    pricing: 'Free + $9/month premium',
    buyers: 'Crypto investors and active traders',
    contributionTarget: '$50,000',
  },
];

const transitionPhases = [
  {
    phase: 'Days 1-30',
    goal: 'Build the factory rails',
    outcomes: [
      'Standardize Markdown spec templates with acceptance scenarios and business metrics.',
      'Set up agent pipeline (spec intake -> implementation -> scenario run -> deployment candidate).',
      'Ship at least 10 non-critical features fully through the spec-to-scenario path.',
      'Instrument baseline metrics: cycle time, rework rate, scenario pass rate, and deployment frequency.',
    ],
  },
  {
    phase: 'Days 31-60',
    goal: 'Move core workflows to dark-factory execution',
    outcomes: [
      'Route at least 50% of product roadmap items through spec-first automation.',
      'Replace line-by-line code review with scenario result review for non-critical changes.',
      'Launch weekly decision review: approve/hold/reject based on behavioral outcomes only.',
      'Connect release telemetry to revenue signals (trial starts, conversion, expansion, churn).',
    ],
  },
  {
    phase: 'Days 61-90',
    goal: 'Scale output and lock in revenue momentum',
    outcomes: [
      'Run 70%+ of implementation volume via dark-factory path (exception: security/compliance hot spots).',
      'Achieve sub-48-hour median spec-to-production cycle time for repeatable feature classes.',
      'Operate a single executive scorecard that ties delivery throughput to booked and collected revenue.',
      'Formalize org design for post-90-day operation: staffing model, incentives, and operating cadence.',
    ],
  },
];

const ventureRevenuePlan: VentureRevenuePlan[] = [
  {
    venture: 'Power Digital Intelligence',
    href: '/ventures/power-digital',
    revenueTarget: '$250,000',
    weeklyTarget: '$19.2k booked/week (about 2.0 annual licenses per week)',
    pricingAnchor: '$10,000 annual license',
    primaryMotion: 'Account-based outbound + investor/developer demos',
    leadingIndicator: 'Qualified demos booked per week and proposal-to-close rate',
  },
  {
    venture: 'Power Queue Tracker',
    href: '/ventures/power-queue-tracker',
    revenueTarget: '$110,000',
    weeklyTarget: '$8.5k booked/week (about $2.1k net new MRR per week)',
    pricingAnchor: '$49/$99/$149 monthly',
    primaryMotion: 'Digest-led self-serve conversion + enterprise upsell',
    leadingIndicator: 'Net new MRR, activation rate, and weekly churn',
  },
  {
    venture: 'AutoReels.ai',
    href: '/ventures/autoreels',
    revenueTarget: '$90,000',
    weeklyTarget: '$6.9k booked/week (about $1.7k net new MRR per week)',
    pricingAnchor: '$29/$79/$199 monthly',
    primaryMotion: 'Creator funnel + agency multi-account upgrades',
    leadingIndicator: 'Trial-to-paid conversion and retained weekly publishers',
  },
  {
    venture: 'Crypto Transaction Log',
    href: '/ventures/crypto-transaction-log',
    revenueTarget: '$50,000',
    weeklyTarget: '$3.8k booked/week (about 140 premium upgrades per week)',
    pricingAnchor: 'Free + $9 premium',
    primaryMotion: 'Demo-led acquisition + premium upgrade automation',
    leadingIndicator: 'Import success rate and free-to-premium conversion',
  },
];

const ventureSprintPlan: VentureSprintPlan[] = [
  {
    venture: 'Power Digital Intelligence',
    day1to30:
      'Spec packs for watchlist onboarding, queue-delta alerts, and proposal generation from live market data.',
    day31to60:
      'Automate investor-facing intelligence report generation with scenario checks for data accuracy.',
    day61to90:
      'Ship enterprise-ready API onboarding and expansion playbooks to increase annual contract close velocity.',
    kpi: 'Annual licenses closed and time-to-first-insight under 24 hours',
  },
  {
    venture: 'Power Queue Tracker',
    day1to30:
      'Build digest personalization and one-session watchlist setup with behavior-based acceptance tests.',
    day31to60:
      'Deploy alert-quality scoring and queue anomaly detection to raise trust and reduce false positives.',
    day61to90:
      'Roll out team collaboration and annual prepay experiments optimized for Team and Enterprise plans.',
    kpi: 'Net new MRR, activation in first 24 hours, and logo churn',
  },
  {
    venture: 'AutoReels.ai',
    day1to30:
      'Create onboarding flow that gets first generated video posted in under 10 minutes for new trials.',
    day31to60:
      'Launch auto A/B caption-hashtag generation and schedule reliability scenarios for multi-account posting.',
    day61to90:
      'Ship agency operations dashboard and usage-driven upgrade nudges for Pro and Agency growth.',
    kpi: 'Trial-to-paid conversion and weekly retained posting accounts',
  },
  {
    venture: 'Crypto Transaction Log',
    day1to30:
      'Improve CSV/XLS import success and standardize demo-to-signup conversion scenarios on web/mobile.',
    day31to60:
      'Release tax export wizard, transaction auto-tagging, and premium prompt timing experiments.',
    day61to90:
      'Introduce retention loops (portfolio digests, reminders) plus premium annual prepay packaging tests.',
    kpi: 'Free-to-premium conversion, D30 retention, and import completion rate',
  },
];

const scorecard: ScorecardMetric[] = [
  {
    metric: 'New booked revenue',
    baseline: '$0 (program baseline)',
    day30: '$75,000',
    day60: '$250,000',
    day90: '$500,000',
    current: 'Update weekly',
    status: 'At Risk',
  },
  {
    metric: 'Cash collected',
    baseline: '$0 (program baseline)',
    day30: '$40,000',
    day60: '$150,000',
    day90: '$320,000',
    current: 'Update weekly',
    status: 'At Risk',
  },
  {
    metric: 'Power Digital annual licenses closed',
    baseline: 'Current baseline from CRM',
    day30: '8',
    day60: '16',
    day90: '25',
    current: 'Update weekly',
    status: 'At Risk',
  },
  {
    metric: 'Power Queue Tracker net new MRR',
    baseline: 'Current MRR baseline',
    day30: '+$6,000',
    day60: '+$18,000',
    day90: '+$27,000',
    current: 'Update weekly',
    status: 'On Track',
  },
  {
    metric: 'AutoReels net new MRR',
    baseline: 'Current MRR baseline',
    day30: '+$4,000',
    day60: '+$12,000',
    day90: '+$20,000',
    current: 'Update weekly',
    status: 'On Track',
  },
  {
    metric: 'Crypto Transaction Log premium upgrades',
    baseline: 'Current paid premium users',
    day30: '350',
    day60: '900',
    day90: '1,800',
    current: 'Update weekly',
    status: 'At Risk',
  },
  {
    metric: 'Roadmap volume shipped via dark-factory path',
    baseline: '0%',
    day30: '30%',
    day60: '50%',
    day90: '70%+',
    current: 'Update weekly',
    status: 'On Track',
  },
  {
    metric: 'Median spec-to-production cycle time',
    baseline: 'Unknown (measure in week 1)',
    day30: '<120 hours',
    day60: '<72 hours',
    day90: '<48 hours',
    current: 'Update weekly',
    status: 'On Track',
  },
  {
    metric: 'Scenario pass rate (first full run)',
    baseline: 'Unknown (measure in week 1)',
    day30: '85%+',
    day60: '92%+',
    day90: '95%+',
    current: 'Update weekly',
    status: 'On Track',
  },
  {
    metric: 'Post-release defects per release',
    baseline: 'Unknown (measure in week 1)',
    day30: '<3',
    day60: '<2',
    day90: '<1',
    current: 'Update weekly',
    status: 'On Track',
  },
];

function statusClass(status: ProgramStatus): string {
  if (status === 'On Track') {
    return 'bg-green-100 text-green-800';
  }

  if (status === 'At Risk') {
    return 'bg-amber-100 text-amber-800';
  }

  return 'bg-red-100 text-red-800';
}

export default function DarkFactoryTransitionPlanPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 mb-10">
            <p className="text-sm font-semibold tracking-wide text-blue-700 uppercase mb-3">
              Reference Document
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Dark Factory Transition Plan
              <span className="text-blue-600">: 90 Days to $500K</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This document is the operating plan to move Pinehaven Ventures toward a dark factory
              structure where humans focus on specification quality and outcome evaluation, while AI
              agents handle implementation and testing execution.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: February 20, 2026. Evidence items below are presented as reported public
              claims and should be periodically re-validated.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What dark factories are</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                In the StrongDM framing, a tiny team can run a software factory where no human writes
                code and no human reviews code line-by-line. Humans produce precise Markdown specs,
                agents implement and test against behavioral scenarios, and humans only approve what
                ships based on outcomes.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span>Humans define the spec and success criteria.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span>AI agents build, test, and package shippable artifacts.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span>Humans evaluate behavior, business impact, and risk before release.</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 mb-10">
            <article className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Evidence frontier teams are ahead
              </h3>
              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li>
                  Claude Code has publicly claimed that around 90% of its own codebase was generated
                  by Claude Code itself.
                </li>
                <li>
                  Internal reports have suggested multiple teams operating in the 70-90% AI-written
                  range, with some workflows approaching nearly all generated implementation.
                </li>
                <li>
                  Public claim: project lead Boris Cherny reportedly has not personally written code
                  in more than two months.
                </li>
              </ul>
            </article>
            <article className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Evidence many developers may be slower
              </h3>
              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li>
                  METR 2025 randomized controlled trial (experienced OSS developers, familiar
                  codebases) found tasks completed 19% slower with AI tools.
                </li>
                <li>
                  Participants expected to be 24% faster before starting, then still believed they
                  were 20% faster after completion.
                </li>
                <li>
                  Interpretation: adoption alone is insufficient. Workflow design and evaluation
                  architecture determine whether AI creates speed or drag.
                </li>
              </ul>
            </article>
          </section>

          <section className="mb-10 bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Core argument: workflow and org design are the bottlenecks
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Frontier teams did not just add better tools. They changed the unit of management from
              code production to specification precision and outcome evaluation. Teams that keep
              traditional code-review-heavy structures often stay stuck at partial gains.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>Spec-writing discipline replaces ad hoc ticket grooming.</li>
              <li>Scenario-based evaluation replaces line-by-line diff review for most changes.</li>
              <li>Engineering management shifts from implementation supervision to flow control.</li>
              <li>Coordination becomes the dominant source of friction.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Portfolio this plan is built around
            </h2>
            <p className="text-gray-700 mb-4">
              These are the four live ventures included in the 90-day model. Revenue contributions
              below roll up to the $500,000 target.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {ventureProfiles.map((venture) => (
                <article key={venture.name} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{venture.name}</h3>
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      Target: {venture.contributionTarget}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{venture.offer}</p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-gray-800">Pricing:</span> {venture.pricing}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold text-gray-800">Primary buyers:</span> {venture.buyers}
                  </p>
                  <Link
                    href={venture.href}
                    className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    View product page
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Five Levels of Vibe Coding (Dan Shapiro, early 2026)
            </h2>
            <div className="space-y-4">
              {vibeLevels.map((level) => (
                <div key={level.level} className="border border-gray-200 rounded-xl p-5 bg-white">
                  <p className="text-sm font-semibold text-blue-600 mb-1">{level.level}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{level.name}</h3>
                  <p className="text-gray-700">{level.summary}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">90-day transition phases</h2>
            <div className="space-y-5">
              {transitionPhases.map((phase) => (
                <article key={phase.phase} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{phase.phase}</h3>
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {phase.goal}
                    </span>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    {phase.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-3">
                        <span className="text-blue-600">-</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Revenue plan by venture to reach $500K
            </h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Venture</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Pricing anchor</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">90-day target</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Weekly target</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Primary motion</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Leading indicator</th>
                  </tr>
                </thead>
                <tbody>
                  {ventureRevenuePlan.map((row) => (
                    <tr key={row.venture} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm text-gray-800">
                        <Link href={row.href} className="font-semibold text-blue-700 hover:text-blue-800">
                          {row.venture}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.pricingAnchor}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-blue-700">{row.revenueTarget}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.weeklyTarget}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.primaryMotion}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.leadingIndicator}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-200 bg-blue-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900" colSpan={2}>
                      Total target
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-blue-800">$500,000</td>
                    <td className="px-4 py-3 text-sm text-gray-700" colSpan={3}>
                      Updated every weekly operating review
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Dark-factory sprint backlog by venture (Days 1-90)
            </h2>
            <p className="text-gray-700 mb-4">
              Each product gets a dedicated spec backlog so execution speed maps to measurable revenue
              outcomes instead of generic feature output.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Venture</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Days 1-30</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Days 31-60</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Days 61-90</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Core KPI</th>
                  </tr>
                </thead>
                <tbody>
                  {ventureSprintPlan.map((row) => (
                    <tr key={row.venture} className="border-t border-gray-100 align-top">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{row.venture}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.day1to30}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.day31to60}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.day61to90}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.kpi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Operating scorecard</h2>
            <p className="text-gray-700 mb-4">
              Update this table weekly. If any metric is marked Off Track for two consecutive weeks,
              trigger a corrective action sprint.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Metric</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Baseline</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Day 30</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Day 60</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Day 90</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Current</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scorecard.map((row) => (
                    <tr key={row.metric} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm text-gray-800">{row.metric}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.baseline}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.day30}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.day60}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.day90}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.current}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass(
                            row.status,
                          )}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 mb-10">
            <article className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legacy migration approach</h3>
              <ul className="space-y-3 text-gray-700">
                <li>Start with repetitive, low-regret workflows before critical billing paths.</li>
                <li>Create scenario harnesses that test behavior, not implementation details.</li>
                <li>Freeze unstable interfaces while agents converge on repeatable output quality.</li>
                <li>Use parallel runs (legacy flow vs factory flow) before full cutover.</li>
              </ul>
            </article>
            <article className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Organizational redesign requirements
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>Shift sprint planning to spec planning with explicit behavioral acceptance rules.</li>
                <li>Reduce default diff review and increase scenario quality audits.</li>
                <li>
                  Raise the bar for engineering roles toward product judgment, systems thinking, and
                  evaluation rigor.
                </li>
                <li>Adopt tiny, high-output teams with direct ownership of revenue outcomes.</li>
              </ul>
            </article>
          </section>

          <section className="mb-10 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Weekly operating rhythm</h2>
            <ol className="space-y-2 text-gray-700 list-decimal pl-5">
              <li>Monday: prioritize spec backlog by expected revenue impact.</li>
              <li>Daily: run automated spec-to-ship pipeline and review scenario outcomes.</li>
              <li>Wednesday: inspect at-risk metrics and launch corrective experiments.</li>
              <li>Friday: executive review of scorecard, release decisions, and revenue movement.</li>
              <li>End of week: publish a one-page update with wins, misses, and next actions.</li>
            </ol>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unresolved tension to manage</h2>
            <p className="text-gray-700 leading-relaxed">
              The frontier is accelerating while the middle of the market risks falling behind.
              Success over the next 90 days depends less on model access and more on whether the team
              can consistently write clear specs, evaluate outcomes honestly, and redesign operating
              structure around coordination efficiency.
            </p>
          </section>

          <section className="bg-blue-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Next action: run week-1 baseline instrumentation
            </h2>
            <p className="text-blue-50 leading-relaxed mb-6">
              Confirm baseline cycle time, defect rate, scenario coverage, and revenue funnel health
              before launching full dark-factory rollout.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                Contact Pinehaven
              </Link>
              <Link
                href="/ventures"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-blue-200 text-white font-semibold hover:bg-blue-500 transition-colors"
              >
                View Product Portfolio
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
