import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { useAuth } from "@/lib/auth";

export default function Programme() {
  const { isKechafNiche } = useAuth();

  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">Programme</h1>
        <p className="text-sm text-slate-600 mt-1">Gestion des activités et calendriers</p>

        <div className="mt-4">
          {isKechafNiche() ? (
            <button className="px-3 py-2 bg-[#1E392A] text-white rounded">Ajouter</button>
          ) : (
            <p className="text-sm text-slate-500">Vous n'avez pas la permission d'ajouter des programmes.</p>
          )}
        </div>

        <div className="mt-6 grid gap-3">
          <div className="bg-white p-4 rounded shadow">Programme A — 12 avril</div>
          <div className="bg-white p-4 rounded shadow">Programme B — 20 avril</div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
