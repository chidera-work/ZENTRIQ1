import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

// Use a Proxy to lazily initialize the Supabase client.
// This prevents the app from crashing on startup if environment variables are missing.
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop, receiver) {
    if (!client) {
      if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase URL or Key is missing. Supabase features will be disabled.');
        // Return a dummy object that mimics the Supabase client structure to avoid immediate crashes
        // but allows the app to continue running with local fallbacks.
        return (prop === 'from') 
          ? () => ({
              select: () => ({ order: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }),
              upsert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }) }),
              delete: () => ({ eq: () => Promise.resolve({ error: new Error('Supabase not configured') }) }),
            })
          : undefined;
      }
      client = createClient(supabaseUrl, supabaseKey);
    }
    return Reflect.get(client, prop, receiver);
  },
});
