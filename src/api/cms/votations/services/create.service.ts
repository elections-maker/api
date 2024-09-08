import { orgFactory } from "@/api/factories";
import { checkPlanLimit } from "@/config/plan-limits";
import { votationsResponses } from "@/config/responses";
import { CreateVotationBody } from "../votations.schemas";

export const createVotationService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<CreateVotationBody>();
  const { database, data } = c.get("orgData");

  const fetchedVotation = await database.votation.findUnique({ where: { name: body.name } });
  if (fetchedVotation) return c.json(votationsResponses.exists, 409);

  const totalVotations = await database.votation.count();
  const limitExceeded = checkPlanLimit("maxVotations", data.plan, totalVotations);
  if (limitExceeded) return c.json(votationsResponses.limitExceeded, 403);

  const intralistValue = body.intralist === "yes";
  await database.votation.create({ data: { ...body, intralist: intralistValue } });

  return c.json(votationsResponses.created, 201);
});
