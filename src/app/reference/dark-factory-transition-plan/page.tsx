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

const revenuePlan = [
  {
    stream: 'Enterprise annual contracts (Power Digital + PQT)',
    plan: '12 deals',
    averageDeal: '$25,000',
    target: '$300,000',
    leadingIndicator: 'Qualified enterprise opportunities added per week',
  },
  {
    stream: 'Mid-market upgrades and expansion',
    plan: '40 expansions',
    averageDeal: '$3,000',
    target: '$120,000',
    leadingIndicator: 'Expansion-ready accounts with activated core features',
  },
  {
    stream: 'Self-serve conversion uplift (AutoReels + CTL)',
    plan: '500 net paid conversions',
    averageDeal: '$160 90-day value',
    target: '$80,000',
    leadingIndicator: 'Trial-to-paid conversion rate and onboarding completion',
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Revenue plan to reach $500K</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Revenue stream</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Plan</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Average deal</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">90-day target</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                      Leading indicator
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {revenuePlan.map((row) => (
                    <tr key={row.stream} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm text-gray-800">{row.stream}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.plan}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.averageDeal}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-blue-700">{row.target}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.leadingIndicator}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-200 bg-blue-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900" colSpan={3}>
                      Total target
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-blue-800">$500,000</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Updated every weekly operating review
                    </td>
                  </tr>
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
