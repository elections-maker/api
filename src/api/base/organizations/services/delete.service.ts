import { db } from "@/database";
import { authFactory } from "@/api/factories";
import { organizationsResponses } from "@/config/responses";
import { deleteOrganizationDatabase } from "@/database/org-manager";

export const deleteOrganizationService = authFactory.createHandlers(async (c) => {
  const { userId } = c.get("userData");
  const { organizationId } = c.req.param();

  const whereQuery = { userId, id: organizationId };
  const fetchedOrg = await db.organization.findUnique({ where: whereQuery });
  if (!fetchedOrg) return c.json(organizationsResponses.notExists, 404);

  await deleteOrganizationDatabase(fetchedOrg.dbName);
  await db.organization.delete({ where: { id: organizationId } });

  return c.json(organizationsResponses.deleted, 200);
});
