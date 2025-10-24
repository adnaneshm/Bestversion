import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { useAuth } from "@/lib/auth";
import { Link } from "react-router-dom";

export default function Compte() {
  const { user } = useAuth();
  const [score, setScore] = useState<number | null>(user.monthly_score ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchScore() {
      setLoading(true);
      try {
        const resp = await fetch("/api/score");
        if (!resp.ok) return;
        const data = await resp.json();
        if (!mounted) return;
        if (data && typeof data.score === "number") setScore(data.score);
      } catch (e) {
        // ignore
      } finally { setLoading(false); }
    }
    fetchScore();
    return () => { mounted = false; };
  }, []);

  function computeAgeFromDob(dob?: string) {
    if (!dob) return undefined;
    const b = new Date(dob);
    if (isNaN(b.getTime())) return undefined;
    const now = new Date();
    let age = now.getFullYear() - b.getFullYear();
    const m = now.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
    return age;
  }

  return (
    <AuthenticatedLayout>
      <section>
        <h1 className="text-2xl font-bold">Mon Espace Compte</h1>
        <p className="mt-2 text-sm text-slate-700">Bienvenue, {user.name}</p>

        {/* Full profile card */}
        <div className="mt-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Détails du compte</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500">Prénom</p>
                <p className="font-medium">{(user.name || "").split(" ")[0] || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">Nom</p>
                <p className="font-medium">{(user.name || "").split(" ").slice(1).join(" ") || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">ID</p>
                <p className="font-medium">{user.external_code || user.role || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">Rôle</p>
                <p className="font-medium">{user.role || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">Niche</p>
                <p className="font-medium">{user.niche_id || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">Âge</p>
                <p className="font-medium">{computeAgeFromDob((user as any).dob) ?? '—'}</p>

                <p className="text-sm text-slate-500 mt-3">Téléphone (membre)</p>
                <p className="font-medium">{((user as any).phone) || '—'}</p>
              </div>

              <div>
                <h3 className="text-sm text-slate-500">Tuteur</h3>
                <div className="mt-2">
                  <p className="text-sm text-slate-500">Prénom</p>
                  <p className="font-medium">{((user as any).tutor?.prenom) || '—'}</p>

                  <p className="text-sm text-slate-500 mt-3">Nom</p>
                  <p className="font-medium">{((user as any).tutor?.nom) || '—'}</p>

                  <p className="text-sm text-slate-500 mt-3">Type</p>
                  <p className="font-medium">{((user as any).tutor?.type) || '—'}</p>

                  <p className="text-sm text-slate-500 mt-3">Téléphone (tuteur)</p>
                  <p className="font-medium">{((user as any).tutor?.phone) || '—'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections - support temporarily hidden */}
        <div className="mt-6 space-y-2">
          <h2 className="font-semibold">Sections</h2>
          <ul className="grid md:grid-cols-3 gap-2">
            <li className="p-3 bg-white rounded shadow"><Link to="/activites">Mes activités</Link></li>
            <li className="p-3 bg-white rounded shadow"><Link to="/membres">Mes évaluations</Link></li>
            <li className="p-3 bg-white rounded shadow"><Link to="/marketplace">Mes achats</Link></li>
            <li className="p-3 bg-white rounded shadow">Notifications</li>
          </ul>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
