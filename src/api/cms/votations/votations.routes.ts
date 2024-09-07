import * as schemas from "./votations.schemas";
import { generateRouter } from "@/utils/router";

import { getVotationService } from "./services/get.service";
import { createVotationService } from "./services/create.service";
import { updateVotationService } from "./services/update.service";
import { getAllVotationsService } from "./services/get-all.service";

export const votationsRouter = generateRouter([
  {
    path: "/",
    method: "GET",
    handler: getAllVotationsService,
  },
  {
    path: "/:votationId",
    method: "GET",
    handler: getVotationService,
  },
  {
    path: "/:votationId",
    method: "PUT",
    handler: updateVotationService,
    validators: [{ type: "json", schema: schemas.editVotationBody }],
  },
  {
    path: "/",
    method: "POST",
    handler: createVotationService,
    validators: [{ type: "json", schema: schemas.createVotationBody }],
  },
]);
