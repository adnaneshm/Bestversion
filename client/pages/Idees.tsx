import React from "react";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";

export default function Idees() {
  return (
    <AuthenticatedLayout>
      <div dir="rtl" className="text-right">
        <h1 className="text-2xl font-bold">صندوق الأفكار</h1>
        <p className="text-sm text-slate-600 mt-1">مرحبا بكم في صندوق الأفكار - أرسل اقتراحك باللغة العربية.</p>

        <div className="mt-4">
          <textarea className="w-full p-3 rounded border" rows={6} placeholder="اكتب فكرتك هنا..."></textarea>
          <div className="mt-3 text-left">
            <button className="px-4 py-2 bg-[#1E392A] text-white rounded">إرسال</button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
