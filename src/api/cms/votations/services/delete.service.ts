import { orgFactory } from "@/api/factories";
import { votationsResponses } from "@/config/responses";

export const deleteVotationService = orgFactory.createHandlers(async (c) => {
  const { votationId } = c.req.param();
  const { database } = c.get("orgData");

  const fetchedVotation = await database.votation.findUnique({ where: { id: votationId } });
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  await database.votation.delete({ where: { id: fetchedVotation.id } });
  return c.json(votationsResponses.deleted, 200);
});
