import Link from "next/link";
import type { EventCardData } from "@/lib/events";

const dateFormatter = new Intl.DateTimeFormat("hu-HU", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "Europe/Budapest",
});

const priceFormatter = new Intl.NumberFormat("hu-HU");

export function EventCard({ event }: { event: EventCardData }) {
  const remaining = Math.max(0, event.capacity - event.bookedSeats);

  return (
    <article className="event-card">
      <Link
        className="event-image"
        href={`/events/${event.slug}`}
        style={{ backgroundImage: `url("${event.imageUrl}")` }}
        aria-label={`${event.title} részletei`}
      >
        <span className="event-category">{event.category}</span>
        {remaining <= 5 && (
          <span className="event-spots">
            {remaining === 0 ? "Betelt" : `Már csak ${remaining} hely`}
          </span>
        )}
      </Link>
      <div className="event-card-body">
        <p className="event-date">{dateFormatter.format(event.date)}</p>
        <Link className="event-title" href={`/events/${event.slug}`}>
          {event.title}
        </Link>
        <p className="event-location">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {event.city} · {event.location}
        </p>
        <div className="event-card-bottom">
          <span className="event-organizer">
            <span className="organizer-avatar">
              {(event.organizer.name ?? "K").slice(0, 1).toLocaleUpperCase("hu-HU")}
            </span>
            {event.organizer.name ?? "Közösségi szervező"}
          </span>
          <span className="event-price">
            {event.price === 0 ? "Ingyenes" : `${priceFormatter.format(event.price)} Ft`}
          </span>
        </div>
      </div>
    </article>
  );
}
