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

-- Insert default admin user
insert into public.admin_login (id, username, password, name, active, created_at)
values (gen_random_uuid(), 'admin', 'Admin@3112', 'Super Admin', true, now());

-- User Details 
create table public.user_details (
  id uuid not null default gen_random_uuid (),
  request_number serial not null,
  user_details jsonb not null,
  model_details jsonb not null,
  created_at timestamp with time zone null default now(),
  constraint user_details_pkey primary key (id)
) TABLESPACE pg_default;

-- Reset the sequence for request_number in user_details
ALTER SEQUENCE contact_us_number_seq RESTART WITH 111;

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


-- First, add UNIQUE constraint to request_number in user_details
ALTER TABLE public.user_details
ADD CONSTRAINT user_details_request_number_unique UNIQUE (request_number);

-- Then add the foreign key constraints
ALTER TABLE public.biodata_request
ADD CONSTRAINT fk_biodata_request_user_details
FOREIGN KEY (request_number) 
REFERENCES public.user_details(request_number);

ALTER TABLE public.production_request
ADD CONSTRAINT fk_production_request_user_details
FOREIGN KEY (request_number) 
REFERENCES public.user_details(request_number);

ALTER TABLE public.payment_request
ADD CONSTRAINT fk_payment_request_user_details
FOREIGN KEY (request_number) 
REFERENCES public.user_details(request_number);

ALTER TABLE public.user_feedback
ADD CONSTRAINT fk_user_feedback_user_details
FOREIGN KEY (request_number) 
REFERENCES public.user_details(request_number);

-- Add indexes to improve foreign key performance
CREATE INDEX idx_biodata_request_number 
ON public.biodata_request(request_number);

CREATE INDEX idx_production_request_number 
ON public.production_request(request_number);

CREATE INDEX idx_payment_request_number 
ON public.payment_request(request_number);

CREATE INDEX idx_user_feedback_request_number 
ON public.user_feedback(request_number);
