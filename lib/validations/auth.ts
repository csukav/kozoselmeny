import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Adj meg egy érvényes e-mail-címet.").trim().toLowerCase(),
  password: z.string().min(1, "Add meg a jelszavad."),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "A név legalább 2 karakter legyen.").max(80),
  email: z.email("Adj meg egy érvényes e-mail-címet.").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "A jelszó legalább 8 karakter legyen.")
    .max(72, "A jelszó legfeljebb 72 karakter lehet."),
});
