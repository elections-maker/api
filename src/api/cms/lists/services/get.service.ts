import { orgFactory } from "@/api/factories";
import { listsResponses } from "@/config/responses";

export const getListService = orgFactory.createHandlers(async (c) => {
  const { database } = c.get("orgData");
  const { listId } = c.req.param();

  const fetchedList = await database.list.findUnique({
    where: { id: listId },
    include: { _count: { select: { votations: true, candidates: true } } },
  });

  if (!fetchedList) return c.json(listsResponses.notExists, 404);

  const { _count, ...rest } = fetchedList;
  const result = { ...rest, candidates: _count.candidates, votations: _count.votations };

  return c.json({
    success: true,
    message: "List fetched successfully!",
    data: { list: result },
  });
});
