CREATE TABLE public.user_details (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_number SERIAL NOT NULL,
    name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    model_number TEXT NOT NULL,
    language TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Set the sequence starting value for request_number
ALTER SEQUENCE user_details_request_number_seq RESTART WITH 1111;

