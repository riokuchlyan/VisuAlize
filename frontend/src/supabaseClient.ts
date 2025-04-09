// internal

// external
import { createClient } from '@supabase/supabase-js';

// built-in

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);