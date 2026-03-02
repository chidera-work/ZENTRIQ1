import { createClient } from '@supabase/supabase-js';

export const onRequestPost: PagesFunction<{ 
  VITE_SUPABASE_URL: string; 
  VITE_SUPABASE_ANON_KEY: string;
  RESEND_API_KEY: string;
}> = async (context) => {
  const { request, env } = context;
  const { email } = await request.json() as any;

  if (!email || email.toLowerCase() !== 'clarklennisdean@gmail.com') {
    return new Response(JSON.stringify({ error: "ADMIN_ID_NOT_FOUND" }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

  // Store reset code in Supabase
  const { error: dbError } = await supabase
    .from('reset_codes')
    .upsert({ email: email.toLowerCase(), code, expires }, { onConflict: 'email' });

  if (dbError) {
    return new Response(JSON.stringify({ error: "DATABASE_ERROR" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const resendKey = env.RESEND_API_KEY;
  
  if (!resendKey) {
    console.warn("RESEND_API_KEY not found. Code is:", code);
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Simulation: Check server logs for the code.",
      simulated: true,
      code: code 
    }), { 
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Zentriq Logistics <onboarding@resend.dev>',
        to: [email],
        subject: 'SECURE_VERIFICATION_CODE :: Zentriq Nexus',
        html: `
          <div style="font-family: monospace; background-color: #050505; color: #ffffff; padding: 40px; border: 1px solid #A61A1A;">
            <h1 style="color: #A61A1A; text-transform: uppercase; letter-spacing: 0.5em;">Verification Required</h1>
            <p style="letter-spacing: 0.1em; line-height: 1.6;">A password reset has been requested. Use the following tactical code to verify your identity:</p>
            <div style="background-color: #111; padding: 20px; border-left: 4px solid #A61A1A; margin: 20px 0;">
              <p style="margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 0.3em; color: #A61A1A;">${code}</p>
            </div>
            <p style="font-size: 10px; color: #444; margin-top: 40px;">SECURED BY ZENTRIQ CIPHER-8 // CODE EXPIRES IN 10 MINUTES</p>
          </div>
        `,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend error:", errorData);
      return new Response(JSON.stringify({ error: "EMAIL_TRANSMISSION_FAILED" }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), { 
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
