-- Align plan identifiers with new pricing tiers (Free, Starter, Pro) and EGP billing.

-- Normalize legacy plan values to new identifiers
update public.subscriptions set plan = 'pro_monthly' where plan in ('pro', 'paid');
update public.subscriptions set plan = 'pro_yearly' where plan = 'premium';
update public.user_plans set plan = 'pro_monthly' where plan in ('pro', 'paid');
update public.user_plans set plan = 'pro_yearly' where plan = 'premium';

-- Drop old plan constraints
alter table public.subscriptions drop constraint if exists subscriptions_plan_check;
alter table public.user_plans drop constraint if exists user_plans_plan_check;
alter table public.plan_limits drop constraint if exists plan_limits_plan_check;

-- Refresh plan limits with the new tiers
delete from public.plan_limits where plan not in (
  'free', 'starter_monthly', 'pro_monthly', 'starter_yearly', 'pro_yearly'
);

insert into public.plan_limits (
  plan,
  monthly_practice_sessions,
  monthly_video_answers,
  monthly_resume_uploads,
  max_interview_minutes,
  features
)
values
  ('free', 3, 0, 1, 20, '{"ai_feedback":"basic","video_recording":false}'::jsonb),
  ('starter_monthly', 20, 20, null, null, '{"ai_feedback":"guided","video_recording":true,"scorecard_fixes":3}'::jsonb),
  ('pro_monthly', null, null, null, null, '{"ai_feedback":"advanced","video_recording":true,"priority_support":true,"rewrites":true}'::jsonb),
  ('starter_yearly', 20, 20, null, null, '{"ai_feedback":"guided","video_recording":true,"scorecard_fixes":3,"annual_savings":0.40}'::jsonb),
  ('pro_yearly', null, null, null, null, '{"ai_feedback":"advanced","video_recording":true,"priority_support":true,"rewrites":true,"annual_savings":0.44}'::jsonb)
on conflict (plan) do update
  set monthly_practice_sessions = excluded.monthly_practice_sessions,
      monthly_video_answers = excluded.monthly_video_answers,
      monthly_resume_uploads = excluded.monthly_resume_uploads,
      max_interview_minutes = excluded.max_interview_minutes,
      features = excluded.features,
      updated_at = now();

-- Add new plan constraints
alter table public.subscriptions
  add constraint subscriptions_plan_check
  check (plan in ('free', 'starter_monthly', 'pro_monthly', 'starter_yearly', 'pro_yearly'));

alter table public.user_plans
  add constraint user_plans_plan_check
  check (plan in ('free', 'starter_monthly', 'pro_monthly', 'starter_yearly', 'pro_yearly'));

alter table public.plan_limits
  add constraint plan_limits_plan_check
  check (plan in ('free', 'starter_monthly', 'pro_monthly', 'starter_yearly', 'pro_yearly'));
