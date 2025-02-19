import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z.string().min(1, "Please enter the password"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
