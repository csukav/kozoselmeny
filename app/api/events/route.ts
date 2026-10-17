import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createSlug, eventInclude } from "@/lib/events";
import { eventSchema } from "@/lib/validations/event";

export async function GET() {
  const events = await db.event.findMany({
    where: { date: { gte: new Date() } },
    include: eventInclude,
    orderBy: { date: "asc" },
  });

  return NextResponse.json(
    events.map(({ bookings, ...event }) => ({
      ...event,
      bookedSeats: bookings.reduce((total, booking) => total + booking.seats, 0),
    })),
  );
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Bejelentkezés szükséges." }, { status: 401 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Érvénytelen JSON-kérés." }, { status: 400 });
  }

  const result = eventSchema.safeParse(input);
  if (!result.success) {
    return NextResponse.json(
      { error: "Ellenőrizd az esemény adatait.", issues: result.error.issues },
      { status: 400 },
    );
  }
  if (result.data.date <= new Date()) {
    return NextResponse.json({ error: "Az esemény időpontja a jövőben legyen." }, { status: 400 });
  }

  const event = await db.event.create({
    data: {
      ...result.data,
      imageUrl:
        result.data.imageUrl ||
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
      slug: `${createSlug(result.data.title) || "esemeny"}-${crypto.randomUUID().slice(0, 8)}`,
      organizerId: session.user.id,
    },
  });

  return NextResponse.json(event, { status: 201 });
}
