'use client';

import { useState, useRef } from 'react';
import { Transaction, generateId, parseCSV } from './types';

interface ImportWizardProps {
  onImport: (transactions: Transaction[]) => void;
  onCancel: () => void;
}

type Step = 'upload' | 'preview' | 'mapping' | 'review';

export default function ImportWizard({ onImport, onCancel }: ImportWizardProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>('upload');
  const [exchange, setExchange] = useState('');
  const [tag, setTag] = useState('');
  const [rawData, setRawData] = useState<string[][]>([]);
  const [headerRow, setHeaderRow] = useState<number>(0);
  const [mapping, setMapping] = useState({
    date: -1,
    type: -1,
    buyAmt: -1,
    buyCur: -1,
    sellAmt: -1,
    sellCur: -1,
    staticType: 'Buy' as Transaction['transType'],
  });
  const [parsed, setParsed] = useState<Transaction[]>([]);
  const [error, setError] = useState('');

  const headers = rawData.length > 0 ? rawData[headerRow] : [];
  const dataRows = rawData.length > 0 ? rawData.filter((_, i) => i !== headerRow) : [];

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const rows = parseCSV(text);
      if (rows.length < 2) {
        setError('File must contain at least 2 rows (header + data).');
        return;
      }
      setRawData(rows);
    };
    reader.readAsText(file);
  }

  function goToMapping() {
    if (!exchange.trim()) {
      setError('Please enter an exchange name.');
      return;
    }
    if (rawData.length === 0) {
      setError('Please upload a CSV file first.');
      return;
    }
    setError('');
    setStep('preview');
  }

  function goToReview() {
    if (mapping.date < 0) {
      setError('Please map at least the Date column.');
      return;
    }
    setError('');

    const transactions: Transaction[] = [];
    for (const row of dataRows) {
      const dateStr = row[mapping.date] ?? '';
      const dateVal = new Date(dateStr);
      if (isNaN(dateVal.getTime())) continue;

      const type: Transaction['transType'] = mapping.type >= 0
        ? parseTransType(row[mapping.type])
        : mapping.staticType;

      const tx: Transaction = {
        id: generateId(),
        transType: type,
        exchange: exchange.trim(),
        date: dateVal,
        tag: tag.trim() || undefined,
      };

      const amt1 = mapping.buyAmt >= 0 ? parseFloat(row[mapping.buyAmt]?.replace(/[^0-9.\-]/g, '')) : NaN;
      const cur1 = mapping.buyCur >= 0 ? row[mapping.buyCur]?.trim() : '';
      const amt2 = mapping.sellAmt >= 0 ? parseFloat(row[mapping.sellAmt]?.replace(/[^0-9.\-]/g, '')) : NaN;
      const cur2 = mapping.sellCur >= 0 ? row[mapping.sellCur]?.trim() : '';

      if (type === 'Buy') {
        if (!isNaN(amt1)) { tx.buyAmt = Math.abs(amt1); tx.buyCur = cur1; }
        if (!isNaN(amt2)) { tx.sellAmt = Math.abs(amt2); tx.sellCur = cur2; }
      } else if (type === 'Sell') {
        if (!isNaN(amt1)) { tx.sellAmt = Math.abs(amt1); tx.sellCur = cur1; }
        if (!isNaN(amt2)) { tx.buyAmt = Math.abs(amt2); tx.buyCur = cur2; }
      } else if (type === 'Deposit') {
        if (!isNaN(amt1)) { tx.depositAmt = Math.abs(amt1); tx.depositCur = cur1; }
      } else if (type === 'Withdraw') {
        if (!isNaN(amt1)) { tx.withdrawAmt = Math.abs(amt1); tx.withdrawCur = cur1; }
      }

      transactions.push(tx);
    }

    setParsed(transactions);
    setStep('review');
  }

  function parseTransType(val: string): Transaction['transType'] {
    const v = val?.toLowerCase().trim() ?? '';
    if (v.includes('buy') || v === 'receive') return 'Buy';
    if (v.includes('sell') || v === 'send') return 'Sell';
    if (v.includes('deposit') || v.includes('receive')) return 'Deposit';
    if (v.includes('withdraw') || v.includes('send')) return 'Withdraw';
    return 'Buy';
  }

  const colOptions = headers.map((h, i) => ({ label: h || `Column ${i + 1}`, value: i }));

  return (
    <div className="min-h-screen bg-[#041833] text-white">
      {/* Header */}
      <div className="bg-[#0B2850] border-b border-[#132E4B] px-4 py-4 flex items-center justify-between">
        <button onClick={onCancel} className="text-[#3EE5E5] font-medium text-sm hover:underline">
          &larr; Cancel
        </button>
        <h1 className="text-lg font-bold">Import CSV</h1>
        <div className="w-16" />
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 py-4 px-4">
        {(['upload', 'preview', 'mapping', 'review'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === s ? 'bg-[#3EE5E5] text-[#041833]'
                : (['upload', 'preview', 'mapping', 'review'].indexOf(step) > i ? 'bg-green-600 text-white' : 'bg-[#132E4B] text-[#9DA9B9]')
            }`}>
              {['upload', 'preview', 'mapping', 'review'].indexOf(step) > i ? '✓' : i + 1}
            </div>
            {i < 3 && <div className="w-8 h-0.5 bg-[#132E4B]" />}
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Upload */}
        {step === 'upload' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Upload Transaction File</h2>
              <p className="text-[#9DA9B9] text-sm">Select a CSV file from any crypto exchange.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9DA9B9] mb-2">Exchange Name *</label>
              <input
                type="text"
                value={exchange}
                onChange={e => setExchange(e.target.value)}
                placeholder="e.g. Coinbase, Binance, Kraken..."
                className="w-full bg-[#0B2850] border border-[#132E4B] rounded-xl px-4 py-3 text-white placeholder-[#9AA2AD] focus:outline-none focus:border-[#3EE5E5]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9DA9B9] mb-2">Tag (optional)</label>
              <input
                type="text"
                value={tag}
                onChange={e => setTag(e.target.value)}
                placeholder="e.g. DCA, Long-term, Trading..."
                className="w-full bg-[#0B2850] border border-[#132E4B] rounded-xl px-4 py-3 text-white placeholder-[#9AA2AD] focus:outline-none focus:border-[#3EE5E5]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9DA9B9] mb-2">CSV File *</label>
              <input ref={fileRef} type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full bg-[#0B2850] border-2 border-dashed border-[#132E4B] rounded-xl px-4 py-8 text-center hover:border-[#3EE5E5] transition-colors"
              >
                {rawData.length > 0 ? (
                  <div>
                    <div className="text-[#3EE5E5] font-semibold">{rawData.length} rows loaded</div>
                    <div className="text-[#9DA9B9] text-sm mt-1">Click to replace</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-2">📄</div>
                    <div className="text-[#9DA9B9]">Click to select a CSV file</div>
                  </div>
                )}
              </button>
            </div>

            <button
              onClick={goToMapping}
              disabled={rawData.length === 0 || !exchange.trim()}
              className="w-full bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-semibold py-3 rounded-xl disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Next: Preview Data
            </button>
          </div>
        )}

        {/* Step 2: Preview + Header selection */}
        {step === 'preview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Select Header Row</h2>
              <p className="text-[#9DA9B9] text-sm">Tap the row that contains column headers.</p>
            </div>

            <div className="bg-[#0B2850] rounded-xl border border-[#132E4B] overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm">
                <tbody>
                  {rawData.slice(0, 20).map((row, i) => (
                    <tr
                      key={i}
                      onClick={() => setHeaderRow(i)}
                      className={`cursor-pointer border-b border-[#132E4B] transition-colors ${
                        i === headerRow ? 'bg-[#3EE5E5]/20 text-[#3EE5E5]' : 'hover:bg-[#132E4B] text-[#9DA9B9]'
                      }`}
                    >
                      <td className="px-3 py-2 font-mono text-xs text-[#9AA2AD] w-8">{i + 1}</td>
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2 whitespace-nowrap max-w-[150px] truncate">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {rawData.length > 20 && (
              <p className="text-[#9AA2AD] text-xs text-center">Showing first 20 of {rawData.length} rows</p>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep('upload')} className="flex-1 bg-[#0B2850] border border-[#132E4B] text-white py-3 rounded-xl font-medium hover:bg-[#132E4B]">
                Back
              </button>
              <button onClick={() => { setError(''); setStep('mapping'); }} className="flex-1 bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-semibold py-3 rounded-xl hover:opacity-90">
                Next: Map Columns
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Column Mapping */}
        {step === 'mapping' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Map Columns</h2>
              <p className="text-[#9DA9B9] text-sm">Tell us which columns contain your transaction data.</p>
            </div>

            <div className="space-y-4">
              <MappingSelect
                label="Date Column *"
                value={mapping.date}
                options={colOptions}
                onChange={v => setMapping({ ...mapping, date: v })}
              />

              <div>
                <label className="block text-sm font-medium text-[#9DA9B9] mb-2">Transaction Type</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setMapping({ ...mapping, type: -1 })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${mapping.type < 0 ? 'bg-[#3EE5E5] text-[#041833]' : 'bg-[#0B2850] text-[#9DA9B9]'}`}
                  >
                    Set for all rows
                  </button>
                  <button
                    onClick={() => setMapping({ ...mapping, type: 0 })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${mapping.type >= 0 ? 'bg-[#3EE5E5] text-[#041833]' : 'bg-[#0B2850] text-[#9DA9B9]'}`}
                  >
                    From column
                  </button>
                </div>
                {mapping.type < 0 ? (
                  <select
                    value={mapping.staticType}
                    onChange={e => setMapping({ ...mapping, staticType: e.target.value as Transaction['transType'] })}
                    className="w-full bg-[#0B2850] border border-[#132E4B] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3EE5E5]"
                  >
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                  </select>
                ) : (
                  <MappingSelect label="" value={mapping.type} options={colOptions} onChange={v => setMapping({ ...mapping, type: v })} />
                )}
              </div>

              <div className="border-t border-[#132E4B] pt-4">
                <p className="text-sm font-medium text-[#3EE5E5] mb-3">
                  {mapping.type < 0 && (mapping.staticType === 'Deposit' || mapping.staticType === 'Withdraw')
                    ? 'Amount & Currency'
                    : 'Primary Amount & Currency (what you received)'}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <MappingSelect label="Amount Column" value={mapping.buyAmt} options={colOptions} onChange={v => setMapping({ ...mapping, buyAmt: v })} />
                  <MappingSelect label="Currency Column" value={mapping.buyCur} options={colOptions} onChange={v => setMapping({ ...mapping, buyCur: v })} />
                </div>
              </div>

              {!(mapping.type < 0 && (mapping.staticType === 'Deposit' || mapping.staticType === 'Withdraw')) && (
                <div className="border-t border-[#132E4B] pt-4">
                  <p className="text-sm font-medium text-[#3EE5E5] mb-3">Secondary Amount & Currency (what you gave)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <MappingSelect label="Amount Column" value={mapping.sellAmt} options={colOptions} onChange={v => setMapping({ ...mapping, sellAmt: v })} />
                    <MappingSelect label="Currency Column" value={mapping.sellCur} options={colOptions} onChange={v => setMapping({ ...mapping, sellCur: v })} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('preview')} className="flex-1 bg-[#0B2850] border border-[#132E4B] text-white py-3 rounded-xl font-medium hover:bg-[#132E4B]">
                Back
              </button>
              <button onClick={goToReview} className="flex-1 bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-semibold py-3 rounded-xl hover:opacity-90">
                Next: Review
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 'review' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Review Import</h2>
              <p className="text-[#9DA9B9] text-sm">{parsed.length} transactions parsed from {exchange}.</p>
            </div>

            <div className="bg-[#0B2850] rounded-xl border border-[#132E4B] overflow-y-auto max-h-[400px] divide-y divide-[#132E4B]">
              {parsed.length === 0 ? (
                <div className="px-4 py-8 text-center text-[#9DA9B9]">
                  No transactions could be parsed. Go back and check your column mapping.
                </div>
              ) : (
                parsed.map((tx) => (
                  <div key={tx.id} className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        tx.transType === 'Buy' ? 'bg-green-500/20 text-green-400' :
                        tx.transType === 'Sell' ? 'bg-orange-500/20 text-orange-400' :
                        tx.transType === 'Deposit' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {tx.transType}
                      </span>
                      <span className="text-[#9DA9B9] text-xs ml-2">
                        {tx.date.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-right text-sm">
                      {tx.transType === 'Buy' && tx.buyAmt && (
                        <span className="text-green-400">{tx.buyAmt} {tx.buyCur}</span>
                      )}
                      {tx.transType === 'Sell' && tx.sellAmt && (
                        <span className="text-orange-400">{tx.sellAmt} {tx.sellCur}</span>
                      )}
                      {tx.transType === 'Deposit' && tx.depositAmt && (
                        <span className="text-blue-400">{tx.depositAmt} {tx.depositCur}</span>
                      )}
                      {tx.transType === 'Withdraw' && tx.withdrawAmt && (
                        <span className="text-yellow-400">{tx.withdrawAmt} {tx.withdrawCur}</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('mapping')} className="flex-1 bg-[#0B2850] border border-[#132E4B] text-white py-3 rounded-xl font-medium hover:bg-[#132E4B]">
                Back
              </button>
              <button
                onClick={() => onImport(parsed)}
                disabled={parsed.length === 0}
                className="flex-1 bg-gradient-to-r from-[#3EE5E5] to-[#1B3781] text-white font-semibold py-3 rounded-xl disabled:opacity-40 hover:opacity-90"
              >
                Import {parsed.length} Transactions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MappingSelect({ label, value, options, onChange }: {
  label: string;
  value: number;
  options: { label: string; value: number }[];
  onChange: (v: number) => void;
}) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-[#9DA9B9] mb-1">{label}</label>}
      <select
        value={value}
        onChange={e => onChange(parseInt(e.target.value))}
        className="w-full bg-[#0B2850] border border-[#132E4B] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3EE5E5]"
      >
        <option value={-1}>-- Not mapped --</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
