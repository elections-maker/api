import { db } from "@/database";
import { authFactory } from "@/api/factories";

export const getOrganizationService = authFactory.createHandlers(async (c) => {
  const { organizationId } = c.req.param();
  const { userId } = c.get("userData");

  const fetchedOrg = await db.organization.findUnique({
    where: { userId, id: organizationId },
  });

  return c.json({
    success: true,
    message: "Organization fetched successfully",
    data: { org: fetchedOrg },
  });
});
