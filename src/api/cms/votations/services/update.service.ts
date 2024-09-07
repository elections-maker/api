import { orgFactory } from "@/api/factories";
import { EditVotationBody } from "../votations.schemas";
import { votationsResponses } from "@/config/responses";

export const updateVotationService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<EditVotationBody>();
  const { database } = c.get("orgData");
  const { votationId } = c.req.param();

  const fetchedVotation = await database.votation.findUnique({ where: { id: votationId } });
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  if (body.name != fetchedVotation.name) {
    const isNameExists = await database.votation.findUnique({ where: { name: body.name } });
    if (isNameExists) return c.json(votationsResponses.exists, 409);
  }

  const intralistValue = body.intralist === "yes";
  const updatedBody = { ...body, intralist: intralistValue };
  await database.votation.update({ where: { id: fetchedVotation.id }, data: updatedBody });

  return c.json(votationsResponses.updated, 200);
});
