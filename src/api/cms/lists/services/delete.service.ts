import { orgFactory } from "@/api/factories";
import { listsResponses } from "@/config/responses";

export const deleteListService = orgFactory.createHandlers(async (c) => {
  const { listId } = c.req.param();
  const { database } = c.get("orgData");

  const fetchedList = await database.list.findUnique({ where: { id: listId } });
  if (!fetchedList) return c.json(listsResponses.notExists, 404);

  await database.list.delete({ where: { id: listId } });
  return c.json(listsResponses.deleted, 200);
});
