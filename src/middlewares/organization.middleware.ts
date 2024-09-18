import { orgFactory } from "@/api/factories";
import { organizationsResponses } from "@/config/responses";
import { organizations } from "@/api/base/organizations/organizations.repo";

export const organizationMiddleware = orgFactory.createMiddleware(async (c, next) => {
  const { organizationId } = c.req.param();
  const { id: userId } = c.get("userData");

  const fetchedOrg = await organizations.findById(userId, organizationId);
  if (!fetchedOrg) return c.json(organizationsResponses.notExists, 404);

  c.set("orgData", fetchedOrg);
  return await next();
});
