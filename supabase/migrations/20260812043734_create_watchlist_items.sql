create table public.watchlist_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('company', 'keyword')),
  value text not null,
  created_at timestamptz not null default now()
);

alter table public.watchlist_items enable row level security;

create policy "public read watchlist_items"
  on public.watchlist_items for select
  to anon
  using (true);

create policy "public insert watchlist_items"
  on public.watchlist_items for insert
  to anon
  with check (true);

create policy "public delete watchlist_items"
  on public.watchlist_items for delete
  to anon
  using (true);
