import { lists } from "../lists.repo";
import { orgFactory } from "@/api/factories";
import { CreateListBody } from "../lists.schemas";
import { listsResponses } from "@/config/responses";
import { checkPlanLimit } from "@/config/plan-limits";

export const createListService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId, plan } = c.get("orgData");
  const body = await c.req.json<CreateListBody>();

  const fetchedList = await lists.findByName(organizationId, body.name);
  if (fetchedList) return c.json(listsResponses.exists, 409);

  const totalLists = await lists.count(organizationId);
  const limitExceeded = checkPlanLimit("maxLists", plan, totalLists);
  if (limitExceeded) return c.json(listsResponses.limitExceeded, 403);

  await lists.create({ organizationId, ...body });
  return c.json(listsResponses.created, 201);
});
