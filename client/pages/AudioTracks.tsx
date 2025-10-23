import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";

export default function AudioTracks() {
  return (
    <AuthenticatedLayout>
      <div>
        <h1 className="text-2xl font-bold">Firqa Nohassia</h1>
        <p className="text-sm text-slate-600 mt-1">Lecteur MP3 dédié — table audio_tracks</p>

        <div className="mt-4 space-y-2">
          <div className="bg-white p-4 rounded shadow flex items-center justify-between">Track A <button className="text-sm text-violet-700">Play</button></div>
          <div className="bg-white p-4 rounded shadow flex items-center justify-between">Track B <button className="text-sm text-violet-700">Play</button></div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
