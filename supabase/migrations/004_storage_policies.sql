insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true), ('submissions', 'submissions', false), ('datasets', 'datasets', false)
on conflict (id) do update set public = excluded.public;

create policy avatars_public_read on storage.objects for select using (bucket_id = 'avatars');
create policy avatars_own_upload on storage.objects for insert to authenticated with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy avatars_own_update on storage.objects for update to authenticated using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text) with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy avatars_own_delete on storage.objects for delete to authenticated using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy submissions_own_upload on storage.objects for insert to authenticated with check (bucket_id = 'submissions' and (storage.foldername(name))[1] = auth.uid()::text);
create policy submissions_owner_or_staff_read on storage.objects for select to authenticated using (bucket_id = 'submissions' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_faculty_or_admin()));
create policy submissions_own_update on storage.objects for update to authenticated using (bucket_id = 'submissions' and (storage.foldername(name))[1] = auth.uid()::text) with check (bucket_id = 'submissions' and (storage.foldername(name))[1] = auth.uid()::text);
create policy submissions_own_delete on storage.objects for delete to authenticated using (bucket_id = 'submissions' and (storage.foldername(name))[1] = auth.uid()::text);

create policy datasets_staff_upload on storage.objects for insert to authenticated with check (bucket_id = 'datasets' and public.is_faculty_or_admin());
create policy datasets_public_read on storage.objects for select to authenticated using (bucket_id = 'datasets' and public.is_faculty_or_admin());
create policy datasets_staff_update on storage.objects for update to authenticated using (bucket_id = 'datasets' and public.is_faculty_or_admin()) with check (bucket_id = 'datasets' and public.is_faculty_or_admin());
create policy datasets_admin_delete on storage.objects for delete to authenticated using (bucket_id = 'datasets' and public.is_admin());
