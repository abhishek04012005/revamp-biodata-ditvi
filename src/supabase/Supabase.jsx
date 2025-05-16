import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jgkgpmvynvzbxcsyeeth.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impna2dwbXZ5bnZ6Ynhjc3llZXRoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjcyOTI3MiwiZXhwIjoyMDYyMzA1MjcyfQ.davleCKvqYV7_mnuD-0jscY-94889_rjtYUQTbjmH4c';

export const supabase = createClient(supabaseUrl, supabaseKey);