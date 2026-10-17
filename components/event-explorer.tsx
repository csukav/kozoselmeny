"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { EventCard } from "@/components/event-card";
import type { EventCardData } from "@/lib/events";

const categories = ["Mind", "Kultúra", "Gasztro", "Workshop", "Zene", "Sport", "Közösség"];

export function EventExplorer({
  events,
  showHero = false,
}: {
  events: EventCardData[];
  showHero?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Mind");
  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("hu-HU");
    return events.filter((event) => {
      const matchesCategory = category === "Mind" || event.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${event.title} ${event.city} ${event.location} ${event.category}`
          .toLocaleLowerCase("hu-HU")
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, events, query]);

  return (
    <>
      {showHero && (
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> JÓ EGYÜTT LENNI</p>
              <h1>
                Ne csak nézd.
                <br />
                <span>Éld át együtt.</span>
              </h1>
              <p className="hero-description">
                Apró programok, nagy találkozások. Találd meg a következő élményt a
                szomszédban — és az embereket, akikkel megoszthatod.
              </p>
              <form
                className="hero-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  document.getElementById("programok")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <label className="search-input-wrap">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="10.8" cy="10.8" r="6.8" />
                    <path d="m16 16 4 4" />
                  </svg>
                  <input
                    aria-label="Program keresése"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Milyen programra vágysz?"
                    value={query}
                  />
                </label>
                <span className="search-divider" />
                <label className="search-city">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span>Budapest</span>
                  <svg className="chevron-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m7 10 5 5 5-5" />
                  </svg>
                </label>
                <button className="search-submit" type="submit">
                  Felfedezem <span aria-hidden="true">↗</span>
                </button>
              </form>
              <div className="hero-social-proof">
                <div className="avatar-stack" aria-hidden="true">
                  <span>R</span><span>M</span><span>Á</span><span>+</span>
                </div>
                <p><strong>2 400+</strong> ember talált már új közösségre</p>
              </div>
            </div>
            <div className="hero-visual" aria-label="Közösségi esemény, barátok egy kerti asztal körül">
              <div className="hero-photo" />
              <div className="hero-note hero-note-top">
                <span className="note-icon">✳</span>
                <span><strong>Jó dolgok történnek</strong><small>ha összehozzuk őket</small></span>
              </div>
              <div className="hero-note hero-note-bottom">
                <span className="live-dot" />
                <span><strong>Ma este is</strong><small>12 program vár rád</small></span>
                <span className="note-arrow">↗</span>
              </div>
              <span className="hero-sticker">találkozzunk<br />ott! <span>↘</span></span>
            </div>
            <span className="hero-orbit orbit-one" aria-hidden="true" />
            <span className="hero-orbit orbit-two" aria-hidden="true" />
          </div>
        </section>
      )}

      <section className={`events-section${showHero ? " home-events" : " listing-events"}`} id="programok">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> A KÖVETKEZŐ KEDVENCED</p>
            <h2>{showHero ? "Programok, amik összehoznak" : "Minden esemény"}</h2>
            <p className="section-subtitle">
              {showHero
                ? "Válogass a közösség legfrissebb ötletei közül."
                : "Találd meg azt, amihez ma kedved van."}
            </p>
          </div>
          <span className="event-count">{filteredEvents.length} program</span>
        </div>
        <div className="category-row" aria-label="Szűrés kategória szerint">
          <div className="category-tabs">
            {categories.map((item) => (
              <button
                aria-pressed={category === item}
                className={`category-tab${category === item ? " active" : ""}`}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item === "Mind" && <span aria-hidden="true">✳</span>}
                {item}
              </button>
            ))}
          </div>
          <label className="inline-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              aria-label="Események keresése"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Keresés"
              value={query}
            />
          </label>
        </div>
        {filteredEvents.length > 0 ? (
          <div className="event-grid">
            {filteredEvents.slice(0, showHero ? 6 : undefined).map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        ) : (
          <div className="empty-events">
            <span>✳</span>
            <h3>Most nincs ilyen program</h3>
            <p>Próbálj másik keresést vagy kategóriát — biztosan találsz valami neked valót.</p>
            <button
              className="text-button"
              onClick={() => {
                setQuery("");
                setCategory("Mind");
              }}
              type="button"
            >
              Szűrők törlése
            </button>
          </div>
        )}
        {showHero && filteredEvents.length > 6 && (
          <div className="center-action">
            <Link className="button button-outline" href="/events">
              Összes program <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
      </section>
      {showHero && <CommunityBanner />}
    </>
  );
}

function CommunityBanner() {
  return (
    <section className="community-banner">
      <div className="community-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> A TE ÖTLETED IS HIÁNYZIK</p>
        <h2>
          Van egy jó ötleted?
          <br />
          <span>Hozd össze a többieket.</span>
        </h2>
        <p>Nem kell nagy dolog. Elég egy asztal, egy séta, egy közös kezdés.</p>
        <a className="button button-light" href="/login?mode=register">
          Indítsd el az első eseményed <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="community-art" aria-hidden="true">
        <span className="community-flower">✳</span>
        <span className="community-word">együtt<br />jobb.</span>
        <span className="community-spark">✦</span>
      </div>
    </section>
  );
}
