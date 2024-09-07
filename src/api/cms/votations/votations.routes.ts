import * as schemas from "./votations.schemas";
import { generateRouter } from "@/utils/router";

import { createVotationService } from "./services/create.service";
import { getAllVotationsService } from "./services/get-all.service";

export const votationsRouter = generateRouter([
  {
    path: "/",
    method: "GET",
    handler: getAllVotationsService,
  },
  {
    path: "/",
    method: "POST",
    handler: createVotationService,
    validators: [{ type: "json", schema: schemas.createVotationBody }],
  },
]);
