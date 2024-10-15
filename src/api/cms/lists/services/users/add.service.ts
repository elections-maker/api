import { lists } from "../../lists.repo";
import { orgFactory } from "@/api/factories";
import { users } from "@/api/cms/users/users.repo";
import { listsResponses } from "@/config/responses";
import { AddListUsersBody } from "../../lists.schemas";

export const addListUsersService = orgFactory.createHandlers(async (c) => {
  const { data } = await c.req.json<AddListUsersBody>();
  const { id: organizationId } = c.get("orgData");
  const { listId } = c.req.param();

  const fetchedList = await lists.findById(organizationId, listId);
  if (!fetchedList) return c.json(listsResponses.notExists, 404);

  const candidatesToAdd = [];

  for (const userId of data) {
    const existingCandidate = await users.findById(organizationId, userId);

    if (existingCandidate) {
      const candidateAdded = await lists.users.findById(organizationId, listId, userId);
      if (!candidateAdded) candidatesToAdd.push({ organizationId, listId, userId });
    }
  }

  if (candidatesToAdd.length) {
    await lists.users.createMany(candidatesToAdd);
  }

  return c.json(
    candidatesToAdd.length === data.length
      ? listsResponses.candidates.added
      : listsResponses.candidates.addedPartially,
    201,
  );
});
