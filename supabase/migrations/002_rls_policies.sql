create or replace function public.current_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_faculty_or_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role() in ('faculty', 'admin'), false);
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role() = 'admin', false);
$$;

alter table public.profiles enable row level security;
alter table public.student_social_links enable row level security;
alter table public.practicals enable row level security;
alter table public.practical_instructions enable row level security;
alter table public.datasets enable row level security;
alter table public.experiment_sessions enable row level security;
alter table public.experiment_results enable row level security;
alter table public.student_progress enable row level security;
alter table public.practical_submissions enable row level security;
alter table public.activity_logs enable row level security;
alter table public.laboratory_settings enable row level security;

create policy profiles_select_own_or_staff on public.profiles for select using (id = auth.uid() or public.is_faculty_or_admin());
create policy profiles_update_own on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = public.current_role());
create policy profiles_admin_manage on public.profiles for all using (public.is_admin()) with check (public.is_admin());

create policy social_select_own_or_staff on public.student_social_links for select using (user_id = auth.uid() or public.is_faculty_or_admin());
create policy social_insert_own_student on public.student_social_links for insert with check (user_id = auth.uid() and public.current_role() = 'student');
create policy social_update_own_student on public.student_social_links for update using (user_id = auth.uid() and public.current_role() = 'student') with check (user_id = auth.uid() and public.current_role() = 'student');
create policy social_delete_own_student on public.student_social_links for delete using (user_id = auth.uid() and public.current_role() = 'student');
create policy social_admin_manage on public.student_social_links for all using (public.is_admin()) with check (public.is_admin());

create policy practicals_public_read on public.practicals for select using (is_active or public.is_faculty_or_admin());
create policy practicals_staff_manage on public.practicals for all using (public.is_faculty_or_admin()) with check (public.is_faculty_or_admin());
create policy instructions_public_read on public.practical_instructions for select using (exists (select 1 from public.practicals p where p.id = practical_id and (p.is_active or public.is_faculty_or_admin())));
create policy instructions_staff_manage on public.practical_instructions for all using (public.is_faculty_or_admin()) with check (public.is_faculty_or_admin());

create policy datasets_read_public_or_staff on public.datasets for select using (is_public or public.is_faculty_or_admin());
create policy datasets_staff_create on public.datasets for insert with check (public.is_faculty_or_admin() and created_by = auth.uid());
create policy datasets_staff_update on public.datasets for update using (public.is_faculty_or_admin()) with check (public.is_faculty_or_admin());
create policy datasets_admin_delete on public.datasets for delete using (public.is_admin());

create policy sessions_own_read on public.experiment_sessions for select using (user_id = auth.uid() or public.is_faculty_or_admin());
create policy sessions_own_create on public.experiment_sessions for insert with check (user_id = auth.uid());
create policy sessions_own_update on public.experiment_sessions for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy sessions_admin_manage on public.experiment_sessions for delete using (public.is_admin());

create policy results_own_or_staff_read on public.experiment_results for select using (user_id = auth.uid() or public.is_faculty_or_admin());
create policy results_own_create on public.experiment_results for insert with check (user_id = auth.uid());
create policy results_own_update on public.experiment_results for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy results_admin_delete on public.experiment_results for delete using (public.is_admin());

create policy progress_own_or_staff_read on public.student_progress for select using (student_id = auth.uid() or public.is_faculty_or_admin());
create policy progress_own_create on public.student_progress for insert with check (student_id = auth.uid());
create policy progress_own_update on public.student_progress for update using (student_id = auth.uid()) with check (student_id = auth.uid());
create policy progress_staff_manage on public.student_progress for all using (public.is_faculty_or_admin()) with check (public.is_faculty_or_admin());

create policy submissions_own_or_staff_read on public.practical_submissions for select using (student_id = auth.uid() or public.is_faculty_or_admin());
create policy submissions_own_create on public.practical_submissions for insert with check (student_id = auth.uid());
create policy submissions_own_update on public.practical_submissions for update using (student_id = auth.uid() and status = 'submitted') with check (student_id = auth.uid());
create policy submissions_staff_evaluate on public.practical_submissions for update using (public.is_faculty_or_admin()) with check (public.is_faculty_or_admin());
create policy submissions_admin_delete on public.practical_submissions for delete using (public.is_admin());

create policy activity_own_read on public.activity_logs for select using (user_id = auth.uid() or public.is_faculty_or_admin());
create policy activity_own_create on public.activity_logs for insert with check (user_id = auth.uid());
create policy activity_admin_manage on public.activity_logs for all using (public.is_admin()) with check (public.is_admin());

create policy lab_settings_public_read on public.laboratory_settings for select using (true);
create policy lab_settings_admin_manage on public.laboratory_settings for all using (public.is_admin()) with check (public.is_admin());
