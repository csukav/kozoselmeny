"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createEvent } from "@/lib/actions/events";

export function CreateEventForm() {
  const [state, action, pending] = useActionState(createEvent, undefined);

  return (
    <form action={action} className="create-event-form">
      <div className="form-grid">
        <label className="form-field form-field-wide">Esemény neve<input maxLength={100} minLength={4} name="title" placeholder="Például: Közös reggeli a parkban" required /></label>
        <label className="form-field">Kategória
          <select defaultValue="Kultúra" name="category" required>
            <option>Kultúra</option><option>Gasztro</option><option>Workshop</option><option>Zene</option><option>Sport</option><option>Közösség</option>
          </select>
        </label>
        <label className="form-field">Dátum és idő<input name="date" required type="datetime-local" /></label>
        <label className="form-field">Város<input defaultValue="Budapest" maxLength={80} name="city" required /></label>
        <label className="form-field">Helyszín<input maxLength={120} name="location" placeholder="Hely neve, cím" required /></label>
        <label className="form-field">Részvételi díj (Ft)<input defaultValue="0" max="1000000" min="0" name="price" required type="number" /></label>
        <label className="form-field">Férőhelyek száma<input defaultValue="20" max="10000" min="1" name="capacity" required type="number" /></label>
        <label className="form-field form-field-wide">Kép URL <span className="optional-label">(nem kötelező)</span><input name="imageUrl" placeholder="https://..." type="url" /></label>
        <label className="form-field form-field-wide">Mesélj róla<textarea maxLength={2000} minLength={20} name="description" placeholder="Mi fog történni? Kinek szól? Mit hozzanak magukkal?" required rows={5} /></label>
      </div>
      {state?.error && <p className="form-error" role="alert">{state.error}</p>}
      <div className="create-form-actions">
        <Link className="button button-outline" href="/dashboard">Mégse</Link>
        <button className="button" disabled={pending} type="submit">
          {pending ? "Esemény létrehozása..." : "Esemény közzététele"} {!pending && <span>↗</span>}
        </button>
      </div>
    </form>
  );
}
