import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().trim().min(4, "A cím legalább 4 karakter legyen.").max(100),
  description: z
    .string()
    .trim()
    .min(20, "A leírás legalább 20 karakter legyen.")
    .max(2000),
  date: z.iso.datetime({ local: true }).transform((value) => new Date(value)),
  location: z.string().trim().min(2, "Add meg a helyszínt.").max(120),
  city: z.string().trim().min(2, "Add meg a várost.").max(80),
  category: z.enum([
    "Kultúra",
    "Gasztro",
    "Workshop",
    "Zene",
    "Sport",
    "Közösség",
  ]),
  price: z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() ? Number(value) : Number.NaN) : value),
    z.number().int().min(0).max(1_000_000),
  ),
  capacity: z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() ? Number(value) : Number.NaN) : value),
    z.number().int().min(1).max(10_000),
  ),
  imageUrl: z.union([z.url({ protocol: /^https?$/ }), z.literal("")]).optional(),
});

export const bookingSchema = z.object({
  eventId: z.string().min(1),
  seats: z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() ? Number(value) : Number.NaN) : value),
    z.number().int().min(1).max(10),
  ),
});
