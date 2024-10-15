import * as schemas from "./users.schemas";
import { generateRouter } from "@/utils/router";

import { getUserService } from "./services/get.service";
import { getUsersService } from "./services/get-all.service";
import { updateUserService } from "./services/update.service";
import { deleteUserService } from "./services/delete.service";
import { createUserService } from "./services/create.service";
import { uploadUsersService } from "./services/upload.service";
import { inviteUserService } from "./services/invite.service";

export const usersRouter = generateRouter([
  {
    path: "/",
    method: "GET",
    handler: getUsersService,
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
    path: "/invite/:userId",
    method: "GET",
    handler: inviteUserService,
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
  {
    path: "/upload",
    method: "POST",
    handler: uploadUsersService,
  },
]);
