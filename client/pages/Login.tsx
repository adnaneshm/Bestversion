import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <MainLayout>
      <section className="mx-auto max-w-xl">
        <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Se connecter</h1>
            <p className="text-slate-600 mt-1">Accédez à votre espace SHM Portal</p>
          </div>

          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => setLoading(false), 900);
            }}
          >
            <div className="grid gap-2">
              <label htmlFor="id" className="text-sm font-medium text-slate-700">ID (ex: E0001)</label>
              <input id="id" name="id" required className="h-11 rounded-md border border-slate-200 bg-amber-50/60 px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="prenom" className="text-sm font-medium text-slate-700">Prénom</label>
                <input id="prenom" name="prenom" className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="nom" className="text-sm font-medium text-slate-700">Nom</label>
                <input id="nom" name="nom" className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">Mot de passe</label>
              <input id="password" type="password" required className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
            </div>
            <Button className="mt-2 bg-violet-600 hover:bg-violet-700" disabled={loading}>
              {loading ? "Connexion…" : "Se connecter"}
            </Button>
          </form>

          <div className="text-center text-sm text-slate-600 mt-6">
            <p>
              Pas encore de compte? <a href="/creer-un-compte" className="text-violet-700 font-medium">Créer un compte</a>
            </p>
            <p className="mt-2">
              <a className="text-violet-700" href="#">Mot de passe oublié?</a>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
