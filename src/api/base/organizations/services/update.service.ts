import { authFactory } from "@/api/factories";
import { organizations } from "../organizations.repo";
import { UpdateOrgBody } from "../organizations.schemas";
import { organizationsResponses } from "@/config/responses";

export const updateOrganizationService = authFactory.createHandlers(async (c) => {
  const { name, plan } = await c.req.json<UpdateOrgBody>();
  const { id: userId } = c.get("userData");

  const fetchedOrg = await organizations.findByName(userId, name);
  if (!fetchedOrg) return c.json(organizationsResponses.notExists, 409);

  if (name !== fetchedOrg.name) {
    const fetchedList = await organizations.findByName(userId, name);
    if (fetchedList) return c.json(organizationsResponses.exists, 400);
  }

  await organizations.update(userId, fetchedOrg.id, { name, plan });
  return c.json(organizationsResponses.updated, 200);
});
