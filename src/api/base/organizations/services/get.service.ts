import { authFactory } from "@/api/factories";
import { organizations } from "../organizations.repo";

export const getOrganizationService = authFactory.createHandlers(async (c) => {
  const { organizationId } = c.req.param();
  const { id: userId } = c.get("userData");

  const fetchedOrg = await organizations.findById(userId, organizationId);

  return c.json({
    success: true,
    message: "Organization fetched successfully",
    data: { organization: fetchedOrg },
  });
});
