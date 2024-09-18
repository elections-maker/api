import { orgFactory } from "@/api/factories";
import { votations } from "../../votations.repo";
import { votationsResponses } from "@/config/responses";
import { RemoveVotationListsBody } from "../../votations.schemas";

export const removeVotationListsService = orgFactory.createHandlers(async (c) => {
  const { lists } = await c.req.json<RemoveVotationListsBody>();
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const listsToRemove = [];

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  for (const listId of lists) {
    const existingList = await votations.lists.findById(organizationId, votationId, listId);
    if (existingList) listsToRemove.push({ organizationId, votationId, listId });
  }

  await votations.lists.deleteMany(listsToRemove);
  return c.json(votationsResponses.users.removed, 201);
});
