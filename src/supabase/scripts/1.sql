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


CREATE TABLE public.biodata_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_number int4 NOT NULL,
    flow_type int2 NOT NULL,
    user_details JSONB NOT NULL,
    model_details JSONB NOT NULL,
    profile_url TEXT NULL,
    biodata_url TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.user_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_number int4 NOT NULL,
    rating int2 NOT NULL,
    comment TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

