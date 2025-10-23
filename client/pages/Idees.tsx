import React, { useState } from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";

export default function Idees() {
  const [shortIdea, setShortIdea] = useState("");
  const [development, setDevelopment] = useState("");
  const [resources, setResources] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const resp = await fetch("/api/idees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortIdea, development, resources, budget, name, contact }),
      });

      const txt = await resp.text();
      let parsed: any = null;
      try { parsed = JSON.parse(txt); } catch (e) { parsed = null; }

      if (!resp.ok) {
        setMsg((parsed && (parsed.error || parsed.detail)) || txt || `Erreur ${resp.status}`);
        setLoading(false);
        return;
      }

      setMsg("Envoyé avec succès — vous recevrez confirmation sur WhatsApp");
      setShortIdea(""); setDevelopment(""); setResources(""); setBudget(""); setName(""); setContact("");
    } catch (err: any) {
      setMsg(err?.message || "Erreur réseau");
    } finally { setLoading(false); }
  }

  return (
    <AuthenticatedLayout>
      <div dir="rtl" className="text-right">
        <h1 className="text-2xl font-bold">صندوق الأفكار</h1>
        <p className="text-sm text-slate-600 mt-1">مرحبا بكم في صندوق الأفكار - أرسل اقتراحك باللغة العربية.</p>

        <form onSubmit={submit} className="mt-4 grid gap-3">
          <div>
            <label className="text-sm">إدخال الفكرة (أقل من 100 حرف)</label>
            <textarea value={shortIdea} onChange={(e) => setShortIdea(e.target.value)} maxLength={100} required className="w-full p-3 rounded border" rows={3} />
          </div>

          <div>
            <label className="text-sm">تطوير الفكرة (أقل من 860 حرف)</label>
            <textarea value={development} onChange={(e) => setDevelopment(e.target.value)} maxLength={860} className="w-full p-3 rounded border" rows={6} />
          </div>

          <div>
            <label className="text-sm">الموارد المطلوبة (أقل من 400 حرف)</label>
            <textarea value={resources} onChange={(e) => setResources(e.target.value)} maxLength={400} className="w-full p-3 rounded border" rows={4} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">تقدير الميزانية (درهم)</label>
              <input inputMode="numeric" type="number" value={budget as any} onChange={(e) => setBudget(e.target.value === "" ? "" : Number(e.target.value))} className="w-full p-2 rounded border" />
            </div>
            <div>
              <label className="text-sm">الاسم (اختياري)</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded border" />
            </div>
          </div>

          <div>
            <label className="text-sm">معلومات الاتصال (اختياري)</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)} className="w-full p-2 rounded border" />
          </div>

          {msg && <div className="text-sm text-slate-700">{msg}</div>}

          <div className="text-left">
            <button disabled={loading} type="submit" className="px-4 py-2 bg-[#1E392A] text-white rounded">{loading ? "إرسال…" : "إرسال"}</button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
