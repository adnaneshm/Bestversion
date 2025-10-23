import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";

export default function Anachid() {
  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">Anachid</h1>
        <p className="text-sm text-slate-600 mt-1">Liste de lecture. Utilisez la recherche pour filtrer.</p>

        <div className="mt-4">
          <input placeholder="Rechercher anachid..." className="w-full p-2 rounded border" />
        </div>

        <ul className="mt-4 space-y-2">
          <li className="bg-white p-3 rounded shadow flex items-center justify-between">Anachid 1 <button className="text-sm text-violet-700">Lire</button></li>
          <li className="bg-white p-3 rounded shadow flex items-center justify-between">Anachid 2 <button className="text-sm text-violet-700">Lire</button></li>
        </ul>
      </div>
    </AuthenticatedLayout>
  );
}
