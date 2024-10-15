import { lists } from "../lists.repo";
import { orgFactory } from "@/api/factories";
import { listsResponses } from "@/config/responses";

export const getListService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId } = c.get("orgData");
  const { listId } = c.req.param();

  const fetchedList = await lists.findById(organizationId, listId);
  if (!fetchedList) return c.json(listsResponses.notExists, 404);

  return c.json({
    success: true,
    message: "List fetched successfully!",
    data: { list: fetchedList },
  });
});
