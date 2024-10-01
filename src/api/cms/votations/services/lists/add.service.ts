import { orgFactory } from "@/api/factories";
import { votations } from "../../votations.repo";
import { lists } from "@/api/cms/lists/lists.repo";
import { votationsResponses } from "@/config/responses";
import { AddVotationListsBody } from "../../votations.schemas";

export const addVotationListsService = orgFactory.createHandlers(async (c) => {
  const { data } = await c.req.json<AddVotationListsBody>();
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const listsToAdd = [];

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  for (const listId of data) {
    const existingList = await lists.findById(organizationId, listId);

    if (existingList) {
      const listAdded = await votations.lists.findById(organizationId, votationId, listId);
      if (!listAdded) listsToAdd.push({ organizationId, votationId, listId });
    }
  }

  if (listsToAdd.length) {
    await votations.lists.createMany(listsToAdd);
  }

  return c.json(
    listsToAdd.length === data.length
      ? votationsResponses.lists.added
      : votationsResponses.lists.addedPartially,
    201,
  );
});
