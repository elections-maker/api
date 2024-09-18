import { z } from "zod";

const envSchema = z.object({
  SERVER_PORT: z.string().transform((val) => parseInt(val, 10)),
  SERVER_HOSTNAME: z.string(),
  FRONTEND_URL: z.string().url(),

  JWT_SECRET_KEY: z.string().min(32),
  ENC_KEY: z.string().min(32),
  IV: z.string().min(32),

  EMAIL_HOST: z.string(),
  EMAIL_SERVICE: z.string(),
  EMAIL_PORT: z.string().transform((val) => parseInt(val, 10)),
  EMAIL_SECURE: z.string().transform((val) => val === "true"),
  EMAIL_USER: z.string(),
  EMAIL_PASSWORD: z.string(),

  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
