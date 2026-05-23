create extension if not exists pgcrypto;

create table if not exists public.audits (
  id text primary key,
  share_id text not null unique,
  created_at timestamptz not null default now(),
  input jsonb not null,
  result jsonb not null,
  summary text not null
);

create index if not exists audits_share_id_idx on public.audits (share_id);
create index if not exists audits_created_at_idx on public.audits (created_at desc);

create table if not exists public.leads (
  id text primary key,
  audit_id text not null references public.audits(id) on delete cascade,
  email text not null,
  company_name text,
  role text,
  team_size integer,
  created_at timestamptz not null default now()
);

create index if not exists leads_audit_id_idx on public.leads (audit_id);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
