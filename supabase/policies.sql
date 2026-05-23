alter table public.audits enable row level security;
alter table public.leads enable row level security;

drop policy if exists "public can read audits" on public.audits;
create policy "public can read audits"
on public.audits
for select
to anon, authenticated
using (true);

drop policy if exists "service role manages audits" on public.audits;
create policy "service role manages audits"
on public.audits
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role manages leads" on public.leads;
create policy "service role manages leads"
on public.leads
for all
to service_role
using (true)
with check (true);
