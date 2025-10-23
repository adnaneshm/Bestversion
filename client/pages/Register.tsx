import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Draft = {
  id: string;
  prenom: string;
  nom: string;
  password: string;
  dob: string;
  phone?: string;
  address?: string;
  role?: string;
  niche_id?: string;
  tutor?: { type?: string; prenom?: string; nom?: string; cin?: string; phone?: string };
};

function generateId() {
  const n = Math.floor(Math.random() * 9999) + 1;
  return `E${String(n).padStart(4, "0")}`;
}

export default function Register() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft & { role?: string; niche_id?: string }>({ id: generateId(), prenom: "", nom: "", password: "", dob: "", role: "member", niche_id: "default" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ensure id exists on first load
    if (!draft.id) setDraft((d) => ({ ...d, id: generateId() }));
  }, []);

  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  function next() {
    setError(null);
    // basic validation per step
    if (step === 1) {
      if (!draft.prenom || !draft.nom || !draft.password) return setError("Veuillez remplir les champs d'identifiants");
    }
    setStep((s) => Math.min(3, s + 1));
  }

  function prev() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  async function finish() {
    if (!draft.id || !draft.prenom || !draft.nom || !draft.password) return setError("Informations incomplètes");

    setError(null);
    try {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category") || undefined;

      // assemble tutor cin if split
      const tutor = draft.tutor ? { ...draft.tutor } : undefined;
      if (tutor) {
        const letters = (tutor as any).cinLetters || "";
        const digits = (tutor as any).cinDigits || "";
        (tutor as any).cin = letters + digits;
        // clean helper props
        delete (tutor as any).cinLetters;
        delete (tutor as any).cinDigits;
      }

      const payload = {
        id: draft.id,
        prenom: draft.prenom,
        nom: draft.nom,
        password: draft.password,
        dob: draft.dob || null,
        phone: draft.phone || null,
        address: draft.address || null,
        category,
        tutor,
      };

      const resp = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Read text once and try to parse JSON from it
      const raw = await resp.text();
      let parsed: any = null;
      try {
        parsed = JSON.parse(raw);
      } catch (e) {
        parsed = null;
      }

      if (!resp.ok) {
        const msg = (parsed && (parsed.detail || parsed.error)) || raw || `HTTP ${resp.status}`;
        setError(`Erreur serveur: ${msg}`);
        return;
      }

      // success
      alert("Compte créé avec succès");
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message || "Erreur réseau");
    }
  }

  return (
    <MainLayout>
      <section className="mx-auto max-w-xl">
        <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 p-6 md:p-8">
          <div className="mb-4 flex items-baseline justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Créer un compte</h1>
              <p className="text-slate-600 mt-1">Étape {step} de 4</p>
            </div>
            <div className="text-sm text-slate-500">ID généré: <span className="font-mono font-semibold ml-2">{draft.id}</span> <button type="button" className="ml-3 text-xs text-violet-700 underline" onClick={() => update({ id: generateId() })}>Régénérer</button></div>
          </div>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          {step === 1 && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Prénom</label>
                <input value={draft.prenom} onChange={(e) => update({ prenom: e.target.value })} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Nom</label>
                <input value={draft.nom} onChange={(e) => update({ nom: e.target.value })} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Rôle / Niche</label>
                <select value={draft.role} onChange={(e) => {
                  const role = e.target.value;
                  // map role to niche defaults
                  let niche_id = "default";
                  if (role === "e9999") niche_id = "aya";
                  if (role === "x5555") niche_id = "kechaf";
                  if (role === "VV9876") niche_id = "vvsuper";
                  if (role === "member") niche_id = "default";
                  update({ role, niche_id });
                }} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none">
                  <option value="member">Membre (par défaut)</option>
                  <option value="e9999">Aya Bucha (E9999)</option>
                  <option value="x5555">Niche Kechaf (Organisation)</option>
                  <option value="VV9876">Niche Supérieure (VV9876)</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Mot de passe</label>
                <input value={draft.password} type="password" onChange={(e) => update({ password: e.target.value })} className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Confirmer le mot de passe</label>
                <input type="password" className="h-11 rounded-md border border-slate-200 bg-white px-3" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Informations personnelles</h3>
              <div className="grid gap-3">
                <div className="grid grid-cols-3 gap-2">
                  <input type="number" placeholder="Jour" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ dob: `${e.target.value}-${draft.dob.split('-').slice(1).join('-')}` })} />
                  <select className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ dob: `${draft.dob.split('-')[0] || ''}-${String(e.target.value).padStart(2,'0')}-${draft.dob.split('-')[2] || ''}` })}>
                    <option value="">Mois</option>
                    <option value="01">Janvier</option>
                    <option value="02">Février</option>
                    <option value="03">Mars</option>
                    <option value="04">Avril</option>
                    <option value="05">Mai</option>
                    <option value="06">Juin</option>
                    <option value="07">Juillet</option>
                    <option value="08">Août</option>
                    <option value="09">Septembre</option>
                    <option value="10">Octobre</option>
                    <option value="11">Novembre</option>
                    <option value="12">Décembre</option>
                  </select>
                  <input type="number" placeholder="Année" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ dob: `${draft.dob.split('-').slice(0,2).join('-')}-${e.target.value}` })} />
                </div>
                <input placeholder="Téléphone personnel" inputMode="tel" type="tel" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ phone: e.target.value })} />
                <input placeholder="Adresse" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ address: e.target.value })} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Tuteur</h3>
              <div className="grid gap-3">
                <select className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ tutor: { ...(draft.tutor || {}), type: e.target.value } })}>
                  <option>Type de tuteur</option>
                  <option>Père</option>
                  <option>Mère</option>
                  <option>Autre</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="Prénom" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ tutor: { ...(draft.tutor || {}), prenom: e.target.value } })} />
                  <input placeholder="Nom" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ tutor: { ...(draft.tutor || {}), nom: e.target.value } })} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="CIN (lettres)" className="h-11 rounded-md border border-slate-200 bg-white px-3" maxLength={2} onChange={(e) => update({ tutor: { ...(draft.tutor || {}), cinLetters: e.target.value } })} />
                  <input placeholder="CIN (chiffres)" className="h-11 rounded-md border border-slate-200 bg-white px-3" inputMode="numeric" pattern="[0-9]*" onChange={(e) => update({ tutor: { ...(draft.tutor || {}), cinDigits: e.target.value } })} />
                </div>
                <input placeholder="Téléphone" inputMode="tel" type="tel" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ tutor: { ...(draft.tutor || {}), phone: e.target.value } })} />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-4">
            <a href="/connexion" className="text-slate-600 hover:text-slate-900">Déjà un compte? Se connecter</a>
            <div className="flex items-center gap-3">
              {step > 1 && <Button variant="outline" onClick={prev}>Précédent</Button>}
              {step < 3 && <Button onClick={next} className="bg-violet-600 hover:bg-violet-700">Suivant</Button>}
              {step === 3 && <Button onClick={finish} className="bg-violet-600 hover:bg-violet-700">Créer mon compte</Button>}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
