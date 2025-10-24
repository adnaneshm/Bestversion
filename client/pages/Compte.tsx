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

  return (
    <AuthenticatedLayout>
      <section>
        <h1 className="text-2xl font-bold">Mon Espace Compte</h1>
        <p className="mt-2 text-sm text-slate-700">Bienvenue, {user.name}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-slate-500">Score Mensuel</p>
            <p className="text-3xl font-semibold text-[#1E392A]">{loading ? '…' : (score ?? '—')}</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-slate-500">Profil</p>
            <p className="font-medium">{user.external_code} — {user.role}</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-slate-500">Âge</p>
            <p className="font-medium">{user.age ?? "—"}</p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h2 className="font-semibold">Sections</h2>
          <ul className="grid md:grid-cols-3 gap-2">
            <li className="p-3 bg-white rounded shadow"><Link to="/activites">Mes activités</Link></li>
            <li className="p-3 bg-white rounded shadow"><Link to="/membres">Mes évaluations</Link></li>
            <li className="p-3 bg-white rounded shadow"><Link to="/marketplace">Mes achats</Link></li>
            <li className="p-3 bg-white rounded shadow">Notifications</li>
            <li className="p-3 bg-white rounded shadow"><Link to="/support">Support</Link></li>
          </ul>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
