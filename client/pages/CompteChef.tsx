import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { useAuth } from "@/lib/auth";
import { Link } from "react-router-dom";

export default function CompteChef() {
  const { user } = useAuth();

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

  return (
    <AuthenticatedLayout>
      <section>
        <h1 className="text-2xl font-bold">Espace Chef</h1>
        <p className="mt-2 text-sm text-slate-700">Bienvenue, {user.name}</p>

        <div className="mt-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Détails du compte (Chef)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500">Prénom</p>
                <p className="font-medium">{(user.name || "").split(" ")[0] || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">Nom</p>
                <p className="font-medium">{(user.name || "").split(" ").slice(1).join(" ") || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">Rôle</p>
                <p className="font-medium">{user.role || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">CIN</p>
                <p className="font-medium">{((user as any).cin) || '—'}</p>

                <p className="text-sm text-slate-500 mt-3">Âge</p>
                <p className="font-medium">{computeAgeFromDob((user as any).dob) ?? '—'}</p>

                <p className="text-sm text-slate-500 mt-3">Téléphone</p>
                <p className="font-medium">{((user as any).phone) || '—'}</p>
              </div>

              <div>
                <h3 className="text-sm text-slate-500">Actions</h3>
                <div className="mt-2 space-y-2">
                  <Link to="/activites" className="block p-3 bg-white rounded shadow">Mes activités</Link>
                  <Link to="/membres" className="block p-3 bg-white rounded shadow">Mes évaluations</Link>
                  <Link to="/rapports" className="block p-3 bg-white rounded shadow">Rapports</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
