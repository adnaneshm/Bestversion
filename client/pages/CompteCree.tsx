import React, { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { t } from "@/lib/i18n";

export default function CompteCree() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "—";
  const role = params.get("role") || null;
  const navigate = useNavigate();

  useEffect(() => {
    const tmo = setTimeout(() => navigate("/connexion"), 8000);
    return () => clearTimeout(tmo);
  }, [navigate]);

  return (
    <MainLayout>
      <section className="mx-auto max-w-xl">
        <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{t('created_success')}</h1>
          <p className="text-slate-600 mt-2">{t('created_success')}</p>

          <div className="mt-6 p-4 bg-green-50 rounded">
            <p className="text-sm text-slate-700">{t('your_id')}</p>
            <p className="font-mono font-semibold text-lg mt-2">{id}</p>
            {role && <p className="text-sm text-slate-500 mt-2">Rôle: {role}</p>}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a href="/connexion" className="px-4 py-2 bg-violet-600 text-white rounded">{t('member_cta')}</a>
            <button className="px-4 py-2 border rounded" onClick={() => navigator.clipboard?.writeText(id)}>{t('your_id')}</button>
          </div>

          <p className="mt-4 text-sm text-slate-500">{t('created_success')}</p>
        </div>
      </section>
    </MainLayout>
  );
}
