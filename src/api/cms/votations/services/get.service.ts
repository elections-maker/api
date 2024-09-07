import { orgFactory } from "@/api/factories";
import { votationsResponses } from "@/config/responses";

export const getVotationService = orgFactory.createHandlers(async (c) => {
  const { database } = c.get("orgData");
  const { votationId } = c.req.param();

  const fetchedVotation = await database.votation.findUnique({
    where: { id: votationId },
    include: { _count: { select: { users: true } } },
  });

  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  const { _count, ...rest } = fetchedVotation;
  const result = { ...rest, users: _count.users };

  return c.json({
    success: true,
    message: "Votation fetched successfully!",
    data: { votation: result },
  });
});
