import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { useAuth } from "@/lib/auth";
import { Link } from "react-router-dom";

export default function Compte() {
  const { user } = useAuth();
  const [remoteUser, setRemoteUser] = useState<any | null>(null);
  const [score, setScore] = useState<number | null>(user.monthly_score ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchRemoteUser() {
      try {
        let id = user.external_code || (user as any).id;
        if (typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('shm_user');
            if (stored) {
              const parsed = JSON.parse(stored);
              id = parsed.external_code || parsed.externalCode || parsed.id || id;
            }
          } catch (e) { }
        }
        if (!id) return;
        const resp = await fetch(`/api/user?id=${encodeURIComponent(id)}`);
        if (!resp.ok) return;
        const data = await resp.json();
        if (!mounted) return;
        setRemoteUser(data.user || null);
      } catch (e) {
        console.warn('Failed loading remote user', e);
      }
    }

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

    fetchRemoteUser();
    fetchScore();
    return () => { mounted = false; };
  }, [user.external_code]);

  const displayUser = remoteUser || user;

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

  const firstName = (displayUser as any).prenom || (displayUser.name || '').split(' ')[0] || '';
  const lastName = (displayUser as any).nom || (displayUser.name || '').split(' ').slice(1).join(' ') || '';
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : (displayUser.name || '');
  const isChef = String(displayUser.role || '').toLowerCase().includes('chef') || String(displayUser.niche_id || '').toLowerCase().includes('chef') || (typeof window !== 'undefined' && window.location.pathname.includes('compte-chef'));

  return (
    <AuthenticatedLayout>
      <section>
        <h1 className="text-2xl font-bold">Mon Espace Compte</h1>
        <p className="mt-2 text-sm text-slate-700">Bienvenue, {displayName}</p>

        {/* Full profile card */}
        <div className="mt-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Détails du compte</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500">Prénom</p>
                <p className="font-medium">{(displayUser as any).prenom || firstName || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">Nom</p>
                <p className="font-medium">{(displayUser as any).nom || lastName || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">ID</p>
                <p className="font-medium">{displayUser.external_code || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">Rôle</p>
                <p className="font-medium">{displayUser.role || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">Niche</p>
                <p className="font-medium">{displayUser.niche_id || "—"}</p>

                <p className="text-sm text-slate-500 mt-3">CIN</p>
                <p className="font-medium">{((displayUser as any).cin) || '—'}</p>

                <p className="text-sm text-slate-500 mt-3">Âge</p>
                <p className="font-medium">{computeAgeFromDob((displayUser as any).dob) ?? '—'}</p>

                <p className="text-sm text-slate-500 mt-3">Téléphone (membre)</p>
                <p className="font-medium">{((displayUser as any).phone) || '—'}</p>
              </div>

              {!isChef && (
                <div>
                  <h3 className="text-sm text-slate-500">Tuteur</h3>
                  <div className="mt-2">
                    <p className="text-sm text-slate-500">Prénom</p>
                    <p className="font-medium">{((displayUser as any).tutor?.prenom) || '—'}</p>

                    <p className="text-sm text-slate-500 mt-3">Nom</p>
                    <p className="font-medium">{((displayUser as any).tutor?.nom) || '—'}</p>

                    <p className="text-sm text-slate-500 mt-3">Type</p>
                    <p className="font-medium">{((displayUser as any).tutor?.type) || '—'}</p>

                    <p className="text-sm text-slate-500 mt-3">Téléphone (tuteur)</p>
                    <p className="font-medium">{((displayUser as any).tutor?.phone) || '—'}</p>
                  </div>
                </div>
              )}
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
