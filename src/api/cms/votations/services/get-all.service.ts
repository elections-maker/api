import { orgFactory } from "@/api/factories";
import { getPagination } from "@/utils/pagination";

export const getAllVotationsService = orgFactory.createHandlers(async (c) => {
  const { data, database } = c.get("orgData");

  const limit = parseInt(c.req.query("limit") || "15");
  const page = parseInt(c.req.query("page") || "0");

  const totalVotations = await database.votation.count();
  const { realPage, totalPages, offset } = getPagination(totalVotations, limit, page);

  const fetchedVotations = await database.votation.findMany({
    skip: offset,
    take: limit,
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { users: true, lists: true } } },
  });

  const result = fetchedVotations.map((votation) => {
    const { _count, ...rest } = votation;
    return { ...rest, users: _count.users, lists: _count.lists };
  });

  return c.json({
    success: true,
    message: "Votations fetched successfully!",
    data: {
      plan: data.plan,
      total: totalVotations,
      votations: result,
      pagination: { totalPages, page: realPage },
    },
  });
});
