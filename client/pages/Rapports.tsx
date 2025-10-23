import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { useAuth } from "@/lib/auth";

export default function Rapports() {
  const { isAyaBucha } = useAuth();

  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">Rapports de Séance</h1>
        <p className="text-sm text-slate-600 mt-1">Consultez et créez des rapports de séance.</p>

        <div className="mt-4">
          {isAyaBucha() ? (
            <button className="px-3 py-2 bg-[#1E392A] text-white rounded">Créer Rapport</button>
          ) : (
            <p className="text-sm text-slate-500">Le bouton de création est réservé à Aya Bucha (E9999).</p>
          )}
        </div>

        <div className="mt-6 space-y-2">
          <div className="bg-white p-4 rounded shadow">Rapport 2024-04-01</div>
          <div className="bg-white p-4 rounded shadow">Rapport 2024-03-20</div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
