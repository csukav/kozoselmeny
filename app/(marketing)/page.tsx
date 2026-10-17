import type { Metadata } from "next";
import { connection } from "next/server";
import { EventExplorer } from "@/components/event-explorer";
import { getEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "közös — találkozzunk ott",
  description:
    "Apró programok, nagy találkozások. Találd meg a következő közös élményt Budapesten.",
};

export default async function HomePage() {
  await connection();
  const events = await getEvents();
  return <main><EventExplorer events={events} showHero /></main>;
}
