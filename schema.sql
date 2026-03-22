-- ============================================================
--  schema.sql — Tabela de Leads da ZACDA
--  Execute no Supabase: Dashboard → SQL Editor → Run
-- ============================================================

create table if not exists leads (
  id            uuid        primary key default gen_random_uuid(),
  name          text        not null,
  email         text        not null,
  phone         text,
  segment       text,                        -- valor do <option> (ex: "saude")
  segment_label text,                        -- texto do <option> (ex: "Saúde & Medicina")
  digital_link  text,
  vision        text,
  created_at    timestamptz not null default now()
);

-- Índice para buscas por e-mail e data
create index if not exists leads_email_idx      on leads (email);
create index if not exists leads_created_at_idx on leads (created_at desc);

-- Row Level Security — nenhum acesso público direto
alter table leads enable row level security;

-- O service_role key bypassa RLS automaticamente no Supabase,
-- portanto não é necessária nenhuma policy para o backend.
-- Se quiser visualizar leads no Dashboard sem desabilitar RLS,
-- adicione a policy abaixo (apenas para uso administrativo):
--
-- create policy "Admin pode ver tudo"
--   on leads for select
--   using (auth.role() = 'service_role');
