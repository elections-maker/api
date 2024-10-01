import { lists } from "../../lists.repo";
import { orgFactory } from "@/api/factories";
import { listsResponses } from "@/config/responses";
import { RemoveListUsersBody } from "../../lists.schemas";

export const removeListUsersService = orgFactory.createHandlers(async (c) => {
  const { data } = await c.req.json<RemoveListUsersBody>();
  const { id: organizationId } = c.get("orgData");
  const { listId } = c.req.param();

  const fetchedList = await lists.findById(organizationId, listId);
  if (!fetchedList) return c.json(listsResponses.notExists, 404);

  const candidatesToRemove = [];

  for (const userId of data) {
    const existingCandidate = await lists.users.findById(organizationId, listId, userId);
    if (existingCandidate) candidatesToRemove.push({ organizationId, listId, userId });
  }

  if (candidatesToRemove.length) {
    await lists.users.deleteMany(candidatesToRemove);
  }

  return c.json(
    candidatesToRemove.length === data.length
      ? listsResponses.candidates.removed
      : listsResponses.candidates.removedPartially,
    200,
  );
});
