import { orgFactory } from "@/api/factories";
import { UpdateListBody } from "../lists.schemas";
import { listsResponses } from "@/config/responses";

export const updateListService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<UpdateListBody>();
  const { listId } = c.req.param();
  const { database } = c.get("orgData");

  const fetchedList = await database.list.findUnique({ where: { id: listId } });
  if (!fetchedList) return c.json(listsResponses.notExists, 404);

  if (body.name != fetchedList.name) {
    const isNameExists = await database.list.findUnique({ where: { name: body.name } });
    if (isNameExists) return c.json(listsResponses.exists, 409);
  }

  await database.list.update({ where: { id: listId }, data: body });
  return c.json(listsResponses.updated, 200);
});
