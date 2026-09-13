create table if not exists public.laboratory_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text not null,
  department text,
  batch text,
  role_type text not null default 'faculty' check (role_type in ('hod', 'course_coordinator', 'faculty', 'student')),
  photo_url text,
  bio text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.member_social_links (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.laboratory_members(id) on delete cascade,
  platform text not null,
  label text not null,
  url text not null,
  icon text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  show_on_public_profile boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  description text,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create trigger laboratory_members_updated_at before update on public.laboratory_members for each row execute function public.update_updated_at_column();
create trigger member_social_links_updated_at before update on public.member_social_links for each row execute function public.update_updated_at_column();
create trigger app_settings_updated_at before update on public.app_settings for each row execute function public.update_updated_at_column();

alter table public.laboratory_members enable row level security;
alter table public.member_social_links enable row level security;
alter table public.app_settings enable row level security;

create policy members_public_read on public.laboratory_members for select using (is_active or public.is_admin());
create policy members_admin_manage on public.laboratory_members for all using (public.is_admin()) with check (public.is_admin());
create policy member_social_public_read on public.member_social_links for select using ((is_active and show_on_public_profile) or public.is_admin());
create policy member_social_admin_manage on public.member_social_links for all using (public.is_admin()) with check (public.is_admin());
create policy app_settings_public_read on public.app_settings for select using (true);
create policy app_settings_admin_manage on public.app_settings for all using (public.is_admin()) with check (public.is_admin());

insert into public.laboratory_members (name, designation, department, batch, role_type, display_order)
select 'Prof. Suraj Mahajan', 'Head of Department (HOD)', 'Artificial Intelligence & Machine Learning', null, 'hod', 1
where not exists (select 1 from public.laboratory_members where role_type = 'hod');
insert into public.laboratory_members (name, designation, department, batch, role_type, display_order)
select 'Prof. Pranay Dongarwar', 'Course Coordinator', 'Artificial Intelligence & Machine Learning', null, 'course_coordinator', 2
where not exists (select 1 from public.laboratory_members where role_type = 'course_coordinator');
insert into public.laboratory_members (name, designation, department, batch, role_type, display_order)
select 'Avinash Pawar', 'Student', 'Artificial Intelligence & Machine Learning', 'B2', 'student', 3
where not exists (select 1 from public.laboratory_members where role_type = 'student');

insert into public.app_settings (key, value, description) values
('application', '{"appName":"ML Explorer","subtitle":"Learn • Implement • Visualize","department":"Artificial Intelligence & Machine Learning","departmentShortName":"AIML","batch":"B2"}', 'Public application identity'),
('laboratory', '{"labName":"Machine Learning Laboratory","footerText":"Learn • Implement • Visualize"}', 'Laboratory presentation settings')
on conflict (key) do nothing;

insert into public.member_social_links (member_id, platform, label, url, icon, display_order, is_active, show_on_public_profile)
select m.id, x.platform, x.label, x.url, x.icon, x.display_order, true, true
from public.laboratory_members m cross join (values
  ('Instagram', '@er.avii_pawar_', 'https://instagram.com/er.avii_pawar_', 'instagram', 1),
  ('LinkedIn', 'pawaravinashh', 'https://linkedin.com/in/pawaravinashh', 'linkedin', 2),
  ('GitHub', 'Avinashpawar497444-lgtm', 'https://github.com/Avinashpawar497444-lgtm', 'github', 3),
  ('Gmail', 'avinas hpawar49744@gmail.com', 'mailto:avinashpawar49744@gmail.com', 'mail', 4)
) as x(platform, label, url, icon, display_order)
where m.role_type = 'student'
  and not exists (select 1 from public.member_social_links s where s.member_id = m.id and s.platform = x.platform);

insert into storage.buckets (id, name, public) values ('profile-images', 'profile-images', true) on conflict (id) do update set public = true;
create policy profile_images_public_read on storage.objects for select using (bucket_id = 'profile-images');
create policy profile_images_admin_write on storage.objects for insert to authenticated with check (bucket_id = 'profile-images' and public.is_admin());
create policy profile_images_admin_update on storage.objects for update to authenticated using (bucket_id = 'profile-images' and public.is_admin()) with check (bucket_id = 'profile-images' and public.is_admin());
create policy profile_images_admin_delete on storage.objects for delete to authenticated using (bucket_id = 'profile-images' and public.is_admin());
