"use server";

import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";

export type AuthFormState = { error?: string } | undefined;

export async function signInWithCredentials(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Ellenőrizd a megadott adatokat." };
  }

  try {
    await signIn("credentials", {
      ...result.data,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Hibás e-mail-cím vagy jelszó." };
    }
    throw error;
  }

  redirect("/dashboard");
}

export async function signUpWithCredentials(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Ellenőrizd a megadott adatokat." };
  }

  const existingUser = await db.user.findUnique({
    where: { email: result.data.email },
    select: { id: true },
  });
  if (existingUser) return { error: "Ezzel az e-mail-címmel már regisztráltak." };

  const passwordHash = await hash(result.data.password, 12);
  await db.user.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      passwordHash,
    },
  });

  try {
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "A fiók létrejött, de a bejelentkezés nem sikerült. Próbálj belépni." };
    }
    throw error;
  }

  redirect("/dashboard");
}

export async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/dashboard" });
}
