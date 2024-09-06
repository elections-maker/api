import { Hono } from "hono";
import { cors } from "hono/cors";
import { appRouter } from "@/api";
import { appConfig } from "@/config/app";

export const bootstrapApplication = () => {
  const app = new Hono();

  app.use(cors(appConfig.corsConfig));

  app.route("/api", appRouter);

  return app;
};
