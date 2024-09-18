import { orgFactory } from "@/api/factories";
import { votations } from "../votations.repo";
import { usersResponses } from "@/config/responses";

export const deleteVotationService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(usersResponses.notExists, 404);

  await votations.delete(organizationId, votationId);
  return c.json(usersResponses.deleted, 200);
});
