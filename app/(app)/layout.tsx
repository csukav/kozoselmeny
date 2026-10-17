import type { ReactNode } from "react";
import { Suspense } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, SiteHeaderFallback } from "@/components/site-header";

export default function AppLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<SiteHeaderFallback />}>
        <SiteHeader />
      </Suspense>
      <Suspense fallback={<main className="page-loading" aria-label="Oldal betöltése" />}>
        {children}
      </Suspense>
      <Suspense fallback={null}>{modal}</Suspense>
      <SiteFooter />
    </>
  );
}
