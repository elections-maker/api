import * as schemas from "./users.schemas";
import { generateRouter } from "@/utils/router";

import { getUserService } from "./services/get.service";
import { createUserService } from "./services/create.service";
import { getAllUsersService } from "./services/get-all.service";

export const usersRouter = generateRouter([
  {
    path: "/",
    method: "GET",
    handler: getAllUsersService,
  },
  {
    path: "/:userId",
    method: "GET",
    handler: getUserService,
  },
  {
    path: "/",
    method: "POST",
    handler: createUserService,
    validators: [{ type: "json", schema: schemas.createUserBody }],
  },
]);
