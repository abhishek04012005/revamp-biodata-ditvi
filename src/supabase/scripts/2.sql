-- Admin
create table public.admin_login (
  id uuid not null default gen_random_uuid (),
  username text not null,
  password text not null,
  name text not null,
  active boolean null default true,
  created_at timestamp with time zone null default now(),
  constraint admin_login_pkey primary key (id)
) TABLESPACE pg_default;

-- User Details 
create table public.user_details (
  id uuid not null default gen_random_uuid (),
  request_number serial not null,
  user_details jsonb not null,
  model_details jsonb not null,
  created_at timestamp with time zone null default now(),
  constraint user_details_pkey primary key (id)
) TABLESPACE pg_default;

-- Biodata Request 
create table public.biodata_request (
  id uuid not null default gen_random_uuid (),
  request_number integer not null,
  flow_type smallint not null,
  profile_url text null,
  biodata_url text null,
  user_details jsonb not null,
  model_details jsonb not null,
  personal_details jsonb null,
  professional_details jsonb null,
  examination_details jsonb null,
  education_details jsonb null,
  family_details jsonb null,
  contact_details jsonb null,
  status jsonb not null,
  deleted boolean null default false,
  created_at timestamp with time zone null default now(),
  completed boolean null default false,
  constraint biodata_request_pkey primary key (id)
) TABLESPACE pg_default;

-- Production Request 
create table public.production_request (
  id uuid not null default gen_random_uuid (),
  biodata_request_id uuid not null,
  request_number integer not null,
  flow_type smallint not null,
  profile_url text null,
  biodata_url text null,
  user_details jsonb not null,
  model_details jsonb not null,
  personal_details jsonb null,
  professional_details jsonb null,
  examination_details jsonb null,
  education_details jsonb null,
  family_details jsonb null,
  contact_details jsonb null,
  deleted boolean null default false,
  created_at timestamp with time zone null default now(),
  style_settings jsonb null,
  completed boolean null default false,
  constraint production_request_pkey primary key (id)
) TABLESPACE pg_default;


-- Payment Request 
create table public.payment_request (
  id uuid not null default gen_random_uuid (),
  request_number integer not null,
  amount integer not null,
  status text not null,
  transaction_id text null,
  payment_response text null,
  deleted boolean null default false,
  updated_at timestamp with time zone null default now(),
  created_at timestamp with time zone null default now(),
  constraint payment_request_pkey primary key (id)
) TABLESPACE pg_default;

-- User Feedback 
create table public.user_feedback (
  id uuid not null default gen_random_uuid (),
  request_number integer not null,
  rating smallint not null,
  comment text null,
  created_at timestamp with time zone null default now(),
  constraint user_feedbacks_pkey primary key (id)
) TABLESPACE pg_default;


-- Contact Us 
create table public.contact_us (
  id uuid not null default gen_random_uuid (),
  number serial not null,
  name text not null,
  email text not null,
  mobile text not null,
  message text not null,
  deleted boolean null default false,
  created_at timestamp with time zone null default now(),
  constraint contact_us_pkey primary key (id)
) TABLESPACE pg_default;