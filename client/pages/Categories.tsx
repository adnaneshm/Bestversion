import MainLayout from "@/components/layout/MainLayout";

const groups = [
  { label: "Z", title: "براعم", color: "bg-yellow-400 text-slate-900" },
  { label: "A", title: "أشبال", color: "bg-sky-300 text-slate-900" },
  { label: "B", title: "زهـرات", color: "bg-sky-200 text-slate-900" },
  { label: "C", title: "كشاف", color: "bg-slate-800 text-white" },
  { label: "E", title: "كشاف متقدم", color: "bg-red-600 text-white" },
  { label: "F", title: "رائدات", color: "bg-red-400 text-white" },
  { label: "G", title: "جوالة", color: "bg-amber-200 text-slate-900" },
  { label: "H", title: "دليلات", color: "bg-amber-100 text-slate-900" },
];

export default function Categories() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-lg">
        <div className="rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-center mb-1">عضو</h2>
          <p className="text-center text-slate-600 mb-6">Sélectionnez votre catégorie pour accéder à votre espace personnel</p>

          <div className="space-y-4">
            {groups.map((g) => (
              <div key={g.label} className="rounded-lg overflow-hidden bg-white ring-1 ring-black/5">
                <div className={`${g.color} p-4 text-center text-lg`}>{g.title}</div>
                <div className="flex items-center justify-between p-3">
                  <div className="text-sm text-slate-600">{g.label}</div>
                  <div className="text-sm text-slate-400">Catégorie {g.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
