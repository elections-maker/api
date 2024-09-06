import { orgFactory } from "@/api/factories";
import { getPagination } from "@/utils/pagination";

export const getAllListsService = orgFactory.createHandlers(async (c) => {
  const { data, database } = c.get("orgData");

  const limit = parseInt(c.req.query("limit") || "15");
  const page = parseInt(c.req.query("page") || "0");

  const totalLists = await database.list.count();
  const { realPage, totalPages, offset } = getPagination(totalLists, limit, page);

  const fetchedLists = await database.list.findMany({
    skip: offset,
    take: limit,
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { votations: true, candidates: true } } },
  });

  const result = fetchedLists.map((list) => {
    const { _count, ...rest } = list;
    return { ...rest, candidates: _count.candidates, votations: _count.votations };
  });

  return c.json({
    success: true,
    message: "Lists fetched successfully!",
    data: {
      plan: data.plan,
      total: totalLists,
      lists: result,
      pagination: { totalPages, page: realPage },
    },
  });
});
