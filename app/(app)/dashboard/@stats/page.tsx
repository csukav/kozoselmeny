import Link from "next/link";
import { connection } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function DashboardStats() {
  await connection();
  const session = await auth();
  if (!session?.user?.id) return null;

  const [bookings, events] = await Promise.all([
    db.booking.count({ where: { userId: session.user.id } }),
    db.event.count({ where: { organizerId: session.user.id } }),
  ]);

  return (
    <section className="dashboard-widget stats-widget">
      <div className="widget-heading">
        <div><p className="eyebrow"><span className="eyebrow-dot" /> GYORS ÁTTEKINTÉS</p><h2>A te számaid</h2></div>
      </div>
      <div className="stat-grid">
        <Link className="stat-card" href="/dashboard/bookings">
          <span className="stat-icon lavender">▣</span><strong>{bookings}</strong><span>foglalásom</span>
        </Link>
        <Link className="stat-card" href="/dashboard/events/new">
          <span className="stat-icon peach">✳</span><strong>{events}</strong><span>saját esemény</span>
        </Link>
      </div>
    </section>
  );
}
