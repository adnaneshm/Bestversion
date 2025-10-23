import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { useAuth } from "@/lib/auth";

export default function Membres() {
  const { hasPermission } = useAuth();
  const showEval = hasPermission("create_eval_report") || hasPermission("create_anon_report");

  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">Membres</h1>
        <p className="text-sm text-slate-600 mt-1">Liste et évaluations des membres.</p>

        {showEval ? (
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Formulaire d'évaluation</h2>
            <form className="mt-3 grid gap-3">
              <input placeholder="Membre (ID)" className="p-2 border rounded" />
              <textarea placeholder="Évaluation" className="p-2 border rounded" />
              <div className="text-right">
                <button className="px-3 py-2 bg-violet-600 text-white rounded">Envoyer</button>
              </div>
            </form>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">Vous n'avez pas la permission d'évaluer.</p>
        )}

      </div>
    </AuthenticatedLayout>
  );
}
