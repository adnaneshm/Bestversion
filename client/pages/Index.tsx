import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 p-6 md:p-10">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Bienvenue au Portail SHM</h1>
            <p className="text-slate-600 mt-2">Sélectionnez votre profil pour accéder aux ressources appropriées</p>
          </div>

          <div className="grid gap-6">
            <RoleCard
              emoji="✨"
              title="Membre"
              desc="Accès aux ressources et activités du scoutisme"
              cta="Continuer en tant que Membre"
              href="/categories"
              gradient="from-blue-500 to-blue-600"
            />
            <RoleCard
              emoji="📯"
              title="Chef"
              desc="Gestion d'équipe, validation des rapports et modération"
              cta="Continuer en tant que Chef"
              href="/connexion"
              gradient="from-slate-700 to-slate-800"
            />
          </div>

          <div className="text-center text-sm text-slate-600 mt-8">
            <p>
              Pas encore de compte? <a href="/creer-un-compte" className="text-violet-700 font-medium">Créer un compte</a>
            </p>
            <p className="mt-2">
              Besoin d'aide?
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

function RoleCard({ emoji, title, desc, cta, href, gradient }: { emoji: string; title: string; desc: string; cta: string; href: string; gradient: string }) {
  return (
    <div className="rounded-xl overflow-hidden bg-white ring-1 ring-black/5">
      <div className={`h-28 w-full bg-gradient-to-tr ${gradient} text-3xl grid place-items-center`}>{emoji}</div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-slate-600 mt-1">{desc}</p>
          </div>
        </div>
        <div className="mt-4">
          <Button asChild className="w-full bg-violet-600 hover:bg-violet-700">
            <a href={href}>{cta}</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
