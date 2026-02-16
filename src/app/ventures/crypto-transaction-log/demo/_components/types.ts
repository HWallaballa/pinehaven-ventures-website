export interface Transaction {
  id: string;
  transType: 'Buy' | 'Sell' | 'Deposit' | 'Withdraw';
  exchange: string;
  buyAmt?: number;
  buyCur?: string;
  sellAmt?: number;
  sellCur?: string;
  depositAmt?: number;
  depositCur?: string;
  withdrawAmt?: number;
  withdrawCur?: string;
  tag?: string;
  note?: string;
  date: Date;
}

export const TRANSACTION_TYPES = ['Buy', 'Sell', 'Deposit', 'Withdraw'] as const;

export const TYPE_COLORS: Record<string, { text: string; bg: string; icon: string }> = {
  Buy: { text: 'text-green-400', bg: 'bg-green-500/20', icon: '↓' },
  Sell: { text: 'text-orange-400', bg: 'bg-orange-500/20', icon: '↑' },
  Deposit: { text: 'text-blue-400', bg: 'bg-blue-500/20', icon: '→' },
  Withdraw: { text: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: '←' },
};

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const FIAT = ['USD', 'EUR', 'GBP', 'USDT', 'USDC', 'BUSD', 'DAI'];

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function formatDate(date: Date): string {
  return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
}

export function formatAmount(amount: number, currency?: string): string {
  if (FIAT.includes(currency || '')) {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (amount >= 1) {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 });
}

export function parseCSV(text: string): string[][] {
  const lines = text.split('\n');
  return lines
    .filter(line => line.trim())
    .map(line => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    });
}

export function transactionToCSVRow(tx: Transaction): string {
  const date = formatDate(tx.date);
  const time = `${String(tx.date.getHours()).padStart(2, '0')}:${String(tx.date.getMinutes()).padStart(2, '0')}`;
  const buyAmt = tx.buyAmt?.toString() ?? '';
  const buyCur = tx.buyCur ?? '';
  const sellAmt = tx.sellAmt?.toString() ?? '';
  const sellCur = tx.sellCur ?? '';
  const depositAmt = tx.depositAmt?.toString() ?? '';
  const depositCur = tx.depositCur ?? '';
  const withdrawAmt = tx.withdrawAmt?.toString() ?? '';
  const withdrawCur = tx.withdrawCur ?? '';
  const tag = tx.tag ?? '';
  const note = tx.note ? `"${tx.note.replace(/"/g, '""')}"` : '';
  return [date, time, tx.exchange, tx.transType, buyAmt, buyCur, sellAmt, sellCur, depositAmt, depositCur, withdrawAmt, withdrawCur, tag, note].join(',');
}

export const CSV_HEADER = 'Date,Time,Exchange,Type,Buy Amount,Buy Currency,Sell Amount,Sell Currency,Deposit Amount,Deposit Currency,Withdraw Amount,Withdraw Currency,Tag,Note';

export const sampleTransactions: Transaction[] = [
  {
    id: generateId(), transType: 'Deposit', exchange: 'Kraken',
    depositAmt: 10000, depositCur: 'USD',
    date: new Date('2025-01-05'),
    note: 'Initial funding',
  },
  {
    id: generateId(), transType: 'Deposit', exchange: 'Binance',
    depositAmt: 5000, depositCur: 'USDT',
    date: new Date('2025-01-10'),
    note: 'Initial deposit',
  },
  {
    id: generateId(), transType: 'Buy', exchange: 'Coinbase',
    buyAmt: 0.5, buyCur: 'BTC', sellAmt: 21500, sellCur: 'USD',
    date: new Date('2025-01-15'),
    tag: 'DCA', note: 'Weekly Bitcoin DCA',
  },
  {
    id: generateId(), transType: 'Buy', exchange: 'Binance',
    buyAmt: 10, buyCur: 'SOL', sellAmt: 1850, sellCur: 'USDT',
    date: new Date('2025-01-18'),
  },
  {
    id: generateId(), transType: 'Buy', exchange: 'Coinbase',
    buyAmt: 2.0, buyCur: 'ETH', sellAmt: 6400, sellCur: 'USD',
    date: new Date('2025-01-22'),
  },
  {
    id: generateId(), transType: 'Buy', exchange: 'Binance',
    buyAmt: 5, buyCur: 'BNB', sellAmt: 1525, sellCur: 'USDT',
    date: new Date('2025-02-01'),
    tag: 'Long-term',
  },
  {
    id: generateId(), transType: 'Buy', exchange: 'Kraken',
    buyAmt: 1.5, buyCur: 'ETH', sellAmt: 4800, sellCur: 'USD',
    date: new Date('2025-02-05'),
  },
  {
    id: generateId(), transType: 'Withdraw', exchange: 'Kraken',
    withdrawAmt: 1.5, withdrawCur: 'ETH',
    date: new Date('2025-02-06'),
    note: 'To cold wallet',
  },
  {
    id: generateId(), transType: 'Sell', exchange: 'Coinbase',
    sellAmt: 0.25, sellCur: 'BTC', buyAmt: 11200, buyCur: 'USD',
    date: new Date('2025-02-10'),
    note: 'Taking profits',
  },
  {
    id: generateId(), transType: 'Deposit', exchange: 'KuCoin',
    depositAmt: 1.0, depositCur: 'ETH',
    date: new Date('2025-02-15'),
  },
  {
    id: generateId(), transType: 'Buy', exchange: 'KuCoin',
    buyAmt: 1000, buyCur: 'MATIC', sellAmt: 850, sellCur: 'USDT',
    date: new Date('2025-02-18'),
    tag: 'Altcoin',
  },
  {
    id: generateId(), transType: 'Buy', exchange: 'Kraken',
    buyAmt: 500, buyCur: 'ADA', sellAmt: 225, sellCur: 'USD',
    date: new Date('2025-02-20'),
    tag: 'Altcoin',
  },
  {
    id: generateId(), transType: 'Buy', exchange: 'Gemini',
    buyAmt: 0.1, buyCur: 'BTC', sellAmt: 4350, sellCur: 'USD',
    date: new Date('2025-03-01'),
    tag: 'DCA',
  },
  {
    id: generateId(), transType: 'Buy', exchange: 'Coinbase',
    buyAmt: 100, buyCur: 'LINK', sellAmt: 1580, sellCur: 'USD',
    date: new Date('2025-03-05'),
    tag: 'Altcoin',
  },
  {
    id: generateId(), transType: 'Buy', exchange: 'Gemini',
    buyAmt: 50, buyCur: 'DOT', sellAmt: 375, sellCur: 'USD',
    date: new Date('2025-03-10'),
  },
  {
    id: generateId(), transType: 'Sell', exchange: 'Binance',
    sellAmt: 5, sellCur: 'SOL', buyAmt: 1100, buyCur: 'USDT',
    date: new Date('2025-03-12'),
  },
  {
    id: generateId(), transType: 'Withdraw', exchange: 'Binance',
    withdrawAmt: 2000, withdrawCur: 'USDT',
    date: new Date('2025-03-15'),
    note: 'To bank account',
  },
  {
    id: generateId(), transType: 'Sell', exchange: 'KuCoin',
    sellAmt: 500, sellCur: 'MATIC', buyAmt: 460, buyCur: 'USDT',
    date: new Date('2025-03-20'),
  },
];
