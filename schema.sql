-- ============================================================
--  schema.sql — ZACDA Tech v2
--  Execute em: Supabase Dashboard → SQL Editor → Run
--
--  Tabelas:
--    propostas  — leads capturados pelo formulário
--    reservas   — reservas de plano iniciadas no checkout
-- ============================================================

-- ── Extensão para UUIDs (já habilitada por padrão no Supabase) ─────────────
create extension if not exists "pgcrypto";

-- ── 1. PROPOSTAS ───────────────────────────────────────────────────────────
-- Dados do formulário ProposalForm: nome, e-mail, segmento, visão, link.

create table if not exists propostas (
  id             uuid        primary key default gen_random_uuid(),
  nome           text        not null,
  email          text        not null,
  telefone       text,
  segmento       text,                        -- valor interno do <option>
  segmento_label text,                        -- texto exibido do <option>
  link           text,                        -- site / Instagram do lead
  visao          text,                        -- campo "Visão & Objetivo"
  status         text        not null default 'novo',  -- novo | em_analise | fechado | perdido
  created_at     timestamptz not null default now()
);

create index if not exists propostas_email_idx      on propostas (email);
create index if not exists propostas_status_idx     on propostas (status);
create index if not exists propostas_created_at_idx on propostas (created_at desc);

-- RLS: nenhum acesso público direto; service_role bypassa automaticamente
alter table propostas enable row level security;

-- Realtime: propaga INSERT/UPDATE/DELETE para clientes subscritos
alter table propostas replica identity full;
alter publication supabase_realtime add table propostas;


-- ── 2. RESERVAS ────────────────────────────────────────────────────────────
-- Criada no momento do checkout Stripe; atualizada pelo stripe-webhook.

create table if not exists reservas (
  id                uuid        primary key default gen_random_uuid(),
  plano             text        not null,     -- 'start' | 'grow' | 'pro'
  status            text        not null default 'pendente',  -- pendente | pago | cancelado
  stripe_session_id text        unique,       -- ID da sessão Stripe Checkout
  customer_email    text,                     -- e-mail preenchido no Stripe
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists reservas_status_idx            on reservas (status);
create index if not exists reservas_stripe_session_id_idx on reservas (stripe_session_id);
create index if not exists reservas_created_at_idx        on reservas (created_at desc);

-- Função que atualiza updated_at automaticamente
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger reservas_updated_at
  before update on reservas
  for each row execute function set_updated_at();

-- RLS
alter table reservas enable row level security;

-- Realtime
alter table reservas replica identity full;
alter publication supabase_realtime add table reservas;


-- ── NOTA: tabela `leads` legada ────────────────────────────────────────────
-- Se você rodou o schema anterior e quer migrar os dados:
--
-- insert into propostas (nome, email, created_at)
--   select name, email, created_at from leads;
-- drop table if exists leads;
