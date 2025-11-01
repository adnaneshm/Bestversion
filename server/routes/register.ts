import { RequestHandler } from "express";
import crypto from "crypto";

// Helper: produce a password hash using pbkdf2
function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256").toString("hex");
  return `pbkdf2_sha256$310000$${salt}$${derived}`;
}

export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE;
    // Debug: log presence (do not log secrets)
    console.log("SUPABASE_URL set:", !!supabaseUrl, "SUPABASE_SERVICE_ROLE set:", !!serviceRole);
    // Also log the actual host for debugging DNS/connectivity issues (non-secret)
    try { console.log("Using SUPABASE_URL:", supabaseUrl); } catch (e) { /* ignore */ }
    if (!supabaseUrl || !serviceRole) {
      console.error("Supabase configuration missing. SUPABASE_URL or SUPABASE_SERVICE_ROLE is not set.");
      return res.status(500).json({ error: "Supabase configuration missing on server." });
    }

    const {
      id,
      prenom,
      nom,
      password,
      dob,
      phone,
      address,
      category, // optional category code, e.g. 'C' or 'D'
      role, // optional role code string
      niche_id // optional niche id
    } = req.body as Record<string, any>;

    if (!id || !prenom || !nom || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Hash the password
    const password_hash = hashPassword(password);

    // If tutor provided, create tutor first to get tutor_id
    let tutor_id: number | null = null;
    if (req.body.tutor && typeof req.body.tutor === 'object') {
      const tutorPayload = {
        type: req.body.tutor.type || null,
        prenom: req.body.tutor.prenom || null,
        nom: req.body.tutor.nom || null,
        cin: req.body.tutor.cin || null,
        phone: req.body.tutor.phone || null,
        created_at: new Date().toISOString(),
      };

      const insertTutorResp = await fetch(`${supabaseUrl}/rest/v1/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": serviceRole,
          Authorization: `Bearer ${serviceRole}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(tutorPayload),
      });

      if (!insertTutorResp.ok) {
        const dt = await insertTutorResp.text();
        console.warn('Failed to create tutor:', dt);
      } else {
        const tutorInserted = await insertTutorResp.json();
        const t = Array.isArray(tutorInserted) ? tutorInserted[0] : tutorInserted;
        tutor_id = t?.id ?? null;
      }
    }

    // Insert into app_users via Supabase REST API
    const userPayload: Record<string, any> = {
      id,
      prenom,
      nom,
      password_hash,
      dob: dob || null,
      phone: phone || null,
      address: address || null,
      role: role || null,
      niche_id: niche_id || null,
      tutor_id: tutor_id,
      created_at: new Date().toISOString(),
    };

    const insertUserResp = await fetch(`${supabaseUrl}/rest/v1/app_users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": serviceRole,
        Authorization: `Bearer ${serviceRole}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(userPayload),
    });

    if (!insertUserResp.ok) {
      const errText = await insertUserResp.text();
      return res.status(500).json({ error: "Failed to insert user", detail: errText });
    }

    const insertedUsers = await insertUserResp.json();
    const insertedUser = Array.isArray(insertedUsers) ? insertedUsers[0] : insertedUsers;

    // If category provided, assign
    if (category) {
      const catPayload = { user_id: id, category_code: category };
      const insertCat = await fetch(`${supabaseUrl}/rest/v1/user_categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": serviceRole,
          Authorization: `Bearer ${serviceRole}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(catPayload),
      });

      if (!insertCat.ok) {
        // Not fatal for user creation; return warning
        const detail = await insertCat.text();
        return res.status(201).json({ user: insertedUser, warning: "User created but failed to assign category", detail });
      }
    }

    return res.status(201).json({ user: insertedUser });
  } catch (error: any) {
    console.error("register error", error);
    return res.status(500).json({ error: error?.message || "Unknown error" });
  }
};
