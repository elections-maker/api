import { SortOptionsType } from "@/types";
import { orgFactory } from "@/api/factories";
import { votations } from "../../votations.repo";
import { getPagination } from "@/utils/pagination";
import { votationsResponses } from "@/config/responses";

export const getVotationListsService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const type = (c.req.query("type") || "added") as SortOptionsType;
  const limit = parseInt(c.req.query("limit") || "15");
  const page = parseInt(c.req.query("page") || "0");

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  const totalLists = await votations.lists.count(organizationId, votationId, type === "added");
  const { realPage, totalPages, offset } = getPagination(totalLists, limit, page);
  const fetchedLists = await votations.lists.findMany(organizationId, votationId, { type, limit, offset });

  return c.json({
    success: true,
    message: "Lists fetched successfully!",
    data: {
      total: totalLists,
      users: fetchedLists,
      pagination: { totalPages, page: realPage },
    },
  });
});
