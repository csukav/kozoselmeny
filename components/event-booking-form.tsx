"use client";

import Link from "next/link";
import { useActionState } from "react";
import { bookEvent } from "@/lib/actions/events";

export function EventBookingForm({
  eventId,
  isFull,
  isSignedIn,
  price,
}: {
  eventId: string;
  isFull: boolean;
  isSignedIn: boolean;
  price: number;
}) {
  const [state, action, pending] = useActionState(bookEvent, undefined);

  if (!isSignedIn) {
    return (
      <div className="booking-box">
        <p>Foglalj helyet, és találkozz velünk ott!</p>
        <Link className="button" href="/login">Bejelentkezés a foglaláshoz <span>↗</span></Link>
      </div>
    );
  }

  return (
    <form action={action} className="booking-box">
      <input name="eventId" type="hidden" value={eventId} />
      <label htmlFor="seats">Hány helyet foglaljak?</label>
      <div className="booking-row">
        <select aria-label="Helyek száma" defaultValue="1" id="seats" name="seats">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((seats) => (
            <option key={seats} value={seats}>{seats} fő</option>
          ))}
        </select>
        <button className="button" disabled={isFull || pending} type="submit">
          {isFull ? "Betelt" : pending ? "Foglalás..." : "Helyet foglalok"}
          {!isFull && !pending && <span aria-hidden="true">↗</span>}
        </button>
      </div>
      <p className="booking-note">
        {state?.error ? <span role="alert">{state.error}</span> : price === 0 ? "A részvétel ingyenes." : "A fizetés a helyszínen történik."}
      </p>
    </form>
  );
}
