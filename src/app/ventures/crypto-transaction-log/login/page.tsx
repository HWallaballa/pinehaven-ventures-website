'use client';

import { useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase-client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Mode = 'login' | 'signup';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/ventures/crypto-transaction-log/app';

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const supabase = createSupabaseBrowser();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/ventures/crypto-transaction-log/auth/callback?redirect=${redirect}`,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage('Check your email for a confirmation link.');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        window.location.href = redirect;
      }
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/ventures/crypto-transaction-log/auth/callback?redirect=${redirect}`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#041833] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <Link
            href="/ventures/crypto-transaction-log"
            className="text-[#3EE5E5] text-sm hover:underline"
          >
            &larr; Back to product page
          </Link>
          <h1 className="text-3xl font-bold text-white mt-4">
            Crypto Transaction <span className="text-orange-500">Log</span>
          </h1>
          <p className="text-[#9DA9B9] mt-2">
            {mode === 'login' ? 'Sign in to your account' : 'Create your free account'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-8">
          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 bg-green-500/20 border border-green-500/40 text-green-300 px-4 py-3 rounded-xl text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-[#9DA9B9] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Hunter Wall"
                  className="w-full bg-[#041833] border border-[#132E4B] rounded-xl px-4 py-3 text-white placeholder-[#9AA2AD] focus:outline-none focus:border-[#3EE5E5]"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#9DA9B9] mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-[#041833] border border-[#132E4B] rounded-xl px-4 py-3 text-white placeholder-[#9AA2AD] focus:outline-none focus:border-[#3EE5E5]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9DA9B9] mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-[#041833] border border-[#132E4B] rounded-xl px-4 py-3 text-white placeholder-[#9AA2AD] focus:outline-none focus:border-[#3EE5E5]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-semibold py-3 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#132E4B]" />
            <span className="text-[#9AA2AD] text-sm">or</span>
            <div className="flex-1 h-px bg-[#132E4B]" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-gray-900 font-medium py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Toggle mode */}
          <p className="text-center text-[#9DA9B9] text-sm mt-6">
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => { setMode('signup'); setError(''); setMessage(''); }}
                  className="text-[#3EE5E5] hover:underline font-medium"
                >
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => { setMode('login'); setError(''); setMessage(''); }}
                  className="text-[#3EE5E5] hover:underline font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
