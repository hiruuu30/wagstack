-- Additive, carousel-only storage. Apply with the Supabase migration tool.
create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;
create table public.weather_carousel_posts (
 id text primary key check (id = 'quezon-city'),
 weather jsonb not null,
 published_at timestamptz not null,
 last_checked_at timestamptz not null,
 source_updated_at timestamptz not null
);
alter table public.weather_carousel_posts enable row level security;
revoke all on public.weather_carousel_posts from anon, authenticated;
grant select on public.weather_carousel_posts to anon, authenticated;
grant all on public.weather_carousel_posts to service_role;
create policy "Public weather cards are readable" on public.weather_carousel_posts for select to anon, authenticated using (true);
create policy "Weather worker writes cards" on public.weather_carousel_posts for all to service_role using (true) with check (true);
create table public.weather_carousel_worker (
 id text primary key check (id = 'quezon-city'),
 secret_hash text not null,
 forecast jsonb,
 expires_at timestamptz,
 last_modified text,
 checked_at timestamptz,
 candidate jsonb,
 recent jsonb not null default '[]'::jsonb
);
alter table public.weather_carousel_worker enable row level security;
revoke all on public.weather_carousel_worker from public, anon, authenticated;
grant all on public.weather_carousel_worker to service_role;
create policy "Only weather worker accesses cache" on public.weather_carousel_worker for all to service_role using (true) with check (true);
do $setup$
declare token text;
begin
 token := encode(extensions.gen_random_bytes(32), 'hex');
 perform vault.create_secret(token, 'wagstack_weather_job_token', 'Only the carousel weather scheduler');
 insert into public.weather_carousel_worker (id,secret_hash) values ('quezon-city', encode(extensions.digest(token,'sha256'),'hex'));
end $setup$;
