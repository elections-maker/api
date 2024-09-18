import { orgFactory } from "@/api/factories";
import { votations } from "../../votations.repo";
import { votationsResponses } from "@/config/responses";
import { AddVotationListsBody } from "../../votations.schemas";

export const addVotationListsService = orgFactory.createHandlers(async (c) => {
  const { lists } = await c.req.json<AddVotationListsBody>();
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const listsToAdd = [];

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  for (const listId of lists) {
    const existingList = await votations.lists.findById(organizationId, votationId, listId);
    if (!existingList) listsToAdd.push({ organizationId, votationId, listId });
  }

  await votations.lists.createMany(listsToAdd);
  return c.json(votationsResponses.users.added, 201);
});
