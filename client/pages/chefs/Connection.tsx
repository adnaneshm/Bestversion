import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";

export default function ChefConnection() {
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!cin || !password) {
      setError('Veuillez renseigner le CIN et le mot de passe');
      return;
    }
    setLoading(true);
    try {
      const base = (import.meta as any).env?.VITE_API_BASE || window.location.origin;
      const url = `${base.replace(/\/$/, '')}/api/login`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cin, password, role: 'chef' }),
      });
      const txt = await resp.text();
      let parsed: any = null;
      try { parsed = JSON.parse(txt); } catch (e) { parsed = null; }
      if (!resp.ok) {
        const msg = (parsed && (parsed.error || parsed.detail)) || txt || `HTTP ${resp.status}`;
        setError(msg);
        setLoading(false);
        return;
      }
      try { const json = parsed || JSON.parse(txt || '{}'); const userObj = json.user || json; if (userObj && typeof window !== 'undefined') { try { localStorage.setItem('shm_user', JSON.stringify(userObj)); } catch (e) {} } } catch (e) {}
      window.location.href = '/compte-chef';
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <section className="mx-auto max-w-xl">
        <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Connexion Chef</h1>
            <p className="text-slate-600 mt-1">Connectez-vous avec votre CIN</p>
          </div>

          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          <form className="grid gap-4" onSubmit={submit}>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">CIN</label>
              <input value={cin} onChange={(e) => setCin(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-amber-50/60 px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">Mot de passe</label>
              <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
            </div>

            <Button className="mt-2 bg-violet-600 hover:bg-violet-700" disabled={loading}>{loading ? 'Connexion…' : 'Se connecter'}</Button>

            <div className="text-center text-sm text-slate-600 mt-6">
              <div className="mt-4">
                <a href="/chefs/creation" className="inline-block w-full text-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Créer le compte chef</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
