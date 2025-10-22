import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_80%_-200px,rgba(124,58,237,0.08),transparent_60%),linear-gradient(to_bottom_right,#fff7ec,#f6f2ea)] text-slate-800">
      <Header />
      <main className="container py-6 md:py-10">{children}</main>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-violet-600 text-white grid place-items-center font-bold">SH</div>
          <div className="leading-tight">
            <p className="text-sm text-slate-500">Scoutisme Hassania Marocain</p>
            <p className="text-base font-semibold">SHM Portal</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/connexion" className={({ isActive }) => cn("hover:text-violet-700", isActive && "text-violet-700 font-medium")}>Se connecter</NavLink>
          <NavLink to="/creer-un-compte" className={({ isActive }) => cn("text-white bg-violet-600 hover:bg-violet-700 px-3 py-1.5 rounded-md", isActive && "bg-violet-700")}>Créer un compte</NavLink>
        </nav>
      </div>
    </header>
  );
}
