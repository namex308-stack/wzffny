create extension if not exists "pgcrypto";

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  plan text not null check (plan in ('free', 'pro', 'premium')),
  status text not null check (status in ('pending', 'active', 'canceled', 'failed')),
  amount numeric(10, 2),
  currency text not null default 'EGP',
  kashier_order_id text unique,
  kashier_transaction_id text,
  kashier_order_reference text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);
create index if not exists subscriptions_status_idx on public.subscriptions (status);
create unique index if not exists subscriptions_user_active_idx
  on public.subscriptions (user_id)
  where status = 'active';

alter table public.subscriptions enable row level security;

drop policy if exists "Subscriptions are viewable by owner" on public.subscriptions;
create policy "Subscriptions are viewable by owner"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);

create table if not exists public.subscription_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  type text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.subscription_events enable row level security;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.subscriptions;
create trigger set_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, account_type)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'account_type', 'job_seeker')
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        account_type = excluded.account_type;

  begin
    insert into public.subscriptions (
      user_id,
      plan,
      status,
      amount,
      currency,
      current_period_start
    )
    values (
      new.id,
      'free',
      'active',
      0,
      'EGP',
      now()
    );
  exception when unique_violation then
    null;
  end;

  return new;
end;
$$;
