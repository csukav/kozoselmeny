import type { ReactNode } from "react";
import { Suspense } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, SiteHeaderFallback } from "@/components/site-header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<SiteHeaderFallback />}>
        <SiteHeader />
      </Suspense>
      <Suspense fallback={<main className="page-loading" aria-label="Oldal betöltése" />}>
        {children}
      </Suspense>
      <SiteFooter />
    </>
  );
}
