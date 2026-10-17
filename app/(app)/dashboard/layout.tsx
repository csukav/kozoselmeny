import type { ReactNode } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
  stats,
  recent,
}: {
  children: ReactNode;
  stats: ReactNode;
  recent: ReactNode;
}) {
  await connection();
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">k.</span><span>közös</span>
        </Link>
        <p className="sidebar-label">MENÜ</p>
        <nav className="dashboard-nav" aria-label="Vezérlőpult">
          <Link className="selected" href="/dashboard"><span>⌂</span>Áttekintés</Link>
          <Link href="/dashboard/bookings"><span>▣</span>Foglalásaim</Link>
          <Link href="/dashboard/events/new"><span>＋</span>Új esemény</Link>
          <Link href="/events"><span>◷</span>Események böngészése</Link>
        </nav>
        <div className="sidebar-prompt">
          <span>✳</span>
          <strong>Van egy ötleted?</strong>
          <p>Hozz össze egy új közös élményt.</p>
          <Link href="/dashboard/events/new">Esemény létrehozása ↗</Link>
        </div>
        <div className="sidebar-user">
          <span className="user-avatar">{(session.user.name ?? session.user.email ?? "K").slice(0, 1).toLocaleUpperCase("hu-HU")}</span>
          <span><strong>{session.user.name ?? "Közösségi tag"}</strong><small>{session.user.email}</small></span>
        </div>
      </aside>
      <div className="dashboard-content">
        <header className="dashboard-topbar">
          <p>Az én közös területem <span>/</span> {session.user.name ?? "Fiókom"}</p>
          <Link className="dashboard-view-site" href="/">Vissza a főoldalra ↗</Link>
        </header>
        <div className="dashboard-main-content">
          {children}
          <div className="dashboard-widgets">
            {stats}
            {recent}
          </div>
        </div>
      </div>
    </main>
  );
}
