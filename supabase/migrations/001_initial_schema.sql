create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  role text not null default 'student' check (role in ('student', 'faculty', 'admin')),
  department text,
  batch text,
  roll_number text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_social_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  instagram text,
  linkedin text,
  github text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.practicals (
  id uuid primary key default gen_random_uuid(),
  practical_number integer unique not null check (practical_number between 1 and 10),
  title text not null,
  description text,
  instructions text,
  category text,
  difficulty text,
  duration_minutes integer check (duration_minutes is null or duration_minutes > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.practical_instructions (
  id uuid primary key default gen_random_uuid(),
  practical_id uuid not null references public.practicals(id) on delete cascade,
  step_number integer not null check (step_number > 0),
  title text not null,
  description text,
  created_at timestamptz not null default now(),
  unique (practical_id, step_number)
);

create table if not exists public.datasets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  dataset_type text,
  source text,
  data jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiment_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  practical_id uuid not null references public.practicals(id) on delete cascade,
  dataset_id uuid references public.datasets(id) on delete set null,
  status text not null default 'started' check (status in ('started', 'completed', 'failed', 'cancelled')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  parameters jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.experiment_results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.experiment_sessions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  practical_id uuid not null references public.practicals(id) on delete cascade,
  metrics jsonb not null default '{}'::jsonb,
  parameters jsonb not null default '{}'::jsonb,
  prediction jsonb not null default '{}'::jsonb,
  visualization_data jsonb not null default '{}'::jsonb,
  result_summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.student_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  practical_id uuid not null references public.practicals(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  completion_percentage integer not null default 0 check (completion_percentage between 0 and 100),
  best_score numeric,
  attempts integer not null default 0 check (attempts >= 0),
  last_attempt_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, practical_id)
);

create table if not exists public.practical_submissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  practical_id uuid not null references public.practicals(id) on delete cascade,
  experiment_result_id uuid references public.experiment_results(id) on delete set null,
  submission_text text,
  file_url text,
  status text not null default 'submitted' check (status in ('submitted', 'under_review', 'evaluated', 'returned')),
  marks numeric check (marks is null or marks between 0 and 100),
  feedback text,
  submitted_at timestamptz not null default now(),
  evaluated_at timestamptz,
  evaluated_by uuid references public.profiles(id) on delete set null
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  activity_type text not null,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.laboratory_settings (
  id uuid primary key default gen_random_uuid(),
  lab_name text not null,
  department text not null,
  batch text not null,
  description text,
  logo_url text,
  updated_at timestamptz not null default now()
);

create index if not exists experiment_sessions_user_idx on public.experiment_sessions(user_id, created_at desc);
create index if not exists experiment_results_user_idx on public.experiment_results(user_id, created_at desc);
create index if not exists submissions_student_idx on public.practical_submissions(student_id, submitted_at desc);
create index if not exists activity_logs_user_idx on public.activity_logs(user_id, created_at desc);

create or replace function public.update_updated_at_column()
returns trigger language plpgsql security invoker set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'profiles_updated_at') then create trigger profiles_updated_at before update on public.profiles for each row execute function public.update_updated_at_column(); end if;
  if not exists (select 1 from pg_trigger where tgname = 'practicals_updated_at') then create trigger practicals_updated_at before update on public.practicals for each row execute function public.update_updated_at_column(); end if;
  if not exists (select 1 from pg_trigger where tgname = 'datasets_updated_at') then create trigger datasets_updated_at before update on public.datasets for each row execute function public.update_updated_at_column(); end if;
  if not exists (select 1 from pg_trigger where tgname = 'student_progress_updated_at') then create trigger student_progress_updated_at before update on public.student_progress for each row execute function public.update_updated_at_column(); end if;
  if not exists (select 1 from pg_trigger where tgname = 'student_social_links_updated_at') then create trigger student_social_links_updated_at before update on public.student_social_links for each row execute function public.update_updated_at_column(); end if;
  if not exists (select 1 from pg_trigger where tgname = 'laboratory_settings_updated_at') then create trigger laboratory_settings_updated_at before update on public.laboratory_settings for each row execute function public.update_updated_at_column(); end if;
end;
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, ''), '@', 1), 'Student'), new.email, 'student')
  on conflict (id) do nothing;
  return new;
end;
$$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'on_auth_user_created') then create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user(); end if;
end;
$$;

create or replace function public.record_completed_experiment()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  score numeric;
begin
  if new.status = 'completed' and new.user_id is not null then
    score := nullif(new.metrics ->> 'score', '')::numeric;
    insert into public.student_progress (student_id, practical_id, status, completion_percentage, best_score, attempts, last_attempt_at, completed_at)
    values (new.user_id, new.practical_id, 'completed', 100, score, 1, now(), now())
    on conflict (student_id, practical_id) do update set
      status = 'completed', completion_percentage = 100, attempts = public.student_progress.attempts + 1,
      last_attempt_at = now(), completed_at = now(),
      best_score = case when excluded.best_score is null then public.student_progress.best_score when public.student_progress.best_score is null then excluded.best_score else greatest(public.student_progress.best_score, excluded.best_score) end;
  end if;
  return new;
end;
$$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'experiment_completed_progress') then create trigger experiment_completed_progress after insert or update on public.experiment_sessions for each row execute function public.record_completed_experiment(); end if;
end;
$$;
