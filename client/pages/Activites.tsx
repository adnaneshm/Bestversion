import React, { useState } from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";

const sampleEvents = [
  { id: 1, date: "2025-10-20", title: "Réunion unité", present: true },
  { id: 2, date: "2025-10-22", title: "Camp", present: false },
];

export default function Activites() {
  const [events, setEvents] = useState(sampleEvents);

  function togglePresence(id: number) {
    setEvents((ev) => ev.map((e) => (e.id === id ? { ...e, present: !e.present } : e)));
  }

  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">Mes Activités</h1>
        <p className="text-sm text-slate-600 mt-1">Calendrier simple de présences/absences</p>

        <div className="mt-6 grid gap-3">
          {events.map((e) => (
            <div key={e.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-sm text-slate-500">{e.date}</div>
              </div>
              <div>
                <button onClick={() => togglePresence(e.id)} className={`px-3 py-2 rounded ${e.present ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}>
                  {e.present ? "Présent" : "Absent"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
