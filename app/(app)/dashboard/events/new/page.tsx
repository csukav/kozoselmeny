import type { Metadata } from "next";
import Link from "next/link";
import { CreateEventForm } from "@/components/create-event-form";

export const metadata: Metadata = { title: "Új esemény — közös" };

export default function NewEventPage() {
  return (
    <section className="dashboard-page">
      <Link className="back-link" href="/dashboard">← Vissza az áttekintéshez</Link>
      <p className="eyebrow"><span className="eyebrow-dot" /> TE HOZOD ÖSSZE</p>
      <h1>Új esemény</h1>
      <p className="dashboard-page-intro">Egy jó ötletből egyetlen lépés, hogy közös élmény legyen.</p>
      <CreateEventForm />
    </section>
  );
}
