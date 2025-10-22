import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

export default function Register() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-xl">
        <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Créer un compte</h1>
            <p className="text-slate-600 mt-1">Étape 1 de 4</p>
          </div>

          <form className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="rid" className="text-sm font-medium text-slate-700">ID (ex: E0001)</label>
              <input id="rid" className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="rprenom" className="text-sm font-medium text-slate-700">Prénom</label>
                <input id="rprenom" className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="rnom" className="text-sm font-medium text-slate-700">Nom</label>
                <input id="rnom" className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="rpassword" className="text-sm font-medium text-slate-700">Mot de passe</label>
              <input id="rpassword" type="password" className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="rpassword2" className="text-sm font-medium text-slate-700">Confirmer le mot de passe</label>
              <input id="rpassword2" type="password" className="h-11 rounded-md border border-slate-200 bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-violet-600" />
            </div>
            <div className="flex items-center justify-between gap-4 pt-2">
              <a href="/connexion" className="text-slate-600 hover:text-slate-900">Déjà un compte? Se connecter</a>
              <Button className="bg-violet-600 hover:bg-violet-700">Suivant</Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
