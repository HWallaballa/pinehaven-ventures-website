import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export const metadata: Metadata = {
  title: 'Development & Operations Runbook | Pinehaven Ventures',
  description:
    'Step-by-step procedures for operating the Pinehaven Ventures platform — adding ventures, running generators, seeding Stripe, deploying to Vercel, and verifying builds.',
};

type RunbookStep = {
  step: number;
  title: string;
  command?: string;
  description: string;
  notes?: string;
};

type ChecklistItem = {
  task: string;
  details: string;
  category: string;
};

type TroubleshootEntry = {
  symptom: string;
  cause: string;
  fix: string;
};

const addVentureSteps: RunbookStep[] = [
  {
    step: 1,
    title: 'Edit ventures.json',
    description: 'Add a new entry to the ventures array with all required fields: id, name, tagline, description, color, icon, status, target_market, features, and plans.',
    notes: 'Color options: green, blue, purple, orange, red, cyan, amber. For free tiers, set price: 0 and omit stripe_env_key.',
  },
  {
    step: 2,
    title: 'Run the generator',
    command: 'npm run generate',
    description: 'Reads ventures.json and regenerates stripe-products.ts, seed-stripe.ts, .env.example, and scaffolds a new product page if one does not already exist.',
    notes: 'Use npm run generate:dry to preview changes without writing files.',
  },
  {
    step: 3,
    title: 'Customize the generated page',
    description: 'The generator creates a functional but basic product page. Enhance the hero copy, add "How It Works" sections, flesh out features, and adjust pricing card layout.',
    notes: 'Existing pages are never overwritten — only new pages are scaffolded.',
  },
  {
    step: 4,
    title: 'Seed Stripe (if live keys available)',
    command: 'STRIPE_SECRET_KEY=sk_live_... npm run seed-stripe',
    description: 'Creates Stripe products and prices, configures the billing portal, and outputs environment variable assignments.',
    notes: 'Use npm run seed-stripe:dry to preview. Copy output env vars into .env.local.',
  },
  {
    step: 5,
    title: 'Verify the build',
    command: 'npx tsc --noEmit && npm run build',
    description: 'Run TypeScript type checking and a full production build to catch errors before deploying.',
  },
  {
    step: 6,
    title: 'Push to GitHub',
    command: 'git add . && git commit -m "Add <venture-name> to portfolio" && git push',
    description: 'Commit all changes and push. Vercel will automatically build and deploy to pinehavenventures.io.',
  },
];

const generatorCommands = [
  { command: 'npm run generate', description: 'Read ventures.json and regenerate all derived files. Scaffold new product pages.', safe: true },
  { command: 'npm run generate:dry', description: 'Preview what generate would do without writing any files.', safe: true },
  { command: 'npm run seed-stripe', description: 'Create products/prices in Stripe and configure billing portal. Requires STRIPE_SECRET_KEY.', safe: false },
  { command: 'npm run seed-stripe:dry', description: 'Preview what Stripe objects would be created without making API calls.', safe: true },
  { command: 'npm run dev', description: 'Start the development server with Turbopack at localhost:3000.', safe: true },
  { command: 'npm run build', description: 'Run a full production build. Catches SSR errors, missing imports, and type issues.', safe: true },
  { command: 'npm run lint', description: 'Run ESLint with Next.js recommended rules.', safe: true },
  { command: 'npx tsc --noEmit', description: 'Type-check all TypeScript files without emitting output. Fast validation.', safe: true },
];

const vercelSetup: ChecklistItem[] = [
  { task: 'Connect GitHub repository', details: 'Vercel watches the repo for pushes. Every push to main triggers a build.', category: 'Setup' },
  { task: 'Configure environment variables', details: 'Add all variables from .env.example to the Vercel project settings. Include Stripe keys, price IDs, and Airtable credentials.', category: 'Setup' },
  { task: 'Verify build framework', details: 'Vercel auto-detects Next.js. No vercel.json or custom config is needed.', category: 'Setup' },
  { task: 'Set production domain', details: 'Point pinehavenventures.io to the Vercel project via DNS.', category: 'Setup' },
  { task: 'Configure Stripe webhook endpoint', details: 'In Stripe Dashboard, set the webhook URL to https://pinehavenventures.io/api/stripe/webhooks and select the five handled events.', category: 'Stripe' },
  { task: 'Test checkout flow', details: 'Use Stripe test mode keys to verify checkout, success, and cancel pages work end to end.', category: 'Verification' },
  { task: 'Verify webhook delivery', details: 'In Stripe Dashboard, check webhook logs to confirm events are received and returning 200.', category: 'Verification' },
];

