import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Bejelentkezés — közös",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  await connection();
  const session = await auth();
  if (session?.user) redirect("/dashboard");
  const { mode } = await searchParams;

  return (
    <main className="auth-page">
      <div className="auth-decoration auth-decoration-one" aria-hidden="true">✳</div>
      <div className="auth-decoration auth-decoration-two" aria-hidden="true">✦</div>
      <AuthForm
        githubEnabled={Boolean(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET)}
        initialMode={mode === "register" ? "register" : "login"}
      />
    </main>
  );
}
