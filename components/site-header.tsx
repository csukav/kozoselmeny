import Link from "next/link";
import { connection } from "next/server";
import { auth, signOut } from "@/auth";

export function SiteHeaderFallback() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Közös — főoldal">
          <span className="brand-mark">k.</span>
          <span>közös</span>
        </Link>
        <nav className="main-nav" aria-label="Fő navigáció">
          <Link href="/events">Események</Link>
          <Link href="/about">Rólunk</Link>
        </nav>
        <div className="header-actions">
          <Link className="header-signin" href="/login">Bejelentkezés</Link>
          <Link className="button button-small" href="/login?mode=register">
            Eseményt szervezek <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export async function SiteHeader() {
  await connection();
  const session = await auth();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Közös — főoldal">
          <span className="brand-mark">k.</span>
          <span>közös</span>
        </Link>
        <nav className="main-nav" aria-label="Fő navigáció">
          <Link href="/events">Események</Link>
          <Link href="/about">Rólunk</Link>
        </nav>
        <div className="header-actions">
          {session?.user ? (
            <>
              <Link className="header-dashboard" href="/dashboard">
                Saját fiókom
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="header-signin" type="submit">
                  Kilépés
                </button>
              </form>
            </>
          ) : (
            <>
              <Link className="header-signin" href="/login">
                Bejelentkezés
              </Link>
              <Link className="button button-small" href="/login?mode=register">
                Eseményt szervezek <span aria-hidden="true">↗</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
