import * as schemas from "./users.schemas";
import { generateRouter } from "@/utils/router";

import { createUserService } from "./services/create.service";

export const usersRouter = generateRouter([
  {
    path: "/",
    method: "POST",
    handler: createUserService,
    validators: [{ type: "json", schema: schemas.createUserBody }],
  },
]);
