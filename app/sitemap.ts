import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const baseUrl =
    process.env.AUTH_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const events = await db.event.findMany({
    where: { date: { gte: new Date() } },
    select: { slug: true, createdAt: true },
    orderBy: { date: "asc" },
  });

  return [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/events`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.4 },
    ...events.map((event) => ({
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: event.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
