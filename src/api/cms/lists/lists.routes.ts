import * as schemas from "./lists.schemas";
import { generateRouter } from "@/utils/router";

import { createListService } from "./services/create.service";

export const listsRouter = generateRouter([
  {
    path: "/",
    method: "POST",
    handler: createListService,
    validators: [{ type: "json", schema: schemas.createListBody }],
  },
]);