const webhookEvents = [
  { event: 'checkout.session.completed', action: 'Provision access, record customer and subscription IDs' },
  { event: 'customer.subscription.updated', action: 'Handle plan upgrades/downgrades, update access level' },
  { event: 'customer.subscription.deleted', action: 'Revoke access, trigger retention flow' },
  { event: 'invoice.payment_succeeded', action: 'Log successful recurring payment' },
  { event: 'invoice.payment_failed', action: 'Flag for follow-up, notify customer' },
];

const ventureJsonFields = [
  { field: 'id', type: 'string', required: true, description: 'URL-safe slug (e.g., "my-new-app"). Used in routes and Stripe config.' },
  { field: 'name', type: 'string', required: true, description: 'Display name for the product.' },
  { field: 'tagline', type: 'string', required: true, description: 'Short value proposition (one line).' },
  { field: 'description', type: 'string', required: true, description: 'Longer description for the hero section.' },
  { field: 'color', type: 'string', required: true, description: 'Theme color: green, blue, purple, orange, red, cyan, or amber.' },
  { field: 'icon', type: 'string', required: true, description: 'Icon identifier for the product.' },
  { field: 'status', type: 'string', required: true, description: 'Product lifecycle: live, in-development, or coming-soon.' },
  { field: 'target_market', type: 'string[]', required: true, description: 'Array of audience segments.' },
  { field: 'features', type: 'string[]', required: true, description: 'Top-level product features.' },
  { field: 'plans', type: 'Plan[]', required: true, description: 'Array of pricing plans (see plan fields below).' },
  { field: 'has_free_tier', type: 'boolean', required: false, description: 'Set to true if the product has a $0 plan.' },
  { field: 'has_demo', type: 'boolean', required: false, description: 'Set to true if a demo page exists.' },
];

const planFields = [
  { field: 'id', type: 'string', description: 'Unique plan identifier (e.g., "my-app-starter").' },
  { field: 'name', type: 'string', description: 'Display name (e.g., "Starter", "Pro").' },
  { field: 'price', type: 'number', description: 'Price in dollars. Use 0 for free tiers.' },
  { field: 'currency', type: 'string', description: 'Always "usd".' },
  { field: 'interval', type: 'string', description: '"month" or "year".' },
  { field: 'stripe_env_key', type: 'string', description: 'Environment variable name for the Stripe price ID. Omit for free tiers.' },
  { field: 'description', type: 'string', description: 'Short description of who the plan is for.' },
  { field: 'features', type: 'string[]', description: 'Features included in this plan.' },
  { field: 'popular', type: 'boolean', description: 'Mark as the recommended/highlighted plan.' },
];

const troubleshooting: TroubleshootEntry[] = [
  { symptom: 'Build fails after adding a new venture', cause: 'Generated files are stale — ventures.json was edited but generator was not run.', fix: 'Run npm run generate, then npm run build again.' },
  { symptom: 'Stripe checkout redirects to error page', cause: 'Price ID environment variable is missing or incorrect.', fix: 'Check .env.local against .env.example. Run npm run seed-stripe if price IDs have not been created.' },
  { symptom: 'Webhook returns 400 in Stripe Dashboard', cause: 'STRIPE_WEBHOOK_SECRET is missing or does not match the endpoint.', fix: 'Verify the webhook secret in Vercel environment variables matches the one in Stripe Dashboard.' },
  { symptom: 'Product page shows $0 for all plans', cause: 'NEXT_PUBLIC_STRIPE_PRICE_* env vars are not set in Vercel.', fix: 'Add price ID environment variables to Vercel project settings and redeploy.' },
  { symptom: 'Generator does not create a page for existing venture', cause: 'Product page already exists — generator only scaffolds new pages, never overwrites.', fix: 'This is expected behavior. Edit the existing page manually.' },
  { symptom: 'TypeScript errors after generator run', cause: 'ventures.json has a schema issue (missing field, wrong type).', fix: 'Validate ventures.json fields against the schema documented above.' },
];

export default function DevelopmentOperationsRunbookPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 mb-10">
            <p className="text-sm font-semibold tracking-wide text-blue-700 uppercase mb-3">
              Operations Guide
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Development & Operations
              <span className="text-blue-600"> Runbook</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Step-by-step procedures for operating the Pinehaven Ventures platform.
              Covers adding ventures, running generators, seeding Stripe, deploying to Vercel,
              and troubleshooting common issues.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: March 3, 2026. Procedures verified against current production configuration.
            </p>
          </section>

          {/* Add a venture */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Procedure: Add a new venture</h2>
            <p className="text-gray-700 mb-4">
              The standard operating procedure for adding a new product to the portfolio.
              This can be executed end-to-end by an AI agent or a human operator.
            </p>
            <div className="space-y-4">
              {addVentureSteps.map((s) => (
                <div key={s.step} className="flex gap-4 items-start border border-gray-200 rounded-xl p-5 bg-white">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {s.step}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                    <p className="text-gray-700 text-sm mt-1">{s.description}</p>
                    {s.command && (
                      <div className="mt-2 bg-gray-900 rounded-lg px-4 py-2">
                        <code className="text-sm text-green-400 font-mono">{s.command}</code>
                      </div>
                    )}
                    {s.notes && (
                      <p className="text-xs text-gray-500 mt-2">{s.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ventures.json schema */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ventures.json field reference</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Venture fields</h3>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white mb-5">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Field</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Required</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {ventureJsonFields.map((f) => (
                    <tr key={f.field} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-mono text-blue-700">{f.field}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600">{f.type}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${f.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
                          {f.required ? 'Required' : 'Optional'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{f.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Plan fields (nested in plans array)</h3>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Field</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {planFields.map((f) => (
                    <tr key={f.field} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-mono text-blue-700">{f.field}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600">{f.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{f.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Available commands */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available commands</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Command</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Safe to run?</th>
                  </tr>
                </thead>
                <tbody>
                  {generatorCommands.map((cmd) => (
                    <tr key={cmd.command} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm">
                        <code className="font-mono text-blue-700 bg-gray-50 px-2 py-1 rounded">{cmd.command}</code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{cmd.description}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${cmd.safe ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {cmd.safe ? 'Safe' : 'Caution'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Vercel deployment */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vercel deployment checklist</h2>
            <div className="space-y-3">
              {vercelSetup.map((item) => (
                <div key={item.task} className="flex gap-4 items-start border border-gray-200 rounded-xl p-4 bg-white">
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 border-gray-300" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">{item.task}</h3>
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Webhook configuration */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stripe webhook events to configure</h2>
            <p className="text-gray-700 mb-4">
              These five events must be selected in the Stripe Dashboard webhook endpoint configuration.
              The endpoint URL is <code className="font-mono text-blue-700 bg-gray-100 px-1.5 py-0.5 rounded">https://pinehavenventures.io/api/stripe/webhooks</code>.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Event</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {webhookEvents.map((w) => (
                    <tr key={w.event} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-mono text-blue-700">{w.event}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{w.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              {troubleshooting.map((t) => (
                <article key={t.symptom} className="border border-gray-200 rounded-xl p-5 bg-white">
                  <h3 className="text-sm font-semibold text-red-700 mb-1">{t.symptom}</h3>
                  <p className="text-sm text-gray-600 mb-2"><span className="font-semibold text-gray-800">Cause:</span> {t.cause}</p>
                  <p className="text-sm text-gray-700"><span className="font-semibold text-green-700">Fix:</span> {t.fix}</p>
                </article>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-600 rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Related references
            </h2>
            <p className="text-blue-50 leading-relaxed mb-6">
              See the Architecture reference for the full tech stack and file map,
              or the Site Map for a complete route inventory.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/reference/architecture-tech-stack"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                Architecture & Tech Stack
              </Link>
              <Link
                href="/toolkit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-blue-200 text-white font-semibold hover:bg-blue-500 transition-colors"
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
