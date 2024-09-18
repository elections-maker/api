import { orgFactory } from "@/api/factories";
import { votations } from "../votations.repo";
import { getPagination } from "@/utils/pagination";

export const getVotationsService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId, plan } = c.get("orgData");

  const limit = parseInt(c.req.query("limit") || "15");
  const page = parseInt(c.req.query("page") || "0");

  const totalVotations = await votations.count(organizationId);
  const { realPage, totalPages, offset } = getPagination(totalVotations, limit, page);
  const fetchedVotations = await votations.findMany(organizationId, { limit, offset });

  return c.json({
    success: true,
    message: "Votations fetched successfully!",
    data: {
      plan,
      total: totalVotations,
      votations: fetchedVotations,
      pagination: { totalPages, page: realPage },
    },
  });
});
