import { RequestHandler } from "express";

export const handleUpdateUser: RequestHandler = async (req, res) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE;
    if (!supabaseUrl || !serviceRole) {
      return res.status(500).json({ error: "Supabase configuration missing on server." });
    }

    const body = req.body as Record<string, any>;
    const id = body.id as string;
    if (!id) return res.status(400).json({ error: "Missing id" });

    // Prepare user update payload
    const allowed = [
      "prenom",
      "nom",
      "dob",
      "phone",
      "address",
      "role",
      "niche_id",
      "cin",
    ];

    const userPayload: Record<string, any> = {};
    for (const k of allowed) {
      if (k in body) userPayload[k] = body[k] ?? null;
    }

    // If tutor provided, insert tutor and attach tutor_id
    let tutor_id: number | null = null;
    if (body.tutor && typeof body.tutor === 'object') {
      const tutorPayload = {
        type: body.tutor.type || null,
        prenom: body.tutor.prenom || null,
        nom: body.tutor.nom || null,
        cin: body.tutor.cin || null,
        phone: body.tutor.phone || null,
        created_at: new Date().toISOString(),
      };

      const insertTutorResp = await fetch(`${supabaseUrl}/rest/v1/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceRole,
          Authorization: `Bearer ${serviceRole}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(tutorPayload),
      });

      if (insertTutorResp.ok) {
        const tutorInserted = await insertTutorResp.json();
        const t = Array.isArray(tutorInserted) ? tutorInserted[0] : tutorInserted;
        tutor_id = t?.id ?? null;
        userPayload.tutor_id = tutor_id;
      } else {
        // log but continue
        const dt = await insertTutorResp.text().catch(() => "");
        console.warn('Failed to create tutor during update:', dt);
      }
    }

    // Now patch user row by id. Try app_users first then users
    const urlA = `${supabaseUrl}/rest/v1/app_users?id=eq.${encodeURIComponent(id)}`;
    const urlB = `${supabaseUrl}/rest/v1/users?id=eq.${encodeURIComponent(id)}`;

    const doPatch = async (url: string, payload: Record<string, any>) => {
      return await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceRole,
          Authorization: `Bearer ${serviceRole}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      });
    };

    // Try patch A
    let resp = await doPatch(urlA, userPayload);
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      // fallback to users
      resp = await doPatch(urlB, userPayload);
      if (!resp.ok) {
        const txt2 = await resp.text().catch(() => "");
        // try detect missing column and retry without it
        const m = txt2.match(/Could not find the column '([^']+)'/) || txt2.match(/column "([^\"]+)" does not exist/);
        if (m && m[1]) {
          const col = m[1];
          if (col in userPayload) {
            const filtered = { ...userPayload };
            delete filtered[col as keyof typeof filtered];
            const retry = await doPatch(urlB, filtered);
            if (!retry.ok) {
              const errText = await retry.text().catch(() => "");
              return res.status(500).json({ error: 'Failed to update user', detail: errText });
            }
            const updated = await retry.json();
            return res.json({ user: Array.isArray(updated) ? updated[0] : updated });
          }
        }
        return res.status(500).json({ error: 'Failed to update user', detail: txt2 || txt });
      }
    }

    const updated = await resp.json();
    return res.json({ user: Array.isArray(updated) ? updated[0] : updated });
  } catch (error: any) {
    console.error('updateUser error', error);
    return res.status(500).json({ error: error?.message || 'Unknown error' });
  }
};
