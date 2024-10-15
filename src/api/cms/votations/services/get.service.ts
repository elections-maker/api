import { orgFactory } from "@/api/factories";
import { votations } from "../votations.repo";
import { votationsResponses } from "@/config/responses";

export const getVotationService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  return c.json({
    success: true,
    message: "Votation fetched successfully!",
    data: { votation: fetchedVotation },
  });
});
