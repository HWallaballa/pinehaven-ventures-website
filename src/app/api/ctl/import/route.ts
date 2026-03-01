import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase';

/**
 * POST /api/ctl/import
 * Bulk import transactions from parsed file data.
 * Body: { exchange, filename, transactions: [...] }
 */
export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { exchange, filename, transactions } = body;

  if (!exchange || !transactions || !Array.isArray(transactions) || transactions.length === 0) {
    return NextResponse.json({ error: 'Invalid import data' }, { status: 400 });
  }

  // Check tier limits: free users limited to 1 exchange
  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single();

  if (profile?.tier === 'free') {
    // Check how many distinct exchanges user already has
    const { data: existingExchanges } = await supabase
      .from('transactions')
      .select('exchange')
      .eq('user_id', user.id);

    const uniqueExchanges = new Set(existingExchanges?.map((t) => t.exchange) || []);

    // If they have transactions from another exchange, block the import
    if (uniqueExchanges.size >= 1 && !uniqueExchanges.has(exchange)) {
      return NextResponse.json(
        {
          error: 'Free tier is limited to 1 exchange. Upgrade to Premium for unlimited exchanges.',
          upgrade_required: true,
        },
        { status: 403 }
      );
    }
  }

  // Insert transactions in batches of 100
  const rows = transactions.map((tx: Record<string, unknown>) => ({
    user_id: user.id,
    trans_type: tx.trans_type,
    exchange,
    buy_amt: tx.buy_amt || null,
    buy_cur: tx.buy_cur || null,
    sell_amt: tx.sell_amt || null,
    sell_cur: tx.sell_cur || null,
    deposit_amt: tx.deposit_amt || null,
    deposit_cur: tx.deposit_cur || null,
    withdraw_amt: tx.withdraw_amt || null,
    withdraw_cur: tx.withdraw_cur || null,
    tag: tx.tag || null,
    note: tx.note || null,
    date: tx.date,
  }));

  let insertedCount = 0;
  const batchSize = 100;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from('transactions').insert(batch);
    if (error) {
      return NextResponse.json({ error: error.message, inserted: insertedCount }, { status: 500 });
    }
    insertedCount += batch.length;
  }

  // Log the import
  await supabase.from('imports').insert({
    user_id: user.id,
    filename: filename || 'unknown.csv',
    exchange,
    row_count: insertedCount,
    status: 'completed',
  });

  return NextResponse.json({ success: true, imported: insertedCount }, { status: 201 });
}
