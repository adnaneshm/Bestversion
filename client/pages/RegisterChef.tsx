import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";

export default function RegisterChef() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [dob, setDob] = useState("");
  const [cin, setCin] = useState("");
  const [role, setRole] = useState("chef_niche");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!prenom || !nom || !dob || !cin || !password || !confirm) {
      return setError("Veuillez remplir tous les champs.");
    }
    if (password !== confirm) return setError("Les mots de passe ne correspondent pas.");

    setLoading(true);
    try {
      const payload = {
        prenom,
        nom,
        dob,
        cin,
        role,
        password,
      };

      const base = (import.meta as any).env?.VITE_API_BASE || window.location.origin;
      const url = `${base.replace(/\/$/, '')}/api/register`;
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      async function readResp(r: Response) {
        try {
          const txt = await r.text();
          let parsed: any = null;
          try { parsed = JSON.parse(txt); } catch (e) { parsed = null; }
          return { txt, parsed };
        } catch (err: any) {
          try {
            const txt = await r.clone().text();
            let parsed: any = null;
            try { parsed = JSON.parse(txt); } catch (e) { parsed = null; }
            return { txt, parsed };
          } catch (inner) {
            return { txt: null, parsed: null };
          }
        }
      }

      const { txt, parsed } = await readResp(resp);

      if (!resp.ok) {
        const msg = (parsed && (parsed.detail || parsed.error)) || txt || `HTTP ${resp.status}`;
        setError(`Erreur serveur: ${msg}`);
        return;
      }

      // success - redirect to ephemeral success page showing id and role
      const roleParam = role ? `&role=${encodeURIComponent(role)}` : "";
      window.location.href = `/compte-cree?id=${encodeURIComponent(payload.prenom ? payload.prenom + payload.nom : '')}${roleParam}`;
    } catch (err: any) {
      setError(err?.message || "Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <section className="mx-auto max-w-xl">
        <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 p-6 md:p-8">
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{t('create_account')} - {t('chef')}</h1>
            <p className="text-slate-600 mt-1">{t('create_account')} dédié aux {t('chef')}</p>
          </div>

          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          <form className="grid gap-4" onSubmit={submit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">{t('roles')['prenom'] || 'Prénom'}</label>
                <input value={prenom} onChange={(e) => setPrenom(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">{t('roles')['nom'] || 'Nom'}</label>
                <input value={nom} onChange={(e) => setNom(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">{t('dob_invalid') /* label reuse for DOB */}</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">CIN</label>
              <input value={cin} onChange={(e) => setCin(e.target.value)} placeholder="CIN" className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">{t('roles')['chef_niche'] || 'Rôle'}</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none">
                <option value="chef_niche">{t('roles')['chef_niche']}</option>
                <option value="sous_chef">{t('roles')['sous_chef']}</option>
                <option value="chef_superieur">{t('roles')['chef_superieur']}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">{t('password') || 'Mot de passe'}</label>
                <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">{t('confirm_password') || 'Confirmer le mot de passe'}</label>
                <input value={confirm} type="password" onChange={(e) => setConfirm(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button className="bg-violet-600 hover:bg-violet-700" disabled={loading}>{loading ? 'Enregistrement…' : 'Créer le compte'}</Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
