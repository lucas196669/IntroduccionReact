console.log(import.meta.env);
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

console.log('URL:', supabaseUrl);
console.log('KEY:', supabaseKey ? 'OK' : 'VACÍA');

export const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase);