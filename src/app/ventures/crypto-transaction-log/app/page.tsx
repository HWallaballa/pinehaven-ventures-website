import { createSupabaseServer } from '@/lib/supabase';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch stats
  const { count: totalCount } = await supabase
    .from('transactions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user!.id);

  const { data: recentTxs } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user!.id)
    .order('date', { ascending: false })
    .limit(5);

  const { data: exchangeStats } = await supabase
    .from('transactions')
    .select('exchange')
    .eq('user_id', user!.id);

  const uniqueExchanges = new Set(exchangeStats?.map((t) => t.exchange) || []);

  const { data: importHistory } = await supabase
    .from('imports')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const stats = [
    { label: 'Total Transactions', value: totalCount || 0, color: 'text-[#3EE5E5]' },
    { label: 'Exchanges Tracked', value: uniqueExchanges.size, color: 'text-orange-400' },
    { label: 'Imports', value: importHistory?.length || 0, color: 'text-blue-400' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-6"
          >
            <p className="text-[#9DA9B9] text-sm">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/ventures/crypto-transaction-log/app/transactions"
          className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-5 hover:border-[#3EE5E5]/50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#3EE5E5]/20 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-[#3EE5E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-white font-medium group-hover:text-[#3EE5E5] transition-colors">Add Transaction</p>
          <p className="text-[#9AA2AD] text-sm mt-1">Manually log a new transaction</p>
        </Link>

        <Link
          href="/ventures/crypto-transaction-log/app/import"
          className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-5 hover:border-[#3EE5E5]/50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <p className="text-white font-medium group-hover:text-[#3EE5E5] transition-colors">Import File</p>
          <p className="text-[#9AA2AD] text-sm mt-1">Upload CSV or XLS from an exchange</p>
        </Link>

        <Link
          href="/ventures/crypto-transaction-log/app/export"
          className="bg-[#0B2850] rounded-2xl border border-[#132E4B] p-5 hover:border-[#3EE5E5]/50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <p className="text-white font-medium group-hover:text-[#3EE5E5] transition-colors">Export Data</p>
          <p className="text-[#9AA2AD] text-sm mt-1">Download your transaction history</p>
        </Link>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#0B2850] rounded-2xl border border-[#132E4B]">
        <div className="px-6 py-4 border-b border-[#132E4B] flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
          <Link
            href="/ventures/crypto-transaction-log/app/transactions"
            className="text-sm text-[#3EE5E5] hover:underline"
          >
            View all
          </Link>
        </div>

        {!recentTxs || recentTxs.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-[#9DA9B9] font-medium">No transactions yet</p>
            <p className="text-[#9AA2AD] text-sm mt-1">
              Import a file or add your first transaction to get started.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#132E4B]">
            {recentTxs.map((tx) => {
              const typeColors: Record<string, string> = {
                Buy: 'text-green-400',
                Sell: 'text-orange-400',
                Deposit: 'text-blue-400',
                Withdraw: 'text-yellow-400',
              };

              let amount = '';
              if (tx.trans_type === 'Buy' && tx.buy_amt) amount = `${tx.buy_amt} ${tx.buy_cur || ''}`;
              else if (tx.trans_type === 'Sell' && tx.sell_amt) amount = `${tx.sell_amt} ${tx.sell_cur || ''}`;
              else if (tx.trans_type === 'Deposit' && tx.deposit_amt) amount = `${tx.deposit_amt} ${tx.deposit_cur || ''}`;
              else if (tx.trans_type === 'Withdraw' && tx.withdraw_amt) amount = `${tx.withdraw_amt} ${tx.withdraw_cur || ''}`;

              return (
                <div key={tx.id} className="px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${typeColors[tx.trans_type] || 'text-white'}`}>
                      {tx.trans_type}
                    </span>
                    <span className="text-white text-sm">{amount}</span>
                    {tx.tag && (
                      <span className="px-2 py-0.5 rounded-full bg-[#3EE5E5]/10 text-[#3EE5E5] text-[10px] font-semibold">
                        {tx.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[#9DA9B9] text-xs">{tx.exchange}</p>
                    <p className="text-[#9AA2AD] text-[11px]">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
