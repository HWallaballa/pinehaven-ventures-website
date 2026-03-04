'use client';

import { useState } from 'react';

export default function LeadCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <section className="w-full bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {status === 'success' ? (
          <p className="text-white text-xl font-medium">
            ✅ You&apos;re in. First digest arrives Monday.
          </p>
        ) : (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay in the loop.
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Free weekly updates on new product launches, feature releases, and insights across the Pinehaven Ventures portfolio. No spam. Unsubscribe anytime.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === 'loading'}
                className="px-4 py-3 rounded-lg text-gray-900 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap disabled:opacity-60 w-full sm:w-auto"
              >
                {status === 'loading' ? 'Subscribing…' : 'Get Free Insights →'}
              </button>
            </form>
            {error && (
              <p className="text-red-400 text-sm mb-2">{error}</p>
            )}
            <p className="text-gray-400 text-sm">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
