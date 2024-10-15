import { orgFactory } from "@/api/factories";
import { votations } from "../../votations.repo";
import { users } from "@/api/cms/users/users.repo";
import { votationsResponses } from "@/config/responses";
import { AddVotationUsersBody } from "../../votations.schemas";

export const addVotationUsersService = orgFactory.createHandlers(async (c) => {
  const { data } = await c.req.json<AddVotationUsersBody>();
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const usersToAdd = [];

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  for (const userId of data) {
    const existingUser = await users.findById(organizationId, userId);

    if (existingUser) {
      const userAdded = await votations.users.findById(organizationId, votationId, userId);
      if (!userAdded) usersToAdd.push({ organizationId, votationId, userId });
    }
  }

  if (usersToAdd.length) {
    await votations.users.createMany(usersToAdd);
  }

  return c.json(
    usersToAdd.length === data.length
      ? votationsResponses.users.added
      : votationsResponses.users.addedPartially,
    201,
  );
});
