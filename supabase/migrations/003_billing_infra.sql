create table if not exists public.plan_limits (
  plan text primary key check (plan in ('free', 'pro', 'premium')),
  monthly_practice_sessions integer,
  monthly_video_answers integer,
  monthly_resume_uploads integer,
  max_interview_minutes integer,
  features jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.plan_limits enable row level security;

drop policy if exists "Plan limits are public" on public.plan_limits;
create policy "Plan limits are public"
  on public.plan_limits
  for select
  using (true);

insert into public.plan_limits (
  plan,
  monthly_practice_sessions,
  monthly_video_answers,
  monthly_resume_uploads,
  max_interview_minutes,
  features
)
values
  ('free', 1, 0, 1, 20, '{"ai_feedback":"basic","video_recording":false}'::jsonb),
  ('pro', null, null, null, null, '{"ai_feedback":"full","video_recording":true}'::jsonb),
  ('premium', null, null, null, null, '{"ai_feedback":"advanced","video_recording":true,"priority_support":true}'::jsonb)
on conflict (plan) do update
set monthly_practice_sessions = excluded.monthly_practice_sessions,
    monthly_video_answers = excluded.monthly_video_answers,
    monthly_resume_uploads = excluded.monthly_resume_uploads,
    max_interview_minutes = excluded.max_interview_minutes,
    features = excluded.features,
    updated_at = now();

create table if not exists public.user_plans (
  user_id uuid primary key references auth.users (id) on delete cascade,
  plan text not null check (plan in ('free', 'pro', 'premium')),
  status text not null check (status in ('active', 'pending', 'canceled', 'failed')),
  provider text not null default 'internal',
  subscription_id uuid references public.subscriptions (id) on delete set null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_plans enable row level security;

drop policy if exists "User plans are viewable by owner" on public.user_plans;
create policy "User plans are viewable by owner"
  on public.user_plans
  for select
  using (auth.uid() = user_id);

create table if not exists public.usage_counters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  period_start date not null,
  period_end date not null,
  practice_sessions integer not null default 0,
  video_answers integer not null default 0,
  resume_uploads integer not null default 0,
  interviews_completed integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists usage_counters_user_period_idx
  on public.usage_counters (user_id, period_start);

alter table public.usage_counters enable row level security;

drop policy if exists "Usage counters are viewable by owner" on public.usage_counters;
create policy "Usage counters are viewable by owner"
  on public.usage_counters
  for select
  using (auth.uid() = user_id);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  provider text not null,
  status text not null check (status in ('pending', 'succeeded', 'failed', 'refunded', 'canceled')),
  amount numeric(10, 2) not null,
  currency text not null default 'EGP',
  plan text,
  subscription_id uuid references public.subscriptions (id) on delete set null,
  provider_order_id text,
  provider_payment_id text,
  metadata jsonb,
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists payments_provider_order_idx
  on public.payments (provider, provider_order_id);
create index if not exists payments_user_id_idx
  on public.payments (user_id);

alter table public.payments enable row level security;

drop policy if exists "Payments are viewable by owner" on public.payments;
create policy "Payments are viewable by owner"
  on public.payments
  for select
  using (auth.uid() = user_id);

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_type text,
  signature text,
  signature_valid boolean,
  payload jsonb not null,
  headers jsonb,
  created_at timestamptz not null default now()
);

alter table public.webhook_events enable row level security;

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  preferred_language text not null default 'en',
  timezone text not null default 'UTC',
  email_alerts boolean not null default true,
  browser_alerts boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;

drop policy if exists "User settings are viewable by owner" on public.user_settings;
create policy "User settings are viewable by owner"
  on public.user_settings
  for select
  using (auth.uid() = user_id);

drop policy if exists "User settings are updatable by owner" on public.user_settings;
create policy "User settings are updatable by owner"
  on public.user_settings
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "User settings are insertable by owner" on public.user_settings;
create policy "User settings are insertable by owner"
  on public.user_settings
  for insert
  with check (auth.uid() = user_id);

drop trigger if exists set_plan_limits_updated_at on public.plan_limits;
create trigger set_plan_limits_updated_at
before update on public.plan_limits
for each row execute function public.set_updated_at();

drop trigger if exists set_user_plans_updated_at on public.user_plans;
create trigger set_user_plans_updated_at
before update on public.user_plans
for each row execute function public.set_updated_at();

drop trigger if exists set_payments_updated_at on public.payments;
create trigger set_payments_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

drop trigger if exists set_usage_counters_updated_at on public.usage_counters;
create trigger set_usage_counters_updated_at
before update on public.usage_counters
for each row execute function public.set_updated_at();

drop trigger if exists set_user_settings_updated_at on public.user_settings;
create trigger set_user_settings_updated_at
before update on public.user_settings
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  active_subscription_id uuid;
  period_start date;
  period_end date;
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
    )
    returning id into active_subscription_id;
  exception when unique_violation then
    select id into active_subscription_id
    from public.subscriptions
    where user_id = new.id and status = 'active'
    limit 1;
  end;

  insert into public.user_plans (
    user_id,
    plan,
    status,
    provider,
    subscription_id,
    current_period_start
  )
  values (
    new.id,
    'free',
    'active',
    'internal',
    active_subscription_id,
    now()
  )
  on conflict (user_id) do update
    set plan = excluded.plan,
        status = excluded.status,
        provider = excluded.provider,
        subscription_id = excluded.subscription_id,
        current_period_start = excluded.current_period_start,
        current_period_end = excluded.current_period_end;

  period_start := date_trunc('month', now())::date;
  period_end := (date_trunc('month', now()) + interval '1 month')::date;

  insert into public.usage_counters (
    user_id,
    period_start,
    period_end
  )
  values (
    new.id,
    period_start,
    period_end
  )
  on conflict (user_id, period_start) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;
