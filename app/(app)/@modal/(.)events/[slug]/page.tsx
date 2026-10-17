import { notFound } from "next/navigation";
import { EventDetail } from "@/components/event-detail";
import { getEventBySlug } from "@/lib/events";

export default async function EventModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="modal-backdrop">
      <EventDetail event={event} modal />
    </div>
  );
}
