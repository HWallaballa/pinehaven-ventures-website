'use client';

import { useState } from 'react';

export default function SubscribeBanner() {
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
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
      document.cookie = 'pqt_subscribed=true; max-age=31536000; path=/';
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full bg-green-600 text-white px-6 py-4 text-center">
        <p className="font-medium">
          ✅ You&apos;re on the list! Weekly ERCOT queue digests arrive every Monday.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-blue-600 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-medium text-sm sm:text-base">
          ⚡ Get weekly ERCOT queue changes in your inbox — free.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === 'loading'}
              className="px-3 py-2 rounded-lg text-gray-900 text-sm w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors whitespace-nowrap disabled:opacity-60"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe →'}
            </button>
          </div>
          {error && <p className="text-blue-100 text-xs">{error}</p>}
        </form>
      </div>
    </div>
  );
}
