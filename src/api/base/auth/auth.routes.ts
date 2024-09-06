import * as schemas from "./auth.schemas";
import { generateRouter } from "@/utils/router";
import { authMiddleware } from "@/middlewares/auth.middleware";

import { meService } from "./services/me.service";
import { loginService } from "./services/login.service";
import { registerService } from "./services/register.service";
import { verifyAccountService } from "./services/verify.service";

export const authRouter = generateRouter([
  {
    method: "POST",
    path: "/register",
    handler: registerService,
    validators: [{ type: "json", schema: schemas.registerBody }],
  },
  {
    method: "POST",
    path: "/login",
    handler: loginService,
    validators: [{ type: "json", schema: schemas.loginBody }],
  },
  {
    method: "GET",
    path: "/verify",
    handler: verifyAccountService,
  },
  {
    path: "/me",
    method: "GET",
    handler: meService,
    middlewares: [authMiddleware],
  },
]);
