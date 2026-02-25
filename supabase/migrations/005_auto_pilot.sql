-- Auto-Pilot data structures

create table if not exists public.cv_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  file_name text,
  file_type text,
  source_type text,
  text text,
  summary text,
  ats_score numeric(5, 2),
  strengths jsonb,
  gaps jsonb,
  keywords jsonb,
  errors jsonb,
  tailored_copy jsonb,
  next_steps jsonb,
  job_title text,
  job_description text,
  question_set_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists cv_analyses_user_idx on public.cv_analyses (user_id, created_at desc);

alter table public.cv_analyses enable row level security;

drop policy if exists "CV analyses are viewable by owner" on public.cv_analyses;
create policy "CV analyses are viewable by owner"
  on public.cv_analyses
  for select
  using (auth.uid() = user_id);

drop policy if exists "CV analyses are insertable by owner" on public.cv_analyses;
create policy "CV analyses are insertable by owner"
  on public.cv_analyses
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "CV analyses are updatable by owner" on public.cv_analyses;
create policy "CV analyses are updatable by owner"
  on public.cv_analyses
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.generated_questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  cv_analysis_id uuid references public.cv_analyses (id) on delete set null,
  questions jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists generated_questions_user_idx on public.generated_questions (user_id, created_at desc);

alter table public.generated_questions enable row level security;

drop policy if exists "Generated questions viewable by owner" on public.generated_questions;
create policy "Generated questions viewable by owner"
  on public.generated_questions
  for select
  using (auth.uid() = user_id);

drop policy if exists "Generated questions insertable by owner" on public.generated_questions;
create policy "Generated questions insertable by owner"
  on public.generated_questions
  for insert
  with check (auth.uid() = user_id);

create table if not exists public.answer_evaluations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  question_set_id uuid references public.generated_questions (id) on delete set null,
  question text,
  transcript text,
  content_score numeric(5, 2),
  structure_score numeric(5, 2),
  communication_score numeric(5, 2),
  personalization_score numeric(5, 2),
  overall_score numeric(5, 2),
  feedback jsonb,
  video_path text,
  created_at timestamptz not null default now()
);

create index if not exists answer_evaluations_user_idx on public.answer_evaluations (user_id, created_at desc);

alter table public.answer_evaluations enable row level security;

drop policy if exists "Answer evaluations viewable by owner" on public.answer_evaluations;
create policy "Answer evaluations viewable by owner"
  on public.answer_evaluations
  for select
  using (auth.uid() = user_id);

drop policy if exists "Answer evaluations insertable by owner" on public.answer_evaluations;
create policy "Answer evaluations insertable by owner"
  on public.answer_evaluations
  for insert
  with check (auth.uid() = user_id);

create table if not exists public.interview_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  cv_analysis_id uuid references public.cv_analyses (id) on delete set null,
  question_set_id uuid references public.generated_questions (id) on delete set null,
  evaluation_ids uuid[] default '{}'::uuid[],
  report jsonb,
  summary text,
  recommendations jsonb,
  created_at timestamptz not null default now()
);

create index if not exists interview_reports_user_idx on public.interview_reports (user_id, created_at desc);

alter table public.interview_reports enable row level security;

drop policy if exists "Interview reports viewable by owner" on public.interview_reports;
create policy "Interview reports viewable by owner"
  on public.interview_reports
  for select
  using (auth.uid() = user_id);

drop policy if exists "Interview reports insertable by owner" on public.interview_reports;
create policy "Interview reports insertable by owner"
  on public.interview_reports
  for insert
  with check (auth.uid() = user_id);

-- Usage helper
create or replace function public.increment_usage(
  p_user_id uuid,
  p_resume_uploads integer default 0,
  p_video_answers integer default 0,
  p_interviews_completed integer default 0
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_period_start date := date_trunc('month', now())::date;
  v_period_end date := (date_trunc('month', now()) + interval '1 month')::date;
begin
  insert into public.usage_counters (
    user_id,
    period_start,
    period_end,
    resume_uploads,
    video_answers,
    interviews_completed
  ) values (
    p_user_id,
    v_period_start,
    v_period_end,
    p_resume_uploads,
    p_video_answers,
    p_interviews_completed
  )
  on conflict (user_id, period_start) do update
    set resume_uploads = public.usage_counters.resume_uploads + excluded.resume_uploads,
        video_answers = public.usage_counters.video_answers + excluded.video_answers,
        interviews_completed = public.usage_counters.interviews_completed + excluded.interviews_completed,
        updated_at = now();
end;
$$;

grant execute on function public.increment_usage to authenticated;

-- Storage bucket for interview assets
insert into storage.buckets (id, name, public)
values ('interviews', 'interviews', false)
on conflict (id) do nothing;

drop policy if exists "Allow read interviews" on storage.objects;
drop policy if exists "Allow write interviews" on storage.objects;
drop policy if exists "Allow update interviews" on storage.objects;

create policy "Allow read interviews"
  on storage.objects
  for select
  using (bucket_id = 'interviews' and (auth.role() = 'authenticated'));

create policy "Allow write interviews"
  on storage.objects
  for insert
  with check (
    bucket_id = 'interviews'
    and (
      auth.uid() = owner
      or name like auth.uid()::text || '/%'
    )
  );

create policy "Allow update interviews"
  on storage.objects
  for update
  using (
    bucket_id = 'interviews'
    and (
      auth.uid() = owner
      or name like auth.uid()::text || '/%'
    )
  )
  with check (
    bucket_id = 'interviews'
    and (
      auth.uid() = owner
      or name like auth.uid()::text || '/%'
    )
  );
