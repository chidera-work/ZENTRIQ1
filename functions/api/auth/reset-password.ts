import { createClient } from '@supabase/supabase-js';

export const onRequestPost: PagesFunction<{ 
  VITE_SUPABASE_URL: string; 
  VITE_SUPABASE_ANON_KEY: string;
}> = async (context) => {
  const { request, env } = context;
  const { email, code, newPassword } = await request.json() as any;

  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

  const { data: stored, error: fetchError } = await supabase
    .from('reset_codes')
    .select('code, expires')
    .eq('email', email?.toLowerCase())
    .single();

  if (stored && stored.code === code && new Date(stored.expires) > new Date()) {
    // Update admin password in settings
    const { error: updateError } = await supabase
      .from('admin_settings')
      .upsert({ key: 'admin_password', value: newPassword }, { onConflict: 'key' });

    if (updateError) {
      return new Response(JSON.stringify({ error: "DATABASE_UPDATE_FAILED" }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete the used code
    await supabase
      .from('reset_codes')
      .delete()
      .eq('email', email.toLowerCase());

    return new Response(JSON.stringify({ success: true }), { 
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ error: "VERIFICATION_FAILED" }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
