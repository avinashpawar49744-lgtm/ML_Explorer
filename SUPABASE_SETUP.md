# Supabase setup

ML Explorer uses the browser-safe Supabase client. No service-role key belongs in the React app.

## Environment

Copy `.env.example` to `.env` and set:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Database

Run the files in order in Supabase SQL Editor, or use the Supabase CLI migrations:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_rls_policies.sql`
3. `supabase/migrations/003_seed_data.sql`
4. `supabase/migrations/004_storage_policies.sql`

`supabase/seed.sql` is a safe repeatable seed for laboratory settings. Auth-backed profile seed rows are created only after matching users exist in Supabase Auth.

## Authentication

Enable Email provider in Supabase Auth. The app exposes `/login`, `/register`, `/forgot-password`, and `/reset-password`. Registration always creates a `student` profile through the database trigger; faculty/admin roles must be assigned by a trusted administrator in the database.

## Storage

The migrations create `avatars`, `submissions`, and `datasets` buckets with role-aware policies. Never expose `SUPABASE_SERVICE_ROLE_KEY` or put it in a `VITE_*` variable.
