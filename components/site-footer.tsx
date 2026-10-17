import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark">k.</span>
          <span>közös</span>
        </Link>
        <p>Kevesebb görgetés. Több közös emlék.</p>
        <span className="footer-copy">© 2026 közös. Találkozzunk ott.</span>
      </div>
    </footer>
  );
}
