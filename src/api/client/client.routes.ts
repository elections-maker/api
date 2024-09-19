import * as schemas from "./client.schemas";
import { generateRouter } from "@/utils/router";

import { clientMiddleware } from "@/middlewares/client.middleware";

import { meService } from "./services/me.service";
import { loginService } from "./services/login.service";

export const clientRouter = generateRouter([
  {
    path: "/auth/login",
    method: "POST",
    handler: loginService,
    validators: [{ type: "json", schema: schemas.loginBody }],
  },
  {
    path: "/auth/me",
    method: "GET",
    handler: meService,
    middlewares: [clientMiddleware],
  },
]);
