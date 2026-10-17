import Link from "next/link";
import { connection } from "next/server";
import { auth } from "@/auth";
import type { EventCardData } from "@/lib/events";
import { EventBookingForm } from "@/components/event-booking-form";

const dateFormatter = new Intl.DateTimeFormat("hu-HU", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Budapest",
});

export async function EventDetail({
  event,
  modal = false,
}: {
  event: EventCardData;
  modal?: boolean;
}) {
  const remaining = Math.max(0, event.capacity - event.bookedSeats);
  await connection();
  const session = await auth();

  return (
    <article className={`event-detail${modal ? " event-detail-modal" : ""}`}>
      {modal && (
        <Link className="modal-close" href="/events" aria-label="Bezárás">
          ×
        </Link>
      )}
      <div
        className="detail-image"
        style={{ backgroundImage: `url("${event.imageUrl}")` }}
        role="img"
        aria-label={event.title}
      >
        <span className="event-category">{event.category}</span>
      </div>
      <div className="detail-content">
        <Link className="back-link" href="/events">← Vissza az eseményekhez</Link>
        <div className="detail-title-row">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> {event.city.toLocaleUpperCase("hu-HU")}</p>
            <h1>{event.title}</h1>
          </div>
          <span className="detail-price">
            {event.price === 0 ? "Ingyenes" : `${new Intl.NumberFormat("hu-HU").format(event.price)} Ft`}
            <small>/ fő</small>
          </span>
        </div>
        <div className="detail-facts">
          <p><span>◷</span><strong>Időpont</strong>{dateFormatter.format(event.date)}</p>
          <p><span>⌖</span><strong>Helyszín</strong>{event.location}, {event.city}</p>
          <p><span>♧</span><strong>Szervező</strong>{event.organizer.name ?? "Közösségi szervező"}</p>
          <p><span>↗</span><strong>Szabad hely</strong>{remaining} / {event.capacity}</p>
        </div>
        <div className="detail-description">
          <h2>Az eseményről</h2>
          <p>{event.description}</p>
        </div>
        <EventBookingForm
          eventId={event.id}
          isFull={remaining === 0}
          isSignedIn={Boolean(session?.user)}
          price={event.price}
        />
      </div>
    </article>
  );
}
