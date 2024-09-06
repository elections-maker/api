import * as schemas from "./users.schemas";
import { generateRouter } from "@/utils/router";

import { getUserService } from "./services/get.service";
import { updateUserService } from "./services/update.service";
import { createUserService } from "./services/create.service";
import { getAllUsersService } from "./services/get-all.service";
import { deleteUserService } from "./services/delete.service";

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
    path: "/:userId",
    method: "DELETE",
    handler: deleteUserService,
  },
  {
    path: "/:userId",
    method: "PUT",
    handler: updateUserService,
    validators: [{ type: "json", schema: schemas.updateUserBody }],
  },
  {
    path: "/",
    method: "POST",
    handler: createUserService,
    validators: [{ type: "json", schema: schemas.createUserBody }],
  },
]);
