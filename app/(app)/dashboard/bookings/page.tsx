import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Foglalásaim — közös" };

const dateFormatter = new Intl.DateTimeFormat("hu-HU", {
  weekday: "short",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Budapest",
});

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  await connection();
  const session = await auth();
  if (!session?.user?.id) return null;
  const [{ success }, bookings] = await Promise.all([
    searchParams,
    db.booking.findMany({
      where: { userId: session.user.id },
      include: { event: true },
      orderBy: { event: { date: "asc" } },
    }),
  ]);

  return (
    <section className="dashboard-page">
      <p className="eyebrow"><span className="eyebrow-dot" /> A KÖVETKEZŐ TALÁLKOZÓID</p>
      <h1>Foglalásaim</h1>
      <p className="dashboard-page-intro">Minden közös élményed egy helyen.</p>
      {success === "1" && <p className="success-message">✓ A helyed biztosítva van. Találkozzunk ott!</p>}
      {bookings.length ? (
        <div className="booking-list">
          {bookings.map(({ id, seats, event }) => (
            <article className="booking-card" key={id}>
              <div className="booking-date-badge">
                <strong>{new Intl.DateTimeFormat("hu-HU", { day: "numeric", timeZone: "Europe/Budapest" }).format(event.date)}</strong>
                <span>{new Intl.DateTimeFormat("hu-HU", { month: "short", timeZone: "Europe/Budapest" }).format(event.date)}</span>
              </div>
              <div className="booking-card-copy">
                <p className="event-date">{dateFormatter.format(event.date)}</p>
                <h2>{event.title}</h2>
                <p>{event.location}, {event.city} · {seats} {seats === 1 ? "hely" : "hely"}</p>
              </div>
              <Link className="button button-outline" href={`/events/${event.slug}`}>Részletek <span>↗</span></Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-events dashboard-empty">
          <span>✳</span>
          <h2>Még nincs foglalásod</h2>
          <p>Nézz körül a programok között, és találd meg a következő kedvenced.</p>
          <Link className="button" href="/events">Események felfedezése ↗</Link>
        </div>
      )}
    </section>
  );
}
