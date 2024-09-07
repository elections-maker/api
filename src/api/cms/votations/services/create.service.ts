import { orgFactory } from "@/api/factories";
import { votationsResponses } from "@/config/responses";
import { CreateVotationBody } from "../votations.schemas";

export const createVotationService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<CreateVotationBody>();
  const { database } = c.get("orgData");

  const fetchedVotation = await database.votation.findUnique({ where: { name: body.name } });
  if (fetchedVotation) return c.json(votationsResponses.exists, 409);

  const intralistValue = body.intralist === "yes";
  await database.votation.create({ data: { ...body, intralist: intralistValue } });

  return c.json(votationsResponses.created, 201);
});
