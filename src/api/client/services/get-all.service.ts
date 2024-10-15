import { client } from "../client.repo";
import { clientFactory } from "@/api/factories";

export const getUserVotationsService = clientFactory.createHandlers(async (c) => {
  const { id: userId, organizationId } = c.get("clientUserData");

  const fetchedVotations = await client.votations.findMany(organizationId, userId);

  const returningData = fetchedVotations.map((field) => {
    return {
      id: field.votation.id,
      name: field.votation.name,
      intralist: field.votation.intralist,
      opened: field.votation.opened,
      hasVoted: field.hasVoted,
    };
  });

  return c.json({
    success: true,
    message: "Votations fetched successfully",
    data: { votations: returningData },
  });
});
