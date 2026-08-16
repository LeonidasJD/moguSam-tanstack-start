import { z } from "zod";

export const verifyEmailSchema = z.object({
  token: z.string(),
});
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

const passwordSchema = z
  .string()
  .min(8, "Lozinka mora imati najmanje 8 karaktera")
  .regex(/(?=.*[a-z])/, "Lozinka mora sadrzavati malo slovo")
  .regex(/(?=.*[A-Z])/, "Lozinka mora sadrzavati veliko slovo")
  .regex(/(?=.*\d)/, "Lozinka mora sadrzavati broj")
  .regex(
    /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
    "Lozinka mora sadrzavati specijalni karakter",
  )
  .max(32, "Lozinka mora biti maksimalno 32 karaktera");

// Zod schema for create account form payload
export const createAccountSchema = z
  .object({
    name: z.string().min(1, "Ime i prezime je obavezno"),
    email: z.email("Unesi validan email"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Lozinke se ne poklapaju",
  });

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;

// Zod schema for forgot password form payload

export const loginSchema = z.object({
  email: z.email("Unesi validan email"),
  password: passwordSchema,
});
export type LoginSchema = z.infer<typeof loginSchema>;

// Zod schema for me query
export const meSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  isEmailVerified: z.boolean(),
  createdAt: z.string(),
});
export type MeSchema = z.infer<typeof meSchema>;

// zod schema for forgot password form payload

export const forgotPasswordSchema = z.object({
  email: z.email("Unesi validan email"),
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

//zod schema for reset password form payload

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Lozinke se ne poklapaju",
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
