import { orgFactory } from "@/api/factories";
import { CreateListBody } from "../lists.schemas";
import { listsResponses } from "@/config/responses";

export const createListService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<CreateListBody>();
  const { database } = c.get("orgData");

  const fetchedList = await database.list.findUnique({ where: { name: body.name } });
  if (fetchedList) return c.json(listsResponses.exists, 409);

  await database.list.create({ data: body });
  return c.json(listsResponses.created, 201);
});
