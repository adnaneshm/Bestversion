import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";

export default function ChefCreation() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [dob, setDob] = useState("");
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("chef");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function computeAgeFromDob(dob?: string) {
    if (!dob) return undefined;
    const b = new Date(dob);
    if (isNaN(b.getTime())) return undefined;
    const now = new Date();
    let age = now.getFullYear() - b.getFullYear();
    const m = now.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
    return age;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!prenom || !nom || !dob || !cin || !password || !confirm) {
      setError(t('fill_all_fields') || 'Veuillez remplir tous les champs');
      return;
    }
    if (password !== confirm) {
      setError(t('passwords_mismatch') || 'Les mots de passe ne correspondent pas');
      return;
    }
    const age = computeAgeFromDob(dob);
    if (typeof age === 'number' && age < 18) {
      setError('Le chef doit être âgé de 18 ans ou plus.');
      return;
    }

    setLoading(true);
    try {
      const payload = { prenom, nom, dob, cin, password, role };
      const base = (import.meta as any).env?.VITE_API_BASE || window.location.origin;
      const url = `${base.replace(/\/$/, '')}/api/register`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const txt = await resp.text();
      let parsed: any = null;
      try { parsed = JSON.parse(txt); } catch (e) { parsed = null; }
      if (!resp.ok) {
        const msg = (parsed && (parsed.error || parsed.detail)) || txt || `HTTP ${resp.status}`;
        setError(`Erreur serveur: ${msg}`);
        setLoading(false);
        return;
      }
      // success
      window.location.href = '/compte-chef';
    } catch (err: any) {
      setError(err?.message || 'Erreur réseau');
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <section className="mx-auto max-w-xl">
        <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 p-6 md:p-8">
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{t('create_account')} - Chef</h1>
            <p className="text-slate-600 mt-1">Créer un compte chef (CIN requis)</p>
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
              <input value={cin} onChange={(e) => setCin(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Mot de passe</label>
                <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Confirmer mot de passe</label>
                <input value={confirm} type="password" onChange={(e) => setConfirm(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none" />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button className="bg-violet-600 hover:bg-violet-700" disabled={loading}>{loading ? 'Enregistrement…' : 'Créer mon compte'}</Button>
            </div>

            <div className="text-sm text-slate-600 mt-4">
              <a href="/chefs/connection" className="text-violet-700">Déjà un compte chef? Se connecter</a>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
