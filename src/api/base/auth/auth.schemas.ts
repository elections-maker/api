import { z } from "zod";

export const registerBody = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
});

export const loginBody = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export const forgotBody = z.object({
  email: z.string().email(),
});

export const resetBody = z.object({
  password: z.string().min(8),
});

export type RegisterBody = z.infer<typeof registerBody>;
export type LoginBody = z.infer<typeof loginBody>;
export type ResetBody = z.infer<typeof resetBody>;
export type ForgotBody = z.infer<typeof forgotBody>;
