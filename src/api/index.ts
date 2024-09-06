import { Hono } from "hono";

export const appRouter = new Hono().basePath("/v1");
