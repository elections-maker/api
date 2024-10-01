import { orgFactory } from "@/api/factories";
import { votations } from "../votations.repo";
import { votationsResponses } from "@/config/responses";

export const deleteVotationService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  await votations.delete(organizationId, votationId);
  return c.json(votationsResponses.deleted, 200);
});
