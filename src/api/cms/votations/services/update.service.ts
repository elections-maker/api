import { orgFactory } from "@/api/factories";
import { votations } from "../votations.repo";
import { votationsResponses } from "@/config/responses";
import { UpdateVotationBody } from "../votations.schemas";

export const updateVotationService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<UpdateVotationBody>();
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  if (body.name !== fetchedVotation.name) {
    const fetchedUser = await votations.findByName(organizationId, body.name);
    if (fetchedUser) return c.json(votationsResponses.exists, 400);
  }

  const intralistValue = body.intralist === "yes";
  const updatedBody = { ...body, intralist: intralistValue };

  await votations.update(organizationId, votationId, updatedBody);
  return c.json(votationsResponses.updated, 200);
});
