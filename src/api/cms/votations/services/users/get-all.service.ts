import { SortOptionsType } from "@/types";
import { orgFactory } from "@/api/factories";
import { votations } from "../../votations.repo";
import { getPagination } from "@/utils/pagination";
import { votationsResponses } from "@/config/responses";

export const getVotationUsersService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const type = (c.req.query("type") || "added") as SortOptionsType;
  const limit = parseInt(c.req.query("limit") || "15");
  const page = parseInt(c.req.query("page") || "0");

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  const totalUsers = await votations.count(organizationId, votationId, type === "added");
  const { realPage, totalPages, offset } = getPagination(totalUsers, limit, page);
  const fetchedUsers = await votations.findMany(organizationId, votationId, { type, limit, offset });

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
