import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for reset codes (for demo purposes)
  const resetCodes = new Map<string, { code: string; expires: number }>();
  // In-memory store for the "admin" password (since we're making it dynamic now)
  let adminPassword = "admin123";

  // API Routes
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (email?.toLowerCase() === 'clarklennisdean@gmail.com' && password === adminPassword) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "ACCESS_DENIED :: CREDENTIAL_MISMATCH" });
    }
  });

  app.post("/api/auth/forgot-password", async (req, res) => {
    const { email } = req.body;
    
    if (!email || email.toLowerCase() !== 'clarklennisdean@gmail.com') {
      return res.status(404).json({ error: "ADMIN_ID_NOT_FOUND" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    resetCodes.set(email.toLowerCase(), { 
      code, 
      expires: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    const resendKey = process.env.RESEND_API_KEY;
    
    if (!resendKey) {
      console.warn("RESEND_API_KEY not found. Code is:", code);
      return res.json({ 
        success: true, 
        message: "Simulation: Check server logs for the code.",
        simulated: true,
        code: code // Returning code in response for easy testing if no API key
      });
    }

    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
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
      });

      res.json({ success: true });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/verify-code", (req, res) => {
    const { email, code } = req.body;
    const stored = resetCodes.get(email?.toLowerCase());

    if (stored && stored.code === code && stored.expires > Date.now()) {
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "INVALID_OR_EXPIRED_CODE" });
    }
  });

  app.post("/api/auth/reset-password", (req, res) => {
    const { email, code, newPassword } = req.body;
    const stored = resetCodes.get(email?.toLowerCase());

    if (stored && stored.code === code && stored.expires > Date.now()) {
      adminPassword = newPassword;
      resetCodes.delete(email.toLowerCase());
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "VERIFICATION_FAILED" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
