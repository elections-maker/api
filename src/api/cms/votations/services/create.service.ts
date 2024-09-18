import { orgFactory } from "@/api/factories";
import { votations } from "../votations.repo";
import { checkPlanLimit } from "@/config/plan-limits";
import { votationsResponses } from "@/config/responses";
import { CreateVotationBody } from "../votations.schemas";

export const createVotationService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId, plan } = c.get("orgData");
  const body = await c.req.json<CreateVotationBody>();

  const fetchedVotation = await votations.findByName(organizationId, body.name);
  if (fetchedVotation) return c.json(votationsResponses.exists, 409);

  const totalVotations = await votations.count(organizationId);
  const limitExceeded = checkPlanLimit("maxVotations", plan, totalVotations);
  if (limitExceeded) return c.json(votationsResponses.limitExceeded, 403);

  const intralistValue = body.intralist === "yes";
  const createBody = { ...body, organizationId, intralist: intralistValue };

  await votations.create(createBody);
  return c.json(votationsResponses.created, 201);
});
