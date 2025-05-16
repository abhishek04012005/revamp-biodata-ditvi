CREATE TABLE public.user_details (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_number SERIAL NOT NULL,
    user_details JSONB NOT NULL,
    model_details JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
-- Set the sequence starting value for request_number
ALTER SEQUENCE user_details_request_number_seq RESTART WITH 1111;

CREATE TABLE public.biodata_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    flow_type int2 NOT NULL,
    request_number int4 NOT NULL,
    user_details JSONB NOT NULL,
    model_details JSONB NOT NULL,
    profile_url TEXT NULL,
    biodata_url TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

