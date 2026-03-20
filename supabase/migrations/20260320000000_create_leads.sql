create table public.leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ativando segurança de linha (RLS)
alter table public.leads enable row level security;

-- Permitindo que o nosso servidor (Server Actions usando anon key com RLS relaxada ou service_role)
-- insira registros e leia registros se necessário. Para simplificar no anon:
create policy "Allow inserts" on public.leads
  for insert with check (true);
