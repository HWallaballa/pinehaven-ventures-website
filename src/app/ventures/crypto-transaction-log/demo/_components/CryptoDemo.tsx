'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Transaction, sampleTransactions, TRANSACTION_TYPES, TYPE_COLORS, MONTHS,
  generateId, formatDate, formatAmount, transactionToCSVRow, CSV_HEADER,
} from './types';
import ImportWizard from './ImportWizard';

export default function CryptoDemo() {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [view, setView] = useState<'dashboard' | 'import'>('dashboard');
  const [modal, setModal] = useState<'none' | 'add' | 'export' | 'detail'>('none');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [exchangeFilter, setExchangeFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState(2025);
  const [monthFilter, setMonthFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  // Add form state
  const [addType, setAddType] = useState<Transaction['transType']>('Buy');
  const [addExchange, setAddExchange] = useState('');
  const [addAmt1, setAddAmt1] = useState('');
  const [addCur1, setAddCur1] = useState('');
  const [addAmt2, setAddAmt2] = useState('');
  const [addCur2, setAddCur2] = useState('');
  const [addDate, setAddDate] = useState('');
  const [addTag, setAddTag] = useState('');
  const [addNote, setAddNote] = useState('');

  const exchanges = useMemo(() => {
    const exs = [...new Set(transactions.map(t => t.exchange))].sort();
    return ['All', ...exs];
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        if (exchangeFilter !== 'All' && t.exchange !== exchangeFilter) return false;
        if (typeFilter !== 'All' && t.transType !== typeFilter) return false;
        if (t.date.getFullYear() !== yearFilter) return false;
        if (monthFilter !== null && t.date.getMonth() !== monthFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const fields = [t.exchange, t.buyCur, t.sellCur, t.depositCur, t.withdrawCur, t.tag, t.note];
          return fields.some(f => f?.toLowerCase().includes(q));
        }
        return true;
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [transactions, exchangeFilter, typeFilter, yearFilter, monthFilter, searchQuery]);

  function handleAdd() {
    if (!addExchange.trim() || !addDate) return;
    const tx: Transaction = {
      id: generateId(),
      transType: addType,
      exchange: addExchange.trim(),
      date: new Date(addDate),
      tag: addTag.trim() || undefined,
      note: addNote.trim() || undefined,
    };
    const a1 = parseFloat(addAmt1);
    const a2 = parseFloat(addAmt2);
    if (addType === 'Buy') {
      if (!isNaN(a1)) { tx.buyAmt = a1; tx.buyCur = addCur1.toUpperCase(); }
      if (!isNaN(a2)) { tx.sellAmt = a2; tx.sellCur = addCur2.toUpperCase(); }
    } else if (addType === 'Sell') {
      if (!isNaN(a1)) { tx.sellAmt = a1; tx.sellCur = addCur1.toUpperCase(); }
      if (!isNaN(a2)) { tx.buyAmt = a2; tx.buyCur = addCur2.toUpperCase(); }
    } else if (addType === 'Deposit') {
      if (!isNaN(a1)) { tx.depositAmt = a1; tx.depositCur = addCur1.toUpperCase(); }
    } else {
      if (!isNaN(a1)) { tx.withdrawAmt = a1; tx.withdrawCur = addCur1.toUpperCase(); }
    }
    setTransactions([...transactions, tx]);
    resetAddForm();
    setModal('none');
  }

  function handleSaveEdit() {
    if (!editingTx) return;
    setTransactions(transactions.map(t => t.id === editingTx.id ? editingTx : t));
    setEditingTx(null);
    setSelectedTx(editingTx);
  }

  function handleDelete(id: string) {
    setTransactions(transactions.filter(t => t.id !== id));
    setModal('none');
    setSelectedTx(null);
  }

  function handleExport() {
    const rows = filteredTransactions.map(transactionToCSVRow);
    const csv = [CSV_HEADER, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crypto_transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setModal('none');
  }

  function handleImport(newTxs: Transaction[]) {
    setTransactions([...transactions, ...newTxs]);
    setView('dashboard');
  }

  function resetAddForm() {
    setAddType('Buy'); setAddExchange(''); setAddAmt1(''); setAddCur1('');
    setAddAmt2(''); setAddCur2(''); setAddDate(''); setAddTag(''); setAddNote('');
  }

  function openAdd() { resetAddForm(); setModal('add'); }

  // Import view
  if (view === 'import') {
    return <ImportWizard onImport={handleImport} onCancel={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#041833] text-white flex flex-col">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white text-center py-2 text-sm font-medium px-4">
        Interactive Demo — your data lives in this browser session
      </div>

      {/* Top Bar */}
      <header className="bg-[#0B2850] border-b border-[#132E4B] px-4 py-3 flex items-center justify-between">
        <Link href="/ventures/crypto-transaction-log" className="text-[#3EE5E5] text-sm font-medium hover:underline">
          &larr; Back
        </Link>
        <h1 className="text-lg font-bold tracking-tight">Crypto Transaction Log</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setModal('export')} className="w-9 h-9 rounded-lg bg-[#132E4B] flex items-center justify-center hover:bg-[#1a3d5e] transition-colors" title="Export">
            <svg className="w-5 h-5 text-[#3EE5E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
          <button onClick={() => setView('import')} className="w-9 h-9 rounded-lg bg-[#132E4B] flex items-center justify-center hover:bg-[#1a3d5e] transition-colors" title="Import CSV">
            <svg className="w-5 h-5 text-[#3EE5E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          </button>
          <button onClick={openAdd} className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] flex items-center justify-center hover:opacity-90 transition-opacity" title="Add Transaction">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      </header>

      {/* Exchange Chips */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {exchanges.map(ex => (
          <button
            key={ex}
            onClick={() => setExchangeFilter(ex)}
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

      {/* Year + Month Selector */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => setYearFilter(y => y - 1)} className="text-[#9DA9B9] hover:text-white text-lg">&lsaquo;</button>
          <span className="text-sm font-bold text-[#3EE5E5] min-w-[40px] text-center">{yearFilter}</span>
          <button onClick={() => setYearFilter(y => y + 1)} className="text-[#9DA9B9] hover:text-white text-lg">&rsaquo;</button>
          <button
            onClick={() => setMonthFilter(null)}
            className={`ml-2 px-3 py-1 rounded-lg text-xs font-medium ${monthFilter === null ? 'bg-[#3EE5E5] text-[#041833]' : 'bg-[#0B2850] text-[#9DA9B9]'}`}
          >
            All
          </button>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {MONTHS.map((m, i) => (
            <button
              key={m}
              onClick={() => setMonthFilter(i === monthFilter ? null : i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                i === monthFilter
                  ? 'bg-[#3EE5E5] text-[#041833]'
                  : 'bg-[#0B2850] text-[#9DA9B9] hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Type Filter */}
      <div className="px-4 py-2 flex gap-2">
        <div className="flex-1 relative">
          <svg className="w-4 h-4 text-[#9AA2AD] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search currency, exchange, tag..."
            className="w-full bg-[#0B2850] border border-[#132E4B] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-[#9AA2AD] focus:outline-none focus:border-[#3EE5E5]"
          />
        </div>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="bg-[#0B2850] border border-[#132E4B] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3EE5E5]"
        >
          <option value="All">All Types</option>
          {TRANSACTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Transaction Count */}
      <div className="px-4 py-2 flex items-center justify-between">
        <span className="text-xs text-[#9AA2AD]">{filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}</span>
        {(exchangeFilter !== 'All' || typeFilter !== 'All' || monthFilter !== null || searchQuery) && (
          <button
            onClick={() => { setExchangeFilter('All'); setTypeFilter('All'); setMonthFilter(null); setSearchQuery(''); }}
            className="text-xs text-[#3EE5E5] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-[#9DA9B9]">No transactions found</p>
            <p className="text-[#9AA2AD] text-sm mt-1">Try adjusting your filters or add a new transaction.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTransactions.map(tx => (
              <TransactionRow
                key={tx.id}
                tx={tx}
                onClick={() => { setSelectedTx(tx); setEditingTx(null); setModal('detail'); }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {modal === 'add' && (
        <Modal onClose={() => setModal('none')} title="Add Transaction">
          <div className="space-y-4">
            {/* Type selector */}
            <div className="grid grid-cols-4 gap-1.5">
              {TRANSACTION_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setAddType(t)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    addType === t
                      ? `${TYPE_COLORS[t].bg} ${TYPE_COLORS[t].text}`
                      : 'bg-[#132E4B] text-[#9DA9B9]'
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
              <Input
                label="Currency"
                value={addCur1} onChange={setAddCur1} placeholder="BTC"
              />
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

      {/* Export Modal */}
      {modal === 'export' && (
        <Modal onClose={() => setModal('none')} title="Export Transactions">
          <div className="space-y-4">
            <div className="bg-[#132E4B] rounded-xl p-4">
              <p className="text-sm text-[#9DA9B9] mb-1">Exporting</p>
              <p className="text-2xl font-bold text-[#3EE5E5]">{filteredTransactions.length}</p>
              <p className="text-xs text-[#9AA2AD] mt-1">
                transactions{exchangeFilter !== 'All' ? ` from ${exchangeFilter}` : ''}{monthFilter !== null ? ` in ${MONTHS[monthFilter]}` : ''} {yearFilter}
              </p>
            </div>
            <p className="text-sm text-[#9DA9B9]">
              Your current filters will be applied. The file includes all transaction details in CSV format.
            </p>
            <button
              onClick={handleExport}
              disabled={filteredTransactions.length === 0}
              className="w-full bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-semibold py-3 rounded-xl disabled:opacity-40 hover:opacity-90"
            >
              Download CSV
            </button>
          </div>
        </Modal>
      )}

      {/* Transaction Detail Modal */}
      {modal === 'detail' && selectedTx && (
        <Modal onClose={() => { setModal('none'); setEditingTx(null); }} title="Transaction Details">
          {editingTx ? (
            <EditView tx={editingTx} onChange={setEditingTx} onSave={handleSaveEdit} onCancel={() => setEditingTx(null)} />
          ) : (
            <DetailView tx={selectedTx} onEdit={() => setEditingTx({ ...selectedTx })} onDelete={() => handleDelete(selectedTx.id)} />
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

function TransactionRow({ tx, onClick }: { tx: Transaction; onClick: () => void }) {
  const colors = TYPE_COLORS[tx.transType];

  let primary = '';
  let secondary = '';
  if (tx.transType === 'Buy') {
    primary = `${formatAmount(tx.buyAmt ?? 0, tx.buyCur)} ${tx.buyCur ?? ''}`;
    secondary = tx.sellAmt ? `${formatAmount(tx.sellAmt, tx.sellCur)} ${tx.sellCur ?? ''}` : '';
  } else if (tx.transType === 'Sell') {
    primary = `${formatAmount(tx.sellAmt ?? 0, tx.sellCur)} ${tx.sellCur ?? ''}`;
    secondary = tx.buyAmt ? `${formatAmount(tx.buyAmt, tx.buyCur)} ${tx.buyCur ?? ''}` : '';
  } else if (tx.transType === 'Deposit') {
    primary = `${formatAmount(tx.depositAmt ?? 0, tx.depositCur)} ${tx.depositCur ?? ''}`;
  } else {
    primary = `${formatAmount(tx.withdrawAmt ?? 0, tx.withdrawCur)} ${tx.withdrawCur ?? ''}`;
  }

  return (
    <button
      onClick={onClick}
      className="w-full bg-[#0B2850] rounded-2xl px-4 py-3 flex items-center gap-3 hover:bg-[#132E4B] transition-colors text-left"
    >
      {/* Type icon */}
      <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
        <span className={`text-lg font-bold ${colors.text}`}>{colors.icon}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${colors.text}`}>{tx.transType}</span>
          {tx.tag && (
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#3EE5E5]/20 to-[#1B3781]/20 text-[#3EE5E5] text-[10px] font-semibold">
              {tx.tag}
            </span>
          )}
        </div>
        <p className="text-white text-sm font-medium truncate">{primary}</p>
        {secondary && <p className="text-[#9AA2AD] text-xs truncate">{tx.transType === 'Buy' ? 'Cost' : 'Received'}: {secondary}</p>}
      </div>

      {/* Right side */}
      <div className="text-right flex-shrink-0">
        <p className="text-[#9DA9B9] text-xs">{tx.exchange}</p>
        <p className="text-[#9AA2AD] text-[11px]">{formatDate(tx.date)}</p>
        {tx.note && <span className="text-[#3EE5E5] text-[10px]">📝</span>}
      </div>
    </button>
  );
}

function Modal({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#0B2850] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto border border-[#132E4B]">
        <div className="sticky top-0 bg-[#0B2850] px-6 pt-6 pb-3 flex items-center justify-between border-b border-[#132E4B]">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#132E4B] flex items-center justify-center text-[#9DA9B9] hover:text-white">
            ✕
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

function DetailView({ tx, onEdit, onDelete }: { tx: Transaction; onEdit: () => void; onDelete: () => void }) {
  const colors = TYPE_COLORS[tx.transType];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center`}>
          <span className={`text-xl font-bold ${colors.text}`}>{colors.icon}</span>
        </div>
        <div>
          <span className={`text-sm font-bold ${colors.text}`}>{tx.transType}</span>
          <p className="text-white font-semibold">{tx.exchange}</p>
        </div>
      </div>

      <div className="bg-[#132E4B] rounded-xl p-4 space-y-3">
        {tx.transType === 'Buy' && (
          <>
            <Row label="Bought" value={`${formatAmount(tx.buyAmt ?? 0, tx.buyCur)} ${tx.buyCur ?? ''}`} />
            {tx.sellAmt && <Row label="Cost" value={`${formatAmount(tx.sellAmt, tx.sellCur)} ${tx.sellCur ?? ''}`} />}
            {tx.buyAmt && tx.sellAmt && <Row label="Rate" value={`1 ${tx.buyCur} = ${formatAmount(tx.sellAmt / tx.buyAmt, tx.sellCur)} ${tx.sellCur}`} />}
          </>
        )}
        {tx.transType === 'Sell' && (
          <>
            <Row label="Sold" value={`${formatAmount(tx.sellAmt ?? 0, tx.sellCur)} ${tx.sellCur ?? ''}`} />
            {tx.buyAmt && <Row label="Received" value={`${formatAmount(tx.buyAmt, tx.buyCur)} ${tx.buyCur ?? ''}`} />}
            {tx.sellAmt && tx.buyAmt && <Row label="Rate" value={`1 ${tx.sellCur} = ${formatAmount(tx.buyAmt / tx.sellAmt, tx.buyCur)} ${tx.buyCur}`} />}
          </>
        )}
        {tx.transType === 'Deposit' && (
          <Row label="Deposited" value={`${formatAmount(tx.depositAmt ?? 0, tx.depositCur)} ${tx.depositCur ?? ''}`} />
        )}
        {tx.transType === 'Withdraw' && (
          <Row label="Withdrawn" value={`${formatAmount(tx.withdrawAmt ?? 0, tx.withdrawCur)} ${tx.withdrawCur ?? ''}`} />
        )}
        <Row label="Date" value={formatDate(tx.date)} />
        {tx.tag && <Row label="Tag" value={tx.tag} />}
        {tx.note && <Row label="Note" value={tx.note} />}
      </div>

      <div className="flex gap-3">
        <button onClick={onEdit} className="flex-1 bg-[#132E4B] border border-[#3EE5E5]/30 text-[#3EE5E5] py-3 rounded-xl font-medium hover:bg-[#1a3d5e]">
          Edit
        </button>
        <button onClick={onDelete} className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 py-3 rounded-xl font-medium hover:bg-red-500/20">
          Delete
        </button>
      </div>
    </div>
  );
}

function EditView({ tx, onChange, onSave, onCancel }: { tx: Transaction; onChange: (tx: Transaction) => void; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="space-y-4">
      <Input label="Exchange" value={tx.exchange} onChange={v => onChange({ ...tx, exchange: v })} />
      <Input label="Date" value={tx.date.toISOString().slice(0, 10)} onChange={v => onChange({ ...tx, date: new Date(v) })} type="date" />
      <Input label="Tag" value={tx.tag ?? ''} onChange={v => onChange({ ...tx, tag: v || undefined })} placeholder="Optional tag" />
      <Input label="Note" value={tx.note ?? ''} onChange={v => onChange({ ...tx, note: v || undefined })} placeholder="Optional note" />
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 bg-[#132E4B] text-[#9DA9B9] py-3 rounded-xl font-medium hover:bg-[#1a3d5e]">
          Cancel
        </button>
        <button onClick={onSave} className="flex-1 bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-semibold py-3 rounded-xl hover:opacity-90">
          Save Changes
        </button>
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
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#041833] border border-[#132E4B] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#9AA2AD] focus:outline-none focus:border-[#3EE5E5]"
      />
    </div>
  );
}
