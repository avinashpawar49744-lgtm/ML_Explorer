-- Run migrations first. This seed is safe to re-run after 003_seed_data.sql.
insert into public.laboratory_settings (lab_name, department, batch, description)
select 'ML Explorer', 'Artificial Intelligence & Machine Learning', 'B2', 'Learn, implement, and visualize machine learning concepts.'
where not exists (select 1 from public.laboratory_settings);

-- User profiles and student social links are seeded by 003_seed_data.sql after
-- the corresponding accounts are created through Supabase Authentication.
