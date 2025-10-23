import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";

export default function Frida() {
  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">Founoun Arriyada</h1>
        <p className="text-sm text-slate-600 mt-1">Bibliothèque de textes et ressources.</p>

        <div className="mt-4 space-y-2">
          <div className="bg-white p-4 rounded shadow">Texte 1</div>
          <div className="bg-white p-4 rounded shadow">Texte 2</div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
