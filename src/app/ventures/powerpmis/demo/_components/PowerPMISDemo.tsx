'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Phase = 'Capture' | 'Quantities' | 'Allocation' | 'Executive';
type TaskStatus = 'Done' | 'In Progress' | 'Pending';
type Severity = 'High' | 'Medium' | 'Low';

interface WorkflowTask {
  id: string;
  phase: Phase;
  task: string;
  owner: string;
  status: TaskStatus;
  updated: string;
}

interface ExceptionItem {
  id: string;
  severity: Severity;
  issue: string;
  impact: string;
  owner: string;
}

interface ProjectScenario {
  slug: string;
  name: string;
  site: string;
  budget: number;
  eac: number;
  completionPct: number;
  scanRecency: string;
  workflow: WorkflowTask[];
  exceptions: ExceptionItem[];
}

const phases: Phase[] = ['Capture', 'Quantities', 'Allocation', 'Executive'];

const scenarios: ProjectScenario[] = [
  {
    slug: 'dc-alpha',
    name: 'Data Center Alpha',
    site: 'Dallas, TX',
    budget: 48000000,
    eac: 49350000,
    completionPct: 62,
    scanRecency: '4h ago',
    workflow: [
      { id: 't1', phase: 'Capture', task: 'North yard LiDAR upload complete', owner: 'Field Team', status: 'Done', updated: '08:15' },
      { id: 't2', phase: 'Capture', task: 'Control-point validation for south slab', owner: 'Survey Lead', status: 'In Progress', updated: '09:02' },
      { id: 't3', phase: 'Quantities', task: 'Earthwork delta extraction', owner: 'Estimator', status: 'Done', updated: '09:18' },
      { id: 't4', phase: 'Quantities', task: 'MEP penetration quantities review', owner: 'Precon', status: 'Pending', updated: '--' },
      { id: 't5', phase: 'Allocation', task: 'Shared crane cost split by WBS', owner: 'Project Controls', status: 'In Progress', updated: '09:21' },
      { id: 't6', phase: 'Executive', task: 'Portfolio variance dashboard refresh', owner: 'PMO', status: 'Pending', updated: '--' },
    ],
    exceptions: [
      { id: 'e1', severity: 'High', issue: 'Unmapped trench quantity variance', impact: '$185k potential overrun', owner: 'Estimator' },
      { id: 'e2', severity: 'Medium', issue: 'Delayed approval on shared cost pool', impact: 'Executive report held 1 day', owner: 'Cost Manager' },
      { id: 'e3', severity: 'Low', issue: 'Scan recency outside 24h target', impact: 'Reduced progress confidence', owner: 'Field Ops' },
    ],
  },
  {
    slug: 'solar-campus',
    name: 'Solar Campus Expansion',
    site: 'Phoenix, AZ',
    budget: 26500000,
    eac: 25880000,
    completionPct: 71,
    scanRecency: '2h ago',
    workflow: [
      { id: 't7', phase: 'Capture', task: 'Drone orthomosaic stitched', owner: 'Field Team', status: 'Done', updated: '07:50' },
      { id: 't8', phase: 'Quantities', task: 'Cable trench linear-foot calc', owner: 'Estimator', status: 'Done', updated: '08:27' },
      { id: 't9', phase: 'Allocation', task: 'Substation shared scope allocation', owner: 'Project Controls', status: 'Done', updated: '08:58' },
      { id: 't10', phase: 'Executive', task: 'Pilot KPI summary export', owner: 'PMO', status: 'In Progress', updated: '09:11' },
      { id: 't11', phase: 'Executive', task: 'Owner packet sign-off', owner: 'Director', status: 'Pending', updated: '--' },
    ],
    exceptions: [
      { id: 'e4', severity: 'Medium', issue: 'Vendor quote stale by 5 days', impact: 'EAC confidence reduced', owner: 'Procurement' },
      { id: 'e5', severity: 'Low', issue: 'Two WBS nodes missing aliases', impact: 'Minor dashboard labeling issue', owner: 'PMO Analyst' },
    ],
  },
  {
    slug: 'water-plant',
    name: 'Water Plant Upgrade',
    site: 'Tampa, FL',
    budget: 33200000,
    eac: 34120000,
    completionPct: 44,
    scanRecency: '11h ago',
    workflow: [
      { id: 't12', phase: 'Capture', task: 'Interior pipe rack photogrammetry', owner: 'Field Team', status: 'In Progress', updated: '08:03' },
      { id: 't13', phase: 'Quantities', task: 'Concrete volume reconciliation', owner: 'Estimator', status: 'Pending', updated: '--' },
      { id: 't14', phase: 'Allocation', task: 'Mechanical package cost spread', owner: 'Project Controls', status: 'Pending', updated: '--' },
      { id: 't15', phase: 'Executive', task: 'Variance root-cause narrative', owner: 'PMO', status: 'Pending', updated: '--' },
    ],
    exceptions: [
      { id: 'e6', severity: 'High', issue: 'WBS mapping mismatch on package M-14', impact: '$260k at risk', owner: 'Project Controls' },
      { id: 'e7', severity: 'Medium', issue: 'Scan upload backlog', impact: 'Workflow delay on quantity extraction', owner: 'Field Ops' },
    ],
  },
];

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PowerPMISDemo() {
  const [projectSlug, setProjectSlug] = useState(scenarios[0].slug);
  const [activePhase, setActivePhase] = useState<Phase>('Capture');
  const [lastSync, setLastSync] = useState('10:42');

  const selectedProject = useMemo(
    () => scenarios.find((scenario) => scenario.slug === projectSlug) ?? scenarios[0],
    [projectSlug]
  );

  const variance = selectedProject.eac - selectedProject.budget;
  const activeTasks = selectedProject.workflow.filter((task) => task.phase === activePhase);

  const phaseStats = phases.map((phase) => {
    const tasks = selectedProject.workflow.filter((task) => task.phase === phase);
    const done = tasks.filter((task) => task.status === 'Done').length;
    return { phase, done, total: tasks.length };
  });

  const handleSync = () => {
    const now = new Date();
    setLastSync(
      now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#041833] text-white flex flex-col">
      <div className="bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white text-center py-2 text-sm font-medium px-4">
        PowerPMIS MVP Demo - field-to-executive workflow simulator
      </div>

      <header className="bg-[#0B2850] border-b border-[#132E4B] px-4 py-3 flex items-center justify-between">
        <Link href="/ventures/powerpmis" className="text-[#3EE5E5] text-sm font-medium hover:underline">
          &larr; Back
        </Link>
        <h1 className="text-lg font-bold tracking-tight">PowerPMIS</h1>
        <button
          onClick={handleSync}
          className="px-3 py-1.5 rounded-lg bg-[#132E4B] text-[#3EE5E5] text-sm font-medium hover:bg-[#1a3d5e] transition-colors"
          title="Refresh demo snapshot"
        >
          Sync Snapshot
        </button>
      </header>

      <section className="px-4 py-4 border-b border-[#132E4B]">
        <div className="flex flex-wrap gap-2 mb-3">
          {scenarios.map((scenario) => (
            <button
              key={scenario.slug}
              onClick={() => setProjectSlug(scenario.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                scenario.slug === projectSlug
                  ? 'bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white'
                  : 'bg-[#0B2850] text-[#9DA9B9] hover:text-white'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
        <div className="text-sm text-[#9DA9B9]">
          Site: <span className="text-white font-medium">{selectedProject.site}</span> | Last sync:{' '}
          <span className="text-[#3EE5E5] font-semibold">{lastSync}</span> | Scan recency:{' '}
          <span className="text-white font-medium">{selectedProject.scanRecency}</span>
        </div>
      </section>

      <section className="px-4 py-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-[#132E4B]">
        <MetricCard label="Budget" value={formatUsd(selectedProject.budget)} hint="Approved baseline" />
        <MetricCard label="EAC" value={formatUsd(selectedProject.eac)} hint="Current forecast" />
        <MetricCard
          label="Variance"
          value={`${variance >= 0 ? '+' : '-'}${formatUsd(Math.abs(variance))}`}
          hint={variance > 0 ? 'Forecast over budget' : 'Forecast under budget'}
          valueClass={variance > 0 ? 'text-red-300' : 'text-green-300'}
        />
        <MetricCard label="Completion" value={`${selectedProject.completionPct}%`} hint="Measured from latest capture" />
      </section>

      <section className="px-4 py-4 border-b border-[#132E4B]">
        <h2 className="text-sm font-semibold text-[#9DA9B9] uppercase tracking-wide mb-3">Workflow Phases</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {phaseStats.map((phase) => (
            <button
              key={phase.phase}
              onClick={() => setActivePhase(phase.phase)}
              className={`text-left rounded-xl border p-4 transition-colors ${
                activePhase === phase.phase
                  ? 'bg-[#132E4B] border-[#3EE5E5]'
                  : 'bg-[#0B2850] border-[#132E4B] hover:border-[#1B3781]'
              }`}
            >
              <p className="text-white font-semibold">{phase.phase}</p>
              <p className="text-[#9DA9B9] text-sm mt-1">
                {phase.done}/{phase.total} done
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 py-4 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[#0B2850] rounded-2xl border border-[#132E4B] p-4">
          <h3 className="text-lg font-semibold mb-4">{activePhase} Tasks</h3>
          <div className="space-y-3">
            {activeTasks.length > 0 ? (
              activeTasks.map((task) => (
                <div key={task.id} className="bg-[#132E4B] rounded-xl p-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-[#9DA9B9] mt-1">
                      Owner: {task.owner} | Updated: {task.updated}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-[#9DA9B9] text-sm">No tasks in this phase yet.</p>
            )}
          </div>
        </div>

        <div className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-4">
          <h3 className="text-lg font-semibold mb-4">Exceptions Queue</h3>
          <div className="space-y-3">
            {selectedProject.exceptions.map((exception) => (
              <div key={exception.id} className="bg-[#132E4B] rounded-xl p-3">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${severityBadge(exception.severity)}`}>
                    {exception.severity}
                  </span>
                  <span className="text-xs text-[#9DA9B9]">{exception.owner}</span>
                </div>
                <p className="font-medium text-sm">{exception.issue}</p>
                <p className="text-xs text-[#9DA9B9] mt-1">{exception.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-6">
        <div className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-4">
          <h3 className="text-lg font-semibold mb-2">Next Action Recommendation</h3>
          <p className="text-[#9DA9B9] text-sm mb-4">
            Prioritize high-severity exceptions before publishing the executive packet. Resolve unmapped WBS costs and refresh quantity deltas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Request Pilot Walkthrough
            </Link>
            <Link
              href="/ventures/powerpmis"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-[#3EE5E5]/40 text-[#3EE5E5] rounded-lg font-semibold hover:bg-[#132E4B] transition-colors"
            >
              Back to Product Overview
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  hint,
  valueClass,
}: {
  label: string;
  value: string;
  hint: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-[#0B2850] rounded-xl border border-[#132E4B] p-4">
      <p className="text-sm text-[#9DA9B9]">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${valueClass ?? 'text-white'}`}>{value}</p>
      <p className="text-xs text-[#9DA9B9] mt-1">{hint}</p>
    </div>
  );
}

function statusBadge(status: TaskStatus) {
  if (status === 'Done') return 'bg-green-500/15 text-green-300';
  if (status === 'In Progress') return 'bg-blue-500/15 text-blue-300';
  return 'bg-gray-500/20 text-gray-200';
}

function severityBadge(severity: Severity) {
  if (severity === 'High') return 'bg-red-500/20 text-red-300';
  if (severity === 'Medium') return 'bg-yellow-500/20 text-yellow-300';
  return 'bg-blue-500/20 text-blue-300';
}
