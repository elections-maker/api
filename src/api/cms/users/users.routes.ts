import * as schemas from "./users.schemas";
import { generateRouter } from "@/utils/router";

import { createUserService } from "./services/create.service";
import { getAllUsersService } from "./services/get-all.service";

export const usersRouter = generateRouter([
  {
    path: "/",
    method: "GET",
    handler: getAllUsersService,
  },
  {
    path: "/",
    method: "POST",
    handler: createUserService,
    validators: [{ type: "json", schema: schemas.createUserBody }],
  },
]);
