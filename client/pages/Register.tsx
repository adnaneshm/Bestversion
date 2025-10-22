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
  tutor?: { type?: string; prenom?: string; nom?: string; cin?: string; phone?: string };
  medical?: { blood?: string; weight?: string; height?: string; allergies?: string; notes?: string };
};

function generateId() {
  const n = Math.floor(Math.random() * 9999) + 1;
  return `E${String(n).padStart(4, "0")}`;
}

export default function Register() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>({ id: generateId(), prenom: "", nom: "", password: "", dob: "" });
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
    setStep((s) => Math.min(4, s + 1));
  }

  function prev() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  function finish() {
    // final validation, save to localStorage
    if (!draft.id || !draft.prenom || !draft.nom) return setError("Informations incomplètes");
    const users = JSON.parse(localStorage.getItem("shm_users") || "{}");
    users[draft.id] = { ...draft };
    localStorage.setItem("shm_users", JSON.stringify(users));
    alert("Compte créé — données enregistrées localement (demo)");
    window.location.href = "/";
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
                  <input type="number" placeholder="Mois" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ dob: `${draft.dob.split('-')[0] || ''}-${e.target.value}-${draft.dob.split('-')[2] || ''}` })} />
                  <input type="number" placeholder="Année" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ dob: `${draft.dob.split('-').slice(0,2).join('-')}-${e.target.value}` })} />
                </div>
                <input placeholder="Téléphone personnel" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ phone: e.target.value })} />
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
                <input placeholder="CIN" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ tutor: { ...(draft.tutor || {}), cin: e.target.value } })} />
                <input placeholder="Téléphone" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ tutor: { ...(draft.tutor || {}), phone: e.target.value } })} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Données médicales et optionnelles</h3>
              <div className="grid gap-3">
                <div className="grid grid-cols-3 gap-2">
                  <select className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ medical: { ...(draft.medical || {}), blood: e.target.value } })}>
                    <option>Groupe sanguin</option>
                    <option>A+</option>
                    <option>B+</option>
                    <option>O+</option>
                  </select>
                  <input placeholder="Poids (kg)" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ medical: { ...(draft.medical || {}), weight: e.target.value } })} />
                  <input placeholder="Taille (cm)" className="h-11 rounded-md border border-slate-200 bg-white px-3" onChange={(e) => update({ medical: { ...(draft.medical || {}), height: e.target.value } })} />
                </div>
                <textarea placeholder="Allergies" className="h-24 rounded-md border border-slate-200 bg-white px-3 p-2" onChange={(e) => update({ medical: { ...(draft.medical || {}), allergies: e.target.value } })} />
                <textarea placeholder="Antécédents médicaux" className="h-24 rounded-md border border-slate-200 bg-white px-3 p-2" onChange={(e) => update({ medical: { ...(draft.medical || {}), notes: e.target.value } })} />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-4">
            <a href="/connexion" className="text-slate-600 hover:text-slate-900">Déjà un compte? Se connecter</a>
            <div className="flex items-center gap-3">
              {step > 1 && <Button variant="outline" onClick={prev}>Précédent</Button>}
              {step < 4 && <Button onClick={next} className="bg-violet-600 hover:bg-violet-700">Suivant</Button>}
              {step === 4 && <Button onClick={finish} className="bg-violet-600 hover:bg-violet-700">Créer mon compte</Button>}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
