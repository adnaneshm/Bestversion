import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";

const contacts = [
  { name: "Aya Bucha", role: "Coordonnatrice", phone: "+212612989463" },
  { name: "Malak S.", role: "Membre", phone: "+212600000001" },
  { name: "Ahmed L.", role: "Membre", phone: "+212600000002" },
];

export default function Support() {
  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">Support</h1>
        <p className="text-sm text-slate-600 mt-1">Liste des contacts et liens rapides</p>

        <ul className="mt-6 grid gap-3">
          {contacts.map((c) => (
            <li key={c.phone} className="bg-white rounded p-4 shadow flex items-center justify-between">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-slate-500">{c.role}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <a href={`tel:${c.phone}`} className="text-sm text-[#1E392A]">Appeler</a>
                <a target="_blank" rel="noreferrer" href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`} className="text-sm text-violet-600">WhatsApp</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AuthenticatedLayout>
  );
}
