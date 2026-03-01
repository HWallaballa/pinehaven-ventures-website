'use client';

import { useState, useEffect } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase-client';

export default function ExportPage() {
  const [loading, setLoading] = useState(false);
  const [exchanges, setExchanges] = useState<string[]>([]);
  const [selectedExchange, setSelectedExchange] = useState('All');
  const [totalCount, setTotalCount] = useState(0);
  const [tier, setTier] = useState<'free' | 'premium'>('free');
  const [exported, setExported] = useState(false);

  useEffect(() => {
    async function loadData() {
      const supabase = createSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('tier')
        .eq('id', user.id)
        .single();
      setTier((profile?.tier as 'free' | 'premium') || 'free');

      const { data: txs } = await supabase
        .from('transactions')
        .select('exchange')
        .eq('user_id', user.id);

      const exs = [...new Set(txs?.map((t) => t.exchange) || [])].sort();
      setExchanges(exs);

      const { count } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      setTotalCount(count || 0);
    }
    loadData();
  }, []);

  async function handleExport() {
    setLoading(true);
    setExported(false);
    const supabase = createSupabaseBrowser();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Free tier: single exchange only
    if (tier === 'free' && selectedExchange === 'All' && exchanges.length > 1) {
      alert('Free tier can only export from a single exchange. Select a specific exchange or upgrade to Premium.');
      setLoading(false);
      return;
    }

    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (selectedExchange !== 'All') {
      query = query.eq('exchange', selectedExchange);
    }

    const { data } = await query;
    if (!data || data.length === 0) {
      alert('No transactions to export.');
      setLoading(false);
      return;
    }

    // Build CSV
    const csvHeader = 'Date,Exchange,Type,Buy Amount,Buy Currency,Sell Amount,Sell Currency,Deposit Amount,Deposit Currency,Withdraw Amount,Withdraw Currency,Tag,Note';
    const rows = data.map((tx) => {
      const date = new Date(tx.date).toISOString().slice(0, 10);
      const note = tx.note ? `"${tx.note.replace(/"/g, '""')}"` : '';
      return [
        date, tx.exchange, tx.trans_type,
        tx.buy_amt ?? '', tx.buy_cur ?? '',
        tx.sell_amt ?? '', tx.sell_cur ?? '',
        tx.deposit_amt ?? '', tx.deposit_cur ?? '',
        tx.withdraw_amt ?? '', tx.withdraw_cur ?? '',
        tx.tag ?? '', note,
      ].join(',');
    });

    const csv = [csvHeader, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const label = selectedExchange === 'All' ? 'all_exchanges' : selectedExchange.toLowerCase().replace(/\s/g, '_');
    a.download = `crypto_transactions_${label}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    setLoading(false);
    setExported(true);
  }

  return (
    <div className="p-4 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Export Transactions</h1>

      <div className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-6 space-y-6">
        {/* Stats */}
        <div className="bg-[#132E4B] rounded-xl p-4">
          <p className="text-sm text-[#9DA9B9]">Total Transactions</p>
          <p className="text-3xl font-bold text-[#3EE5E5]">{totalCount}</p>
          <p className="text-xs text-[#9AA2AD] mt-1">across {exchanges.length} exchange{exchanges.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Exchange selector */}
        <div>
          <label className="block text-sm font-medium text-[#9DA9B9] mb-2">Export from</label>
          <select
            value={selectedExchange}
            onChange={(e) => setSelectedExchange(e.target.value)}
            className="w-full bg-[#041833] border border-[#132E4B] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3EE5E5]"
          >
            <option value="All">All Exchanges {tier === 'free' && exchanges.length > 1 ? '(Premium)' : ''}</option>
            {exchanges.map((ex) => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
        </div>

        {/* Tier notice */}
        {tier === 'free' && exchanges.length > 1 && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <p className="text-orange-400 text-sm font-medium">Free Tier Limitation</p>
            <p className="text-[#9DA9B9] text-sm mt-1">
              Free users can export from a single exchange at a time. Upgrade to Premium for combined multi-exchange exports.
            </p>
          </div>
        )}

        {/* Format info */}
        <div className="text-sm text-[#9DA9B9]">
          Export format: <span className="text-white font-medium">CSV</span> (compatible with Excel, Google Sheets, and tax software)
        </div>

        {/* Export button */}
        <button
          onClick={handleExport}
          disabled={loading || totalCount === 0}
          className="w-full bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-semibold py-3 rounded-xl disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          {loading ? 'Exporting...' : 'Download CSV'}
        </button>

        {exported && (
          <div className="bg-green-500/20 border border-green-500/40 text-green-300 px-4 py-3 rounded-xl text-sm text-center">
            Export downloaded successfully!
          </div>
        )}
      </div>
    </div>
  );
}
