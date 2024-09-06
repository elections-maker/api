import { orgFactory } from "@/api/factories";
import { createOrgClient, db } from "@/database";
import { organizationsResponses } from "@/config/responses";

export const organizationMiddleware = orgFactory.createMiddleware(async (c, next) => {
  const { organizationId } = c.req.param();
  const { userId } = c.get("userData");

  const fetchedOrg = await db.organization.findUnique({
    where: { userId, id: organizationId },
  });

  if (!fetchedOrg) return c.json(organizationsResponses.notExists, 404);

  const database = createOrgClient(fetchedOrg.dbName);
  c.set("orgData", { database, data: fetchedOrg });

  return await next();
});
