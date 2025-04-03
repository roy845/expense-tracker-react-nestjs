import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters long")
    .max(100, "Email must be at most 100 characters long")
    .email("Invalid email address")
    .nonempty("Email is required"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
