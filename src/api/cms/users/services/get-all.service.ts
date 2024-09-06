import { orgFactory } from "@/api/factories";
import { getPagination } from "@/utils/pagination";

export const getAllUsersService = orgFactory.createHandlers(async (c) => {
  const { data, database } = c.get("orgData");

  const limit = parseInt(c.req.query("limit") || "15");
  const page = parseInt(c.req.query("page") || "0");

  const totalUsers = await database.user.count();
  const { realPage, totalPages, offset } = getPagination(totalUsers, limit, page);

  const fetchedUsers = await database.user.findMany({
    skip: offset,
    take: limit,
    orderBy: { updatedAt: "desc" },
  });

  return c.json({
    success: true,
    message: "Users fetched successfully!",
    data: {
      plan: data.plan,
      total: totalUsers,
      users: fetchedUsers,
      pagination: { totalPages, page: realPage },
    },
  });
});
