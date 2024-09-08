import { orgFactory } from "@/api/factories";
import { CreateListBody } from "../lists.schemas";
import { listsResponses } from "@/config/responses";
import { checkPlanLimit } from "@/config/plan-limits";

export const createListService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<CreateListBody>();
  const { database, data } = c.get("orgData");

  const fetchedList = await database.list.findUnique({ where: { name: body.name } });
  if (fetchedList) return c.json(listsResponses.exists, 409);

  const totalLists = await database.list.count();
  const limitExceeded = checkPlanLimit("maxLists", data.plan, totalLists);
  if (limitExceeded) return c.json(listsResponses.limitExceeded, 403);

  await database.list.create({ data: body });
  return c.json(listsResponses.created, 201);
});
