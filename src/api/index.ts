import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { organizationMiddleware } from "@/middlewares/organization.middleware";

import { authRouter } from "./base/auth/auth.routes";
import { organizationsRouter } from "./base/organizations/organizations.routes";

export const appRouter = new Hono().basePath("/v1");

appRouter.use("admin/organizations/*", authMiddleware);
appRouter.use("admin/organizations/:organizationId/*", organizationMiddleware);

appRouter.route("auth", authRouter);
appRouter.route("admin/organizations", organizationsRouter);
