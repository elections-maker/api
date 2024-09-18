import { lists } from "../../lists.repo";
import { orgFactory } from "@/api/factories";
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
    const existingCandidate = await lists.users.findById(organizationId, listId, userId);
    if (!existingCandidate) candidatesToAdd.push({ organizationId, listId, userId });
  }

  await lists.users.createMany(candidatesToAdd);
  return c.json(listsResponses.candidates.added, 201);
});
