import { createClient } from '@supabase/supabase-js';

export const onRequestPost: PagesFunction<{ 
  VITE_SUPABASE_URL: string; 
  VITE_SUPABASE_ANON_KEY: string;
}> = async (context) => {
  const { request, env } = context;
  const { email, password } = await request.json() as any;

  if (email?.toLowerCase() !== 'clarklennisdean@gmail.com') {
    return new Response(JSON.stringify({ error: "ACCESS_DENIED :: CREDENTIAL_MISMATCH" }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

  // Check for custom admin password in Supabase
  const { data: settings } = await supabase
    .from('admin_settings')
    .select('value')
    .eq('key', 'admin_password')
    .single();

  const currentAdminPassword = settings?.value || "admin123";

  if (password === currentAdminPassword) {
    return new Response(JSON.stringify({ success: true }), { 
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ error: "ACCESS_DENIED :: CREDENTIAL_MISMATCH" }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
