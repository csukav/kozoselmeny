import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const eventInclude = {
  organizer: { select: { name: true } },
  _count: { select: { bookings: true } },
  bookings: { select: { seats: true } },
} as const;

export type EventCardData = Omit<
  Prisma.EventGetPayload<{ include: typeof eventInclude }>,
  "bookings"
> & { bookedSeats: number };

export async function getEvents() {
  const events = await db.event.findMany({
    where: { date: { gte: new Date() } },
    include: eventInclude,
    orderBy: { date: "asc" },
  });

  return events.map(({ bookings, ...event }) => ({
    ...event,
    bookedSeats: bookings.reduce((total, booking) => total + booking.seats, 0),
  }));
}

export async function getEventBySlug(slug: string) {
  const event = await db.event.findUnique({
    where: { slug },
    include: eventInclude,
  });

  if (!event) return null;

  const { bookings, ...eventData } = event;
  return {
    ...eventData,
    bookedSeats: bookings.reduce((total, booking) => total + booking.seats, 0),
  };
}

export function createSlug(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
