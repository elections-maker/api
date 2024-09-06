import * as schemas from "./lists.schemas";
import { generateRouter } from "@/utils/router";

import { getListService } from "./services/get.service";
import { updateListService } from "./services/update.service";
import { createListService } from "./services/create.service";
import { getAllListsService } from "./services/get-all.service";

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
]);
