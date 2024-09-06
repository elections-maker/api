import { Hono } from "hono";

export const appRouter = new Hono();

appRouter.basePath("/v1");
