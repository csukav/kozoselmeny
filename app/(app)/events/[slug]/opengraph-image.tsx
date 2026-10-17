import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getEventBySlug } from "@/lib/events";

export const alt = "Esemény a közös közösségi programok között";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 82% 18%, #e5eadf 0, transparent 38%), #fbfaf7",
          color: "#22251f",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "760px" }}>
          <div
            style={{
              color: "#e87e58",
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            ✳ KÖZÖS · {event.category.toLocaleUpperCase("hu-HU")}
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 74,
              lineHeight: 1.05,
              marginTop: 28,
            }}
          >
            {event.title}
          </div>
          <div style={{ color: "#667265", display: "flex", fontSize: 25, marginTop: 32 }}>
            {event.city} · {event.location}
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            background: "#355b48",
            borderRadius: 34,
            color: "white",
            display: "flex",
            fontFamily: "Georgia, serif",
            fontSize: 52,
            fontStyle: "italic",
            height: 108,
            justifyContent: "center",
            letterSpacing: -5,
            paddingRight: 7,
            width: 108,
          }}
        >
          k.
        </div>
      </div>
    ),
    size,
  );
}
