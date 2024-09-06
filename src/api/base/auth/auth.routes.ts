import * as schemas from "./auth.schemas";
import { generateRouter } from "@/utils/router";

import { registerService } from "./services/register.service";

export const authRouter = generateRouter([
  {
    method: "POST",
    path: "/register",
    handler: registerService,
    validators: [{ type: "json", schema: schemas.registerBody }],
  },
]);
