import Link from "next/link";
import { connection } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

const dateFormatter = new Intl.DateTimeFormat("hu-HU", {
  day: "numeric",
  month: "short",
  timeZone: "Europe/Budapest",
});

export default async function RecentEvents() {
  await connection();
  const session = await auth();
  if (!session?.user?.id) return null;

  const events = await db.event.findMany({
    where: { organizerId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { id: true, slug: true, title: true, date: true, category: true },
  });

  return (
    <section className="dashboard-widget recent-widget">
      <div className="widget-heading">
        <div><p className="eyebrow"><span className="eyebrow-dot" /> AMIT TE INDÍTOTTÁL</p><h2>Saját eseményeim</h2></div>
        <Link href="/dashboard/events/new">Új +</Link>
      </div>
      {events.length ? (
        <div className="recent-list">
          {events.map((event) => (
            <Link className="recent-row" href={`/events/${event.slug}`} key={event.id}>
              <span className="recent-category">{event.category.slice(0, 1)}</span>
              <span><strong>{event.title}</strong><small>{dateFormatter.format(event.date)} · {event.category}</small></span>
              <span className="recent-arrow">↗</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="widget-empty">
          <p>Még nem indítottál eseményt.</p>
          <Link href="/dashboard/events/new">Legyen az első! ↗</Link>
        </div>
      )}
    </section>
  );
}
