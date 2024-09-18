import { orgFactory } from "@/api/factories";
import { votations } from "../../votations.repo";
import { votationsResponses } from "@/config/responses";
import { AddVotationUsersBody } from "../../votations.schemas";

export const addVotationUsersService = orgFactory.createHandlers(async (c) => {
  const { users } = await c.req.json<AddVotationUsersBody>();
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const usersToAdd = [];

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  for (const userId of users) {
    const existingUser = await votations.users.findById(organizationId, votationId, userId);
    if (!existingUser) usersToAdd.push({ organizationId, votationId, userId });
  }

  await votations.users.createMany(usersToAdd);
  return c.json(votationsResponses.users.added, 201);
});
