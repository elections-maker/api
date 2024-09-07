import { db } from "@/database";
import { authFactory } from "@/api/factories";

export const getOrganizationsService = authFactory.createHandlers(async (c) => {
  const { userId } = c.get("userData");

  const fetchedOrgs = await db.organization.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  return c.json({
    success: true,
    message: "Organizations fetched successfully",
    data: { orgs: fetchedOrgs },
  });
});
