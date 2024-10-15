import * as schemas from "./client.schemas";
import { generateRouter } from "@/utils/router";

import { clientMiddleware } from "@/middlewares/client.middleware";

import { meService } from "./services/me.service";
import { joinService } from "./services/join.service";
import { loginService } from "./services/login.service";
import { getUserVotationsService } from "./services/get-all.service";

export const clientRouter = generateRouter([
  {
    path: "/auth/login",
    method: "POST",
    handler: loginService,
    validators: [{ type: "json", schema: schemas.loginBody }],
  },
  {
    path: "/auth/join",
    method: "POST",
    handler: joinService,
    validators: [{ type: "json", schema: schemas.joinBody }],
  },
  {
    path: "/auth/me",
    method: "GET",
    handler: meService,
    middlewares: [clientMiddleware],
  },
  {
    path: "/",
    method: "GET",
    handler: getUserVotationsService,
    middlewares: [clientMiddleware],
  },
]);
