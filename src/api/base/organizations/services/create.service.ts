import { db } from "@/database";
import { authFactory } from "@/api/factories";
import { CreateOrgBody } from "../organizations.schemas";
import { organizationsResponses } from "@/config/responses";
import { createOrganizationDatabase } from "@/database/org-manager";

export const createOrganizationService = authFactory.createHandlers(async (c) => {
  const { name, plan } = await c.req.json<CreateOrgBody>();
  const { userId } = c.get("userData");

  const fetchedOrg = await db.organization.findUnique({ where: { userId, name } });
  if (fetchedOrg) return c.json(organizationsResponses.exists, 409);

  const fetchedOrgs = await db.organization.findMany({ where: { userId } });
  if (plan === "free") {
    if (fetchedOrgs.some((org) => org.plan === "free")) {
      return c.json(organizationsResponses.limitExceeded, 403);
    }
  }

  const databaseName = crypto.randomUUID();
  await createOrganizationDatabase(databaseName);
  await db.organization.create({ data: { name, plan, userId, dbName: databaseName } });

  return c.json(organizationsResponses.created, 201);
});
