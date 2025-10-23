import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { useAuth } from "@/lib/auth";

const items = [
  { id: "u1", name: "Uniforme A", age_min: 12, price: 25 },
  { id: "u2", name: "Uniforme B", age_min: 18, price: 30 },
];

export default function Marketplace() {
  const { user } = useAuth();

  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <p className="text-sm text-slate-600 mt-1">Achetez des articles validés par âge.</p>

        <div className="mt-6 space-y-3">
          {items.map((it) => {
            const disabled = (user.age ?? 0) < it.age_min;
            return (
              <div key={it.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-slate-500">Age minimum: {it.age_min}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-semibold">${it.price}</div>
                  <button disabled={disabled} className={`px-3 py-2 rounded ${disabled ? "bg-gray-300 text-gray-600" : "bg-violet-600 text-white"}`}>
                    {disabled ? "Âge insuffisant" : "Acheter"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
