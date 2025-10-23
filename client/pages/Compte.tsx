import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { useAuth } from "@/lib/auth";

export default function Compte() {
  const { user } = useAuth();

  return (
    <AuthenticatedLayout>
      <section>
        <h1 className="text-2xl font-bold">Mon Espace Compte</h1>
        <p className="mt-2 text-sm text-slate-700">Bienvenue, {user.name}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-white p-4 shadow"> 
            <p className="text-sm text-slate-500">Score Mensuel</p>
            <p className="text-3xl font-semibold text-[#1E392A]">{user.monthly_score ?? 0}</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow"> 
            <p className="text-sm text-slate-500">Profil</p>
            <p className="font-medium">{user.external_code} — {user.role}</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow"> 
            <p className="text-sm text-slate-500">Âge</p>
            <p className="font-medium">{user.age ?? "—"}</p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h2 className="font-semibold">Sections</h2>
          <ul className="grid md:grid-cols-3 gap-2">
            <li className="p-3 bg-white rounded shadow">Mes activités</li>
            <li className="p-3 bg-white rounded shadow">Mes évaluations</li>
            <li className="p-3 bg-white rounded shadow">Mes achats</li>
            <li className="p-3 bg-white rounded shadow">Historique</li>
            <li className="p-3 bg-white rounded shadow">Paramètres</li>
            <li className="p-3 bg-white rounded shadow">Notifications</li>
            <li className="p-3 bg-white rounded shadow">Support</li>
          </ul>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
