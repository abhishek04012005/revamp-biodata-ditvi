CREATE TABLE public.user_details (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_number SERIAL NOT NULL,
    user_details JSONB NOT NULL,
    model_details JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
-- Set the sequence starting value for request_number
ALTER SEQUENCE user_details_request_number_seq RESTART WITH 1111;

CREATE TABLE public.admin_login (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO "public"."admin_login" ("id", "username", "password", "name", "active", "created_at") VALUES ('963b8f3c-f7de-426b-8953-89e7e94a49c4', 'admin', 'Admin@3112', 'Super Admin', 'true', '2025-05-17 06:44:51.465523+00');


CREATE TABLE public.biodata_request (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_number int4 NOT NULL,
    flow_type int2 NOT NULL,
    profile_url TEXT NULL,
    biodata_url TEXT NULL,
    user_details JSONB NOT NULL,
    model_details JSONB NOT NULL,
    personal_details JSONB NULL,
    professional_details JSONB  NULL,
    examination_details JSONB NULL,
    education_details JSONB NULL,
    family_details JSONB NULL,
    contact_details JSONB NULL,
    status JSONB NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.production_request (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    biodata_request_id UUID NOT NULL,
    request_number int4 NOT NULL,
    flow_type int2 NOT NULL,
    profile_url TEXT NULL,
    biodata_url TEXT NULL,
    user_details JSONB NOT NULL,
    model_details JSONB NOT NULL,
    personal_details JSONB NULL,
    professional_details JSONB  NULL,
    examination_details JSONB NULL,
    education_details JSONB NULL,
    family_details JSONB NULL,
    contact_details JSONB NULL,
    style_settings JSONB NULL,
    completed BOOLEAN DEFAULT FALSE,
    deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.payment_request (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_number int4 NOT NULL,
    amount int4 NOT NULL,
    status TEXT NOT NULL,
    transaction_id TEXT NULL,
    payment_response TEXT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);


CREATE TABLE public.user_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_number int4 NOT NULL,
    rating int2 NOT NULL,
    comment TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.contact_us (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    number SERIAL NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT NOT NULL,
    message TEXT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Set the sequence starting value for request_number
ALTER SEQUENCE contact_us_number_seq RESTART WITH 111;


-- DROP TABLE public.biodata_request ;
-- DROP TABLE public.production_request ;
-- DROP TABLE public.payment_request ;