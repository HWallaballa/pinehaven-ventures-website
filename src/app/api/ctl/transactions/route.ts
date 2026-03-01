import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase';

/**
 * GET /api/ctl/transactions
 * Fetch transactions for the current user with optional filters.
 * Query params: exchange, type, year, month, search, page, limit
 */
export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const exchange = searchParams.get('exchange');
  const type = searchParams.get('type');
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = (page - 1) * limit;

  let query = supabase
    .from('transactions')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .range(offset, offset + limit - 1);

  if (exchange && exchange !== 'All') {
    query = query.eq('exchange', exchange);
  }
  if (type && type !== 'All') {
    query = query.eq('trans_type', type);
  }
  if (year) {
    const startDate = `${year}-01-01T00:00:00`;
    const endDate = `${parseInt(year) + 1}-01-01T00:00:00`;
    query = query.gte('date', startDate).lt('date', endDate);
  }
  if (month && year) {
    const m = parseInt(month) + 1; // month is 0-indexed from client
    const startDate = `${year}-${String(m).padStart(2, '0')}-01T00:00:00`;
    const nextMonth = m === 12 ? `${parseInt(year) + 1}-01-01T00:00:00` : `${year}-${String(m + 1).padStart(2, '0')}-01T00:00:00`;
    query = query.gte('date', startDate).lt('date', nextMonth);
  }
  if (search) {
    query = query.or(
      `exchange.ilike.%${search}%,buy_cur.ilike.%${search}%,sell_cur.ilike.%${search}%,deposit_cur.ilike.%${search}%,withdraw_cur.ilike.%${search}%,tag.ilike.%${search}%,note.ilike.%${search}%`
    );
  }

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ transactions: data, total: count, page, limit });
}

/**
 * POST /api/ctl/transactions
 * Create a new transaction.
 */
export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      trans_type: body.trans_type,
      exchange: body.exchange,
      buy_amt: body.buy_amt || null,
      buy_cur: body.buy_cur || null,
      sell_amt: body.sell_amt || null,
      sell_cur: body.sell_cur || null,
      deposit_amt: body.deposit_amt || null,
      deposit_cur: body.deposit_cur || null,
      withdraw_amt: body.withdraw_amt || null,
      withdraw_cur: body.withdraw_cur || null,
      tag: body.tag || null,
      note: body.note || null,
      date: body.date,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}

/**
 * PATCH /api/ctl/transactions
 * Update a transaction. Requires { id, ...fields }.
 */
export async function PATCH(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'Missing transaction id' }, { status: 400 });

  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

/**
 * DELETE /api/ctl/transactions
 * Delete a transaction. Requires { id } in body.
 */
export async function DELETE(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: 'Missing transaction id' }, { status: 400 });

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', body.id)
    .eq('user_id', user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
