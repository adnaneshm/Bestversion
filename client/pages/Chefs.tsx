import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { useAuth } from "@/lib/auth";
import { t } from "@/lib/i18n";

export default function Chefs() {
  const { hasPermission } = useAuth();
  const showEval = hasPermission("create_eval_report") || hasPermission("create_anon_report");

  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">{t('chefs_title')}</h1>
        <p className="text-sm text-slate-600 mt-1">{t('chefs_subtitle')}</p>

        {showEval ? (
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Formulaire d'évaluation</h2>
            <form className="mt-3 grid gap-3">
              <input placeholder="Chef (ID)" className="p-2 border rounded" />
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
