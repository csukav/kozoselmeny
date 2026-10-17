import type { Metadata } from "next";
import { connection } from "next/server";
import { EventExplorer } from "@/components/event-explorer";
import { getEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Események — közös",
  description: "Böngéssz a közösség programjai között.",
};

export default async function EventsPage() {
  await connection();
  const events = await getEvents();
  return <main><EventExplorer events={events} /></main>;
}
