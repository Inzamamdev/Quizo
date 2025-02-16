import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(6, "Username must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});
