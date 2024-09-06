import { orgFactory } from "@/api/factories";
import { getPagination } from "@/utils/pagination";
import { listsResponses } from "@/config/responses";

export const getListUsersService = orgFactory.createHandlers(async (c) => {
  const { database } = c.get("orgData");
  const { listId } = c.req.param();

  const type = c.req.query("type") || "added";
  const limit = parseInt(c.req.query("limit") || "15");
  const page = parseInt(c.req.query("page") || "0");

  const fetchedList = database.list.findUnique({ where: { id: listId } });
  if (!fetchedList) return c.json(listsResponses.notExists, 404);

  const baseQuery =
    type === "added"
      ? { candidatures: { some: { listId } } }
      : { NOT: { candidatures: { some: { listId } } } };

  const totalUsers = await database.user.count({ where: baseQuery });
  const { realPage, totalPages, offset } = getPagination(totalUsers, limit, page);

  const fetchedUsers = await database.user.findMany({
    skip: offset,
    take: limit,
    where: baseQuery,
  });

  return c.json({
    success: true,
    message: "Users fetched successfully!",
    data: {
      total: totalUsers,
      users: fetchedUsers,
      pagination: { totalPages, page: realPage },
    },
  });
});
