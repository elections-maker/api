import * as schemas from "./lists.schemas";
import { generateRouter } from "@/utils/router";

import { getListService } from "./services/get.service";
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
    path: "/",
    method: "POST",
    handler: createListService,
    validators: [{ type: "json", schema: schemas.createListBody }],
  },
]);
