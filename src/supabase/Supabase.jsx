import { createClient } from '@supabase/supabase-js';

console.log('process.env.REACT_APP_SUPABASE_URL', process.env.REACT_APP_SUPABASE_URL);

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);