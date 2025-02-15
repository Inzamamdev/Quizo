import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(6, "Username must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
