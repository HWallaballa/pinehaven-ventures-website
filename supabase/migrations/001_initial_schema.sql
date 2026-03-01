-- ============================================================================
-- Crypto Transaction Log — Initial Database Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ─── Profiles ───────────────────────────────────────────────────────────────
-- Stores user profile + subscription info. Created on signup or Stripe checkout.
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  display_name text,
  stripe_customer_id text unique,
  subscription_status text default 'none',  -- 'none', 'active', 'past_due', 'canceled'
  tier        text not null default 'free' check (tier in ('free', 'premium')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── Transactions ───────────────────────────────────────────────────────────
create table public.transactions (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  trans_type    text not null check (trans_type in ('Buy', 'Sell', 'Deposit', 'Withdraw')),
  exchange      text not null,
  buy_amt       numeric,
  buy_cur       text,
  sell_amt      numeric,
  sell_cur      text,
  deposit_amt   numeric,
  deposit_cur   text,
  withdraw_amt  numeric,
  withdraw_cur  text,
  tag           text,
  note          text,
  date          timestamptz not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─── Imports ────────────────────────────────────────────────────────────────
create table public.imports (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  filename    text not null,
  exchange    text not null,
  row_count   integer not null default 0,
  status      text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
  created_at  timestamptz not null default now()
);

-- ─── Indexes ────────────────────────────────────────────────────────────────
create index idx_transactions_user_id on public.transactions(user_id);
create index idx_transactions_date on public.transactions(date desc);
create index idx_transactions_exchange on public.transactions(exchange);
create index idx_transactions_user_date on public.transactions(user_id, date desc);
create index idx_imports_user_id on public.imports(user_id);

-- ─── Row-Level Security ─────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.transactions enable row level security;
alter table public.imports enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Transactions: users can CRUD their own transactions
create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Imports: users can view/insert their own imports
create policy "Users can view own imports"
  on public.imports for select
  using (auth.uid() = user_id);

create policy "Users can insert own imports"
  on public.imports for insert
  with check (auth.uid() = user_id);

-- ─── Auto-create profile on signup ─────────────────────────────────────────
-- This trigger creates a profile row when a new user signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── Updated-at trigger ────────────────────────────────────────────────────
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger set_transactions_updated_at
  before update on public.transactions
  for each row execute function public.update_updated_at();
