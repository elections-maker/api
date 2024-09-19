import * as schemas from "./client.schemas";
import { generateRouter } from "@/utils/router";

import { loginService } from "./services/login.service";

export const clientRouter = generateRouter([
  {
    path: "/auth/login",
    method: "POST",
    handler: loginService,
    validators: [{ type: "json", schema: schemas.loginBody }],
  },
]);
