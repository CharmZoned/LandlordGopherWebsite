-- Website inquiry form submissions. Already applied to the production project;
-- kept here as a record of the schema.
create table public.inquiries (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  first_name      text not null check (char_length(first_name) between 1 and 100),
  last_name       text check (char_length(last_name) <= 100),
  phone           text check (char_length(phone) <= 40),
  email           text not null check (char_length(email) <= 254),
  referral_source text check (char_length(referral_source) <= 40),
  message         text check (char_length(message) <= 5000),
  source          text not null default 'landlordgopher.com',
  status          text not null default 'new'
);

-- No policies on purpose: anon/authenticated roles can't read or write.
-- The website's API route inserts with the server-only secret key.
alter table public.inquiries enable row level security;

create index inquiries_created_at_idx on public.inquiries (created_at desc);
