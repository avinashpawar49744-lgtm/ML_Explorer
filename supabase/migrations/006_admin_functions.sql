create or replace function public.admin_log_activity(activity text, details text, event_metadata jsonb default '{}'::jsonb)
returns uuid language plpgsql security definer set search_path = public as $$
declare log_id uuid;
begin
  if not public.is_admin() then raise exception 'Administrator privileges required'; end if;
  insert into public.activity_logs(user_id, activity_type, description, metadata)
  values (auth.uid(), activity, details, event_metadata) returning id into log_id;
  return log_id;
end;
$$;

revoke all on function public.admin_log_activity(text, text, jsonb) from public;
grant execute on function public.admin_log_activity(text, text, jsonb) to authenticated;
