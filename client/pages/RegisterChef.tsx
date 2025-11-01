import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

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

      const resp = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await resp.text();
      let parsed: any = null;
      try { parsed = JSON.parse(text); } catch (e) { parsed = null; }

      if (!resp.ok) {
        const msg = (parsed && (parsed.detail || parsed.error)) || text || `HTTP ${resp.status}`;
        setError(`Erreur serveur: ${msg}`);
        return;
      }

      // success - redirect to chef dashboard
      window.location.href = "/compte-chef";
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
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Créer un compte Chef</h1>
            <p className="text-slate-600 mt-1">Formulaire dédié aux chefs</p>
          </div>

          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          <form className="grid gap-4" onSubmit={submit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Prénom</label>
                <input value={prenom} onChange={(e) => setPrenom(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Nom</label>
                <input value={nom} onChange={(e) => setNom(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">Date de naissance</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">CIN</label>
              <input value={cin} onChange={(e) => setCin(e.target.value)} placeholder="CIN" className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">Rôle</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none">
                <option value="chef_niche">Chef de niches</option>
                <option value="sous_chef">Sous-chef</option>
                <option value="chef_superieur">Chef supérieur</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Mot de passe</label>
                <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Confirmer le mot de passe</label>
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
