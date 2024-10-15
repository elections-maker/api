import { authFactory } from "@/api/factories";
import { organizations } from "../organizations.repo";
import { organizationsResponses } from "@/config/responses";

export const deleteOrganizationService = authFactory.createHandlers(async (c) => {
  const { organizationId } = c.req.param();
  const { id: userId } = c.get("userData");

  const fetchedOrg = await organizations.findById(userId, organizationId);
  if (!fetchedOrg) return c.json(organizationsResponses.notExists, 404);

  await organizations.delete(userId, organizationId);
  return c.json(organizationsResponses.deleted, 200);
});
