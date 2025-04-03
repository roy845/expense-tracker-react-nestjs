import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters long")
    .max(100, "Email must be at most 100 characters long")
    .email("Invalid email address")
    .nonempty("Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Password too weak. It must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), and at least one digit (0-9) or special character."
    )
    .nonempty("Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
