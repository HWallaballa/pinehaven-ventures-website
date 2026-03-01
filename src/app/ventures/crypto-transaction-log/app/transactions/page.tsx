'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase-client';

type TransType = 'Buy' | 'Sell' | 'Deposit' | 'Withdraw';

interface Transaction {
  id: string;
  trans_type: TransType;
  exchange: string;
  buy_amt: number | null;
  buy_cur: string | null;
  sell_amt: number | null;
  sell_cur: string | null;
  deposit_amt: number | null;
  deposit_cur: string | null;
  withdraw_amt: number | null;
  withdraw_cur: string | null;
  tag: string | null;
  note: string | null;
  date: string;
}

const TYPES: TransType[] = ['Buy', 'Sell', 'Deposit', 'Withdraw'];
const TYPE_COLORS: Record<string, { text: string; bg: string; icon: string }> = {
  Buy: { text: 'text-green-400', bg: 'bg-green-500/20', icon: '↓' },
  Sell: { text: 'text-orange-400', bg: 'bg-orange-500/20', icon: '↑' },
  Deposit: { text: 'text-blue-400', bg: 'bg-blue-500/20', icon: '→' },
  Withdraw: { text: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: '←' },
};
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // Filters
  const [exchangeFilter, setExchangeFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [monthFilter, setMonthFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [modal, setModal] = useState<'none' | 'add' | 'detail'>('none');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [editing, setEditing] = useState(false);

  // Add form
  const [addType, setAddType] = useState<TransType>('Buy');
  const [addExchange, setAddExchange] = useState('');
  const [addAmt1, setAddAmt1] = useState('');
  const [addCur1, setAddCur1] = useState('');
  const [addAmt2, setAddAmt2] = useState('');
  const [addCur2, setAddCur2] = useState('');
  const [addDate, setAddDate] = useState('');
  const [addTag, setAddTag] = useState('');
  const [addNote, setAddNote] = useState('');

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (exchangeFilter !== 'All') params.set('exchange', exchangeFilter);
    if (typeFilter !== 'All') params.set('type', typeFilter);
    params.set('year', String(yearFilter));
    if (monthFilter !== null) params.set('month', String(monthFilter));
    if (searchQuery) params.set('search', searchQuery);
    params.set('page', String(page));
    params.set('limit', '50');

    const res = await fetch(`/api/ctl/transactions?${params}`);
    const data = await res.json();
    setTransactions(data.transactions || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [exchangeFilter, typeFilter, yearFilter, monthFilter, searchQuery, page]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Get exchange list from loaded transactions for filter chips
  const [allExchanges, setAllExchanges] = useState<string[]>([]);
  useEffect(() => {
    async function loadExchanges() {
      const supabase = createSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('transactions')
        .select('exchange')
        .eq('user_id', user.id);
      const exs = [...new Set(data?.map((t) => t.exchange) || [])].sort();
      setAllExchanges(exs);
    }
    loadExchanges();
  }, [transactions]);

  const exchanges = useMemo(() => ['All', ...allExchanges], [allExchanges]);

  function resetAddForm() {
    setAddType('Buy'); setAddExchange(''); setAddAmt1(''); setAddCur1('');
    setAddAmt2(''); setAddCur2(''); setAddDate(''); setAddTag(''); setAddNote('');
  }

  async function handleAdd() {
    if (!addExchange.trim() || !addDate) return;
    const body: Record<string, unknown> = {
      trans_type: addType,
      exchange: addExchange.trim(),
      date: new Date(addDate).toISOString(),
      tag: addTag.trim() || null,
      note: addNote.trim() || null,
    };
    const a1 = parseFloat(addAmt1);
    const a2 = parseFloat(addAmt2);
    if (addType === 'Buy') {
      if (!isNaN(a1)) { body.buy_amt = a1; body.buy_cur = addCur1.toUpperCase(); }
      if (!isNaN(a2)) { body.sell_amt = a2; body.sell_cur = addCur2.toUpperCase(); }
    } else if (addType === 'Sell') {
      if (!isNaN(a1)) { body.sell_amt = a1; body.sell_cur = addCur1.toUpperCase(); }
      if (!isNaN(a2)) { body.buy_amt = a2; body.buy_cur = addCur2.toUpperCase(); }
    } else if (addType === 'Deposit') {
      if (!isNaN(a1)) { body.deposit_amt = a1; body.deposit_cur = addCur1.toUpperCase(); }
    } else {
      if (!isNaN(a1)) { body.withdraw_amt = a1; body.withdraw_cur = addCur1.toUpperCase(); }
    }

    const res = await fetch('/api/ctl/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      resetAddForm();
      setModal('none');
      fetchTransactions();
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch('/api/ctl/transactions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setModal('none');
      setSelectedTx(null);
      fetchTransactions();
    }
  }

  async function handleSaveEdit() {
    if (!selectedTx) return;
    const res = await fetch('/api/ctl/transactions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedTx),
    });
    if (res.ok) {
      setEditing(false);
      fetchTransactions();
    }
  }

  function formatAmount(amt: number | null, cur: string | null) {
    if (amt === null || amt === undefined) return '';
    return `${amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} ${cur || ''}`;
  }

  function getPrimaryAmount(tx: Transaction) {
    if (tx.trans_type === 'Buy') return formatAmount(tx.buy_amt, tx.buy_cur);
    if (tx.trans_type === 'Sell') return formatAmount(tx.sell_amt, tx.sell_cur);
    if (tx.trans_type === 'Deposit') return formatAmount(tx.deposit_amt, tx.deposit_cur);
    return formatAmount(tx.withdraw_amt, tx.withdraw_cur);
  }

  const totalPages = Math.ceil(total / 50);

  return (
    <div className="p-4 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <button
          onClick={() => { resetAddForm(); setModal('add'); }}
          className="px-4 py-2 bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white rounded-xl font-medium text-sm hover:opacity-90 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>

      {/* Exchange chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3">
        {exchanges.map((ex) => (
          <button
            key={ex}
            onClick={() => { setExchangeFilter(ex); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              ex === exchangeFilter
                ? 'bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white'
                : 'bg-[#0B2850] text-[#9DA9B9] hover:text-white'
            }`}
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Year + Month */}
      <div className="mb-3">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => { setYearFilter((y) => y - 1); setPage(1); }} className="text-[#9DA9B9] hover:text-white text-lg">&lsaquo;</button>
          <span className="text-sm font-bold text-[#3EE5E5] min-w-[40px] text-center">{yearFilter}</span>
          <button onClick={() => { setYearFilter((y) => y + 1); setPage(1); }} className="text-[#9DA9B9] hover:text-white text-lg">&rsaquo;</button>
          <button
            onClick={() => { setMonthFilter(null); setPage(1); }}
            className={`ml-2 px-3 py-1 rounded-lg text-xs font-medium ${monthFilter === null ? 'bg-[#3EE5E5] text-[#041833]' : 'bg-[#0B2850] text-[#9DA9B9]'}`}
          >
            All
          </button>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {MONTHS.map((m, i) => (
            <button
              key={m}
              onClick={() => { setMonthFilter(i === monthFilter ? null : i); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                i === monthFilter ? 'bg-[#3EE5E5] text-[#041833]' : 'bg-[#0B2850] text-[#9DA9B9] hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Type Filter */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 relative">
          <svg className="w-4 h-4 text-[#9AA2AD] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Search currency, exchange, tag..."
            className="w-full bg-[#0B2850] border border-[#132E4B] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-[#9AA2AD] focus:outline-none focus:border-[#3EE5E5]"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className="bg-[#0B2850] border border-[#132E4B] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EE5E5]"
        >
          <option value="All">All Types</option>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#9AA2AD]">{total} transaction{total !== 1 ? 's' : ''}</span>
        {(exchangeFilter !== 'All' || typeFilter !== 'All' || monthFilter !== null || searchQuery) && (
          <button
            onClick={() => { setExchangeFilter('All'); setTypeFilter('All'); setMonthFilter(null); setSearchQuery(''); setPage(1); }}
            className="text-xs text-[#3EE5E5] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Transaction List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-[#3EE5E5] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#9DA9B9] mt-3">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-[#9DA9B9]">No transactions found</p>
          <p className="text-[#9AA2AD] text-sm mt-1">Try adjusting your filters or add a new transaction.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {transactions.map((tx) => {
            const colors = TYPE_COLORS[tx.trans_type];
            return (
              <button
                key={tx.id}
                onClick={() => { setSelectedTx(tx); setEditing(false); setModal('detail'); }}
                className="w-full bg-[#0B2850] rounded-2xl px-4 py-3 flex items-center gap-3 hover:bg-[#132E4B] transition-colors text-left"
              >
                <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-lg font-bold ${colors.text}`}>{colors.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${colors.text}`}>{tx.trans_type}</span>
                    {tx.tag && (
                      <span className="px-2 py-0.5 rounded-full bg-[#3EE5E5]/10 text-[#3EE5E5] text-[10px] font-semibold">
                        {tx.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-white text-sm font-medium truncate">{getPrimaryAmount(tx)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#9DA9B9] text-xs">{tx.exchange}</p>
                  <p className="text-[#9AA2AD] text-[11px]">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-sm bg-[#0B2850] text-[#9DA9B9] disabled:opacity-40 hover:text-white"
          >
            Prev
          </button>
          <span className="text-sm text-[#9DA9B9]">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm bg-[#0B2850] text-[#9DA9B9] disabled:opacity-40 hover:text-white"
          >
            Next
          </button>
        </div>
      )}

      {/* Add Transaction Modal */}
      {modal === 'add' && (
        <Modal onClose={() => setModal('none')} title="Add Transaction">
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-1.5">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setAddType(t)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    addType === t ? `${TYPE_COLORS[t].bg} ${TYPE_COLORS[t].text}` : 'bg-[#132E4B] text-[#9DA9B9]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <Input label="Exchange *" value={addExchange} onChange={setAddExchange} placeholder="e.g. Coinbase" />
            <Input label="Date *" value={addDate} onChange={setAddDate} type="date" />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label={addType === 'Deposit' ? 'Amount' : addType === 'Withdraw' ? 'Amount' : addType === 'Buy' ? 'Buy Amount' : 'Sell Amount'}
                value={addAmt1} onChange={setAddAmt1} placeholder="0.00" type="number"
              />
              <Input label="Currency" value={addCur1} onChange={setAddCur1} placeholder="BTC" />
            </div>

            {(addType === 'Buy' || addType === 'Sell') && (
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label={addType === 'Buy' ? 'Cost Amount' : 'Received Amount'}
                  value={addAmt2} onChange={setAddAmt2} placeholder="0.00" type="number"
                />
                <Input label="Currency" value={addCur2} onChange={setAddCur2} placeholder="USD" />
              </div>
            )}

            <Input label="Tag" value={addTag} onChange={setAddTag} placeholder="Optional tag" />
            <Input label="Note" value={addNote} onChange={setAddNote} placeholder="Optional note" />

            <button
              onClick={handleAdd}
              disabled={!addExchange.trim() || !addDate}
              className="w-full bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-semibold py-3 rounded-xl disabled:opacity-40 hover:opacity-90"
            >
              Add Transaction
            </button>
          </div>
        </Modal>
      )}

      {/* Detail Modal */}
      {modal === 'detail' && selectedTx && (
        <Modal onClose={() => { setModal('none'); setEditing(false); }} title="Transaction Details">
          {editing ? (
            <div className="space-y-4">
              <Input label="Exchange" value={selectedTx.exchange} onChange={(v) => setSelectedTx({ ...selectedTx, exchange: v })} />
              <Input label="Date" value={selectedTx.date.slice(0, 10)} onChange={(v) => setSelectedTx({ ...selectedTx, date: new Date(v).toISOString() })} type="date" />
              <Input label="Tag" value={selectedTx.tag ?? ''} onChange={(v) => setSelectedTx({ ...selectedTx, tag: v || null })} placeholder="Optional tag" />
              <Input label="Note" value={selectedTx.note ?? ''} onChange={(v) => setSelectedTx({ ...selectedTx, note: v || null })} placeholder="Optional note" />
              <div className="flex gap-3">
                <button onClick={() => setEditing(false)} className="flex-1 bg-[#132E4B] text-[#9DA9B9] py-3 rounded-xl font-medium hover:bg-[#1a3d5e]">Cancel</button>
                <button onClick={handleSaveEdit} className="flex-1 bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-semibold py-3 rounded-xl hover:opacity-90">Save</button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${TYPE_COLORS[selectedTx.trans_type].bg} flex items-center justify-center`}>
                  <span className={`text-xl font-bold ${TYPE_COLORS[selectedTx.trans_type].text}`}>{TYPE_COLORS[selectedTx.trans_type].icon}</span>
                </div>
                <div>
                  <span className={`text-sm font-bold ${TYPE_COLORS[selectedTx.trans_type].text}`}>{selectedTx.trans_type}</span>
                  <p className="text-white font-semibold">{selectedTx.exchange}</p>
                </div>
              </div>

              <div className="bg-[#132E4B] rounded-xl p-4 space-y-3">
                {selectedTx.trans_type === 'Buy' && (
                  <>
                    <Row label="Bought" value={formatAmount(selectedTx.buy_amt, selectedTx.buy_cur)} />
                    {selectedTx.sell_amt && <Row label="Cost" value={formatAmount(selectedTx.sell_amt, selectedTx.sell_cur)} />}
                  </>
                )}
                {selectedTx.trans_type === 'Sell' && (
                  <>
                    <Row label="Sold" value={formatAmount(selectedTx.sell_amt, selectedTx.sell_cur)} />
                    {selectedTx.buy_amt && <Row label="Received" value={formatAmount(selectedTx.buy_amt, selectedTx.buy_cur)} />}
                  </>
                )}
                {selectedTx.trans_type === 'Deposit' && (
                  <Row label="Deposited" value={formatAmount(selectedTx.deposit_amt, selectedTx.deposit_cur)} />
                )}
                {selectedTx.trans_type === 'Withdraw' && (
                  <Row label="Withdrawn" value={formatAmount(selectedTx.withdraw_amt, selectedTx.withdraw_cur)} />
                )}
                <Row label="Date" value={new Date(selectedTx.date).toLocaleDateString()} />
                {selectedTx.tag && <Row label="Tag" value={selectedTx.tag} />}
                {selectedTx.note && <Row label="Note" value={selectedTx.note} />}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setEditing(true)} className="flex-1 bg-[#132E4B] border border-[#3EE5E5]/30 text-[#3EE5E5] py-3 rounded-xl font-medium hover:bg-[#1a3d5e]">Edit</button>
                <button onClick={() => handleDelete(selectedTx.id)} className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 py-3 rounded-xl font-medium hover:bg-red-500/20">Delete</button>
              </div>
            </div>
          )}
        </Modal>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

/* ─── Sub-components ─── */

function Modal({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#0B2850] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto border border-[#132E4B]">
        <div className="sticky top-0 bg-[#0B2850] px-6 pt-6 pb-3 flex items-center justify-between border-b border-[#132E4B]">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#132E4B] flex items-center justify-center text-[#9DA9B9] hover:text-white">✕</button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-[#9DA9B9] text-sm">{label}</span>
      <span className="text-white text-sm font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#9DA9B9] mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#041833] border border-[#132E4B] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#9AA2AD] focus:outline-none focus:border-[#3EE5E5]"
      />
    </div>
  );
}
