"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  signInWithCredentials,
  signInWithGitHub,
  signUpWithCredentials,
} from "@/lib/actions/auth";

export function AuthForm({
  githubEnabled,
  initialMode = "login",
}: {
  githubEnabled: boolean;
  initialMode?: "login" | "register";
}) {
  const [mode, setMode] = useState(initialMode);
  const [loginState, loginAction, loginPending] = useActionState(signInWithCredentials, undefined);
  const [registerState, registerAction, registerPending] = useActionState(signUpWithCredentials, undefined);
  const isRegister = mode === "register";
  const error = isRegister ? registerState?.error : loginState?.error;
  const pending = isRegister ? registerPending : loginPending;

  return (
    <section className="auth-card">
      <div className="auth-heading">
        <span className="auth-mark">k.</span>
        <p className="eyebrow"><span className="eyebrow-dot" /> JÓ HOGY ITT VAGY</p>
        <h1>{isRegister ? "Legyünk ismerősök." : "Jó újra látni."}</h1>
        <p>{isRegister ? "Hozz létre egy fiókot, és indulhatnak a közös élmények." : "Jelentkezz be, és folytasd ott, ahol abbahagytad."}</p>
      </div>
      <form action={isRegister ? registerAction : loginAction} className="auth-form">
        {isRegister && (
          <label>
            Neved
            <input autoComplete="name" name="name" placeholder="Hogy szólíthatunk?" required />
          </label>
        )}
        <label>
          E-mail-cím
          <input autoComplete="email" name="email" placeholder="te@email.hu" required type="email" />
        </label>
        <label>
          Jelszó
          <input
            autoComplete={isRegister ? "new-password" : "current-password"}
            minLength={isRegister ? 8 : undefined}
            name="password"
            placeholder={isRegister ? "Legalább 8 karakter" : "A jelszavad"}
            required
            type="password"
          />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button auth-submit" disabled={pending} type="submit">
          {pending ? "Egy pillanat..." : isRegister ? "Fiók létrehozása" : "Bejelentkezés"}
          {!pending && <span aria-hidden="true">↗</span>}
        </button>
      </form>
      {githubEnabled && (
        <>
          <div className="auth-divider"><span>vagy folytasd ezzel</span></div>
          <form action={signInWithGitHub}>
            <button className="github-button" type="submit">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .297a12 12 0 0 0-3.79 23.38c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.28 0 .32.22.69.83.57A12 12 0 0 0 12 .297Z" />
              </svg>
              Folytatás GitHub-bal
            </button>
          </form>
        </>
      )}
      <p className="auth-switch">
        {isRegister ? "Már van fiókod?" : "Még nincs fiókod?"}{" "}
        <button
          onClick={() => setMode(isRegister ? "login" : "register")}
          type="button"
        >
          {isRegister ? "Bejelentkezés" : "Regisztráció"}
        </button>
      </p>
      <p className="auth-terms">A folytatással elfogadod a közös felhasználási feltételeit.</p>
      <Link className="auth-back" href="/">← Vissza a főoldalra</Link>
    </section>
  );
}
