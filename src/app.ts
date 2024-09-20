import { cors } from "hono/cors";
import { appRouter } from "@/api";
import { Context, Hono } from "hono";
import { appConfig } from "@/config/app";
import { HTTPResponseError } from "hono/types";

export const baseHandler = (c: Context) => {
  return c.json({ success: true, message: "Hello from elections maker api!" }, 200);
};

export const errorHandler = (_: Error | HTTPResponseError, c: Context) => {
  return c.json({ success: false, message: "Internal Server Error!" }, 500);
};

export const bootstrapApplication = () => {
  return new Hono()
    .use(cors(appConfig.corsConfig))
    .all("/", baseHandler)
    .onError(errorHandler)
    .route("/api", appRouter);
};
