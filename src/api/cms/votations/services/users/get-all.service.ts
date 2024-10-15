import { decrypt } from "@/utils/crypto";
import { SortOptionsType } from "@/types";
import { orgFactory } from "@/api/factories";
import { votations } from "../../votations.repo";
import { getPagination } from "@/utils/pagination";
import { votationsResponses } from "@/config/responses";

export const getVotationUsersService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId } = c.get("orgData");
  const { votationId } = c.req.param();

  const type = (c.req.query("type") || "added") as SortOptionsType;
  const limit = parseInt(c.req.query("limit") || "17");
  const page = parseInt(c.req.query("page") || "0");

  const fetchedVotation = await votations.findById(organizationId, votationId);
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  const totalUsers = await votations.users.count(organizationId, votationId, type === "added");
  const { realPage, totalPages, offset } = getPagination(totalUsers, limit, page);
  const fetchedUsers = await votations.users.findMany(organizationId, votationId, { type, limit, offset });

  let returningData = [];

  if (type === "added") {
    returningData = fetchedUsers.map((fetchedUser) => {
      const { votations, ...rest } = fetchedUser;
      return { ...rest, email: decrypt(fetchedUser.email), hasVoted: votations[0].hasVoted };
    });
  } else {
    returningData = fetchedUsers.map((fetchedUser) => {
      const { votations, ...rest } = fetchedUser;
      return { ...rest, email: decrypt(fetchedUser.email) };
    });
  }

  return c.json({
    success: true,
    message: "Users fetched successfully!",
    data: {
      total: totalUsers,
      users: returningData,
      pagination: { totalPages, page: realPage },
    },
  });
});
