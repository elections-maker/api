import { generateRouter } from "@/utils/router";
import * as schemas from "./organizations.schemas";

import { createOrganizationService } from "./services/create.service";

export const organizationsRouter = generateRouter([
  {
    path: "/",
    method: "POST",
    handler: createOrganizationService,
    validators: [{ type: "json", schema: schemas.createOrgBody }],
  },
]);
