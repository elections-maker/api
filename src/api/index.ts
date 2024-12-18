import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { organizationMiddleware } from "@/middlewares/organization.middleware";

import { authRouter } from "./base/auth/auth.routes";
import { organizationsRouter } from "./base/organizations/organizations.routes";

import { usersRouter } from "./cms/users/users.routes";
import { listsRouter } from "./cms/lists/lists.routes";
import { votationsRouter } from "./cms/votations/votations.routes";

import { clientRouter } from "./client/client.routes";

export const appRouter = new Hono().basePath("/v1");

appRouter.use("admin/organizations/*", authMiddleware);
appRouter.use("admin/organizations/:organizationId/*", organizationMiddleware);

appRouter.route("auth", authRouter);
appRouter.route("admin/organizations", organizationsRouter);

appRouter.route("admin/organizations/:organizationId/users", usersRouter);
appRouter.route("admin/organizations/:organizationId/lists", listsRouter);
appRouter.route("admin/organizations/:organizationId/votations", votationsRouter);

appRouter.route("client", clientRouter);
