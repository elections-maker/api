import * as schemas from "./votations.schemas";
import { generateRouter } from "@/utils/router";

import { createVotationService } from "./services/create.service";

export const votationsRouter = generateRouter([
  {
    path: "/",
    method: "POST",
    handler: createVotationService,
    validators: [{ type: "json", schema: schemas.createVotationBody }],
  },
]);
