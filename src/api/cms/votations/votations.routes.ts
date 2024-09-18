import * as schemas from "./votations.schemas";
import { generateRouter } from "@/utils/router";

import { getVotationService } from "./services/get.service";
import { getVotationsService } from "./services/get-all.service";
import { updateVotationService } from "./services/update.service";
import { deleteVotationService } from "./services/delete.service";
import { createVotationService } from "./services/create.service";
import { addVotationUsersService } from "./services/users/add.service";
import { addVotationListsService } from "./services/lists/add.service";
import { getVotationUsersService } from "./services/users/get-all.service";
import { getVotationListsService } from "./services/lists/get-all.service";
import { removeVotationUsersService } from "./services/users/remove.service";
import { removeVotationListsService } from "./services/lists/remove.service";

export const votationsRouter = generateRouter([
  {
    path: "/",
    method: "GET",
    handler: getVotationsService,
  },
  {
    path: "/:votationId",
    method: "GET",
    handler: getVotationService,
  },
  {
    path: "/:votationId",
    method: "DELETE",
    handler: deleteVotationService,
  },
  {
    path: "/:votationId",
    method: "PUT",
    handler: updateVotationService,
    validators: [{ type: "json", schema: schemas.updateVotationBody }],
  },
  {
    path: "/",
    method: "POST",
    handler: createVotationService,
    validators: [{ type: "json", schema: schemas.createVotationBody }],
  },
  {
    path: "/:votationId/users",
    method: "GET",
    handler: getVotationUsersService,
  },
  {
    path: "/:votationId/users",
    method: "POST",
    handler: addVotationUsersService,
    validators: [{ type: "json", schema: schemas.addVotationUsersBody }],
  },
  {
    path: "/:votationId/users",
    method: "PUT",
    handler: removeVotationUsersService,
    validators: [{ type: "json", schema: schemas.removeVotationUsersBody }],
  },
  {
    path: "/:votationId/lists",
    method: "GET",
    handler: getVotationListsService,
  },
  {
    path: "/:votationId/lists",
    method: "POST",
    handler: addVotationListsService,
    validators: [{ type: "json", schema: schemas.addVotationListsBody }],
  },
  {
    path: "/:votationId/lists",
    method: "PUT",
    handler: removeVotationListsService,
    validators: [{ type: "json", schema: schemas.removeVotationListsBody }],
  },
]);
