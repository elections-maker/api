import * as schemas from "./lists.schemas";
import { generateRouter } from "@/utils/router";

import { getListService } from "./services/get.service";
import { updateListService } from "./services/update.service";
import { deleteListService } from "./services/delete.service";
import { createListService } from "./services/create.service";
import { getAllListsService } from "./services/get-all.service";
import { addListUsersService } from "./services/users/add.service";
import { getListUsersService } from "./services/users/get-all.service";
import { removeListUsersService } from "./services/users/remove.service";

export const listsRouter = generateRouter([
  {
    path: "/",
    method: "GET",
    handler: getAllListsService,
  },
  {
    path: "/:listId",
    method: "GET",
    handler: getListService,
  },
  {
    path: "/:listId",
    method: "DELETE",
    handler: deleteListService,
  },
  {
    path: "/:listId",
    method: "PUT",
    handler: updateListService,
    validators: [{ type: "json", schema: schemas.editListBody }],
  },
  {
    path: "/",
    method: "POST",
    handler: createListService,
    validators: [{ type: "json", schema: schemas.createListBody }],
  },
  {
    path: "/:listId/users",
    method: "GET",
    handler: getListUsersService,
  },
  {
    path: "/:listId/users",
    method: "POST",
    handler: addListUsersService,
    validators: [{ type: "json", schema: schemas.addListUsersBody }],
  },
  {
    path: "/:listId/users",
    method: "PUT",
    handler: removeListUsersService,
    validators: [{ type: "json", schema: schemas.removeListUsersBody }],
  },
]);
