import { orgFactory } from "@/api/factories";
import { votationsResponses } from "@/config/responses";
import { AddVotationListsBody } from "../../votations.schemas";

export const addVotationListsService = orgFactory.createHandlers(async (c) => {
  const { lists } = await c.req.json<AddVotationListsBody>();
  const { database } = c.get("orgData");
  const { votationId } = c.req.param();

  const fetchedVotation = await database.votation.findUnique({ where: { id: votationId } });
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  for (const listId of lists) {
    const fetchedList = await database.list.findUnique({ where: { id: listId } });

    if (fetchedList) {
      const existingList = await database.votationList.findUnique({
        where: { listId_votationId: { votationId, listId: fetchedList.id } },
      });

      if (!existingList) {
        await database.votationList.create({
          data: { votationId, listId: fetchedList.id },
        });
      }
    }
  }

  return c.json(votationsResponses.lists.added, 201);
});
