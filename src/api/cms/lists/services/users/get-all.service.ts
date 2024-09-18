import { lists } from "../../lists.repo";
import { SortOptionsType } from "@/types";
import { orgFactory } from "@/api/factories";
import { getPagination } from "@/utils/pagination";
import { listsResponses } from "@/config/responses";

export const getListUsersService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId } = c.get("orgData");
  const { listId } = c.req.param();

  const type = (c.req.query("type") || "added") as SortOptionsType;
  const limit = parseInt(c.req.query("limit") || "15");
  const page = parseInt(c.req.query("page") || "0");

  const fetchedList = await lists.findById(organizationId, listId);
  if (!fetchedList) return c.json(listsResponses.notExists, 404);

  console.log(type);

  const totalUsers = await lists.users.count(organizationId, listId, type === "added");
  const { realPage, totalPages, offset } = getPagination(totalUsers, limit, page);
  const fetchedUsers = await lists.users.findMany(organizationId, listId, { type, limit, offset });

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
