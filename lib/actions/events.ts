"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createSlug } from "@/lib/events";
import { bookingSchema, eventSchema } from "@/lib/validations/event";

export type EventFormState = { error?: string } | undefined;

export async function createEvent(
  _previousState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Esemény létrehozásához jelentkezz be." };

  const result = eventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    location: formData.get("location"),
    city: formData.get("city"),
    category: formData.get("category"),
    price: formData.get("price"),
    capacity: formData.get("capacity"),
    imageUrl: formData.get("imageUrl"),
  });
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Ellenőrizd a megadott adatokat." };
  }
  if (result.data.date <= new Date()) return { error: "Az esemény időpontja a jövőben legyen." };

  const slugBase = createSlug(result.data.title) || "esemeny";
  const slug = `${slugBase}-${crypto.randomUUID().slice(0, 8)}`;
  await db.event.create({
    data: {
      ...result.data,
      imageUrl:
        result.data.imageUrl ||
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
      slug,
      organizerId: session.user.id,
    },
  });

  revalidatePath("/events");
  revalidatePath("/dashboard");
  redirect(`/events/${slug}`);
}

export async function bookEvent(
  _previousState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "A foglaláshoz jelentkezz be." };

  const result = bookingSchema.safeParse({
    eventId: formData.get("eventId"),
    seats: formData.get("seats"),
  });
  if (!result.success) return { error: "Érvénytelen foglalási adatok." };

  try {
    await db.$transaction(async (transaction) => {
      const event = await transaction.event.findUnique({
        where: { id: result.data.eventId },
        select: { capacity: true },
      });
      if (!event) throw new Error("NOT_FOUND");

      const previousBooking = await transaction.booking.findUnique({
        where: {
          userId_eventId: {
            userId: session.user.id,
            eventId: result.data.eventId,
          },
        },
        select: { id: true },
      });
      if (previousBooking) throw new Error("ALREADY_BOOKED");

      const bookings = await transaction.booking.findMany({
        where: { eventId: result.data.eventId },
        select: { seats: true },
      });
      const bookedSeats = bookings.reduce((total, booking) => total + booking.seats, 0);
      if (bookedSeats + result.data.seats > event.capacity) throw new Error("SOLD_OUT");

      await transaction.booking.create({
        data: {
          userId: session.user.id,
          eventId: result.data.eventId,
          seats: result.data.seats,
        },
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") return { error: "Ez az esemény már nem érhető el." };
      if (error.message === "ALREADY_BOOKED") return { error: "Erre az eseményre már foglaltál." };
      if (error.message === "SOLD_OUT") return { error: "Nincs elegendő szabad hely." };
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "Erre az eseményre már foglaltál." };
    }
    throw error;
  }

  revalidatePath("/events");
  revalidatePath("/dashboard/bookings");
  redirect("/dashboard/bookings?success=1");
}
