import { lists } from "../lists.repo";
import { orgFactory } from "@/api/factories";
import { getPagination } from "@/utils/pagination";

export const getListsService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId, plan } = c.get("orgData");

  const limit = parseInt(c.req.query("limit") || "15");
  const page = parseInt(c.req.query("page") || "0");

  const totalLists = await lists.count(organizationId);
  const { realPage, totalPages, offset } = getPagination(totalLists, limit, page);
  const fetchedLists = await lists.findMany(organizationId, { limit, offset });

  return c.json({
    success: true,
    message: "Lists fetched successfully!",
    data: {
      plan,
      total: totalLists,
      lists: fetchedLists,
      pagination: { totalPages, page: realPage },
    },
  });
});
