import { generateRouter } from "@/utils/router";
import * as schemas from "./organizations.schemas";

import { getOrganizationService } from "./services/get.service";
import { getOrganizationsService } from "./services/get-all.service";
import { createOrganizationService } from "./services/create.service";
import { deleteOrganizationService } from "./services/delete.service";
import { updateOrganizationService } from "./services/update.service";

export const organizationsRouter = generateRouter([
  {
    path: "/",
    method: "GET",
    handler: getOrganizationsService,
  },
  {
    path: "/:organizationId",
    method: "GET",
    handler: getOrganizationService,
  },
  {
    path: "/:organizationId",
    method: "DELETE",
    handler: deleteOrganizationService,
  },
  {
    path: "/:organizationId",
    method: "PUT",
    handler: updateOrganizationService,
    validators: [{ type: "json", schema: schemas.updateOrgBody }],
  },
  {
    path: "/",
    method: "POST",
    handler: createOrganizationService,
    validators: [{ type: "json", schema: schemas.createOrgBody }],
  },
]);
