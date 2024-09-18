import { orgFactory } from "@/api/factories";
import { votations } from "../../votations.repo";
import { votationsResponses } from "@/config/responses";
import { RemoveVotationUsersBody } from "../../votations.schemas";

export const removeVotationUsersService = orgFactory.createHandlers(async (c) => {
  const { users } = await c.req.json<RemoveVotationUsersBody>();
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const usersToRemove = [];

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  for (const userId of users) {
    const existingUser = await votations.users.findById(organizationId, votationId, userId);
    if (existingUser) usersToRemove.push({ organizationId, votationId, userId });
  }

  await votations.users.deleteMany(usersToRemove);
  return c.json(votationsResponses.users.removed, 201);
});
