import { generateRouter } from "@/utils/router";
import * as schemas from "./organizations.schemas";

import { createOrganizationService } from "./services/create.service";
import { getAllOrganizationsService } from "./services/get-all.service";

export const organizationsRouter = generateRouter([
  {
    path: "/",
    method: "GET",
    handler: getAllOrganizationsService,
  },
  {
    path: "/",
    method: "POST",
    handler: createOrganizationService,
    validators: [{ type: "json", schema: schemas.createOrgBody }],
  },
]);
