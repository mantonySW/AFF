import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AssetAnalyticsRecord {
  id: string;
  asset_id: string;
  partner_id: string;
  action: 'view' | 'download' | 'copy';
  user_agent: string | null;
  browser: string | null;
  ip_address: string | null;
  session_id: string | null;
  created_at: string;
}