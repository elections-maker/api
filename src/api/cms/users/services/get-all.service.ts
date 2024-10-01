import { users } from "../users.repo";
import { decrypt } from "@/utils/crypto";
import { orgFactory } from "@/api/factories";
import { getPagination } from "@/utils/pagination";

export const getUsersService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId, plan } = c.get("orgData");

  const limit = parseInt(c.req.query("limit") || "17");
  const page = parseInt(c.req.query("page") || "0");

  const totalUsers = await users.count(organizationId);
  const { realPage, totalPages, offset } = getPagination(totalUsers, limit, page);
  const fetchedUsers = await users.findMany(organizationId, { limit, offset });

  const returningData = fetchedUsers.map((user) => {
    return { ...user, email: decrypt(user.email) };
  });

  return c.json({
    success: true,
    message: "Users fetched successfully!",
    data: {
      plan,
      total: totalUsers,
      users: returningData,
      pagination: { totalPages, page: realPage },
    },
  });
});
