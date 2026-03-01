'use client';

import { useState, useEffect } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase-client';
import CheckoutButton from '@/app/components/CheckoutButton';

interface Profile {
  display_name: string | null;
  email: string;
  tier: 'free' | 'premium';
  subscription_status: string | null;
  created_at: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [stats, setStats] = useState({ transactions: 0, exchanges: 0, imports: 0 });

  const premiumPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_CTL_PREMIUM || '';

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: p } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (p) {
        setProfile(p as Profile);
        setName(p.display_name || '');
      }

      // Stats
      const { count: txCount } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { data: exData } = await supabase
        .from('transactions')
        .select('exchange')
        .eq('user_id', user.id);

      const { count: importCount } = await supabase
        .from('imports')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setStats({
        transactions: txCount || 0,
        exchanges: new Set(exData?.map((t) => t.exchange) || []).size,
        imports: importCount || 0,
      });
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const supabase = createSupabaseBrowser();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('profiles')
      .update({ display_name: name.trim() })
      .eq('id', user.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!profile) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block w-8 h-8 border-2 border-[#3EE5E5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      {/* Account */}
      <div className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Account</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#9DA9B9] mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#041833] border border-[#132E4B] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#3EE5E5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9DA9B9] mb-1">Email</label>
            <p className="text-white text-sm">{profile.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9DA9B9] mb-1">Member Since</label>
            <p className="text-white text-sm">{new Date(profile.created_at).toLocaleDateString()}</p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-medium rounded-xl text-sm hover:opacity-90 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

          {saved && <p className="text-green-400 text-sm">Saved!</p>}
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Subscription</h2>

        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-sm font-bold px-3 py-1 rounded-full ${
              profile.tier === 'premium'
                ? 'bg-orange-500/20 text-orange-400'
                : 'bg-[#132E4B] text-[#9DA9B9]'
            }`}
          >
            {profile.tier === 'premium' ? 'Premium' : 'Free'}
          </span>
          {profile.subscription_status && profile.subscription_status !== 'none' && (
            <span className="text-sm text-[#9DA9B9]">Status: {profile.subscription_status}</span>
          )}
        </div>

        {profile.tier === 'free' ? (
          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <p className="text-orange-400 font-medium mb-2">Upgrade to Premium — $9/month</p>
              <ul className="text-[#9DA9B9] text-sm space-y-1.5">
                <li>✓ Unlimited exchange support</li>
                <li>✓ Multi-exchange combined exports</li>
                <li>✓ Advanced filters & tags</li>
                <li>✓ Cloud sync across devices</li>
                <li>✓ Priority support</li>
              </ul>
            </div>

            {premiumPriceId && (
              <CheckoutButton
                priceId={premiumPriceId}
                mode="subscription"
                label="Upgrade to Premium"
                className="w-full bg-orange-600 text-white font-semibold py-3 rounded-xl hover:bg-orange-700 transition-colors"
              />
            )}
          </div>
        ) : (
          <p className="text-[#9DA9B9] text-sm">
            You&apos;re on the Premium plan. Thank you for supporting Crypto Transaction Log!
          </p>
        )}
      </div>

      {/* Usage Stats */}
      <div className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-6">
        <h2 className="text-lg font-bold text-white mb-4">Usage</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[#9DA9B9] text-sm">Transactions</p>
            <p className="text-2xl font-bold text-[#3EE5E5]">{stats.transactions}</p>
          </div>
          <div>
            <p className="text-[#9DA9B9] text-sm">Exchanges</p>
            <p className="text-2xl font-bold text-orange-400">{stats.exchanges}</p>
          </div>
          <div>
            <p className="text-[#9DA9B9] text-sm">Imports</p>
            <p className="text-2xl font-bold text-blue-400">{stats.imports}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
