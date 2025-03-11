import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "errors.email_empty")
    .email("errors.email_invalid"),
  password: z.string().min(1, "errors.password_empty"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
