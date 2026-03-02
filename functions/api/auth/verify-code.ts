import { createClient } from '@supabase/supabase-js';

export const onRequestPost: PagesFunction<{ 
  VITE_SUPABASE_URL: string; 
  VITE_SUPABASE_ANON_KEY: string;
}> = async (context) => {
  const { request, env } = context;
  const { email, code } = await request.json() as any;

  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

  const { data: stored, error } = await supabase
    .from('reset_codes')
    .select('code, expires')
    .eq('email', email?.toLowerCase())
    .single();

  if (stored && stored.code === code && new Date(stored.expires) > new Date()) {
    return new Response(JSON.stringify({ success: true }), { 
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ error: "INVALID_OR_EXPIRED_CODE" }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
