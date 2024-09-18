import { lists } from "../lists.repo";
import { orgFactory } from "@/api/factories";
import { UpdateListBody } from "../lists.schemas";
import { listsResponses } from "@/config/responses";

export const updateListService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<UpdateListBody>();
  const { id: organizationId } = c.get("orgData");
  const { listId } = c.req.param();

  const fetchedList = await lists.findById(organizationId, listId);
  if (!fetchedList) return c.json(listsResponses.notExists, 404);

  if (body.name !== fetchedList.name) {
    const fetchedList = await lists.findByName(organizationId, body.name);
    if (fetchedList) return c.json(listsResponses.exists, 400);
  }

  await lists.update(organizationId, listId, { ...body });
  return c.json(listsResponses.updated, 200);
});
