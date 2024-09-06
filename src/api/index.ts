import { Hono } from "hono";

import { authRouter } from "./base/auth/auth.routes";

export const appRouter = new Hono().basePath("/v1");

appRouter.route("auth", authRouter);
