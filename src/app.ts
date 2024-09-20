import { cors } from "hono/cors";
import { appRouter } from "@/api";
import { Context, Hono } from "hono";
import { appConfig } from "@/config/app";

export const baseHandler = (c: Context) => {
  return c.json({ success: true, message: "Hello from elections maker api!" }, 200);
};

export const bootstrapApplication = () => {
  return new Hono().use(cors(appConfig.corsConfig)).all("/", baseHandler).route("/api", appRouter);
};
