import { authFactory } from "@/api/factories";
import { organizations } from "../organizations.repo";
import { CreateOrgBody } from "../organizations.schemas";
import { organizationsResponses } from "@/config/responses";

export const createOrganizationService = authFactory.createHandlers(async (c) => {
  const { name, plan } = await c.req.json<CreateOrgBody>();
  const { id: userId } = c.get("userData");

  const fetchedOrg = await organizations.findByName(userId, name);
  if (fetchedOrg) return c.json(organizationsResponses.exists, 409);

  const fetchedOrgs = await organizations.findMany(userId);
  if (plan === "free") {
    if (fetchedOrgs.some((org) => org.plan === "free")) {
      return c.json(organizationsResponses.limitExceeded, 403);
    }
  }

  await organizations.create({ name, plan, userId });
  return c.json(organizationsResponses.created, 201);
});
