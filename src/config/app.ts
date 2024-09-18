import { env } from "./env";

const smtpConfig = {
  host: env.EMAIL_HOST,
  service: env.EMAIL_SERVICE,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_SECURE,
  auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASSWORD },
};

const corsConfig = {
  origin: [env.FRONTEND_URL],
  allowHeaders: ["Access-Control-Allow-Origin", "Content-Type"],
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export const appConfig = {
  corsConfig,
  smtpConfig,
  databaseUrl: env.DATABASE_URL,
  serverPort: env.SERVER_PORT,
  serverHostname: env.SERVER_HOSTNAME,
  saltRounds: 10,
  frontendURL: env.FRONTEND_URL,
  jwtSecretKey: env.JWT_SECRET_KEY,
  encryptonKey: env.ENC_KEY,
  ivKey: env.IV,
};
