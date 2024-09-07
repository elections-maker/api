import { orgFactory } from "@/api/factories";
import { getPagination } from "@/utils/pagination";
import { listsResponses } from "@/config/responses";

export const getVotationListsService = orgFactory.createHandlers(async (c) => {
  const { database } = c.get("orgData");
  const { votationId } = c.req.param();

  const type = c.req.query("type") || "added";
  const limit = parseInt(c.req.query("limit") || "15");
  const page = parseInt(c.req.query("page") || "0");

  const fetchedVotation = database.votation.findUnique({ where: { id: votationId } });
  if (!fetchedVotation) return c.json(listsResponses.notExists, 404);

  const baseQuery =
    type === "added"
      ? { votations: { some: { votationId } } }
      : { NOT: { votations: { some: { votationId } } } };

  const totalLists = await database.list.count({ where: baseQuery });
  const { realPage, totalPages, offset } = getPagination(totalLists, +limit, +page);

  const fetchedLists = await database.list.findMany({
    skip: offset,
    take: +limit,
    where: baseQuery,
  });

  return c.json({
    success: true,
    message: "Lists fetched successfully!",
    data: {
      total: totalLists,
      lists: fetchedLists,
      pagination: { totalPages, page: realPage },
    },
  });
});
