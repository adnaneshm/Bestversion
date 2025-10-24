import React, { useState } from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";

const sampleEvents = [
  { id: 1, date: "2025-10-20", title: "Réunion unité", status: "none" },
  { id: 2, date: "2025-10-22", title: "Camp", status: "none" },
];

type Event = {
  id: number;
  date: string;
  title: string;
  status: "none" | "pending" | "confirmed";
  requested?: "present" | "absent";
};

export default function Activites() {
  const [events, setEvents] = useState<Event[]>(sampleEvents);

  function requestClaim(id: number, requested: "present" | "absent") {
    setEvents((ev) =>
      ev.map((e) => (e.id === id ? { ...e, status: "pending", requested } : e)),
    );
  }

  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">Mes Activités</h1>
        <p className="text-sm text-slate-600 mt-1">Calendrier simple de réclamations (présence / absence)</p>

        <div className="mt-6 grid gap-3">
          {events.map((e) => (
            <div key={e.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-sm text-slate-500">{e.date}</div>
              </div>

              <div className="flex items-center gap-2">
                {e.status === "none" && (
                  <>
                    <button onClick={() => requestClaim(e.id, "present")} className="px-3 py-2 rounded bg-green-600 text-white text-sm">Demander présence</button>
                    <button onClick={() => requestClaim(e.id, "absent")} className="px-3 py-2 rounded bg-red-600 text-white text-sm">Demander absence</button>
                  </>
                )}

                {e.status === "pending" && (
                  <div className="inline-flex items-center gap-2 rounded bg-yellow-400/90 text-yellow-900 px-3 py-2 text-sm">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4l2 2" />
                    </svg>
                    <span>Réclamation en attente</span>
                  </div>
                )}

                {e.status === "confirmed" && (
                  <div className="inline-flex items-center gap-2 rounded bg-green-600 text-white px-3 py-2 text-sm">Confirmé</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
